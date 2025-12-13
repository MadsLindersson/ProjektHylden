import "dotenv/config";

import express from "express";
const app = express();

import cors from "cors";
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware ==================================================================================================
import session from "express-session";
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

import helmet from "helmet";
app.use(helmet());

import { rateLimit } from "express-rate-limit";
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
});

// Apply the rate limiting middleware to all requests.
app.use(generalLimiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

app.use("/auth/", authLimiter);

app.use(express.json());

// Endpoints=========================================================================================

import authenticationRoute from './routes/authenticationRoute.js'
app.use(authenticationRoute);

import mainPageRoute from './routes/mainPageRoute.js';
app.use(mainPageRoute);

import profileRoute from './routes/profileRoute.js';
app.use(profileRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server has startet on port", PORT);
});

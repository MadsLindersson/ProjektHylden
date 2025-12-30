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

import session from "express-session";

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  });

app.use(sessionMiddleware);

import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";

export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true
  }
});

io.engine.use(sessionMiddleware);

export const onlineUsers = new Map();

io.on("connection", (socket) => {
  const userId = socket.request.session.userId;

  if (userId) {
    onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} linked to socket ${socket.id}`);
  }

  socket.on("disconnect", () => {
    onlineUsers.delete(userId);
  });
});

import helmet from "helmet";
app.use(helmet());

import { rateLimit } from "express-rate-limit";
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 2000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
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

app.use('/uploads', (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
}, express.static('uploads'));

// Endpoints=========================================================================================

import authenticationRoute from './routes/authenticationRoute.js'
app.use(authenticationRoute);

import postsRoute from './routes/postsRoute.js';
app.use(postsRoute);

import usersRoute from './routes/usersRoute.js';
app.use(usersRoute);

import categoryRoute from './routes/categoryRoute.js';
import { sessionCheck } from "./utilBackend/sessionCheck.js";
app.use(categoryRoute);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("Server has startet on port", PORT);
});

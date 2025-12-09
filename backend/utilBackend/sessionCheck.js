export function sessionCheck (req, res, next) {
    if (req.session.email)   {
        return next();
    } else {
        return res.status(401).send({ data: "Unauthorized access" });
    }
}
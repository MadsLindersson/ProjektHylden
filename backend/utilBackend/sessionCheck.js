export function sessionCheck(req, res, next) {
    if (req.session.userId) {
        return next();
    } else {
        return res.status(401).send({ data: "Unauthorized access" });
    }
}

export function adminCheck (req, res, next)   {
    if (req.session.userRole === "admin")   {
        next();
    } else  {
        return res.status(401).send({ data: "Unauthorized access" });
    }
}
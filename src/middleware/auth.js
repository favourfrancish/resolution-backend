import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Not authenticated"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY

        );

        req.user = decoded;

        next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};


export default authenticate
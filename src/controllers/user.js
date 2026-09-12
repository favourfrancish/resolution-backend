import User from "../database/schema.js";

export default async function getProfile(req, res) {
    try {
        const user = await User.findById(req.user.userId).select("-password");

        return res.status(200).json({
            user
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}



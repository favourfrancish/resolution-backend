import User from "../database/schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signup(req, res) {
    try {
        const { username, email, gender, password } = req.body;

        if (!username) {
            return res.status(400).json({ message: "Username is required" })
        }
        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required" })
        }

        if (!gender) {
            return res.status(400).json({ message: "Password is required" })
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password should be at least 8 characters" })
        }

        const existingEmail = await User.findOne({ email })
        const existingUsername = await User.findOne({ username })

        if (existingEmail) {
            return res.status(409).json({ message: "User already exists" })
        }
        if (existingUsername) {
            return res.status(409).json({ message: "Username already taken" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            username, email, gender, password: hashedPassword
        })

        return res.status(201).json({
            message: "Account successfully created"
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

async function signin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required" })
        }

        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status(401).json({ message: "User not registered" })
        }

        const passwordMatch = await bcrypt.compare(
            password, existingUser.password
        )
        
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Incorrect email or password"
            });
        }

        const token = jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true, // HTTP during local development
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({
            message: "Signed In successfully"
        })


    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

async function signout(req, res) {
    try {
        res.clearCookie("token");

        return res.status(200).json({
            message: "Signed Out successfully"
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}


export {
    signup, signin, signout
}
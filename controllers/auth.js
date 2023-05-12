import User from "../models/User.js"
import bcrypt from "bcryptjs"
import createError from 'http-errors';
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config()
let refreshTokens = []
export const register = async (req, res) => {
    try {
        const salt = await bcrybt.genSalt(10)
        const hashed = await bcrybt.hash(req.body.password, salt)

        //Create user
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashed
        })

        //Saved to DB
        const user = await newUser.save()
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json(err)
    }
};
export const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res.status(404).json("Wrong username")
        }
        const validPassword = await bcrybt.compare(req.body.password, user.password)
        if (!validPassword) {
            return res.status(404).json("Wrong password")
        }
        if (user && validPassword) {
            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)
            res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false, path: "/", sameSite: "strict" })
            const { password, ...others } = user._doc
            return res.status(200).json({ ...others, accessToken })
        }
    } catch (err) {
        return res.status(500).json(err)
    }
};

export const logout = async (req, res) => {
    res.clearCookie("refreshToken")
    refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken)
    res.status(200).json("Logged out!!")
}

export const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
}
export const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "365d" })
}
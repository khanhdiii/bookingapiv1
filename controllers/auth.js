import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from 'http-errors';
import jwt from "jsonwebtoken"


export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(200).send("User has been created.");
    } catch (err) {
        next(err);
    }
};
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect)
            return next(createError(400, "Wrong password or username!"));

        const accessToken = jwt.sign(
            { user, isAdmin: user.isAdmin },
            process.env.ACCESS_TOKEN_SECRET
        );

        const { password, isAdmin, ...otherDetails } = user._doc;
        res
            .cookie("access_token", accessToken, {
                httpOnly: true,
            })
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin, accessToken });
    } catch (err) {
        next(err);
    }
};
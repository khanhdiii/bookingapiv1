import User from "../models/User.js"
import bcrypt from "bcryptjs"
import createError from 'http-errors';
import jwt from "jsonwebtoken"
import dotenv from "dotenv";


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
        if (!user) return next(createError(404, "Wrong username!"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect) {
            return next(createError(400, "Wrong password !"));
        }
        if (user && isPasswordCorrect) {
            const token = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1h" }
            );
            const { password, ...otherDetails } = user._doc;
            return res
                .status(200)
                .json({ ...otherDetails, token });
        }
    } catch (err) {
        next(err);
    }
};
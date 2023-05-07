import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
    const token = req.header.token;
    if (token) {
        const accessToken = token.split(" ")[1]
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                res.status(403).json("Token is not valid")
            }
            req.user = user
            next();
        });
    }
    else {
        return res.status(401).json("You are not authenticated!");
    }
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) return next(err);
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) return next(err);
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

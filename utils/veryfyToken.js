import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies?.access_token

    if (!token) {
        return next(createError(401, "You are not authenticated! "))
    }
    console.log(token);
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        }
        else {
            const err = new Error("You are not authorized!")
            err.status = 403
            next(err)
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user && req.user.isAdmin) {
            next()
        }
        else {
            const err = new Error("You are not authorized!")
            err.status = 403
            next(err)
        }
        console.log(req.user);
    })
}
import UserModel from "../model/UserModel.js";
import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

const userVerification = (req, res, next) => {
    const token = req.cookies.token
    if(!token) {
        return res.status(401).json({status: false, message: "Unauthorized"});
    }

    jwt.verify(token, process.env.TOKEN_KEY, async(err, data) => {
        if(err) {
            return res.status(401).json({status: false, message: "Invalid token"});
        }
        const user = await UserModel.findById(data.id);
        if(user) {
            req.user = user;
            next();

        } else {
             return res.status(401).json({status: false, message: "User not found"});
        }
    })
}

const checkAuthStatus = (req, res) => {
    const token = req.cookies.token
    if(!token) {
        return res.json({status: false})
    }
    jwt.verify(token, process.env.TOKEN_KEY, async(err, data) => {
        if(err) {
            return res.json({status: false})
        }
        const user = await UserModel.findById(data.id);
        if(user) {
            return res.json({status: true, user: user.username})
        } else {
            return res.json({status: false})
        }
    })
}

export { userVerification, checkAuthStatus};
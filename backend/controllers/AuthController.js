import UserModel from "../model/UserModel";
import { createSecretToken } from "../util/SecretToken";
import bcrypt from "bcrypt";

const Signup = async (req, res, next) => {
    const {email, password, username, createdAt} = req.body;

    if(!username || !password || !email) {
        return res.status(400).json({message: "Please provide the following information!"});
    }
    try {
        const existingUser = await UserModel.findOne({email});

        if(existingUser) {
            return res.json({message: "User already exists!"});
        }

        const user = await UserModel.create({email, password, username, createdAt});
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly : false,
        });
        res.status(201).json({message: "User signed in successfully", success : true, user});
        next();
    } catch (err) {
        res.json({message: `Something went wrong ${e}`});
    }
}
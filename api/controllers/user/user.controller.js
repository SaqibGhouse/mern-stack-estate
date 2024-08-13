import { errorHandler } from "../../utils/errors/error.js";
import bcryptjs from 'bcryptjs'
import User from '../../models/user/user.model.js'

export const test = (req, res) => {
    res.json({
        message: 'API is working'
    });
}

export const updateUserData = async (req, res, next) => {
    // if (req.user.id !== req.params.id) return next(errorHandler(401, "UnAuthorized Update"));
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updateUserData = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                userName: req.body.userName,
                password: req.body.password,
                email: req.body.email,
                avatar: req.body.avatar
            }
        }, { new: true })

        if (!updateUserData) {
            return res.status(404).json({ message: "User not found" });
        }
        const { password, ...rest } = updateUserData._doc;

        res.status(200).json({isValid:true , ...rest});

    } catch (error) {
        console.log(error)
    }
}

export const deleteUserData = async (req, res, next)=>{
    if (req.user.id !== req.params.id) return next(errorHandler(401, "UnAuthorized Delete"));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json({isValid: true, message:"User Deleted Successfully"});
    } catch (error) {
        next(error)
    }
}
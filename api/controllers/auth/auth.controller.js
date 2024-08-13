import User from '../../models/user/user.model.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../../utils/errors/error.js';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
    const { userName, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ userName, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json({ isValid: true, message: "User Created Successfully" });
    } catch (error) {
        // Check if the error is due to duplicate key
        if (error.code === 11000 || error.code === 11001) { // MongoDB duplicate key error codes
            res.status(400).json({ isValid: false, message: "User with this email already exists" });
        } else {
            // For other errors, pass it to the error handling middleware
            next(errorHandler(error));
        }
    }
}

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return  next(errorHandler(404, "User with this email does not exist"));
        
        const isMatch = bcryptjs.compareSync(password, validUser.password);
        if (!isMatch) return next(errorHandler(401, "Wrong Credentials"));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT);
        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json({
                isValid: true,
                userName : validUser.userName,
                id: validUser.id,
                email : validUser.email,
                avatar: validUser.avatar
            });
    } catch (error) {
        next(errorHandler(error));
    }
};

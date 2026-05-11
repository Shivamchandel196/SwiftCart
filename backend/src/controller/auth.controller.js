
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";














//////register user



const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: "20d"
        }
    );
};

export const registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Check user created or not
        if (user) {

            // Generate OTP
            const otp = Math.floor(
                100000 + Math.random() * 900000
            ).toString();

            // Email message
            const message = `
🛒 Welcome to SwiftCart

Hi ${user.name},

Your verification OTP is:

${otp}

This code is valid for the next 10 minutes.

For security reasons, do not share this OTP with anyone.

Happy Shopping ✨
Team SwiftCart
`;

            // Send Email
            await sendEmail(
                email,
                "Welcome to SwiftCart - Verification OTP",
                message
            );

            // Success response
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });

        } else {

            return res.status(400).json({
                message: "Invalid user data"
            });

        }

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }
};


////////////login

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role:user.role,
      token: generateToken(user._id)
    });

  } catch (err) {
    return res.status(500).json({
      message: "server error"
    });
  }
};




///////////////////get users

export const getUsers = async (req,res)=>{
    try{
        const users = await User.find({}).select("-password");
        res.status(200).json(users);

    }catch(err){
        res.status(500).json({
            message:"Server error"
        });
    }
}
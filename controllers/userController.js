import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//for login
export const loginController = async (req, res) => {
    try {
        const { userId, name, password } = req.body;
        const user = await User.findOne({userId});

        if(! user) return res.status(404).json({"message": "User not found"});

        bcrypt.compare(password.toString(), user.password.toString()).then((isMatch) => {
            if(! isMatch) return res.status(401).json({"message": "Credentials incorrect"});

            const accessToken = jwt.sign(user.userId, process.env.ACCESS_TOKEN);

            res.json({"message": "Login successfully", "data": {"accessToken": accessToken, "user": user}});

        }).catch((err) => {
            console.log(err);
        })

    } catch(error) {
        console.log(error);
    }
}

//for register
export const registerController = async (req, res) => {

    try {
        const { userId, password } = req.body;
        const user = await User.findOne({userId});

        if (user) return res.json({"message": "User already exists"});

        const newUser = new User({...req.body, verified: true});

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                newUser.password = hash;
                newUser.save();

                const accessToken = jwt.sign(newUser.userId, process.env.ACCESS_TOKEN);

                res.status(200).json({"message":"New User Added Successfully!", "data": {"accessToken": accessToken, "user": newUser}});
            });
        });

    } catch(error) {
        console.log(error);
    }

}
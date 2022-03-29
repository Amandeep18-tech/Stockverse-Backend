const { User } = require("../models/User");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
exports.verifyUser = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ message: "Invalid Email " });
        res.status(200).send({ message: "User Found" });

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });

    }
};
const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
    });
    return schema.validate(data);
};

exports.getSecurityQuestionOfUser = async (req, res) => {
    try {
        
        console.log(req.body.id);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findById(mongoose.Types.ObjectId(req.body.id));
        console.log(user.Userid);
        if (!user)
            return res.status(401).send({ message: "Invalid Email " });
        res.status(200).send({ message: "Question found", question: user.securityQuestion });

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });

    }
};
exports.updatePassword = async (req, res) => {
    try {
        const { error } = validateChangePassword(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ message: "Invalid Email " });
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
		
		const hashPassword = await bcrypt.hash(req.body.password, salt);
        user.password=hashPassword;
        user.cpassword=hashPassword;
        user.save;
        res.status(200).send({ message: "Password Changed", user: user });

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });

    }
};


const validateChangePassword = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

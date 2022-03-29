// Author : Amandeep Singh Matta(B00886925)
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const Joi = require("joi");

exports.checkUser = async (req, res) => {
	try {
		
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully",id:user.id,isAdmin:user.role,isPremium:user.isPremium });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error",error: error.message });
	
}
};
const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};


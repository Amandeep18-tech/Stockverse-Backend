const mongoose = require("mongoose");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const passwordComplexity = require("joi-password-complexity");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    isPremium: {
      type: Boolean,
      require: true,
      default: false
    }
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	cpassword: { type: String, required: true },
	securityQuestion: { type: String,required: true},
	securityAnswer: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		cpassword: passwordComplexity().required().label("cpassword"),
		securityAnswer: Joi.string().required().label("securityAnswer"),
		securityQuestion: Joi.string().required().label("securityQuestion"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };

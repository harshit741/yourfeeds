const Joi = require("joi");
//Validation
const signupSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});
const signinScehma = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

module.exports = { signupSchema, signinScehma };

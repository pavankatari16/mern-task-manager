const Joi = require("joi");

exports.registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("user", "admin").default("user")
});

exports.loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const Joi = require("joi");

exports.createTaskSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().allow(""),
  status: Joi.string().valid("pending", "in-progress", "completed").default("pending")
});

exports.updateTaskSchema = Joi.object({
  title: Joi.string().min(3),
  description: Joi.string().allow(""),
  status: Joi.string().valid("pending", "in-progress", "completed")
});

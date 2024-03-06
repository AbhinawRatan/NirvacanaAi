import Joi from "joi";

export default Joi.object({
  userName: Joi.string().required(),
  bio: Joi.string().required(),
  displayName: Joi.string().required(),
  website: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.array().items(Joi.string()).required(),
  email: Joi.string().email().required(),
  skills: Joi.array().items(Joi.string()).required(),
  imageProfile: Joi.string().required(),
  imageBanner: Joi.string().required(),
  imageArt: Joi.array().items(Joi.string()),
  twitter: Joi.string().required(),
  discord: Joi.string().required(),
  wallet: Joi.string().required(),
  styles: Joi.array().items(Joi.string()),
}).messages({
  "string.base": "{{#label}} should be a type of 'text'",
  "string.empty": "{{#label}} cannot be empty",
  "string.email": "{{#label}} must be a valid email",
  "any.required": "{{#label}} is a required field",
});

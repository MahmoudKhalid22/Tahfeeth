const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().when(["googleId", "facebookId"], {
    is: Joi.exist().not(null),
    then: Joi.optional(),
    otherwise: Joi.string().required(),
  }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "io"] },
    })
    .when("facebookId", {
      is: Joi.exist().not(null),
      then: Joi.optional(),
      otherwise: Joi.string().email().required(),
    }),
  facebookId: Joi.string().allow(null),
  googleId: Joi.string().allow(null),

  role: Joi.string().valid("admin", "teacher", "student").required(),
  professional: Joi.Boolean().when("role", {
    is: "teacher",
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  verified: Joi.Boolean().default(false),

  status: Joi.string()
    .valid("pending", "blocked", "verified")
    .default("pending"),
})
  .with("name", "role")
  .xor("email", "facebookId")
  .xor("password", "facebookId", "googleId");

module.exports = { userSchema };

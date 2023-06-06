const Joi = require('joi')

const userValidator = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

    username: Joi.string()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        // .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/)
        .min(3)
        .max(30)
        .required(),

    confirmPassword: Joi.any()
    .equal(Joi.ref('password'))
    .label('Confirm password')
    .options({ messages: { 'any.only': '{{#label}} does not match password'} })
    .required(),
    
})

const validateUser = async (req, res, next) => {
    const UserPayload = req.body;
    try {
        await userValidator.validateAsync(UserPayload);
        next();
    } catch (error) {
        console.log(error);
        return res.status(406).send(error.details[0].message);
    }

}

module.exports = validateUser
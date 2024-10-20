const joi = require('@hapi/joi');


const userSchem = {
    user:joi.object({
        name:joi.string().required(),
        email:joi.string().required().email(),
        address:joi.string().required(),
        mobile:joi.number().required(),
        dob:joi.date().required(),
        password:joi.string().required().min(6)

    })
}

module.exports = userSchem;
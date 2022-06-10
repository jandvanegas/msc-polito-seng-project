const {ValidationError} = require("../utils/exceptions");

function helper() {
    const fieldsValid = (req, res, next, fields) => {
        if (Object.keys(req.body).length === 0) {
            next(new ValidationError("Empty body request"))
            return false
        }
        fields.forEach((fieldPair) => {
            const field = fieldPair[0]
            const fieldType = fieldPair[1]
            if (req.body[field] === undefined) {
                next(new ValidationError(`not defined ${field}`))
                return false
            }
            if (typeof (req.body[field]) !== fieldType) {
                next(new ValidationError(`${field} needs to be ${fieldType}`))
                return false
            }
        })
        return true
    }
    const conditionsValid = (next, validations) => {
        if (!validations.every(v => v)) {
            next(new ValidationError(`Params or body validation`))
            return false
        }
        return true
    }
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    return {
        fieldsValid: fieldsValid,
        validateEmail: validateEmail,
        conditionsValid: conditionsValid,

    }
}

module.exports = helper

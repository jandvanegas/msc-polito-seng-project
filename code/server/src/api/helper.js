const {ValidationError} = require("../utils/exceptions");

function helper() {
    const validateFields = (req, res, fields, validations=[]) => {
        if (Object.keys(req.body).length === 0) {
            throw new ValidationError("Empty body request")
        }
        fields.forEach((fieldPair) => {
            const field = fieldPair[0]
            const fieldType = fieldPair[1]
            if (req.body[field] === undefined) {
                throw new ValidationError(`not defined ${field}`)
            }
            if (typeof (req.body[field]) !== fieldType) {
                throw new ValidationError(`${field} needs to be ${fieldType}`)
            }
        })
        if (!validations.every(v => v)) {
            throw new ValidationError(`Params or body validation`)

        }
    }
    return {
        validateFields: validateFields
    }
}

module.exports = helper

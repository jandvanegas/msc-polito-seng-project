function helper() {
    const validateFields = (req, res, fields) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "empty body request"});
        }
        fields.forEach((field) => {
            if (!(field in req.body)) {
                return res.status(422).json({error: `not defined ${field}`});
            }
        })
    }
    return {
        validateFields: validateFields
    }
}

module.exports = helper

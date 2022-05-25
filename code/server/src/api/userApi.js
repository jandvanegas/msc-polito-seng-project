const helper = require('./helper')
const {ResourceNotFoundError} = require("../utils/exceptions");

function userApi(userService) {
    const apiHelper = helper()

    const userTypes = ['customer', 'qualityEmployee', 'clerk', 'deliveryEmployee', 'supplier']
    const getInfo = (req, res) => {
        userService.getInfo()
            .then((value) => {
                return res.status(200).json(value);
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(err);
                return res.status(503).json({message: "Service Unavailable"});
            });
    }
    const getSuppliers = (req, res) => {
        userService.getSuppliers()
            .then((value) => {
                res.status(200).json(value);
            })
            .catch(() => {
                res.status(500).json({error: "generic error"});
            });
    }
    const getUsers = (req, res) => {
        userService.getAll()
            .then((rows) => {
                return res.status(200).json(rows);
            })
            .catch((err) => {
                console.error(err)
                return res.status(500).json({error: "generic error"});
            });
    }
    const add = (req, res) => {
        try {
            apiHelper.validateFields(req, res, [
                    ['username', 'string'],
                    ['name', 'string'],
                    ['surname', 'string'],
                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
        }

        userService.add(
            req.body.username,
            req.body.name,
            req.body.surname,
            req.body.password,
            req.body.type,
        )
            .then((id) => {
                console.log(`User ${id} created`)
                return res.status(201).end();
            })
            .catch((err) => {
                console.error(err)
                return res.status(503).json({error: "Service Unavailable"});
            });
    }
    const logInManager = (req, res) => {
        try {
            apiHelper.validateFields(req, res, [
                    ['username', 'string'],
                    ['password', 'string'],
                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
        }

        userService.logInManager(req.body.username, req.body.password)
            .then(id => {
                console.log(`User ${id} logged in.`)
                return res.status(200).end();
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(err);
                return res.status(503).json({message: "Service Unavailable"});
            });
    }

    const logInCustomer = (req, res) => {
        try {
            apiHelper.validateFields(req, res, [
                    ['username', 'string'],
                    ['password', 'string'],
                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
        }

        userService.logInCustomer(req.body.username, req.body.password)
            .then(id => {
                console.log(`User ${id} logged in.`)
                return res.status(200).end();
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(err);
                return res.status(503).json({message: "Service Unavailable"});
            });
    }

    const logInSupplier = (req, res) => {
        try {
            apiHelper.validateFields(req, res, [
                    ['username', 'string'],
                    ['password', 'string'],
                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
        }
        userService.logInSupplier(req.body.username, req.body.password)
            .then(id => {
                console.log(`User ${id} logged in.`)
                return res.status(200).end();
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(err);
                return res.status(503).json({message: "Service Unavailable"});
            });
    }

    const logInClerk = (req, res) => {
        try {
            apiHelper.validateFields(req, res, [
                    ['username', 'string'],
                    ['password', 'string'],
                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
        }
        userService.logInClerk(req.body.username, req.body.password)
            .then(id => {
                console.log(`User ${id} logged in.`)
                return res.status(200).end();
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(err);
                return res.status(503).json({message: "Service Unavailable"});
            });
    }

    const logInQualityEmployee = (req, res) => {
        try {
            apiHelper.validateFields(req, res, [
                    ['username', 'string'],
                    ['password', 'string'],
                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
        }
        userService.logInQualityEmployee(req.body.username, req.body.password)
            .then(id => {
                console.log(`User ${id} logged in.`)
                return res.status(200).end();
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(err);
                return res.status(503).json({message: "Service Unavailable"});
            });
    }

    const logInDeliveryEmployee = (req, res) => {
        try {
            apiHelper.validateFields(req, res, [
                    ['username', 'string'],
                    ['password', 'string'],
                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
        }
        userService.logInDeliveryEmployee(req.body.username, req.body.password)
            .then(id => {
                console.log(`User ${id} logged in.`)
                return res.status(200).end();
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(err);
                return res.status(503).json({message: "Service Unavailable"});
            });
    }

    const logOut = (req, res) => {
        userService.logOut()
            .then(() => {
                return res.status(200).end();
            })
            .catch((err) => {
                console.error(err)
                return res.status(503).json({error: "Generic error"});
            })
    }

    const update = (req, res) => {
        try {
            apiHelper.validateFields(req, res, [
                    ['newType', 'string'],
                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
        }
        userService.update(req.params.username, req.body.newType)
            .then(() => {
                res.status(200).end()
            })
            .catch(() => {
                res.status(503).json({error: "error during the update of user's type"})
            });
    }

    const remove = (req, res) => {
        if (req.params.username === undefined || !userTypes.includes(req.params.type)) {
            return res.status(422).json({error: "params validation error"});
        }
        userService.remove(req.params.username, req.params.type)
            .then(() => {
                res.status(204).json({message: "user deleted"});
            })
            .catch(() => {
                res.status(503).json({error: "generic error"});
            });
    }

    return {
        getInfo: getInfo,
        getSuppliers: getSuppliers,
        getUsers: getUsers,
        add: add,
        logInManager: logInManager,
        logInCustomer: logInCustomer,
        logInSupplier: logInSupplier,
        logInClerk: logInClerk,
        logInQualityEmployee: logInQualityEmployee,
        logInDeliveryEmployee: logInDeliveryEmployee,
        logOut: logOut,
        update: update,
        remove: remove,
    }
}

module.exports = userApi

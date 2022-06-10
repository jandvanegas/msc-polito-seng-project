const helper = require('./helper')

function userApi(userService) {
    const apiHelper = helper()

    const userTypes = ['customer', 'qualityEmployee', 'clerk', 'deliveryEmployee', 'supplier']
    const getInfo = (req, res, next) => {
        userService.getInfo()
            .then((value) => {
                return res.status(200).json(value);
            })
            .catch((err) => next(err));
    }
    const getSuppliers = (req, res, next) => {
        userService.getSuppliers()
            .then((value) => {
                res.status(200).json(value);
            })
            .catch((err) => next(err));
    }
    const getUsers = (req, res, next) => {
        userService.getUsers()
            .then((rows) => {
                return res.status(200).json(rows);
            })
            .catch((err) => next(err));
    }
    const add = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next,
            [['username', 'string'],
                ['name', 'string'],
                ['surname', 'string'],]
        )
        if (!fieldsValid) return;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                apiHelper.validateEmail(req.body.username)
            ]
        )
        if (!conditionsValid) return;

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
            .catch((err) => next(err));
    }
    const logInManager = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [
                ['username', 'string'],
                ['password', 'string'],
            ]
        )
        if (!fieldsValid) return;

        const conditionsValid = apiHelper.conditionsValid(next,
            [
                apiHelper.validateEmail(req.body.username)
            ]
        )
        if (!conditionsValid) return;

        userService.logInManager(req.body.username, req.body.password)
            .then(id => {
                console.log(`User ${id} logged in.`)
                return res.status(200).end();
            })
            .catch((err) => next(err));

    }

    const logInCustomer = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [['username', 'string'],
                ['password', 'string'],
            ]
        )
        if (!fieldsValid) return;

        const conditionsValid = apiHelper.conditionsValid(next,
            [
                apiHelper.validateEmail(req.body.username)
            ]
        )
        if (!conditionsValid) return;

        userService.logInCustomer(req.body.username, req.body.password)
            .then(id => {
                console.log(`User ${id} logged in.`)
                return res.status(200).end();
            })
            .catch((err) => next(err));
    }

    const logInSupplier = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [
                ['username', 'string'],
                ['password', 'string'],
            ]
        )
        if (!fieldsValid) return;

        const conditionsValid = apiHelper.conditionsValid(next,
            [
                apiHelper.validateEmail(req.body.username)
            ]
        )
        if (!conditionsValid) return;

        userService.logInSupplier(req.body.username, req.body.password)
            .then(id => {
                console.log(`User ${id} logged in.`)
                return res.status(200).end();
            })
            .catch((err) => next(err));
    }

    const logInClerk = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [
                ['username', 'string'],
                ['password', 'string'],
            ]
        )
        if (!fieldsValid) return;

        const conditionsValid = apiHelper.conditionsValid(next,
            [
                apiHelper.validateEmail(req.body.username)
            ]
        )
        if (!conditionsValid) return;

        userService.logInClerk(req.body.username, req.body.password)
            .then(id => {
                console.log(`User ${id} logged in.`)
                return res.status(200).end();
            })
            .catch((err) => next(err));
    }

    const logInQualityEmployee = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [
                ['username', 'string'],
                ['password', 'string'],
            ]
        )
        if (!fieldsValid) return;

        const conditionsValid = apiHelper.conditionsValid(next,
            [
                apiHelper.validateEmail(req.body.username)
            ]
        )
        if (!conditionsValid) return;

        userService.logInQualityEmployee(req.body.username, req.body.password)
            .then(id => {
                console.log(`User ${id} logged in.`)
                return res.status(200).end();
            })
            .catch((err) => next(err));
    }

    const logInDeliveryEmployee = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [
                ['username', 'string'],
                ['password', 'string'],
            ]
        )
        if (!fieldsValid) return;

        const conditionsValid = apiHelper.conditionsValid(next,
            [
                apiHelper.validateEmail(req.body.username)
            ]
        )
        if (!conditionsValid) return;

        userService.logInDeliveryEmployee(req.body.username, req.body.password)
            .then(id => {
                console.log(`User ${id} logged in.`)
                return res.status(200).end();
            })
            .catch((err) => next(err));
    }

    const logOut = (req, res, next) => {
        userService.logOut()
            .then(() => {
                return res.status(200).end();
            })
            .catch((err) => next(err));
    }

    const update = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [
                ['newType', 'string'],
                ['oldType', 'string'],
            ]
        )
        if (!fieldsValid) return;

        const conditionsValid = apiHelper.conditionsValid(next,
            [
                apiHelper.validateEmail(req.params.username)
            ]
        )
        if (!conditionsValid) return;

        userService.update(req.params.username, req.body.newType, req.body.oldType)
            .then(() => {
                res.status(200).end()
            })
            .catch((err) => next(err));
    }

    const remove = (req, res, next) => {
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                apiHelper.validateEmail(req.params.username),
                userTypes.includes(req.params.type)
            ]
        )
        if (!conditionsValid) return;

        userService.remove(req.params.username, req.params.type)
            .then(() => {
                res.status(204).json({message: "user deleted"});
            })
            .catch((err) => next(err));
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

const helper = require('./helper')

function userApi(usersDao) {
    const apiHelper = helper()

    const userTypes = ['customer', 'qualityEmployee', 'clerk', 'deliveryEmployee', 'supplier']
    const getInfo = (req, res) => {
        // TODO change when we know what the passport library is
        res.status(200).json({
            id: 1,
            username: 'username',
            name: 'name',
            surname: 'surname',
            type: 'type',
        });
        usersDao
            .getInfo()
            .then((value) => {
                res.status(200).json(value);
            })
            .catch(() => {
                res.status(500).json({error: "generic error"});
            });
    }
    const getSuppliers = (req, res) => {
        usersDao
            .getUsersByType("suppliers")
            .then((value) => {
                res.status(200).json(value);
            })
            .catch(() => {
                res.status(500).json({error: "generic error"});
            });
    }
    const getUsers = (req, res) => {
        usersDao
            .getAll
            .then((value) => {
                value.filter(user => user.type !== 'manager')
                res.status(200).json(value);
            })
            .catch(() => {
                res.status(500).json({error: "generic error"});
            });
    }
    const add = (req, res) => {
        const validation = apiHelper.validateFields(req, res, ['username', 'name', 'surname', 'password', 'type'])
        if (validation !== undefined) {
            return validation
        }
        if (!userTypes.includes(req.body.type)) {
            return res.status(422).json({error: "invalid type"});
        }
        usersDao.add(
            req.body.username,
            req.body.name,
            req.body.surname,
            req.body.password,
            req.body.type,
        ).then((value) => {
            return res.status(201).end();
        })
            .catch((err) => {
                console.error(err)
                return res.status(503).json({error: "Service Unavailable"});
            });
    }
    const logInManager = (req, res) => {
        const validation = apiHelper.validateFields(req, res, ['username', 'password'])
        if (validation !== undefined) {
            return validation
        }
        usersDao.getData(req.body.username, req.body.password, 'manager').then((value) => {
            if (value.length === 0) {
                return res.status(401).end();

            }
            usersDao.logIn(value[0].id).then(() => {
                return res.status(200).json(value[0]).end();
            })
            .catch((err) => {
                console.error(err)
                return res.status(503).json({error: "Service Unavailable"});
            });
        })
            .catch((err) => {
                console.error(err)
                return res.status(503).json({error: "Service Unavailable"});
            });
    }
    return {
        getInfo: getInfo,
        getSuppliers: getSuppliers,
        getUsers: getUsers,
        add: add,
        logInManager: logInManager
    }
}

module.exports = userApi

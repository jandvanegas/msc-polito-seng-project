const userDao = require("../dao/userDao");

function userService(userDao) {
    const getInfo = async () => {
        return await userDao.getInfo()
    }
    const getSuppliers = async () => {
        return await userDao.getUsersByType("supplier")
    }
    const getUsers = async () => {
        const allUsers = await userDao.getAll()
        return allUsers.filter(user => user.type !== 'manager')
    }
    const add = async (username, name, surname, password, type) => {
        return await userDao.add(
            username,
            name,
            surname,
            password,
            type,
        )
    }
    const logInManager = async (username, password) => {
        const user = await userDao.getData(username, password, 'manager')
        return await userDao.logIn(user.username)
    }
    const logInCustomer = async (username, password) => {
        const user = await userDao.getData(username, password, 'customer')
        return await userDao.logIn(user.username)
    }
    const logInSupplier = async (username, password) => {
        const user = await userDao.getData(username, password, 'supplier')
        return await userDao.logIn(user.username)
    }
    const logInClerk = async (username, password) => {
        const user = await userDao.getData(username, password, 'clerk')
        return await userDao.logIn(user.username)
    }
    const logInQualityEmployee = async (username, password) => {
        const user = await userDao.getData(username, password, 'qualityEmployee')
        return await userDao.logIn(user.username)
    }
    const logInDeliveryEmployee = async (username, password) => {
        const user = await userDao.getData(username, password, 'deliveryEmployee')
        return await userDao.logIn(user.username)
    }
    const logOut = async () => {
        return await userDao.logOut()
    }
    const update = async (
        username,
        newType,
    ) => {
        await userDao.getUserByUsername(req.params.username)
        return  await userDao.update(username, newType)
    }
    const remove = async (username, type) => {
        return await userDao.remove(username, type)
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

module.exports = userService

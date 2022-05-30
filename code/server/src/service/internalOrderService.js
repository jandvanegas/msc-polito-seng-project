function internalOrderService(internalOrderDao) {
    const getAll = async () => {
        return await internalOrderDao.getAll()
    };
    const getById = async (id) => {
        return await internalOrderDao.getById(id)
    };
    const getAcceptedOrders = async () => {
        return await internalOrderDao.getAcceptedOrders()
    };
    const getIssuedOrders = async () => {
        return await internalOrderDao.getIssuedOrders()
    };

    const update = async (id, newState, products) => {
        await internalOrderDao.getById(id)
        if (newState === "COMPLETED") {
            return await internalOrderDao.updateStateAndProducts(id,
                newState,
                JSON.stringify(products))
        } else if (newState === "ACCEPTED") {
            return await internalOrderDao.updateState(id, newState)
        }
    }

    const add = async (issueDate, products, customerId) => {
        return await internalOrderDao.add(
            issueDate,
            products,
            customerId
        )
    }
    const remove = async (id) => {
        return await internalOrderDao.remove(id)
    };
    return {
        getAll: getAll,
        getById: getById,
        getAcceptedOrders: getAcceptedOrders,
        getIssuedOrders: getIssuedOrders,
        update: update,
        add: add,
        remove: remove
    }
}

module.exports = internalOrderService

function returnOrderService(returnOrdersDao, restockOrderDao) {
    const getAll = async () => {
        const returnOrders = await returnOrdersDao.getAll()
        return returnOrders.map(returnOrder => {
            returnOrder.products = JSON.parse(returnOrder.products)
            return returnOrder
        })
    }
    const add = async (
        returnDate,
        products,
        restockOrderId) => {
        await restockOrderDao.getById(restockOrderId)
        return await returnOrdersDao.add(
            returnDate,
            products,
            restockOrderId,
        )
    }
    const getById = async (id) => {
        const returnOrder = await returnOrdersDao.getById(id)
        returnOrder.products = JSON.parse(returnOrder.products)
        return returnOrder

    }
    const remove = async (id) => {
        return await returnOrdersDao.remove(id)
    }
    return {
        getAll: getAll,
        add: add,
        getById: getById,
        remove: remove,
    }
}

module.exports = returnOrderService

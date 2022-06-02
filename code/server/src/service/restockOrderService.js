const {ValidationError} = require("../utils/exceptions");

function restockOrderService(restockOrderDao) {
    const getAll = async () => {
        return await restockOrderDao.getAll()
    }
    const getIssued = async () => {
        return await restockOrderDao.getIssuedOrder()
    }
    const getById = async (id) => {
        return await restockOrderDao.getById(id)
    }
    const addTransportNoteById = async (id, transportNote, deliveryDate) => {
        const order = await restockOrderDao.getById(id)
        // todo compare date
        return await restockOrderDao.addTransportNote(id, transportNote)
    }
    const getItems = async (
        id,
    ) => {
        const order = await restockOrderDao.getById(id);
        if (order.state !== "COMPLETEDRETURN") {
            throw new ValidationError('Wrong order state')
        }
        return await restockOrderDao.getItemsOfOrder(id)
    }
    const add = async (
        issueDate,
        products,
        supplierId,
    ) => {
        return await restockOrderDao.add(
            issueDate,
            products,
            supplierId
        );
    }
    const update = async (
        id,
        newState,
    ) => {
        return await restockOrderDao.updateState(id, newState)
    }
    const addItems = async (
        id,
        skuItems,
    ) => {
        const order = await restockOrderDao.getById(id)
        if (order.state !== "DELIVERED") {
            throw new ValidationError('Wrong order state')
        }
        let items = skuItems
        if (order.skuItems.length !== 0) {
            items = items.concat(JSON.parse(order.skuItems));
        }
        return await restockOrderDao.addItems(id, items)
    }
    return {
        getAll: getAll,
        getIssued: getIssued,
        getById: getById,
        getItems: getItems,
        add: add,
        update: update,
        addItems: addItems,
        addTransportNoteById: addTransportNoteById,
    }
}

module.exports = restockOrderService

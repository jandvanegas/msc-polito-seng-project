const {ValidationError} = require("../utils/exceptions");

const dayjs = require('dayjs')

function restockOrderService(restockOrderDao) {
    const getAll = async () => {
        const orders = await restockOrderDao.getAll()
        return orders.map(order => {
            const {transportNote, skuItems, ...orderCopy} = order
            return { ...orderCopy,
                transportNote: order.state !== 'ISSUED' ? transportNote : undefined,
                skuItems: ['ISSUED', 'DELIVERED'].includes(order.state) ? skuItems : undefined
            }
        })
    }
    const getIssued = async () => {
        return await restockOrderDao.getIssuedOrder()
    }
    const getById = async (id) => {
        return await restockOrderDao.getById(id)
    }
    const addTransportNoteById = async (id, transportNote, deliveryDate) => {
        const order = await restockOrderDao.getById(id)
        const dayjsIssueDate = dayjs(order.issueDate)
        const dayjsDeliveryDate = dayjs(deliveryDate)
        if (dayjsDeliveryDate.diff(dayjsIssueDate) < 0) {
            throw new ValidationError('Delivery Date before issue date')
        }
        if (order.state !== 'DELIVERY') {
            throw new ValidationError('State different than DELIVERY')

        }
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
        await restockOrderDao.getById(id)
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

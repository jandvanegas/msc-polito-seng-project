function itemService(itemDao, skuDao) {
    const getAll = async () => {
        return await itemDao.getAll()
    }
    const add = async (
        id,
        description,
        price,
        SKUId,
        supplierId,
    ) => {
        await skuDao.getById(SKUId)
        return await itemDao.add(
            id,
            description,
            price,
            SKUId,
            supplierId,)
    }
    const getById = async (id) => {
        return await itemDao.getById(id)
    }

    const remove = async (id) => {
        return await itemDao.remove(id)
    }
    const update = async (
        id,
        newDescription,
        newPrice
    ) => {
        await itemDao.getById(id)
        return await itemDao.update(
            id,
            newDescription,
            newPrice
        )
    }
    const getByIdAndSupplierId = async (id, supplierId) => {
        return await itemDao.getByIdAndSupplierId(id, supplierId)
    }
    const updateByIdAndSupplierId = async (id, supplierId, newDescription, newPrice) => {
        await itemDao.getByIdAndSupplierId(id, supplierId)  
        return await itemDao.updateByIdAndSupplierId(id, supplierId, newDescription, newPrice)
    }
    const deleteByIdAndSupplierId = async (id, supplierId) => {
        await itemDao.getByIdAndSupplierId(id, supplierId)  
        return await itemDao.deleteByIdAndSupplierId(id, supplierId)
    }
    return {
        getAll: getAll,
        add: add,
        getById: getById,
        remove: remove,
        update: update,
        getByIdAndSupplierId: getByIdAndSupplierId,
        updateByIdAndSupplierId: updateByIdAndSupplierId,
        deleteByIdAndSupplierId: deleteByIdAndSupplierId
    }

}

module.exports = itemService

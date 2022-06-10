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
    return {
        getAll: getAll,
        add: add,
        getById: getById,
        remove: remove,
        update: update,
    }

}

module.exports = itemService

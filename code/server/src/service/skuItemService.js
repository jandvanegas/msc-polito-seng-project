function skuItemService(skuItemsDao, skuDao) {
    const getAll = async () => {
        return await skuItemsDao.getAll()
    }
    const getBySkuId = async (skuId) => {
        return await skuItemsDao.getBySkuId(skuId)
    }
    const getByRfid = async (rfid) => {
        await skuItemsDao.getByRfid(rfid)
    }
    const add = async (RFID, skuId, dateOfStock) => {
        await skuDao.getById(skuId)
        return await skuItemsDao.add(RFID, skuId, dateOfStock)
    }

    const update = async (
        rfid,
        newAvailable,
        newDateOfStock,
        newRFID
    ) => {
        const skuItem = await skuItemsDao.getByRfid(rfid)
        return await skuItemsDao.update(
            rfid,
            skuItem.Available,
            newAvailable,
            newDateOfStock,
            newRFID
        )
    }
    const remove = async (rfid) => {
         return await skuItemsDao.remove(rfid)
    }
    return {
        getAll: getAll,
        getBySkuId: getBySkuId,
        getByRfid: getByRfid,
        add: add,
        update: update,
        remove: remove,

    }
}

module.exports = skuItemService;

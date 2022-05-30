function testDescriptorService(testDescriptorDao, skuDao) {
    const getAll = async () => {
        return await testDescriptorDao.getAll()
    }
    const add = async (
        name,
        procedureDescription,
        idSKU,
    ) => {
        await skuDao.getById(idSKU)
        return await testDescriptorDao.add(
            name,
            procedureDescription,
            idSKU,
        )
    }
    const getById = async (id) => {
        return await testDescriptorDao.getById(id)
    }
    const update = async (
        id,
        newName,
        newProcedureDescription,
        newIdSKU
    ) => {

        const row = await testDescriptorDao.getById(id)
        if (newIdSKU !== undefined) {
            await skuDao.getById(newIdSKU)
        }
        return await testDescriptorDao.update(
            id,
            newName ? newName : row.name,
            newProcedureDescription ? newProcedureDescription : row.procedureDescription,
            newIdSKU ? newIdSKU : row.idSKU,
        )
    }
    const remove = async (id) => {
        return await testDescriptorDao.remove(id)
    }

    return {
        getAll: getAll,
        add: add,
        getById: getById,
        update: update,
        remove: remove,
    }

}

module.exports = testDescriptorService

function testResultService(testResultDao, skuItemDao, testDescriptorDao) {
    const getAll = async () => {
        return await testResultDao.getAll()
    }
    const add = async (
        rfid,
        idTestDescriptor,
        Date,
        Result
    ) => {
        await skuItemDao.getByRfid(rfid)
        await testDescriptorDao.getById(idTestDescriptor)
        return await testResultDao.add(
            rfid,
            idTestDescriptor,
            Date,
            Result,
        )
    }
    const getByRfid = async (rfid) => {
        return await testResultDao.getByRfid(rfid)
    }
    const getByRfidAndId = async (rfid, id) => {
        return await testResultDao.getByRfidAndId(rfid, id)
    }

    const update = async (rfid, id, newIdTestDescriptor, newDate, newResult) => {
        const old = await testResultDao.getByRfidAndId(rfid, id)
        if(newIdTestDescriptor !== undefined) {
            await testDescriptorDao.getById(newIdTestDescriptor)
        }
        return await testResultDao.update(
            rfid,
            id,
            newIdTestDescriptor ? newIdTestDescriptor : old.idTestDescriptor,
            newDate ? newDate : old.Date,
            newResult ? newResult : old.Result,
        )
    }
    const remove = async (rfid, id) => {
        return await testResultDao.remove(rfid, id)
    }
    return {
        getAll: getAll,
        add: add,
        getByRfid: getByRfid,
        getByRfidAndId: getByRfidAndId,
        update: update,
        remove: remove,
    }
}

module.exports = testResultService

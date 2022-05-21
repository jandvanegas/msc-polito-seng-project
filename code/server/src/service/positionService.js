function positionService(positionDao) {
    const getAll = async () => {
        return await positionDao.getAll();
    };
    const add = async (
        positionID,
        aisleID,
        row,
        col,
        maxWeight,
        maxVolume
    ) => {
        return await positionDao
            .add(
                positionID,
                aisleID,
                row,
                col,
                maxWeight,
                maxVolume
            )
    }
    const updateFull = async (
        positionId,
        newAisleID,
        newRow,
        newCol,
        newMaxWeight,
        newMaxVolume,
        newOccupiedWeight,
        newOccupiedVolume,
    ) => {
        const position = await positionDao.getById(positionID)
        return await positionDao.updateFull(
            newAisleID,
            newRow,
            newCol,
            newMaxWeight,
            newMaxVolume,
            position.occupiedWeight,
            newOccupiedWeight,
            position.occupiedVolume,
            newOccupiedVolume,
            positionID
        )
    }
    const update = async (
        positionID,
        newPositionID
    ) => {
        return await positionDao.updateId(
            Number(positionID),
            Number(newPositionID))
    }

    const remove = async (positionID) => {
        await positionDao.getById(positionID)
        await positionDao.remove(positionID)
    }
    return {
        getAll: getAll,
        add: add,
        updateFull: updateFull,
        update: update,
        remove: remove,
    }
}

module.exports = positionService;

const {baseDao} = require('./dao')

function positionDao(db) {
    const baseDaoInstance = baseDao(db, "positions", "position")
    const remove = baseDaoInstance.remove
    const getById = baseDaoInstance.getById
    const getAll = baseDaoInstance.getAll

    const update = (position, newWeight, newVolume, oldWeight, oldVolume) => {
        const sql = "UPDATE positions SET occupiedWeight=occupiedWeight-?+?, occupiedVolume=occupiedVolume-?+? WHERE position=? ";
        const list = [oldWeight, newWeight, oldVolume, newVolume, position];
        return new Promise((resolve, reject) => {
            db.run(sql, list, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(1);
                }
            });
        });
    }

    const add = (positionID, aisleID, row, col, maxWeight, maxVolume) => {
        const sql =
            "INSERT INTO positions(position, aisleID, row, col, maxWeight, maxVolume, occupiedWeight, occupiedVolume) VALUES (?,?,?,?,?,?,?,?)";
        const list = [positionID, aisleID, row, col, maxWeight, maxVolume, 0, 0];
        return new Promise((resolve, reject) => {
            db.run(sql, list, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(1);
                }
            });
        });
    }
    const updateFull = (
        newAisleID,
        newRow,
        newCol,
        newMaxWeight,
        newMaxVolume,
        newOccupiedWeight,
        oldOccupiedWeight,
        newOccupiedVolume,
        oldOccupiedVolume,
        positionID
    ) => {
        const sql =
            "UPDATE positions SET aisleID=?, row=?, col=?, maxWeight=?, maxVolume=?, occupiedWeight=occupiedWeight-?+?, occupiedVolume=occupiedVolume-?+? WHERE position=?";
        const list = [
            newAisleID,
            newRow,
            newCol,
            newMaxWeight,
            newMaxVolume,
            oldOccupiedWeight,
            newOccupiedWeight,
            oldOccupiedVolume,
            newOccupiedVolume,
            positionID,
        ];
        return new Promise((resolve, reject) => {
            db.run(sql, list, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(1)
                }
            })
        })
    }
    const updateId = (oldID, newID) => {
        const sql = "UPDATE positions SET position=? WHERE position=?"
        const list = [newID, oldID]
        return new Promise((resolve, reject) => {
            db.run(sql, list, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(1)
                }
            })
        })
    }
    return {
        remove: remove,
        add: add,
        update: update,
        getById: getById,
        updateFull: updateFull,
        updateId: updateId,
        getAll: getAll
    }

}

module.exports = positionDao

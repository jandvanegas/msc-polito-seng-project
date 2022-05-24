const {baseDao} = require('./dao')
const {ResourceNotFoundError} = require("../utils/exceptions");

function positionDao(db) {
    const baseDaoInstance = baseDao(db, "positions", "position")
    const remove = baseDaoInstance.remove
    const getById = baseDaoInstance.getById
    const getAll = baseDaoInstance.getAll

    const update = (position, newWeight, newVolume, oldWeight, oldVolume) => {
        const sql = "UPDATE positions SET occupiedWeight=occupiedWeight-?+?, occupiedVolume=occupiedVolume-?+? WHERE position=? ";
        const list = [oldWeight, newWeight, oldVolume, newVolume, position];
        return new Promise((resolve, reject) => {
            db.run(sql, list, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    const add = (positionID, aisleID, row, col, maxWeight, maxVolume) => {
        const sql =
            "INSERT INTO positions(position, aisleID, row, col, maxWeight, maxVolume, occupiedWeight, occupiedVolume) VALUES (?,?,?,?,?,?,?,?)";
        const list = [positionID, aisleID, row, col, maxWeight, maxVolume, 0, 0];
        return new Promise((resolve, reject) => {
            db.run(sql, list, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
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
            db.run(sql, list, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        })
    }
    const updateId = (oldID, newID) => {
        const sql = "UPDATE positions SET position=? WHERE position=?"
        const list = [newID, oldID]
        return new Promise((resolve, reject) => {
            db.run(sql, list, function(err) {
                if (err) {
                    reject(err)
                } else {
                    if(this.changes === 0){
                        reject(new ResourceNotFoundError("Position not found"))
                    }
                    resolve(this.lastID)
                }
            })
        })
    }
    const deletePositionData = () => {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM positions';
            db.run(sql, [], function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(true);
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
        getAll: getAll,
        deletePositionData: deletePositionData,
    }

}

module.exports = positionDao

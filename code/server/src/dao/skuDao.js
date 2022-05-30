const {baseDao} = require("./dao");

function skuDao(db) {
    const baseDaoInstance = baseDao(db, "skus", "id")
    const remove = baseDaoInstance.remove
    const getById = baseDaoInstance.getById
    const getAll = baseDaoInstance.getAll

    const add = (description, weight, volume, notes, price, availableQuantity) => {
        return new Promise((resolve, reject) => {
            const sql =
                "INSERT INTO skus (description,weight,volume,notes,price,availableQuantity,testDescriptors) VALUES (?,?,?,?,?,?,'[]');";
            const newSku = [
                description,
                weight,
                volume,
                notes,
                price,
                availableQuantity,
            ];
            db.run(sql, newSku, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }
    const updateSku = (
        id,
        newDescription,
        newWeight,
        newVolume,
        newNotes,
        newPrice,
        newAvailableQuantity
    ) => {
        const sql =
            "UPDATE skus SET description=?, weight=?, volume=?, notes=?, price=?, availableQuantity=? WHERE id=? ";
        const list = [
            newDescription,
            newWeight,
            newVolume,
            newNotes,
            newPrice,
            newAvailableQuantity,
            id,
        ];
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
    const updatePosition = (id, newPosition) => {
        const sql = "UPDATE skus SET position=? WHERE id=?";
        const list = [newPosition, id];
        return new Promise((resolve, reject) => {
            db.run(sql, list, (err) => {
                if (err) {
                    return reject(err);
                } else {
                    resolve(1);
                }
            });
        });
    }
    const deleteSkuData = () => {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM skus';
            db.run(sql, [], function (err) {
              if (err) {
                reject(err);
                return;
              }
              resolve(true);
            })
          })
    }
    const resetIndex = () => {
        return new Promise((resolve, reject) => {
            const sql = "delete from sqlite_sequence where name='skus'";
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
        getAll: getAll,
        getById: getById, 
        add: add, 
        updateSku: updateSku, 
        updatePosition: updatePosition, 
        remove: remove, 
        deleteSkuData: deleteSkuData,
        resetIndex:resetIndex
    }
}

module.exports = skuDao

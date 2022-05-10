function skuDao(db) {
    const getAll = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM skus";
            db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    const getById = (id) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM skus WHERE id=?";
            db.all(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row[0]);
                }
            });
        });
    }
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
            db.run(sql, newSku, (err) => {
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
    const remove = (id) => {
        const sql = "DELETE FROM skus WHERE id=?";
        const list = [id];
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
    return {
        getAll: getAll,
        getById: getById,
        add: add,
        updateSku: updateSku,
        updatePosition: updatePosition,
        remove: remove,
    }
}

module.exports = skuDao

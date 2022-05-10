function skuItemDao(db) {
    const getAll = () => {
        const sql = "SELECT * FROM skuItems";
        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    const getBySkuId = (skuId) => {
        const sql = "SELECT RFID, SKUId, DateOfStock FROM skuItems WHERE SKUId=?";
        return new Promise((resolve, reject) => {
            db.all(sql, [skuId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    if (rows.lenght === 0) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                }
            });
        });
    }
    const getByRfid = (rfid) => {
        const sql = "SELECT * FROM skuItems WHERE rfid=?";
        const list = [rfid];
        return new Promise((resolve, reject) => {
            db.all(sql, list, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }
    const add = (rfid, skuId, dateOfStock) => {
        const sql =
            "INSERT INTO skuItems (RFID, SKUId, Available, DateOfStock) VALUES (?, ?, 0, ?);";
        const list = [rfid, skuId, dateOfStock];
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
    const update = (
        rfid,
        oldAvailableQuantity,
        newAvailableQuantity,
        newDateOfStock,
        newRFID
    ) => {
        const sql =
            "UPDATE skuItems SET RFID=?, Available=Available-?+?, DateOfStock=? WHERE RFID=?";
        const list = [
            newRFID,
            oldAvailableQuantity,
            newAvailableQuantity,
            newDateOfStock,
            rfid,
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
    const remove = (rfid) => {
        const sql = "DELETE FROM skuItems WHERE rfid=?";
        const list = [rfid];
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
        getBySkuId: getBySkuId,
        getByRfid: getByRfid,
        add: add,
        update: update,
        remove: remove,
    }
}

module.exports = skuItemDao

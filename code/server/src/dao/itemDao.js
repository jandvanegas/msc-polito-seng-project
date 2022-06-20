const {baseDao} = require("./dao");
const {ResourceNotFoundError} = require("../utils/exceptions");

function itemDao(db) {
    const baseDaoInstance = baseDao(db, "item", "id");
    const remove = baseDaoInstance.remove;
    const getById = baseDaoInstance.getById;
    const getAll = baseDaoInstance.getAll;

    const add = (id, description, price, SKUId, supplierId) => {
        console.log(id, description, price, SKUId, supplierId)
        return new Promise((resolve, reject) => {
            const sql =
                "INSERT INTO item (id,description,price,SKUID,supplierId) VALUES (?,?,?,?,?);";
            const newItem = [id, description, price, SKUId, supplierId];
            db.run(sql, newItem, (err) => {
                if (err) {
                    console.log(err)
                    reject(err);
                } else {

                    resolve(this.lastID);
                }
            });
        });
    };
    const update = (id, newDescription, newPrice) => {
        const sql = "UPDATE item SET description=?, price=? WHERE id=? ";
        const list = [newDescription, newPrice, id];
        return new Promise((resolve, reject) => {
            db.run(sql, list, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    };

    const getItemByIdSkuIdAndSupplierId = (id, SKUid, supplierId) => {
        const sql = `SELECT *
                     FROM item
                     WHERE id = ?
                       and SKUId = ?
                       and supplierId = ?`;
        const list = [id, SKUid, supplierId];
        return new Promise((resolve, reject) => {
            db.all(sql, list, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    if (rows.length > 0) {
                        resolve(rows[0])
                    }
                    reject(new ResourceNotFoundError(`Item`))
                }
            });
        });
    }
    const getByIdAndSupplierId = (id, supplierId) => {
        const sql = "SELECT * FROM item WHERE id=? and supplierId=?";
        const list = [id, supplierId];
        return new Promise((resolve, reject) => {
            db.all(sql, list, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    if (rows.length > 0) {
                        resolve(rows[0])
                    }
                    reject(new ResourceNotFoundError(`item`))
                }
            });
        });
    };

    const updateByIdAndSupplierId = (id, supplierId, newDescription, newPrice) => {
        const sql = "UPDATE item SET description=?, price=? WHERE id=? and supplierId=?"
        const list = [newDescription, newPrice, id, supplierId]
        return new Promise((resolve, reject) => {
            db.run(sql, list, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID)
                }
            });
        });
    }

    const deleteByIdAndSupplierId = (id, supplierId) => {
        const sql = "DELETE FROM item WHERE id=? and supplierId=?"
        const list = [id, supplierId]
        return new Promise((resolve, reject) => {
            db.run(sql, list, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }


    return {
        getAll: getAll,
        getById: getById,
        add: add,
        update: update,
        remove: remove,
        getByIdAndSupplierId: getByIdAndSupplierId,
        updateByIdAndSupplierId: updateByIdAndSupplierId,
        deleteByIdAndSupplierId: deleteByIdAndSupplierId,
        getItemByIdSkuIdAndSupplierId: getItemByIdSkuIdAndSupplierId,
    };
}

module.exports = itemDao;

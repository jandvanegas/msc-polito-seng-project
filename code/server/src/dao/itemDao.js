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
            db.run(sql, list, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(1);
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
    return {
        getAll: getAll,
        getById: getById,
        add: add,
        update: update,
        remove: remove,
        getItemByIdSkuIdAndSupplierId: getItemByIdSkuIdAndSupplierId,
    };
}

module.exports = itemDao;

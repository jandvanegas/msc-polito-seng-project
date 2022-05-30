const {baseDao} = require("./dao");

function returnOrdersDao(db) {
    const baseDaoInstance = baseDao(db, "returnOrders", "id")
    const remove = baseDaoInstance.remove
    const getById = baseDaoInstance.getById
    const getAll = baseDaoInstance.getAll

    const add = (returnDate, products, restockOrderId) => {
        return new Promise((resolve, reject) => {
            const sql =
                "INSERT INTO returnOrders (returnDate, products, restockOrderId) VALUES (?,?,?);";
            const newReturnOrders = [
                returnDate,
                JSON.stringify(products),
                restockOrderId,
            ];
            db.run(sql, newReturnOrders, function (err) {
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
        remove: remove,
    }
}

module.exports = returnOrdersDao

const {baseDao} = require("./dao");
const {ResourceNotFoundError} = require("../utils/exceptions");

function restockOrderDao(db) {
    const baseDaoInstance = baseDao(db, "restockOrders", "id")
    const getAll = baseDaoInstance.getAll    // Return an array containing all restock orders.

    const getById = (id) => {
        const sql = "SELECT * FROM restockOrders WHERE id = ?";
        const list = [id];
        return new Promise((resolve, reject) => {
            db.all(sql, list, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    if (rows.length > 0) {
                        const x = rows.map((e) => (
                            {
                                id: e.id,
                                issueDate: e.issueDate,
                                state: e.state,
                                products: JSON.parse(JSON.stringify(e.products)),
                                supplierId: e.supplierId,
                                transportNote: e.transportNote,
                                skuItems: JSON.parse(JSON.stringify(e.skuItems))
                            }
                        ))
                        resolve(x[0])
                    }
                    reject(new ResourceNotFoundError('Resource not found'))
                }
            })
        })
    }

    const getIssuedOrder = () => {
        // Returns an array of all restock orders in state = ISSUED.
        const sql = "SELECT * FROM restockOrders WHERE state = 'ISSUED' ";
        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const x = rows.map((e) => (
                        {
                            id: e.id,
                            issueDate: e.issueDate,
                            state: e.state,
                            products: JSON.parse(JSON.stringify(e.products)),
                            supplierId: e.supplierId,
                            transportNote: e.transportNote,
                            skuItems: JSON.parse(JSON.stringify(e.skuItems))
                        }
                    ))
                    resolve(x)
                }
            });
        });
    }

    const getItemsOfOrder = (id) => {
        // Return sku items to be returned of a restock order, given its id.
        const sql = "SELECT skuItems FROM restockOrders WHERE id = ?"
        return new Promise((resolve, reject) => {
            db.all(sql, [id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const x = rows.map((e) => (
                        {
                            skuItems: JSON.parse(JSON.stringify(e.skuItems))
                        }
                    ))
                    resolve(x)
                }
            })
        });
    }

    const add = (issueDate, products, supplierId) => {
        // Creates a new restock order in state = ISSUED with an empty list of skuItems.
        return new Promise((resolve, reject) => {
            const sql =
                "INSERT INTO restockOrders (issueDate, state, products, supplierId, transportNote, skuItems) VALUES (?,?,?,?,?,?);";
            const newRO = [issueDate, "ISSUED", JSON.stringify(products), supplierId, "", []];
            db.run(sql, newRO, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    const updateState = (id, state) => {
        // Modify the state of a restock order, given its id.
        const sql = "UPDATE restockOrders SET state = ? WHERE id = ?";
        return new Promise(function (resolve, reject) {
            db.run(sql, [state, id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    const addItems = (id, items) => {
        // Add a non empty list of skuItems to a restock order, given its id.
        const sql = "UPDATE restockOrders SET skuItems = ? WHERE id = ?;";
        return new Promise((resolve, reject) => {
            // TODO check on length of skuItems list is missing
            db.run(sql, [JSON.stringify(items), id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    const addTransportNote = (id, note) => {
        // Add a transport note to a restock order, given its id.
        const sql = "UPDATE restockOrders SET transportNote = ? WHERE id = ?;";
        return new Promise((resolve, reject) => {
            db.run(sql, [note, id], (err) => {
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
        getIssuedOrder: getIssuedOrder,
        getItemsOfOrder: getItemsOfOrder,
        add: add,
        updateState: updateState,
        addItems: addItems,
        addTransportNote: addTransportNote,
    }
}

module.exports = restockOrderDao

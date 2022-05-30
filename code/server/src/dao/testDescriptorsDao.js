const {baseDao} = require("./dao");

function testDescriptorsDao(db) {
    const baseDaoInstance = baseDao(db, "testDescriptors", "id")
    const getAll = baseDaoInstance.getAll
    const getById = baseDaoInstance.getById
    const remove = baseDaoInstance.remove

    const add = (name, procedureDescription, idSKU) => {
        return new Promise((resolve, reject) => {
            const sql =
                "INSERT INTO testDescriptors (name, procedureDescription, idSKU) VALUES (?,?,?);";
            const newSku = [
                name,
                procedureDescription,
                idSKU
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

    const update = (
        id,
        newName,
        newProcedureDescription,
        newIdSKU,
    ) => {
        const sql =
            "UPDATE testDescriptors SET name=?, procedureDescription=?, idSKU=? WHERE id=? ";
        const list = [
            newName,
            newProcedureDescription,
            newIdSKU,
            id,
        ];
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
        remove: remove
    }
}

module.exports = testDescriptorsDao

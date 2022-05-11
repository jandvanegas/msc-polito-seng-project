const {baseDao} = require("./dao");

function testDescriptorsDao(db) {
    const baseDaoInstance = baseDao(db, "testDescriptors", "id")
    const getAll = baseDaoInstance.getAll
    const getById = baseDaoInstance.getById

    const add = (name, procedureDescription, idSKU) => {
        return new Promise((resolve, reject) => {
            const sql =
                "INSERT INTO testDescriptors (name, procedureDescription, idSKU) VALUES (?,?,?);";
            const newSku = [
                name,
                procedureDescription,
                idSKU
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
    return {
        getAll: getAll,
        getById: getById,
        add: add
    }
}

module.exports = testDescriptorsDao

const {baseDao} = require("./dao");

function testResultDao(db) {
    const baseDaoInstance = baseDao(db, "testResults", "id")
    const getAll = baseDaoInstance.getAll
    const getById = baseDaoInstance.getById

    const getByRfid = (rfid) => {
        const sql = `SELECT * FROM testResults WHERE rfid=?`;
        const list = [rfid];
        return new Promise((resolve, reject) => {
            db.all(sql, list, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    const getByRfidAndId = (rfid, id) => {
        const sql = `SELECT * FROM testResults WHERE rfid=? and id=?`;
        const list = [rfid, id];
        return new Promise((resolve, reject) => {
            db.all(sql, list, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    const add = (rfid, idTestDescriptor, Date, Result) => {
        return new Promise((resolve, reject) => {
            const sql =
                "INSERT INTO testResults (rfid, idTestDescriptor, Date, Result) VALUES (?,?,?,?);";
            const newSku = [
                rfid,
                idTestDescriptor,
                Date,
                Result
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
    const update = (
        rfid,
        id,
        newIdTestDescriptor,
        newDate,
        newResult,
    ) => {
        const sql =
            "UPDATE testResults SET idTestDescriptor=?, Date=?, Result=? WHERE rfid=? and id=?";
        const list = [
            newIdTestDescriptor,
            newDate,
            newResult,
            rfid,
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
    const remove = (rfid, id) => {
        const sql = `DELETE FROM testResults WHERE rfid=? and id=?`;
        const list = [rfid, id];
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
        getByRfid: getByRfid,
        getByRfidAndId: getByRfidAndId,
        add: add,
        update: update,
        remove: remove
    }
}

module.exports = testResultDao

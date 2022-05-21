const {ResourceNotFoundError} = require("../utils/exceptions");

function migrationDao(db) {
    const dropTable = (name) => {
        return new Promise((resolve, reject) => {
            const sql = "DROP TABLE IF EXISTS `name`";
            this.db.run(sql, [], (err) => {
                if (err) {
                    reject(err);
                } else {
                    return;
                }
                resolve(this.lastID);
            });
        });
    }

    const run = (sql) => {
        return new Promise((resolve, reject) => {
            db.run(sql, (err) => {
                if (err) {
                    reject(err);
                } else {
                    return;
                }
                resolve(this.lastID);
            });
        });
    }
    return {
        run: run,
        dropTable: dropTable
    }
}

function baseDao(db, table, idName) {
    const getAll = () => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ${table} `;
            db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    const remove = (id) => {
        const sql = `DELETE FROM ${table} WHERE ${idName}=?`;
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
    const getById = (id) => {
        const sql = `SELECT * FROM ${table} WHERE ${idName}=?`;
        const list = [id];
        return new Promise((resolve, reject) => {
            db.all(sql, list, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    if (rows.length > 0) {
                        resolve(rows[0])
                    }
                    reject(new ResourceNotFoundError('Resource not found'))
                }
            });
        });
    }

    return {
        remove: remove,
        getAll: getAll,
        getById: getById
    }
}

module.exports = {baseDao, migrationDao};

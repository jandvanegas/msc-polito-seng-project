const {baseDao} = require("./dao");

function userDao(db) {
    const baseDaoInstance = baseDao(db, "users", "id")
    const getAll = baseDaoInstance.getAll
    const getById = baseDaoInstance.getById

    const getUsersByType = (type) => {
        const sql = `SELECT * FROM users WHERE type=?`;
        const list = [type];
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
    const getInfo = (id) => {
        const sql = `SELECT * FROM users WHERE id=?`;
        const list = [id];
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
    const add = (username, name, surname, password, type) => {
        return new Promise((resolve, reject) => {
            const sql =
                "INSERT INTO users (username, name, surname, password, type) VALUES (?,?,?,?,?);";
            const newSku = [
                username,
                name,
                surname,
                password,
                type
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
    const getData = (username, password, type) => {
        return new Promise((resolve, reject) => {
            const sql =
                "SELECT FROM users (id, username, name) WHERE username=? and name=? and type=?;";
            const users = [
                username,
                name,
                type
            ];
            db.all(sql, users, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    const logIn = (
        id,
    ) => {
        const sql =
            "UPDATE users SET loggedIn=1 where id=?";
        const list = [id,];
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
        getInfo: getInfo,
        getUsersByType: getUsersByType,
        getAll: getAll,
        add: add,
        getData: getData,
        logIn: logIn,
    }
}

module.exports = userDao

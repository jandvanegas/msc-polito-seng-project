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

module.exports = migrationDao;

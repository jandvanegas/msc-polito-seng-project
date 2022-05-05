class DAD {
  sqlite = require("sqlite3");

  constructor(dbname) {
    this.db = new this.sqlite.Database(dbname, (err) => {
      if (err) throw err;
    });
  }

  async dropTable(name) {
    return new Promise((resolve, reject) => {
      const sql = "DROP TABLE IF EXISTS `name`";
      this.db.run(sql, [name], (err) => {
        if (err) {
          reject(err);
        } else {
          return;
        }
        resolve(this.lastID);
      });
    });
  }

  async newTable(sql) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, (err) => {
        if (err) {
          reject(err);
        } else {
          return;
        }
        resolve(this.lastID);
      });
    });
  }

  //api 1
  async returnSkus() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM skus";
      this.db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  //api 2
  async returnSku(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM skus WHERE id=?";
      this.db.all(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row[0]);
        }
      });
    });
  }

  //api 3
  async addSku(description, weight, volume, notes, price, availableQuantity) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO skus (description,weight,volume,notes,price,availableQuantity,testDescriptors) VALUES (?,?,?,?,?,?,'[]');";
      const newSku = [
        description,
        weight,
        volume,
        notes,
        price,
        availableQuantity,
      ];
      this.db.run(sql, newSku, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  //api 4

  async updateSku(
    id,
    newDescription,
    newWeight,
    newVolume,
    newNotes,
    newPrice,
    newAvailableQuantity
  ) {
    const sql =
      "UPDATE skus SET description=?, weight=?, volume=?, notes=?, price=?, availableQuantity=? WHERE id=? ";
    const list = [
      newDescription,
      newWeight,
      newVolume,
      newNotes,
      newPrice,
      newAvailableQuantity,
      id,
    ];
    return new Promise((resolve, reject) => {
      this.db.run(sql, list, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(1);
        }
      });
    });
  }

  async updatePosition(position, newWeight, newVolume, oldWeight, oldVolume) {
    //increase both

    const sql =
      "UPDATE positions SET occupiedWeight=occupiedWeight-?+?, occupiedVolume=occupiedVolume-?+? WHERE position=? ";
    const list = [oldWeight, newWeight, oldVolume, newVolume, position];
    return new Promise((resolve, reject) => {
      this.db.run(sql, list, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(1);
        }
      });
    });
  }
}

module.exports = DAD;

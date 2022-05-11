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
    //api 49
    async returnReturnOrders() {
      return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM returnReturnOrders";
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

    //api 50
    async returnReturnOrders(id) {
      return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM returnReturnOrders WHERE id=?";
        this.db.all(sql, [id], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    }

    //api 51
    async addReturnOrders(
      returnDate,
      products,
      restockOrderId,
    ) {
      return new Promise((resolve, reject) => {
        const sql =
          "INSERT INTO addReturnOrders (returnDate,products,restockOrderId) VALUES (?,?,?,'[]');";
        const newReturnOrders = [returnDate,
          products,
          restockOrderId,
          ];
        this.db.run(sql, newReturnOrders, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        });
      });
    }
    

    // api 52 delete return orders id


    // api 53
    async returnInternalOrders() {
      return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM internalOrders";
        this.db.all(sql, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    }

    // api 54
    async internalOrdersIssued(state) {
      return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM internalOrders WHERE state='ISSUED'";
        this.db.all(sql, [state], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    }

    // api 55
    async internalOrdersIssued(state) {
      return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM internalOrders WHERE state='ACCEPTED'";
        this.db.all(sql, [state], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    }

    // api 56
    async returnInternalOrders(id) {
      return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM returnInternalOrders WHERE id=?";
        this.db.all(sql, [id], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    }

    //api 57
    async addInternalOrders(
      issueDate,
      products,
      customerId,
    ) {
      return new Promise((resolve, reject) => {
        const sql =
          "INSERT INTO addInternalOrders (issueDate,products,customerId) VALUES (?,?,?) WHERE state ='ACCEPTED';";
        const newInternalOrders = [issueDate,
          products,
          customerId,
          ];
        this.db.run(sql, newInternalOrders, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        });
      });
    }

    // api 58 not completed
    async editInternalOrders(newState,RFID){
      const newInternalOrders = [newState,RFID]
      const sql1 = "UPDATE InternalOrders SET WHERE newState='ACCEPTED' "
      this.db.run(sql1, newInternalOrders, (err)=>{
        if(err){
          reject(err)
        }else{
          const sql2 = "UPDATE InternalOrders SET WHERE newState='COMPLETED'  "
          this.db.run(sql2, [RFID], (err)=>{
             
          })
        }
      })
    }

    // api 59 delete internal orders id



    // api 60 
    async returnItem() {
      return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM item";
        this.db.all(sql, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    }
    
    //api 61
    async returnItem(id) {
      return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM returnItem WHERE id=?";
        this.db.all(sql, [id], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    }

    // api 62
    async addItem(
      description,
      price,
      SKUId,
      supplierId,
    ) {
      return new Promise((resolve, reject) => {
        const sql =
          "INSERT INTO item (description,price,SKUId,supplierId) VALUES (?,?,?,?,'[]');";
        const newSku = [
          description,
          price,
          SKUId,
          supplierId,
           ];
        this.db.run(sql, newItem, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        });
      });
    }

    // api 63
    async editItem(newDescription,newPrice){
      const newItem = [newDescription,newPrice]
      const sql1 = "UPDATE item SET newDescription = ?,newPrice = ?"
      this.db.run(sql1, newItem, (err)=>{
        if(err){
          reject(err)
        } else {
          resolve(this.lastID);
        }
      });
    };
  }
   
  // api 64 delete item id






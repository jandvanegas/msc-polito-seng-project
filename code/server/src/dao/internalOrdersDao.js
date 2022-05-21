const {baseDao} = require("./dao");

function internalOrdersDao(db) {
    const baseDaoInstance = baseDao(db, "internalOrders", "id")
    const remove = baseDaoInstance.remove


    const getById = (id) =>{
        const sql = "SELECT * FROM internalOrders WHERE id=?"
        const list = [id]
        return new Promise((resolve, reject)=>{
            db.all(sql, list, (err, rows)=>{
                if(err){
                    reject(err)
                }else{
                    const x = rows.map((e)=>(
                        {id:e.id,
                        issueDate:e.issueDate,
                        state:e.state,
                        products:JSON.parse(e.products),
                        customerId:e.customerId}
                    ))
                     
                    resolve(x)
                }
            })
        })
    }
   
    const getAll = () =>{
        const sql = "SELECT * FROM internalOrders"
        return new Promise((resolve, reject)=>{
            db.all(sql, [], (err, rows)=>{
                if(err){
                    reject(err)
                }else{
                   const x = rows.map((e)=>(
                       {id:e.id,
                       issueDate:e.issueDate,
                       state:e.state,
                       products:JSON.parse(e.products),
                       customerId:e.customerId}
                   ))
                    
                   resolve(x)
                }
            })
        })
    }
   
    const updateState = (id, newState) => {
        const sql = "UPDATE internalOrders SET state=? WHERE id=?";
        const list = [newState, id];
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

    const updateStateAndProducts = (id, newState, newProducts) => {
        console.log(id, newState, newProducts)
        const sql = "UPDATE internalOrders SET state=?, products=? WHERE id=?";
        const list = [newState, newProducts, id];
        return new Promise((resolve, reject) => {
            db.run(sql, list, (err) => {
                if (err) {
                    console.log(err)
                    reject(err);
                } else {
                    resolve(1);
                }
            });
        });
    }


    const getIssuedOrders = () => {
        const sql = `SELECT * FROM internalOrders WHERE state= 'ISSUED'`;
        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const x = rows.map((e)=>(
                        {id:e.id,
                        issueDate:e.issueDate,
                        state:e.state,
                        products:JSON.parse(e.products),
                        customerId:e.customerId}
                    ))
                     
                    resolve(x)
                }
            });
        });
    }
    const getAcceptedOrders = () => {
        const sql = `SELECT * FROM internalOrders WHERE state='ACCEPTED'`;
        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const x = rows.map((e)=>(
                        {id:e.id,
                        issueDate:e.issueDate,
                        state:e.state,
                        products:JSON.parse(e.products),
                        customerId:e.customerId}
                    ))
                     
                    resolve(x)
                }
            });
        });
    }
    const add = (issueDate,products,customerId) => {
        return new Promise((resolve, reject) => {
            const sql =
                "INSERT INTO internalOrders (issueDate,products,customerId, state) VALUES (?,?,?,?) ";
            const newInternalOrders = [
                issueDate,
                JSON.stringify(products),
                customerId,
                "ISSUED"
            ];
            db.run(sql, newInternalOrders, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }
    return {
        getIssuedOrders: getIssuedOrders,
        getAcceptedOrders: getAcceptedOrders,
        updateState: updateState,
        updateStateAndProducts: updateStateAndProducts,
        getAll: getAll,
        getById: getById,
        add: add,
        remove: remove
    }
}

module.exports = internalOrdersDao

"use strict";
const express = require("express");
const sqlite = require("sqlite3");
const migrate = require('./src/dao/migrate')
const {migrationDao} = require('./src/dao/dao')
const skuDao = require('./src/dao/skuDao')
const skuItemDao = require('./src/dao/skuItemDao')
const positionDao = require('./src/dao/positionDao')
const testResultApi = require('./src/api/testResults')
const usersApi = require('./src/api/userApi')

const skuService = require('./src/service/skuService')

const skusApi = require('./src/api/skusApi')
const skuItemsApi = require('./src/api/skuItemsApi')
const positionsApi = require('./src/api/positionsApi')
const testDescriptorsApi = require('./src/api/testDescriptors')
const testDescriptorsDao = require('./src/dao/testDescriptorsDao')
const testResultDao = require('./src/dao/testResultDao')
const userDao = require('./src/dao/userDao')

const returnOrdersDao = require('./src/dao/returnOrdersDao')
const internalOrdersDao = require('./src/dao/internalOrdersDao')
const itemDao = require('./src/dao/itemDao')
const returnOrdersApi = require('./src/api/returnOrdersApi')
const internalOrdersApi = require('./src/api/internalOrdersApi')
const itemApi = require('./src/api/itemApi')

const app = new express();
const port = 3001;
app.use(express.json());

const db = new sqlite.Database("ezwh.sqlite", (err) => {
    if (err) throw err;
});
const daoInstance = migrationDao(db)
migrate(daoInstance)

//DAO
const mySkuDao = skuDao(db)
const returnOrdersDaoInstance = returnOrdersDao(db)
const internalOrdersDaoInstance = internalOrdersDao(db)
const itemDaoInstance = itemDao(db)
const skuItemDaoInstance = skuItemDao(db)
const myPositionDao = positionDao(db)
const testDescriptorsDaoInstance = testDescriptorsDao(db)
const testResultDaoInstance = testResultDao(db)
const userDaoInstance = userDao(db)

// Services
const mySkuService = skuService(mySkuDao, myPositionDao)

// Api
const mySkuApi = skusApi(mySkuService)
const skuItemsApiInstance = skuItemsApi(skuItemDaoInstance)
const positionsApiInstance = positionsApi(myPositionDao)
const testDescriptorsApiInstance = testDescriptorsApi(testDescriptorsDaoInstance)
const testResultApiInstance = testResultApi(testResultDaoInstance)
const userApiInstance = usersApi(userDaoInstance)
const returnOrdersApiInstance =returnOrdersApi(returnOrdersDaoInstance)
const internalOrdersApiInstance =internalOrdersApi(internalOrdersDaoInstance)
const itemApiInstance = itemApi(itemDaoInstance)

app.get("/api/skus", mySkuApi.getAll);
app.get("/api/skus/:id", mySkuApi.getById);
app.post("/api/sku", mySkuApi.add);
app.put("/api/sku/:id", mySkuApi.updateById);
app.put("/api/sku/:id/position", mySkuApi.updatePosition);
app.delete("/api/skus/:id", mySkuApi.remove);

app.get("/api/skuitems", skuItemsApiInstance.getAll);
app.get("/api/skuitems/sku/:id", skuItemsApiInstance.getBySkuId);
app.get("/api/skuitems/:rfid", skuItemsApiInstance.getByRfid);
app.post("/api/skuitem", skuItemsApiInstance.add);
app.put("/api/skuitems/:rfid", skuItemsApiInstance.update);
app.delete("/api/skuitems/:rfid", skuItemsApiInstance.remove);

//position
app.get("/api/positions", positionsApiInstance.getAll);
app.post("/api/position", positionsApiInstance.add);
app.put("/api/position/:positionID", positionsApiInstance.updateFull);
app.put("/api/position/:positionID/changeID", positionsApiInstance.update);
app.delete("/api/position/:positionID", positionsApiInstance.remove);

//test descriptor
app.get("/api/testDescriptors", testDescriptorsApiInstance.getAll)
app.post("/api/testDescriptor", testDescriptorsApiInstance.add)
app.get("/api/testDescriptor/:id", testDescriptorsApiInstance.getById);
app.post("/api/testDescriptor", testDescriptorsApiInstance.add)
app.put("/api/testDescriptor/:id", testDescriptorsApiInstance.update);
app.delete("/api/testDescriptor/:id", testDescriptorsApiInstance.remove);
app.post("/api/skuitems/testResult", testResultApiInstance.add)
app.get("/api/skuitems/:rfid/testResults", testResultApiInstance.getByRfid)
app.get("/api/skuitems/:rfid/testResults/:id", testResultApiInstance.getByRfidAndId)
app.post("/api/skuitems/testResult", testResultApiInstance.add)
app.put("/api/skuitems/:rfid/testResults/:id", testResultApiInstance.update)
app.delete("/api/skuitems/:rfid/testResults/:id", testResultApiInstance.remove)

//user
app.get("/api/userinfo", userApiInstance.getInfo)
app.get("/api/suppliers", userApiInstance.getSuppliers)
app.get("/api/users", userApiInstance.getUsers)
app.post("/api/newUser", userApiInstance.add)
app.post("/api/managerSessions", userApiInstance.logInManager)
// /api/customerSessions
// /api/supplierSessions
// /api/clerkSessions
// /api/qualityEmployeeSessions
// /api/deliveryEmployeeSessions
// /api/logout
// /api/users/:username
// /api/users/:username/:type

//restock order
// /api/restockOrders
// /api/restockOrdersIssued
// /api/restockOrders/:id
// /api/restockOrders/:id/returnItems
// /api/restockOrder
// /api/restockOrder/:id
// /api/restockOrder/:id/skuItems
// /api/restockOrder/:id/transportNote
// /api/restockOrder/:id


//return order
app.get("/api/returnOrders",returnOrdersApiInstance.getAll) //ok
app.get("/api/returnOrders/:id",returnOrdersApiInstance.getById); //ok
app.post("/api/returnOrder",returnOrdersApiInstance.add); //ok
//app.put("/")
app.delete("/api/returnOrder/:id", returnOrdersApiInstance.remove); //ok

//internal order
app.get("/api/internalOrders", internalOrdersApiInstance.getAll); //ok
app.get("/api/internalOrdersIssued", internalOrdersApiInstance.getIssuedOrders); //ok
app.get("/api/internalOrdersAccepted", internalOrdersApiInstance.getAcceptedOrders); //ok
app.get("/api/internalOrders/:id", internalOrdersApiInstance.getById); //ok
app.post("/api/internalOrders", internalOrdersApiInstance.add); //ok
app.put("/api/internalOrders/:id", internalOrdersApiInstance.update); //ok
app.delete("/api/internalOrders/:id", internalOrdersApiInstance.remove); //ok

//items
app.get("/api/items", itemApiInstance.getAll); //ok
app.get("/api/items/:id", itemApiInstance.getById); //ok
app.post("/api/item", itemApiInstance.add); //ok
app.put("/api/item/:id", itemApiInstance.update); //ok
app.delete("/api/items/:id", itemApiInstance.remove); //ok


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;

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
const skuItemService = require("./src/service/skuItemService");
const positionService = require('./src/service/positionService')
const returnOrderService = require("./src/service/returnOrderService");

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
const testDescriptorService = require("./src/service/testDescriptorService");
const testResultService = require("./src/service/testResultService");

const app = new express();
const port = 3001;
app.use(express.json());

const db = new sqlite.Database("ezwh.sqlite", (err) => {
    if (err) throw err;
});
const daoInstance = migrationDao(db)
migrate(daoInstance)

//DAOs
const mySkuDao = skuDao(db)
const myPositionDao = positionDao(db)
const mySkuItemDao = skuItemDao(db)
const myReturnOrdersDao = returnOrdersDao(db)
const myTestDescriptorDao = testDescriptorsDao(db)
const myTestResultDao = testResultDao(db)

const internalOrdersDaoInstance = internalOrdersDao(db)
const itemDaoInstance = itemDao(db)
const userDaoInstance = userDao(db)

// Services
const mySkuService = skuService(mySkuDao, myPositionDao)
const myPositionService = positionService(myPositionDao)
const mySkuItemService = skuItemService(mySkuItemDao, mySkuDao)
const myReturnOrderService = returnOrderService(myReturnOrdersDao)
const myTestDescriptorService = testDescriptorService(myTestDescriptorDao, mySkuDao)
const myTestResultService = testResultService(myTestResultDao, mySkuItemDao, myTestDescriptorDao)

// Apis
const mySkuApi = skusApi(mySkuService)
const myPositionApi = positionsApi(myPositionService)
const mySkuItemsApi = skuItemsApi(mySkuItemService)
const myReturnOrdersApi = returnOrdersApi(myReturnOrderService)
const myTestDescriptorsApi = testDescriptorsApi(myTestDescriptorService)
const myTestResultApi = testResultApi(myTestResultService)

const userApiInstance = usersApi(userDaoInstance)
const internalOrdersApiInstance = internalOrdersApi(internalOrdersDaoInstance)
const itemApiInstance = itemApi(itemDaoInstance)

// sku
app.get("/api/skus", mySkuApi.getAll);
app.get("/api/skus/:id", mySkuApi.getById);
app.post("/api/sku", mySkuApi.add);
app.put("/api/sku/:id", mySkuApi.updateById);
app.put("/api/sku/:id/position", mySkuApi.updatePosition);
app.delete("/api/skus/:id", mySkuApi.remove);

// skuitems
app.get("/api/skuitems", mySkuItemsApi.getAll);
app.get("/api/skuitems/sku/:skuID", mySkuItemsApi.getBySkuId);
app.get("/api/skuitems/:rfid", mySkuItemsApi.getByRfid);
app.post("/api/skuitem", mySkuItemsApi.add);
app.put("/api/skuitems/:rfid", mySkuItemsApi.update);
app.delete("/api/skuitems/:rfid", mySkuItemsApi.remove);

//position
app.get("/api/positions", myPositionApi.getAll);
app.post("/api/position", myPositionApi.add);
app.put("/api/position/:positionID", myPositionApi.updateFull);
app.put("/api/position/:positionID/changeID", myPositionApi.update);
app.delete("/api/position/:positionID", myPositionApi.remove);

//test descriptor
app.get("/api/testDescriptors", myTestDescriptorsApi.getAll)
app.post("/api/testDescriptor", myTestDescriptorsApi.add)
app.get("/api/testDescriptor/:id", myTestDescriptorsApi.getById);
app.post("/api/testDescriptor", myTestDescriptorsApi.add)
app.put("/api/testDescriptor/:id", myTestDescriptorsApi.update);
app.delete("/api/testDescriptor/:id", myTestDescriptorsApi.remove);

// test result
app.post("/api/skuitems/testResult", myTestResultApi.add)
app.get("/api/skuitems/:rfid/testResults", myTestResultApi.getByRfid)
app.get("/api/skuitems/:rfid/testResults/:id", myTestResultApi.getByRfidAndId)
app.put("/api/skuitems/:rfid/testResults/:id", myTestResultApi.update)
app.delete("/api/skuitems/:rfid/testResults/:id", myTestResultApi.remove)

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
app.get("/api/returnOrders", myReturnOrdersApi.getAll) //ok
app.get("/api/returnOrders/:id", myReturnOrdersApi.getById); //ok
app.post("/api/returnOrder", myReturnOrdersApi.add); //ok
//app.put("/")
app.delete("/api/returnOrder/:id", myReturnOrdersApi.remove); //ok

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

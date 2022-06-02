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
const testDescriptorService = require("./src/service/testDescriptorService");
const testResultService = require("./src/service/testResultService");
const internalOrderService = require("./src/service/internalOrderService");
const userService = require("./src/service/userService")
const restockOrderService = require("./src/service/restockOrderService")

const skusApi = require('./src/api/skusApi')
const skuItemsApi = require('./src/api/skuItemsApi')
const positionsApi = require('./src/api/positionsApi')
const testDescriptorsApi = require('./src/api/testDescriptors')
const testDescriptorsDao = require('./src/dao/testDescriptorsDao')
const testResultDao = require('./src/dao/testResultDao')
const userDao = require('./src/dao/userDao')
const restockOrderDao = require('./src/dao/restockOrderDao')

const returnOrdersDao = require('./src/dao/returnOrdersDao')
const internalOrdersDao = require('./src/dao/internalOrdersDao')
const itemDao = require('./src/dao/itemDao')
const returnOrdersApi = require('./src/api/returnOrdersApi')
const internalOrdersApi = require('./src/api/internalOrdersApi')
const itemApi = require('./src/api/itemApi')
const itemService = require("./src/service/itemService");
const restockOrderApi = require('./src/api/restockOrderApi')

const app = new express();
const port = 3001;
app.use(express.json());

const db = new sqlite.Database("ezwh.sqlite", (err) => {
    if (err) throw err;
});

migrate(db)

//DAOs
const mySkuDao = skuDao(db)
const myPositionDao = positionDao(db)
const mySkuItemDao = skuItemDao(db)
const myReturnOrdersDao = returnOrdersDao(db)
const myTestDescriptorDao = testDescriptorsDao(db)
const myTestResultDao = testResultDao(db)
const myInternalOrderDao = internalOrdersDao(db)
const myItemDao = itemDao(db)
const myUserDao = userDao(db)
const myRestockOrderDao = restockOrderDao(db)


// Services
const mySkuService = skuService(mySkuDao, myPositionDao)
const myPositionService = positionService(myPositionDao)
const mySkuItemService = skuItemService(mySkuItemDao, mySkuDao)
const myReturnOrderService = returnOrderService(myReturnOrdersDao, myRestockOrderDao)
const myTestDescriptorService = testDescriptorService(myTestDescriptorDao, mySkuDao)
const myTestResultService = testResultService(myTestResultDao, mySkuItemDao, myTestDescriptorDao)
const myInternalOrderService = internalOrderService(myInternalOrderDao)
const myItemService = itemService(myItemDao, mySkuDao)
const myUserService = userService(myUserDao)
const myRestockOrderService = restockOrderService(myRestockOrderDao)

// Apis
const mySkuApi = skusApi(mySkuService)
const myPositionApi = positionsApi(myPositionService)
const mySkuItemsApi = skuItemsApi(mySkuItemService)
const myReturnOrdersApi = returnOrdersApi(myReturnOrderService)
const myTestDescriptorsApi = testDescriptorsApi(myTestDescriptorService)
const myTestResultApi = testResultApi(myTestResultService)
const myInternalOrderApi = internalOrdersApi(myInternalOrderService)
const myItemApi = itemApi(myItemService)
const myUserApi = usersApi(myUserService)
const myRestockOrderApi = restockOrderApi(myRestockOrderService)

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
app.get("/api/userinfo", myUserApi.getInfo)
app.get("/api/suppliers", myUserApi.getSuppliers)
app.get("/api/users", myUserApi.getUsers)
app.post("/api/newUser", myUserApi.add)
app.post("/api/managerSessions", myUserApi.logInManager)
app.post("/api/customerSessions", myUserApi.logInCustomer)
app.post("/api/supplierSessions", myUserApi.logInSupplier)
app.post("/api/clerkSessions", myUserApi.logInClerk)
app.post("/api/QualityEmployeeSessions", myUserApi.logInQualityEmployee)
app.post("/api/DeliveryEmployeeSessions", myUserApi.logInDeliveryEmployee)
app.post("/api/logout", myUserApi.logOut)
app.put("/api/users/:username", myUserApi.update)
app.delete("/api/users/:username/:type", myUserApi.remove)

//restock order
app.get("/api/restockOrders", myRestockOrderApi.getAll)
app.get("/api/restockOrdersIssued", myRestockOrderApi.getIssued)
app.get("/api/restockOrders/:id", myRestockOrderApi.getById)
app.get("/api/restockOrders/:id/returnItems", myRestockOrderApi.getItems)
app.post("/api/restockOrder", myRestockOrderApi.add)
app.put("/api/restockOrder/:id", myRestockOrderApi.update)
app.put("/api/restockOrder/:id/skuItems", myRestockOrderApi.addItems)
app.put("/api/restockOrder/:id/transportNote", myRestockOrderApi.addTransportNoteById)

//return order
app.get("/api/returnOrders", myReturnOrdersApi.getAll) //ok
app.get("/api/returnOrders/:id", myReturnOrdersApi.getById); //ok
app.post("/api/returnOrder", myReturnOrdersApi.add); //ok
//app.put("/")
app.delete("/api/returnOrder/:id", myReturnOrdersApi.remove); //ok

//internal order
app.get("/api/internalOrders", myInternalOrderApi.getAll); //ok
app.get("/api/internalOrdersIssued", myInternalOrderApi.getIssuedOrders); //ok
app.get("/api/internalOrdersAccepted", myInternalOrderApi.getAcceptedOrders); //ok
app.get("/api/internalOrders/:id", myInternalOrderApi.getById); //ok
app.post("/api/internalOrders", myInternalOrderApi.add); //ok
app.put("/api/internalOrders/:id", myInternalOrderApi.update); //ok
app.delete("/api/internalOrders/:id", myInternalOrderApi.remove); //ok

//items
app.get("/api/items", myItemApi.getAll); //ok
app.get("/api/items/:id", myItemApi.getById); //ok
app.post("/api/item", myItemApi.add); //ok
app.put("/api/item/:id", myItemApi.update); //ok
app.delete("/api/items/:id", myItemApi.remove); //ok


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;

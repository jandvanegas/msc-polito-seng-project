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

const skusApi = require('./src/api/skusApi')
const skuItemsApi = require('./src/api/skuItemsApi')
const positionsApi = require('./src/api/positionsApi')
const testDescriptorsApi = require('./src/api/testDescriptors')
const testDescriptorsDao = require('./src/dao/testDescriptorsDao')
const testResultDao = require('./src/dao/testResultDao')
const userDao = require('./src/dao/userDao')

const app = new express();
const port = 3001;
app.use(express.json());

const db = new sqlite.Database("ezwh.sqlite", (err) => {
    if (err) throw err;
});
const daoInstance = migrationDao(db)
migrate(daoInstance)


const skuDaoInstance = skuDao(db)
const skuItemDaoInstance = skuItemDao(db)
const positionDaoInstance = positionDao(db)
const testDescriptorsDaoInstance = testDescriptorsDao(db)
const testResultDaoInstance = testResultDao(db)
const userDaoInstance = userDao(db)

const skusApiInstance = skusApi(skuDaoInstance, positionDaoInstance)
const skuItemsApiInstance = skuItemsApi(skuItemDaoInstance)
const positionsApiInstance = positionsApi(positionDaoInstance)
const testDescriptorsApiInstance = testDescriptorsApi(testDescriptorsDaoInstance)
const testResultApiInstance = testResultApi(testResultDaoInstance)
const userApiInstance = usersApi(userDaoInstance)

app.get("/api/skus", skusApiInstance.getAll);
app.get("/api/skus/:id", skusApiInstance.getById);
app.post("/api/sku", skusApiInstance.add);
app.put("/api/sku/:id", skusApiInstance.updateById);
app.put("/api/sku/:id/position", skusApiInstance.updatePosition);
app.delete("/api/skus/:id", skusApiInstance.remove);
app.get("/api/skuitems", skuItemsApiInstance.getAll);
app.get("/api/skuitems/sku/:id", skuItemsApiInstance.getBySkuId);
app.get("/api/skuitems/:rfid", skuItemsApiInstance.getByRfid);
app.post("/api/skuitem", skuItemsApiInstance.add);
app.put("/api/skuitems/:rfid", skuItemsApiInstance.update);
app.delete("/api/skuitems/:rfid", skuItemsApiInstance.remove);
app.get("/api/positions", positionsApiInstance.getAll);
app.post("/api/position", positionsApiInstance.add);
app.put("/api/position/:positionID", positionsApiInstance.updateFull);
app.put("/api/position/:positionID/changeID", positionsApiInstance.update);

app.delete("/api/position/:id", positionsApiInstance.remove);
app.get("/api/testDescriptors", testDescriptorsApiInstance.getAll)
app.post("/api/testDescriptor", testDescriptorsApiInstance.add)
app.get("/api/testDescriptor/:id", testDescriptorsApiInstance.getById);
app.put("/api/testDescriptor/:id", testDescriptorsApiInstance.update);
app.delete("/api/testDescriptor/:id", testDescriptorsApiInstance.remove);
app.post("/api/skuitems/testResult", testResultApiInstance.add)
app.get("/api/skuitems/:rfid/testResults", testResultApiInstance.getByRfid)
app.get("/api/skuitems/:rfid/testResults/:id", testResultApiInstance.getByRfidAndId)
app.put("/api/skuitems/:rfid/testResults/:id", testResultApiInstance.update)
app.delete("/api/skuitems/:rfid/testResults/:id", testResultApiInstance.remove)
app.get("/api/userinfo", userApiInstance.getInfo)
app.get("/api/suppliers", userApiInstance.getSuppliers)
app.get("/api/users", userApiInstance.getUsers)
app.post("/api/newUser", userApiInstance.add)
app.post("/api/managerSessions", userApiInstance.logInManager)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;

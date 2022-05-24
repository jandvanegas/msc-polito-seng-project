function migrate(migrationDao) {
    console.log("Starting migrations")
    const sql1 =
        "CREATE TABLE IF NOT EXISTS skus (id INTEGER PRIMARY KEY AUTOINCREMENT, `description` VARCHAR NOT NULL,`weight` DOUBLE NOT NULL,`volume` DOUBLE NOT NULL,`notes` TEXT NOT NULL,`position` TEXT,`availableQuantity` INT NOT NULL,`price` DOUBLE NOT NULL,`testDescriptors` TEXT NOT NULL)";
    migrationDao.run(sql1);

    //create position table
    const sql2 =
        "CREATE TABLE IF NOT EXISTS positions (position INTEGER PRIMARY KEY, aisleID VARCHAR NOT NULL, row VARCHAR NOT NULL,  col VARCHAR NOT NULL, maxWeight INT NOT NULL, maxVolume INT NOT NULL, occupiedWeight DOUBLE NOT NULL, occupiedVolume DOUBLE NOT NULL)";
    migrationDao.run(sql2);

    //create sku items table
    const sql3 =
        "CREATE TABLE IF NOT EXISTS skuItems (RFID VARCHAR PRIMARY KEY, SKUId INT NOT NULL, Available INT NOT NULL, DateOfStock VARCHAR NOT NULL)";
    migrationDao.run(sql3);
    // create test descriptors
    const createTestDescriptors =
        "CREATE TABLE IF NOT EXISTS testDescriptors (id INTEGER PRIMARY KEY, name VARCHAR NOT NULL, procedureDescription VARCHAR NOT NULL, idSKU INTEGER NOT NULL)";
    migrationDao.run(createTestDescriptors);
    //
    const createTestResult =
        "CREATE TABLE IF NOT EXISTS testResults (id Integer PRIMARY key autoincrement, rfid VARCHAR NOT NULL, idTestDescriptor INT NOT NULL, Date VARCHAR NOT NULL, Result Integer NOT NULL default 0)";
    migrationDao.run(createTestResult);

    const createUserTable =
        "CREATE TABLE IF NOT EXISTS users (id Integer PRIMARY key autoincrement, name VARCHAR NOT NULL, surname VARCHAR NOT NULL, email VARCHAR NOT NULL, type VARCHAR NOT NULL, loggedIn Integer NOT NULL default 0)";
    migrationDao.run(createUserTable);

    const createReturnOrders =
        "CREATE TABLE IF NOT EXISTS returnOrders (id Integer PRIMARY key autoincrement, returnDate DATE, products TO_VARCHAR NOT NULL,restockOrderId Integer)";
    migrationDao.run(createReturnOrders);

    const createInternalOrders =
        "CREATE TABLE IF NOT EXISTS internalOrders ( id Integer PRIMARY KEY autoincrement,issueDate DATE,state TEXT NOT NULL, products TO_VARCHAR NOT NULL,customerId Integer)";
    migrationDao.run(createInternalOrders);

    const createItem =
        "CREATE TABLE IF NOT EXISTS item ( id Integer PRIMARY KEY autoincrement, description TEXT NOT NULL, price DOUBLE NOT NULL, SKUID Integer NOT NULL,supplierId Integer NOT NULL)";
    migrationDao.run(createItem);

    console.log("Migrations done");
}

module.exports = migrate

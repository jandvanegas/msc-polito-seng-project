function migrate(db) {
    console.log("Starting migrations")
    db.serialize(function (){
        const sql1 =
            "CREATE TABLE IF NOT EXISTS skus (id INTEGER PRIMARY KEY AUTOINCREMENT, `description` VARCHAR NOT NULL,`weight` DOUBLE NOT NULL,`volume` DOUBLE NOT NULL,`notes` TEXT NOT NULL,`position` TEXT,`availableQuantity` INT NOT NULL,`price` DOUBLE NOT NULL,`testDescriptors` TEXT NOT NULL)";
        db.run(sql1);

        //create position table
        const sql2 =
            "CREATE TABLE IF NOT EXISTS positions (id INTEGER PRIMARY KEY AUTOINCREMENT, positionID INTEGER not null, aisleID VARCHAR NOT NULL, row VARCHAR NOT NULL,  col VARCHAR NOT NULL, maxWeight INT NOT NULL, maxVolume INT NOT NULL, occupiedWeight DOUBLE NOT NULL, occupiedVolume DOUBLE NOT NULL)";
        db.run(sql2);

        //create sku items table
        const sql3 =
            "CREATE TABLE IF NOT EXISTS skuItems (RFID VARCHAR PRIMARY KEY, SKUId INT NOT NULL, Available INT NOT NULL, DateOfStock VARCHAR NOT NULL)";
        db.run(sql3);
        // create test descriptors
        const createTestDescriptors =
            "CREATE TABLE IF NOT EXISTS testDescriptors (id INTEGER PRIMARY KEY, name VARCHAR NOT NULL, procedureDescription VARCHAR NOT NULL, idSKU INTEGER NOT NULL)";
        db.run(createTestDescriptors);
        //
        const createTestResult =
            "CREATE TABLE IF NOT EXISTS testResults (id Integer PRIMARY key autoincrement, rfid VARCHAR NOT NULL, idTestDescriptor INT NOT NULL, Date VARCHAR NOT NULL, Result Integer NOT NULL default 0)";
        db.run(createTestResult);
        const createUserTable =
            "CREATE TABLE IF NOT EXISTS users (id Integer primary key autoincrement, username VARCHAR NOT NULL , name VARCHAR NOT NULL, password VARCHAR NOT NULL, surname VARCHAR NOT NULL, type VARCHAR NOT NULL, loggedIn Integer NOT NULL default 0)";
        db.run(createUserTable);

        const insertUsers = " insert or ignore into users(username, name, password, surname, type) VALUES ('user1@ezwh.com', 'user1', 'testpassword', 'Employee', 'customer'),('qualityEmployee1@ezwh.com', 'qualityEmployee1', 'testpassword', 'Employee', 'qualityEmployee'),('clerk1@ezwh.com', 'clerk1', 'testpassword', 'Employee', 'clerk'),('deliveryEmployee1@ezwh.com', 'deliveryEmployee1', 'testpassword', 'Employee', 'deliveryEmployee'),('supplier1@ezwh.com', 'supplier1', 'testpassword', 'Employee', 'supplier'),('manager1@ezwh.com', 'manager1', 'testpassword', 'Employee', 'manager')"
        db.run(insertUsers);
        const createReturnOrders =
            "CREATE TABLE IF NOT EXISTS returnOrders (id Integer PRIMARY key autoincrement, returnDate DATE, products TO_VARCHAR NOT NULL,restockOrderId Integer)";
        db.run(createReturnOrders);

        const createRestockOrderTable =
            "CREATE TABLE IF NOT EXISTS restockOrders (id Integer PRIMARY key autoincrement, issueDate VARCHAR NOT NULL, state VARCHAR NOT NULL, products VARCHAR NOT NULL, supplierId Integer NOT NULL, transportNote VARCHAR, skuItems VARCHAR NOT NULL)";
        db.run(createRestockOrderTable);

        const createInternalOrders =
            "CREATE TABLE IF NOT EXISTS internalOrders ( id Integer PRIMARY KEY autoincrement,issueDate DATE,state TEXT NOT NULL, products TO_VARCHAR NOT NULL,customerId Integer)";
        db.run(createInternalOrders);

        const createItem =
            "CREATE TABLE IF NOT EXISTS item ( id Integer PRIMARY KEY autoincrement, description TEXT NOT NULL, price DOUBLE NOT NULL, SKUId Integer NOT NULL,supplierId Integer NOT NULL)";
        db.run(createItem);

        console.log("Migrations done");
    })

}

module.exports = migrate

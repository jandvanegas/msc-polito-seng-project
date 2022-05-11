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

    console.log("Migrations done")
}

module.exports = migrate
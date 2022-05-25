const sqlite3 = require("sqlite3");
const skuDao = require("../src/dao/skuDao");
const migrate = require("../src/dao/migrate");

const db = new sqlite3.Database("test.sqlite", (err) => {
  if (err) throw err;
});

migrate(db);
const mySkuDao = skuDao(db);

async function start(mySkuDao) {
  await mySkuDao.deleteSkuData();
  await mySkuDao.resetIndex();
}

describe("get all skus", () => {
  beforeEach(async () => {
    await start(mySkuDao);

    await mySkuDao.add("a new sku", 100, 50, "first SKU", 10.99, 50);
    await mySkuDao.add("a new sku", 100, 50, "first SKU", 10.99, 50);
    await mySkuDao.add("a new sku", 100, 50, "first SKU", 10.99, 50);
  });

  test("get all skus", async () => {
    let res = await mySkuDao.getAll();
    expect(res).toEqual([
      {
        id: 1,
        description: "a new sku",
        weight: 100,
        volume: 50,
        notes: "first SKU",
        position: null,
        availableQuantity: 50,
        price: 10.99,
        testDescriptors: "[]",
      },
      {
        id: 2,
        description: "a new sku",
        weight: 100,
        volume: 50,
        notes: "first SKU",
        position: null,
        availableQuantity: 50,
        price: 10.99,
        testDescriptors: "[]",
      },
      {
        id: 3,
        description: "a new sku",
        weight: 100,
        volume: 50,
        notes: "first SKU",
        position: null,
        availableQuantity: 50,
        price: 10.99,
        testDescriptors: "[]",
      },
    ]);
  });
});

describe("get sku by id", () => {
  beforeEach(async () => {
    await start(mySkuDao);

    await mySkuDao.add("a new sku", 100, 50, "first SKU", 10.99, 50);
    await mySkuDao.add("a new sku", 100, 50, "first SKU", 10.99, 50);
    await mySkuDao.add("a new sku", 100, 50, "first SKU", 10.99, 50);
  });

  test("get sku by id", async () => {
    let id1 = 1;
    let res1 = await mySkuDao.getById(id1);
    expect(res1).toEqual({
      id: 1,
      description: "a new sku",
      weight: 100,
      volume: 50,
      notes: "first SKU",
      position: null,
      availableQuantity: 50,
      price: 10.99,
      testDescriptors: "[]",
    });
    let id2 = 2;
    let res2 = await mySkuDao.getById(id2);
    expect(res2).toEqual({
      id: 2,
      description: "a new sku",
      weight: 100,
      volume: 50,
      notes: "first SKU",
      position: null,
      availableQuantity: 50,
      price: 10.99,
      testDescriptors: "[]",
    });
  });
});

describe("add sku", () => {
  beforeEach(async () => {
    await start(mySkuDao);

    await mySkuDao.add("a new sku", 100, 50, "first SKU", 10.99, 50);
    await mySkuDao.add("a new sku", 100, 50, "first SKU", 10.99, 50);
    await mySkuDao.add("a new sku", 100, 50, "first SKU", 10.99, 50);
  });

  test("add sku", async () => {
    let sku = {
      description: "a new sku",
      weight: 100,
      volume: 50,
      notes: "first SKU",
      availableQuantity: 50,
      price: 10.99,
    };
    await mySkuDao.add(
      sku.description,
      sku.weight,
      sku.volume,
      sku.notes,
      sku.availableQuantity,
      sku.price
    );
    res = await mySkuDao.getById(1);
    expect(res).toEqual({
      id: 1,
      description: "a new sku",
      weight: 100,
      volume: 50,
      notes: "first SKU",
      position: null,
      availableQuantity: 50,
      price: 10.99,
      testDescriptors: "[]",
    });
  });
});

describe("update sku", () => {
  beforeEach(async () => {
    await start(mySkuDao);

    await mySkuDao.add("a new sku", 100, 50, "first SKU", 10.99, 50);
    await mySkuDao.add("a new sku", 100, 50, "first SKU", 10.99, 50);
    await mySkuDao.add("a new sku", 100, 50, "first SKU", 10.99, 50);
  });

  test("update sku", async () => {
    const newSku = {
      id: 1,
      newDescription: "new description",
      newWeight: 1000,
      newVolume: 1232,
      newNotes: "new note",
      newPrice: 19.99,
      newAvailableQuantity: 9999,
    };
    await mySkuDao.updateSku(
      newSku.id,
      newSku.newDescription,
      newSku.newWeight,
      newSku.newVolume,
      newSku.newNotes,
      newSku.newPrice,
      newSku.newAvailableQuantity
    );
    let result = await mySkuDao.getById(1);
    expect(result).toEqual({
      id: 1,
      description: "new description",
      weight: 1000,
      volume: 1232,
      notes: "new note",
      position: null,
      price: 19.99,
      availableQuantity: 9999,
      testDescriptors: "[]"
    });
  });
});


describe("remove sku", () => {
  beforeEach(async () => {
    await start(mySkuDao);

    await mySkuDao.add("a new sku", 100, 50, "first SKU", 10.99, 50);
    await mySkuDao.add("a new sku", 100, 50, "first SKU", 10.99, 50);
    await mySkuDao.add("a new sku", 100, 50, "first SKU", 10.99, 50);
  });

  test("remove sku", async () => {
    let res1 = await mySkuDao.remove(1);
    let res2 = await mySkuDao.getAll();
    expect(res2).toEqual([{
      id: 2,
      description: "a new sku",
      weight: 100,
      volume: 50,
      notes: "first SKU",
      position: null,
      availableQuantity: 50,
      price: 10.99,
      testDescriptors: "[]",
    },{
      id: 3,
      description: "a new sku",
      weight: 100,
      volume: 50,
      notes: "first SKU",
      position: null,
      availableQuantity: 50,
      price: 10.99,
      testDescriptors: "[]",
    }]);
  });
});


describe("remove all sku", () => {
  beforeEach(async () => {
    await start(mySkuDao);

    await mySkuDao.add("a new sku", 100, 50, "first SKU", 10.99, 50);
    await mySkuDao.add("a new sku", 100, 50, "first SKU", 10.99, 50);
    await mySkuDao.add("a new sku", 100, 50, "first SKU", 10.99, 50);
  });

  test("remove sku", async () => {
    await mySkuDao.deleteSkuData();
    let res2 = await mySkuDao.getAll();
    expect(res2).toEqual([]);

  });
});

describe("update position", () => {
  beforeEach(async () => {
    await start(mySkuDao);

    await mySkuDao.add("a new sku", 100, 50, "first SKU", 10.99, 50);
    await mySkuDao.add("a new sku", 100, 50, "first SKU", 10.99, 50);
    await mySkuDao.add("a new sku", 100, 50, "first SKU", 10.99, 50);
  });

  test("update position", async () => {
    const data = {
      id: 1,
      newPosition: "73829183",
    };
    await mySkuDao.updatePosition(data.id, data.newPosition);
    const res = await mySkuDao.getById(data.id)
    expect(res).toEqual({
      id: 1,
      description: "a new sku",
      weight: 100,
      volume: 50,
      notes: "first SKU",
      position: "73829183",
      availableQuantity: 50,
      price: 10.99,
      testDescriptors: "[]",
    });
  });
});


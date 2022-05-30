const skuService = require("../src/service/skuService");
const skuDao = require("../src/dao/skuDao");
const positionDao = require("../src/dao/positionDao");
const sqlite3 = require("sqlite3");
const migrate = require("../src/dao/migrate");

const db = new sqlite3.Database("test.sqlite", (err) => {
  if (err) throw err;
});

migrate(db);

const mySkuDao = skuDao(db);
const myPositionDao = positionDao(db);
const skuServiceInstance = skuService(mySkuDao, myPositionDao);

describe("get sku by id", () => {
  let sharedData = {};
  beforeAll(async () => {
    await mySkuDao.deleteSkuData();
    sharedData.id1 = await mySkuDao.add(
      "description 1",
      100,
      50,
      "note...",
      19.88,
      43
    );
    sharedData.id2 = await mySkuDao.add(
      "description 2",
      100,
      50,
      "note...",
      19.88,
      43
    );
    sharedData.id3 = await mySkuDao.add(
      "description 3",
      100,
      50,
      "note...",
      19.88,
      43
    );
  });

  testSkuGetById(
    sharedData,
    "id1",
    "description 1",
    100,
    50,
    "note...",
    19.88,
    43,
    "[]"
  );
  testSkuGetById(
    sharedData,
    "id2",
    "description 2",
    100,
    50,
    "note...",
    19.88,
    43,
    "[]"
  );
  testSkuGetById(
    sharedData,
    "id3",
    "description 3",
    100,
    50,
    "note...",
    19.88,
    43,
    "[]"
  );
});

async function testSkuGetById(
  data,
  dataKey,
  description,
  weight,
  volume,
  notes,
  price,
  availableQuantity
) {
  test("get sku bu id", async () => {
    const id = data[dataKey];

    let res2 = await skuServiceInstance.getById(id);
    expect(res2).toEqual({
      id: id,
      description: description,
      weight: weight,
      volume: volume,
      notes: notes,
      position: null,
      price: price,
      availableQuantity: availableQuantity,
      testDescriptors: "[]",
    });
  });
}

describe("get all sku", () => {
  let sharedData = {};
  beforeAll(async () => {
    await mySkuDao.deleteSkuData();
    sharedData.id1 = await mySkuDao.add(
      "description 1",
      100,
      50,
      "note...",
      19.88,
      43
    );
    sharedData.id2 = await mySkuDao.add(
      "description 2",
      100,
      50,
      "note...",
      19.88,
      43
    );
    sharedData.id3 = await mySkuDao.add(
      "description 3",
      100,
      50,
      "note...",
      19.88,
      43
    );
  });

  testSkuGetAllSku(sharedData);
});

async function testSkuGetAllSku(data) {
  test("get all sku", async () => {
    let res = await skuServiceInstance.getAll();
    expect(res).toEqual([
      {
        id: data.id1,
        description: "description 1",
        weight: 100,
        volume: 50,
        notes: "note...",
        position: null,
        price: 19.88,
        availableQuantity: 43,
        testDescriptors: "[]",
      },
      {
        id: data.id2,
        description: "description 2",
        weight: 100,
        volume: 50,
        notes: "note...",
        position: null,
        price: 19.88,
        availableQuantity: 43,
        testDescriptors: "[]",
      },
      {
        id: data.id3,
        description: "description 3",
        weight: 100,
        volume: 50,
        notes: "note...",
        position: null,
        price: 19.88,
        availableQuantity: 43,
        testDescriptors: "[]",
      },
    ]);
  });
}

describe("add sku", () => {
  let sharedData = {};
  beforeAll(async () => {
    await mySkuDao.deleteSkuData();
    sharedData.id1 = await mySkuDao.add(
      "description 1",
      100,
      50,
      "note...",
      19.88,
      43
    );
    sharedData.id2 = await mySkuDao.add(
      "description 2",
      100,
      50,
      "note...",
      19.88,
      43
    );
    sharedData.id3 = await mySkuDao.add(
      "description 3",
      100,
      50,
      "note...",
      19.88,
      43
    );
  });

  testSkuAddSku(sharedData);
});

async function testSkuAddSku(data) {
  test("get all sku", async () => {
    let res1 = await skuServiceInstance.getById(data.id1);
    let res2 = await skuServiceInstance.getById(data.id2);
    let res3 = await skuServiceInstance.getById(data.id3);
    expect(res1).toEqual({
      id: data.id1,
      description: "description 1",
      weight: 100,
      volume: 50,
      notes: "note...",
      position: null,
      price: 19.88,
      availableQuantity: 43,
      testDescriptors: "[]",
    });
    expect(res2).toEqual({
      id: data.id2,
      description: "description 2",
      weight: 100,
      volume: 50,
      notes: "note...",
      position: null,
      price: 19.88,
      availableQuantity: 43,
      testDescriptors: "[]",
    });
    expect(res3).toEqual({
      id: data.id3,
      description: "description 3",
      weight: 100,
      volume: 50,
      notes: "note...",
      position: null,
      price: 19.88,
      availableQuantity: 43,
      testDescriptors: "[]",
    });
  });
}

describe("update sku", () => {
  let sharedData = {};
  beforeAll(async () => {
    await mySkuDao.deleteSkuData();
    sharedData.id1 = await mySkuDao.add(
      "description 1",
      100,
      50,
      "note...",
      19.88,
      43
    );
  });
  testSkuUpdateSku(sharedData);
});

async function testSkuUpdateSku(data) {
  test("update sku", async () => {
    let res0 = await skuServiceInstance.updateById(
      data.id1,
      "new description",
      9999,
      9999,
      "new note!",
      999.999,
      999
    );
    let res1 = await skuServiceInstance.getById(data.id1);
    expect(res1).toEqual({
      id: data.id1,
      description: "new description",
      weight: 9999,
      volume: 9999,
      notes: "new note!",
      position: null,
      price: 999.999,
      availableQuantity: 999,
      testDescriptors: "[]",
    });
  });
}

describe("delete sku", () => {
  let sharedData = {};
  beforeAll(async () => {
    await mySkuDao.deleteSkuData();
    sharedData.id1 = await mySkuDao.add(
      "description 1",
      100,
      50,
      "note...",
      19.88,
      43
    );
  });
  testSkuDelete(sharedData);
});

async function testSkuDelete(data) {
  test("delete sku", async () => {
    let res0 = await skuServiceInstance.remove(data.id1);
    expect(res0).toEqual(undefined);
  });
}

describe("update sku position", () => {
  let sharedData = {};
  beforeAll(async () => {
    await mySkuDao.deleteSkuData();
    await myPositionDao.deletePositionData();
    sharedData.id1 = await mySkuDao.add(
      "description 1",
      100,
      50,
      "note...",
      19.88,
      43
    );
    await myPositionDao.add("123456111111", 1234, 1234, 1234, 1234, 1234);
  });

  testSkuUpdatePosition(sharedData);
});

async function testSkuUpdatePosition(data) {
  test("update sku position", async () => {
    let res1 = await skuServiceInstance.updatePosition(
      data.id1,
      "123456789012"
    );
    let res2 = await skuServiceInstance.getById(data.id1);
    expect(res2).toEqual({
      id: data.id1,
      description: "description 1",
      weight: 100,
      volume: 50,
      notes: "note...",
      position: "123456789012",
      price: 19.88,
      availableQuantity: 43,
      testDescriptors: "[]",
    });
  });
}

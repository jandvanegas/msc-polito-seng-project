const skuService = require("../src/service/skuService");
const skuDao = require("../src/dao/mock/mock_sku_dao");
const positionDao = require("../src/dao/mock/mock_position_dao");
const skuServiceInstance = skuService(skuDao, positionDao);

describe("get all skus", () => {
  beforeEach(() => {
    skuDao.getAll.mockReset();
    skuDao.getAll.mockReturnValueOnce([
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
    ]);
  });

  test("get all skus", async () => {
    let res = await skuServiceInstance.getAll();
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
    ]);
  });
});

describe("get sku by id", () => {
  beforeEach(() => {
    skuDao.getById.mockReset();
    skuDao.getById
      .mockReturnValueOnce({
        id: 1,
        description: "a new sku",
        weight: 100,
        volume: 50,
        notes: "first SKU",
        position: null,
        availableQuantity: 50,
        price: 10.99,
        testDescriptors: "[]",
      })
      .mockReturnValue({
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

  test("get sku by id", async () => {
    let id1 = 1;
    let res1 = await skuServiceInstance.getById(id1);
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

  });
});

describe("add sku", () => {
  beforeEach(() => {
    skuDao.add.mockReset();
    skuDao.getAll.mockReset();
    skuDao.getAll.mockReturnValueOnce([
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
    ]);
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
    await skuServiceInstance.add(
      sku.description,
      sku.weight,
      sku.volume,
      sku.notes,
      sku.availableQuantity,
      sku.price
    );
    const result = await skuServiceInstance.getAll();
    expect(result).toEqual([
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
    ]);
  });
}); 

describe("update sku", () => {
  beforeEach(() => {
    skuDao.updateSku.mockReset();
    skuDao.getAll.mockReset();
    skuDao.getAll.mockReturnValueOnce([
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
        description: "new description",
        weight: 1000,
        volume: 1232,
        notes: "new note",
        position: null,
        availableQuantity: 50,
        price: 10.99,
        testDescriptors: "[]",
      },
    ]);
  });

  test("update sku", async () => {
    const newSku = {
      id: 2,
      newDescription: "new description",
      newWeight: 1000,
      newVolume: 1232,
      newNotes: "new note",
      newPrice: 19.99,
      newAvailableQuantity: 9999,
    };
    const update = await skuServiceInstance.updateById(
      newSku.id,
      newSku.newDescription,
      newSku.newWeight,
      newSku.notes,
      newSku.price,
      newSku.availableQuantity
    );
    expect(update).toEqual(undefined)
    let result = await skuServiceInstance.getAll()
    expect(result).toEqual([
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
        description: "new description",
        weight: 1000,
        volume: 1232,
        notes: "new note",
        position: null,
        availableQuantity: 50,
        price: 10.99,
        testDescriptors: "[]",
      },
    ]);
  });
});

describe("remove sku", () => {
  beforeEach(() => {
    skuDao.remove.mockReset();
  });

  test("remove sku", async () => {
    let res1 = await skuServiceInstance.remove(1)
    expect(res1).toEqual(undefined);
  });
});

describe("remove all sku", () => {
  beforeEach(() => {
    skuDao.deleteSkuData.mockReset();
  });

  test("remove sku", async () => {
    let res1 = await skuServiceInstance.deleteSkuData();
    expect(res1).toEqual(undefined);
  });
});

describe("update position", () => {
  beforeEach(() => {
    skuDao.updatePosition.mockReset();
  });

  test("update position", async () => {
    const data = {
      id: 1,
      newPosition: "73829183",
    };
    let res = await skuServiceInstance.updatePosition(data.id, data.newPosition);
    expect(res).toEqual(undefined);
  });
});

const skuService = require("../src/service/skuService");
const skuDao = require("../src/dao/skuDao");
const sqlite3 = require("sqlite3");


const db = new sqlite3.Database("ezwh.sqlite", (err) => {
    if (err) throw err;
  });

const mySkuDao = skuDao(db)

const skuServiceInstance = skuService(mySkuDao);

describe("get sku by id", ()=>{
    let sharedData = {}
    beforeAll(async ()=>{
        await mySkuDao.deleteSkuData()
        sharedData.id1 = await mySkuDao.add("description 1", 100, 50, "note...", 19.88, 43)
        sharedData.id2 = await mySkuDao.add("description 2", 100, 50, "note...", 19.88, 43)
        sharedData.id3 = await mySkuDao.add("description 3", 100, 50, "note...", 19.88, 43)
    })


    testSku(sharedData, 'id1', "description 1", 100, 50, "note...", 19.88, 43, "[]")
    testSku(sharedData, 'id2', "description 2", 100, 50, "note...", 19.88, 43, "[]")
    testSku(sharedData, 'id3', "description 3", 100, 50, "note...", 19.88, 43, "[]")
})

async function testSku(data, dataKey, description, weight, volume, notes, price, availableQuantity) {
    test("get sku", async ()=>{
        const id = data[dataKey]

        let res2 = await skuServiceInstance.getById(id)
        expect(res2).toEqual({
            id: id,
            description: description,
            weight:weight,
            volume: volume,
            notes:notes,
            position: null,
            price:price, 
            availableQuantity: availableQuantity,
            testDescriptors: "[]"
        })
    })
}

const {ResourceNotFoundError} = require("../utils/exceptions");
const helper = require("./helper");

function skuItemsApi(skuItemService) {
    const apiHelper = helper()
    const getAll = async (req, res) => {
        skuItemService.getAll()
            .then((rows) => {
                return res.status(200).json(rows);
            })
            .catch((err) => {
                console.log(err)
                return res.status(503).json({error: "Internal server error"});
            });
    }
    const getBySkuId = async (req, res) => {
        const skuID = Number(req.params.skuID)
        if (isNaN(skuID)) {
            return res.status(422).json({error: "invalid id"});
        }

        skuItemService.getBySkuId(skuID)
            .then((skuItem) => {
                console.log(`Sku items ${skuItem} returned`)
                return res.status(200).json(skuItem);
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(err)
                return res.status(500).end();
            });
    }
    const getByRfid = async (req, res) => {
        const rfid = req.params.rfid;
        if (isNaN(Number(rfid)) || rfid.length !== 32) {
            return res.status(422).json({error: "rfid error"});
        }
        await skuItemService.getByRfid(rfid)
            .then((value) => {
                return res.status(200).json(value);
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(err)
                return res.status(500).end();
            });
    }
    const add = async (req, res) => {
        try {
            apiHelper.validateFields(req, res, [
                    ['RFID', 'string'],
                    ['SKUId', 'number'],
                    ['DateOfStock', 'string'],
                ], [
                    isNaN(req.params.rfid)
                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
        }

        skuItemService.add(req.body.RFID, req.body.SKUId, req.body.DateOfStock)
            .then((id) => {
                console.log(`skuItem ${id} created.`)
                return res.status(201).end();
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {

                    return res.status(404).end();
                }
                console.log(err)
                return res.status(500).end();
            });
    }
    const update = async (req, res) => {
        try {
            apiHelper.validateFields(req, res, [
                    ['newRFID', 'string'],
                    ['newDateOfStock', 'string'],
                    ['newAvailable', 'number'],
                ], [
                    !isNaN(Number.parseInt(req.params.rfid)),
                    req.params.rfid.length === 32,
                    req.body.newRFID.length === 32,
                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
        }

        skuItemService.update(
            req.params.rfid,
            req.body.newAvailable,
            req.body.newDateOfStock,
            req.body.newRFID
        )
            .then(() => {
                res.status(200).json({message: "sku item updated"});
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(err)
                return res.status(500).end();
            });
    }
    const remove = async (req, res) => {
        if (isNaN(Number(req.params.rfid)) || req.params.rfid.length !== 32) {
            return res.status(422).json({error: "body or params validation error"});
        }
        await skuItemService
            .remove(req.params.rfid)
            .then(() => {
                res.status(204).json({message: "sku item deleted"});
            })
            .catch(() => {
                res.status(503).json({error: "generic error"});
            });
    }

    return {
        getAll: getAll,
        getBySkuId: getBySkuId,
        getByRfid: getByRfid,
        add: add,
        update: update,
        remove: remove,
    }
}

module.exports = skuItemsApi

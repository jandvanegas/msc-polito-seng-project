const helper = require("./helper");

function skuItemsApi(skuItemService) {
    const apiHelper = helper()
    const getAll = (req, res, next) => {
        skuItemService.getAll()
            .then((rows) => {
                return res.status(200).json(rows);
            })
            .catch((err) => next(err));
    }
    const getBySkuId = (req, res, next) => {
        const skuID = Number(req.params.skuID)
        if (isNaN(skuID)) {
            return res.status(422).json({error: "invalid id"});
        }

        skuItemService.getBySkuId(skuID)
            .then((skuItem) => {
                console.log(`Sku items ${skuItem} returned`)
                return res.status(200).json(skuItem);
            })
            .catch((err) => next(err));
    }
    const getByRfid = (req, res, next) => {
        const rfid = req.params.rfid;
        if (isNaN(Number(rfid)) || rfid.length !== 32) {
            return res.status(422).json({error: "rfid error"});
        }
        skuItemService.getByRfid(rfid)
            .then((value) => {
                return res.status(200).json(value);
            })
            .catch((err) => next(err));
    }
    const add = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [['RFID', 'string'],
                ['SKUId', 'number'],
                ['DateOfStock', 'string'],
            ],
        )
        if (!fieldsValid) return;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                isNaN(req.params.rfid)
            ]
        )
        if (!conditionsValid) return;

        skuItemService.add(req.body.RFID, req.body.SKUId, req.body.DateOfStock)
            .then((id) => {
                console.log(`skuItem ${id} created.`)
                return res.status(201).end();
            })
            .catch((err) => next(err));
    }
    const update = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [['newRFID', 'string'],
                ['newDateOfStock', 'string'],
                ['newAvailable', 'number'],
            ],
        )
        if (!fieldsValid) return;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                !isNaN(Number.parseInt(req.params.rfid)),
                req.params.rfid.length === 32,
                req.body.newRFID.length === 32,
            ]
        )
        if (!conditionsValid) return;

        skuItemService.update(
            req.params.rfid,
            req.body.newAvailable,
            req.body.newDateOfStock,
            req.body.newRFID
        )
            .then(() => {
                res.status(200).json({message: "sku item updated"});
            })
            .catch((err) => next(err));
    }
    const remove = (req, res, next) => {
        if (isNaN(Number(req.params.rfid)) || req.params.rfid.length !== 32) {
            return res.status(422).json({error: "body or params validation error"});
        }
        skuItemService
            .remove(req.params.rfid)
            .then(() => {
                res.status(204).json({message: "sku item deleted"});
            })
            .catch((err) => next(err));
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

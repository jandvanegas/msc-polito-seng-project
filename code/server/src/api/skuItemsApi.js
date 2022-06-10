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
        const id = Number.parseInt(req.params.skuID)
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(id),
                id >= 0
            ]
        )
        if (!conditionsValid) return;

        skuItemService.getBySkuId(id)
            .then((skuItem) => {
                console.log(`Sku items ${skuItem} returned`)
                return res.status(200).json(skuItem);
            })
            .catch((err) => next(err));
    }
    const getByRfid = (req, res, next) => {
        const rfid = req.params.rfid;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(Number.parseInt(rfid)),
                rfid && rfid.length === 32
            ]
        )
        if (!conditionsValid) return;

        skuItemService.getByRfid(rfid)
            .then((value) => {
                return res.status(200).json(value);
            })
            .catch((err) => next(err));
    }
    const add = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [
                ['RFID', 'string'],
                ['SKUId', 'number'],
                ['DateOfStock', 'string'],
            ],
        )
        if (!fieldsValid) return;

        const rfid = req.body.RFID;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(Number.parseInt(rfid)),
                rfid && rfid.length === 32
            ]
        )
        if (!conditionsValid) return;

        skuItemService.add(rfid, req.body.SKUId, req.body.DateOfStock)
            .then((id) => {
                console.log(`skuItem ${id} created.`)
                return res.status(201).end();
            })
            .catch((err) => next(err));
    }
    const update = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [
                ['newRFID', 'string'],
                ['newDateOfStock', 'string'],
                ['newAvailable', 'number'],
            ],
        )
        if (!fieldsValid) return;
        const rfid = req.params.rfid;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                rfid && Number.isInteger(Number.parseInt(rfid)),
                rfid && rfid.length === 32,
                req.body.newRFID.length === 32,
            ]
        )
        if (!conditionsValid) return;

        skuItemService.update(
            rfid,
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
        const rfid = req.params.rfid;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(Number.parseInt(rfid)),
                rfid && rfid.length === 32
            ]
        )
        if (!conditionsValid) return;

        skuItemService
            .remove(rfid)
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

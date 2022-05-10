function skuItemsApi(skuItemsDao) {
    const getAll = async (req, res) => {
        const result = await skuItemsDao
            .getAll()
            .then((value) => {
                return res.status(200).json(value);
            })
            .catch((err) => {
                return res.status(503).json({error: "Internal server error"});
            });
    }
    const getBySkuId = async (req, res) => {
        if (req.params.id === undefined) {
            return res.status(422).json({error: "no id"});
        }

        const result = await skuItemsDao
            .getBySkuId(req.params.id)
            .then((value) => {
                if (value.length === 0) {
                    return res.status(404).json({error: "items not found"});
                }
                return res.status(200).json(value);
            })
            .catch(() => {
                return res.status(503).json({error: "generic error"});
            });
    }
    const getByRfid = async (req, res) => {
        console.log("12345678901234567890123456789015");
        if (req.params.rfid === undefined) {
            return res.status(422).json({error: "no rfid"});
        }
        const result = await skuItemsDao
            .getByRfid(req.params.rfid)
            .then((value) => {
                if (value.length === 0) {
                    return res.status(404).json({error: "sku item not found"});
                } else {
                    return res.status(200).json({value});
                }
            })
            .catch(() => {
                return res.status(500).json({error: "general error"});
            });
    }
    const add = async (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res
                .status(422)
                .json({error: "validation of the body request failed"});
        }

        const add = await skuItemsDao
            .getBySkuId(req.body.SKUId)
            .then((value) => {
                if (value === undefined) {
                    res.status(404).json({error: "no sku for the specified Sku id"});
                } else {
                    const createdSkuItem = skuItemsDao
                        .add(req.body.RFID, req.body.SKUId, req.body.DateOfStock)
                        .then((value) => {
                            res.status(201).json({message: "sku item created"});
                        })
                        .catch(() => {
                            res.status(503).json({error: "generic error"});
                        });
                }
            })
            .catch(() => {
                res.status(404).json({error: "no sku for the specified Sku id"});
            });
    }
    const update = async (req, res) => {
        // 200, 503

        if (req.params.rfid === undefined || Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "body or params validation error"});
        }

        const skuItem = skuItemsDao
            .getByRfid(req.params.rfid)
            .then((value) => {
                if (value.length === 0) {
                    res.status(404).json({error: "sku item not found"});
                } else {
                    const update = skuItemsDao
                        .update(
                            req.params.rfid,
                            value[0].Available,
                            req.body.newAvailable,
                            req.body.newDateOfStock,
                            req.body.newRFID
                        )
                        .then(() => {
                            res.status(200).json({message: "sku item updated"});
                        })
                        .catch(() => {
                            res.status(503).json({error: "error during update sku item"});
                        });
                }
            })
            .catch(() => {
                res.status(503).json({message: "generic error"});
            });
    }
    const remove = async (req, res) => {
        // 204, 422, 503

        if (req.params.rfid === undefined || Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "body or params validation error"});
        }
        const result = await skuItemsDao
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

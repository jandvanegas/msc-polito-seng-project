const {ResourceNotFoundError} = require("../utils/exceptions");

function skusApi(skuService) {
    const getById = (req, res) => {
        if (isNaN(req.params.id)) {
            return res.status(422).json({error: "invalid id"});
        }
        skuService.getById(req.params.id)
            .then((sku) => {
                return res.status(200).json(sku);
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(err)
                return res.status(500).end();
            })
    }
    const getAll = (req, res) => {
        skuService.getAll()
            .then((skus) => {
                return res.status(200).json(skus);
            })
            .catch((err) => {
                console.log(err)
                return res.status(500).end();
            })
    }
    const add = (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "empty body request"});
        }
        skuService
            .add(
                req.body.description,
                req.body.weight,
                req.body.volume,
                req.body.notes,
                req.body.price,
                req.body.availableQuantity
            )
            .then((id) => {
                console.log(`Sku ${id} created.`)
                return res.status(201).end();
            })
            .catch((err) => {
                console.log(err)
                return res.status(500).end();
            });
    }

    const updateById = (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "empty body request"});
        }
        const id = req.params.id;
        if (req.params.id === undefined) {
            return res.status(422).json({error: "no id"});
        }

        const newDescription = req.body.newDescription;
        const newWeight = req.body.newWeight;
        const newVolume = req.body.newVolume;
        const newNotes = req.body.newNotes;
        const newPrice = req.body.newPrice;
        const newAvailableQuantity = req.body.newAvailableQuantity;

        skuService
            .updateById(
                id,
                newDescription,
                newWeight,
                newVolume,
                newNotes,
                newPrice,
                newAvailableQuantity
            )
            .then(() => {
                return res.status(200).end();
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(err)
                return res.status(503).end();
            });
    }
    const updatePosition = (req, res) => {

        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "empty body request"});
        }
        const id = req.params.id;
        if (req.params.id === undefined) {
            return res.status(422).json({error: "no id"});
        }
        const position = req.body.position;

        skuService
            .updatePosition(id, position)
            .then(() => {
                return res.status(200).end();
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(err);
                return res.status(503).end();
            });
    };

    const remove = async (req, res) => {

        const id = req.params.id;
        if (Number(req.params.id) < 0) {
            return res.status(422).json({error: "invalid id"});
        }
        skuService
            .remove(id)
            .then((value) => {
                return res.status(202).end();
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(err);
                return res.status(503).end();
            });
    };
    const deleteSkuData = async (req, res) => {
        console.log("remove all");
        skuService
            .deleteSkuData()
            .then(() => {
                return res.status(202).end();
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(err);
                return res.status(503).end();
            });
    };
    return {
        getById: getById,
        getAll: getAll,
        add: add,
        updateById: updateById,
        updatePosition: updatePosition,
        remove: remove,
        deleteSkuData: deleteSkuData,
    };
}

module.exports = skusApi;

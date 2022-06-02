const {ResourceNotFoundError, ValidationError} = require("../utils/exceptions");
const helper = require("./helper");

function skusApi(skuService) {
    const apiHelper = helper()
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
        try {
            apiHelper.validateFields(req, res, [
                    ['description', 'string'],
                    ['weight', 'number'],
                    ['volume', 'number'],
                    ['notes', 'string'],
                    ['price', 'number'],
                    ['availableQuantity', 'number'],
                ], [
                    req.body.weight >= 0,
                    req.body.volume >= 0,
                    req.body.price >= 0,
                    req.body.availableQuantity >= 0,
                    Number.isInteger(req.body.availableQuantity),
                    req.body.description.length > 0,
                    req.body.notes.length > 0
                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
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
        try {
            apiHelper.validateFields(req, res, [
                    ['newDescription', 'string'],
                    ['newWeight', 'number'],
                    ['newVolume', 'number'],
                    ['newNotes', 'string'],
                    ['newPrice', 'number'],
                    ['newAvailableQuantity', 'number'],
                ], [
                    req.body.newWeight >= 0,
                    req.body.newVolume >= 0,
                    req.body.newPrice >= 0,
                    req.body.newAvailableQuantity >= 0,
                    Number.isInteger(req.body.newAvailableQuantity),
                    req.body.newNotes.length > 0,
                    req.body.newDescription.length > 0,
                    Number.isInteger(parseInt(req.params.id)),
                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
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

        try {
            apiHelper.validateFields(req, res, [
                    ['position', 'string'],
                ], [
                    !isNaN(Number.parseInt(req.params.id)),
                    req.body.position.lenght === 12,
                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
        }
        const position = req.body.position;

        skuService
            .updatePosition(req.params.id, position)
            .then(() => {
                return res.status(200).end();
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                if (err instanceof ValidationError) {
                    return res.status(422).end()
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
                return res.status(204).end();
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

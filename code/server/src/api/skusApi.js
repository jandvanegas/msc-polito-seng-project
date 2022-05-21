const {ResourceNotFoundError} = require("../utils/exceptions");
const helper = require("./helper");

function skusApi(skuService) {
    const apiHelper = helper()
    const getById = (req, res) => {
        if (req.params.id instanceof String) {
            return res.status(422).json({error: "invalid id"});
        }
        skuService.getById(req.params.id)
            .then((sku) => {
                return res.status(200).json(sku);
            })
            .catch((error) => {
                if (error instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(error)
                return res.status(500).end();
            })
    }
    const getAll = (req, res) => {
        skuService.getAll()
            .then((skus) => {
                return res.status(200).json(skus);
            })
            .catch((error) => {
                console.log(error)
                return res.status(500).end();
            })
    }
    const add = (req, res) => {
        try {
            apiHelper.validateFields(req, res, [
                    ['description', 'string'],
                    ['notes', 'string'],
                    ['weight', 'number'],
                    ['price', 'number'],
                    ['availableQuantity', 'number'],
                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
        }

        skuService.add(
            req.body.description,
            req.body.weight,
            req.body.volume,
            req.body.notes,
            req.body.price,
            req.body.availableQuantity
        )
            .then(() => {
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
                    ['newNotes', 'string'],
                    ['newWeight', 'number'],
                    ['newVolume', 'number'],
                    ['newPrice', 'number'],
                    ['availableQuantity', 'number'],
                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
        }
        const id = req.params.id;
        if (req.params.id === undefined) {
            return res.status(422).json({error: "no id"});
        }

        skuService.updateById(
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
                    ['position', 'number'],
                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
        }
        const id = req.params.id;
        if (req.params.id === undefined) {
            return res.status(422).json({error: "no id"});
        }
        const position = req.params.position;

        skuService.updatePosition(id, position)
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
    const remove = async (req, res) => {
        const id = req.params.id;
        if (req.params.id === undefined) {
            return res.status(422).json({error: "no id"});
        }
        skuService.remove(id)
            .return(() => {
                return res.status(202).end();
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(err)
                return res.status(503).end();
            });
    }
    return {
        getById: getById,
        getAll: getAll,
        add: add,
        updateById: updateById,
        updatePosition: updatePosition,
        remove: remove

    }
}

module.exports = skusApi

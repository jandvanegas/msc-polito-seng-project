const helper = require("./helper");

function skusApi(skuService) {
    const apiHelper = helper()
    const getById = (req, res, next) => {
        const id = req.params.id;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(Number.parseInt(id)),
            ]
        )
        if (!conditionsValid) return;

        skuService.getById(id)
            .then((sku) => {
                return res.status(200).json(sku);
            })
            .catch((err) => next(err));
    }
    const getAll = (req, res, next) => {
        skuService.getAll()
            .then((skus) => {
                return res.status(200).json(skus);
            })
            .catch((err) => next(err));
    }
    const add = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [
                ['description', 'string'],
                ['weight', 'number'],
                ['volume', 'number'],
                ['notes', 'string'],
                ['price', 'number'],
                ['availableQuantity', 'number'],
            ],
        )
        if (!fieldsValid) return;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                req.body.weight >= 0,
                req.body.volume >= 0,
                req.body.price >= 0,
                req.body.availableQuantity >= 0,
                Number.isInteger(req.body.availableQuantity),
                req.body.description.length > 0,
                req.body.notes.length > 0
            ]
        )
        if (!conditionsValid) return;

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
            .catch((err) => next(err));
    }

    const updateById = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [
                ['newDescription', 'string'],
                ['newWeight', 'number'],
                ['newVolume', 'number'],
                ['newNotes', 'string'],
                ['newPrice', 'number'],
                ['newAvailableQuantity', 'number'],
            ],
        )
        if (!fieldsValid) return;
        const id = req.params.id;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                req.body.newWeight >= 0,
                req.body.newVolume >= 0,
                req.body.newPrice >= 0,
                req.body.newAvailableQuantity >= 0,
                Number.isInteger(req.body.newAvailableQuantity),
                req.body.newNotes.length > 0,
                req.body.newDescription.length > 0,
                Number.isInteger(parseInt(id)),
            ]
        )
        if (!conditionsValid) return;

        const newDescription = req.body.newDescription;
        const newWeight = req.body.newWeight;
        const newVolume = req.body.newVolume;
        const newNotes = req.body.newNotes;
        const newPrice = req.body.newPrice;
        const newAvailableQuantity = req.body.newAvailableQuantity;

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
            .catch((err) => next(err));
    }
    const updatePosition = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [
                ['position', 'string'],
            ],
        )
        if (!fieldsValid) return;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                !isNaN(Number.parseInt(req.params.id)),
                req.body.position.length === 12,
            ]
        )
        if (!conditionsValid) return;
        const position = req.body.position;

        skuService.updatePosition(req.params.id, position)
            .then(() => {
                return res.status(200).end();
            })
            .catch((err) => next(err));
    };

    const remove = (req, res, next) => {

        const id = req.params.id;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(Number.parseInt(id)),
            ]
        )
        if (!conditionsValid) return;

        skuService.remove(id)
            .then((value) => {
                console.log(`Deleted sku ${value}`)
                return res.status(204).end();
            })
            .catch((err) => next(err));
    };
    const deleteSkuData = (req, res, next) => {
        console.log("remove all");
        skuService
            .deleteSkuData()
            .then(() => {
                return res.status(202).end();
            })
            .catch((err) => next(err));
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

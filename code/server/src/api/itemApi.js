const helper = require("./helper");

function itemApi(itemService) {
    const apiHelper = helper()
    const getAll = (req, res, next) => {
        itemService.getAll()
            .then((rows) => {
                res.status(200).json(rows);
            })
            .catch((err) => next(err));
    }
    const add = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next,
            [['id', 'number'],
                ['description', 'string'],
                ['price', 'number'],
                ['SKUId', 'number'],
                ['supplierId', 'number'],
            ],
        )
        if (!fieldsValid) return;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(req.body.id),
                Number.isInteger(req.body.SKUId),
                Number.isInteger(req.body.supplierId),
            ]
        )
        if (!conditionsValid) return;

        itemService.add(
            req.body.id,
            req.body.description,
            req.body.price,
            req.body.SKUId,
            req.body.supplierId,
        )
            .then((id) => {
                console.log(`item ${id} created`)
                return res.status(201).end()
            })
            .catch((err) => next(err));
    }
    const getById = (req, res, next) => {
        const id = Number.parseInt(req.params.id)
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(id),
                id >=0
            ]
        )
        if (!conditionsValid) return;

        itemService.getById(id)
            .then((row) => {
                return res.status(200).json(row);
            })
            .catch((err) => next(err));

    }
    const remove = (req, res, next) => {
        const id = Number.parseInt(req.params.id)
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(id),
                id >=0
            ]
        )
        if (!conditionsValid) return;

        itemService.remove(id)
            .then(() => {
                return res.status(204).end()
            })
            .catch((err) => next(err));
    }
    const update = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [
                ['newDescription', 'string'],
                ['newPrice', 'number'],
            ],
        )
        if (!fieldsValid) return;
        const id = Number.parseInt(req.params.id)
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(id),
                id >= 0
            ]
        )
        if (!conditionsValid) return;

        itemService.update(req.params.id, req.body.newDescription, req.body.newPrice)
            .then((id) => {
                console.log(`Item ${id} update`)
                return res.status(200).end()
            })
            .catch((err) => next(err));
    }
    return {
        getAll: getAll,
        add: add,
        getById: getById,
        remove: remove,
        update: update
    }
}

module.exports = itemApi

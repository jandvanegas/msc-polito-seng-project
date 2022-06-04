const helper = require("./helper");

function returnOrdersApi(returnOrderService) {
    const apiHelper = helper()
    const getAll = (req, res, next) => {
        returnOrderService
            .getAll()
            .then((rows) => {
                res.status(200).json(rows);
            })
            .catch((err) => next(err));
    }
    const add = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [['returnDate', 'string'],
                ['restockOrderId', 'number'],
                ['products', 'object'],
            ],
        )
        if (!fieldsValid) return;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Array.isArray(req.body.products)]
        )
        if (!conditionsValid) return;

        returnOrderService.add(
            req.body.returnDate,
            req.body.products,
            req.body.restockOrderId,
        )
            .then((id) => {
                console.log(`Created returnOrder ${id}`)
                return res.status(201).end();
            })
            .catch((err) => next(err));

    }
    const getById = (req, res, next) => {
        const id = Number.parseInt(req.params.id)
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(id),
                id >= 0
            ]
        )
        if (!conditionsValid) return;

        returnOrderService.getById(id)
            .then((value) => {
                return res.status(200).json(value);
            })
            .catch((err) => next(err));
    }
    const remove = (req, res, next) => {
        const id = Number.parseInt(req.params.id)
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(id),
                id >= 0
            ]
        )
        if (!conditionsValid) return;

        returnOrderService.remove(id)
            .then(() => {
                console.log(`returnOrder ${id} removed`)
                return res.status(204).json({message: "returnOrder deleted"});
            })
            .catch((err) => next(err));
    }
    return {
        getAll: getAll,
        add: add,
        getById: getById,
        remove: remove,
    }
}

module.exports = returnOrdersApi

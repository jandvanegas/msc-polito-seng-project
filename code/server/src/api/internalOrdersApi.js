const helper = require("./helper");

function internalOrdersApi(internalOrderService) {
    const apiHelper = helper()
    const getAll = (req, res, next) => {
        internalOrderService.getAll()
            .then((row) => {
                return res.status(200).json(row);
            })
            .catch((err) => next(err));
    };
    const getById = (req, res, next) => {
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(parseInt(req.params.id)),
            ]
        )
        if (!conditionsValid) return;

        internalOrderService.getById(req.params.id)
            .then((value) => {
                return res.status(200).json(value);
            })
            .catch((err) => next(err));
    };
    const getAcceptedOrders = (req, res, next) => {
        return internalOrderService.getAcceptedOrders()
            .then((rows) => {
                return res.status(200).json(rows);
            })
            .catch((err) => next(err));
    };

    const getIssuedOrders = (req, res, next) => {
        return internalOrderService.getIssuedOrders()
            .then((rows) => {
                return res.status(200).json(rows);
            })
            .catch((err) => next(err));
    };

    const update = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [
                ['newState', 'string'],
                ['products', 'object'],
            ],
        )
        if (!fieldsValid) return;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(parseInt(req.params.id)),
            ]
        )
        if (!conditionsValid) return;

        internalOrderService.update(req.params.id, req.body.newState, req.body.products)
            .then((id) => {
                console.log(`Internal order ${id} updated`)
                return res.status(200).end();
            })
            .catch((err) => next(err));
    }
    const add = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [
                ['customerId', 'number'],
                ['products', 'object'],
            ],
        )
        if (!fieldsValid) return;

        internalOrderService
            .add(req.body.issueDate, req.body.products, req.body.customerId)
            .then((id) => {
                console.log(`Internal order ${id} created`)
                return res.status(201).end()
            })
            .catch((err) => next(err));
    };
    const remove = (req, res, next) => {
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(parseInt(req.params.id)),
            ]
        )
        if (!conditionsValid) return;

        internalOrderService
            .remove(req.params.id)
            .then(() => {
                res.status(204).end()
            })
            .catch((err) => next(err));
    };
    return {
        getAll: getAll,
        getById: getById,
        getAcceptedOrders: getAcceptedOrders,
        getIssuedOrders: getIssuedOrders,
        add: add,
        update: update,
        remove: remove,
    };
}

module.exports = internalOrdersApi;

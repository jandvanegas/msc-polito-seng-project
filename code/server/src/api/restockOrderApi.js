const helper = require("./helper");

function restockOrderApi(restockOrderService) {
    const apiHelper = helper()
    const orderStates = ['ISSUED', 'DELIVERY', 'DELIVERED', 'TESTED', 'COMPLETEDRETURN', 'COMPLETED']

    const getAll = (req, res, next) => {
        restockOrderService.getAll()
            .then((rows) => {
                res.status(200).json(rows);
            })
            .catch((err) => next(err));
    }

    const getIssued = (req, res, next) => {
        restockOrderService.getIssued()
            .then((rows) => {
                res.status(200).json(rows);
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

        restockOrderService.getById(id)
            .then((value) => {
                return res.status(200).json(value);
            })
            .catch((err) => next(err));
    }

    const getItems = (req, res, next) => {
        const id = Number.parseInt(req.params.id)
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(id),
                id >=0
            ]
        )
        if (!conditionsValid) return;

        restockOrderService.getItems(id)
            .then((rows) => {
                return res.status(200).json(rows);
            })
            .catch((err) => next(err));
    }

    const add = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [
                ['issueDate', 'string'],
                ['products', 'object'],
                ['supplierId', 'number'],
            ],
        )
        if (!fieldsValid) return;

        restockOrderService.add(
            req.body.issueDate,
            req.body.products,
            req.body.supplierId
        )
            .then((id) => {
                console.log(`Restock order ${id} was created.`)
                return res.status(201).json({message: "order created"});
            })
            .catch((err) => next(err));
    }

    const update = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [
                ['newState', 'string'],
            ],
        )
        if (!fieldsValid) return;

        const id = Number.parseInt(req.params.id)
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(id),
                id >=0
            ]
        )
        if (!conditionsValid) return;

        restockOrderService.update(id, req.body.newState)
            .then((id) => {
                console.log(`Restock order updated ${id}`)
                return res.status(200).end()
            })
            .catch((err) => next(err));
    }

    const addTransportNoteById = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [
                ['transportNote', 'object'],
            ],
        )
        if (!fieldsValid) return;

        const id = Number.parseInt(req.params.id)
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(id),
                id >=0
            ]
        )
        if (!conditionsValid) return;

        restockOrderService.addTransportNoteById(id, req.body.transportNote,
            req.body.transportNote.deliveryDate)
            .then((id) => {
                console.log(`Restock order updated ${id}`)
                return res.status(200).end()
            })
            .catch((err) => next(err));
    }
    const addItems = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [
                ['skuItems', 'object'],
            ],
        )
        if (!fieldsValid) return;

        const id = Number.parseInt(req.params.id)
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(id),
                id >=0
            ]
        )
        if (!conditionsValid) return;

        restockOrderService.addItems(id, req.body.skuItems)
            .then((id) => {
                console.log(`Added items on restock id ${id}`)
                return res.status(200).json({message: "Items added to the order"})
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

        restockOrderService.remove(id)
            .then(() => {
                console.log(`returnOrder ${id} removed`)
                return res.status(204).json({message: "returnOrder deleted"});
            })
            .catch((err) => next(err));
    }
    return {
        getAll: getAll,
        getIssued: getIssued,
        getById: getById,
        add: add,
        update: update,
        getItems: getItems,
        addItems: addItems,
        addTransportNoteById: addTransportNoteById,
        remove: remove
    }

}

module.exports = restockOrderApi

const {ResourceNotFoundError} = require("../utils/exceptions");

function internalOrdersApi(internalOrderService) {
    const getAll = (req, res) => {
        internalOrderService.getAll()
            .then((row) => {
                return res.status(200).json(row);
            })
            .catch((err) => {
                console.error(err)
                return res.status(503).json({error: "Internal server error"});
            });
    };
    const getById = async (req, res) => {
        if (req.params.id === undefined) {
            return res.status(422).json({error: "no id"});
        }

        internalOrderService.getById(req.params.id)
            .then((value) => {
                return res.status(200).json(value);
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(err)
                return res.status(503).end();
            });
    };
    const getAcceptedOrders = (req, res) => {
        return internalOrderService.getAcceptedOrders()
            .then((rows) => {
                return res.status(200).json(rows);
            })
            .catch(() => {
                return res.status(500).json({error: "general error"});
            });
    };

    const getIssuedOrders = async (req, res) => {
        return internalOrderService.getIssuedOrders()
            .then((rows) => {
                return res.status(200).json(rows);
            })
            .catch(() => {
                return res.status(500).json({error: "general error"});
            });
    };

    const update = (req, res) => {
        if (req.params.id === undefined || Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "body or params validation error"});
        }
        internalOrderService.update(req.params.id, req.body.newState, req.body.products)
            .then((id) => {
                console.log(`Internal order ${id} updated`)
                return res.status(200).end();
            })
            .catch((err) => {
                console.error(err)
                return res.status(503).end();
            })
    }
    const add = (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "body validation error"});
        }
        internalOrderService
            .add(req.body.issueDate, req.body.products, req.body.customerId)
            .then((id) => {
                console.log(`Internal order ${id} created`)
                return res.status(201).end()
            })
            .catch((err) => {
                console.error(err);
                return res.status(503).json({error: "generic error"});
            });
    };
    const remove = (req, res) => {
        if (req.params.id === undefined) {
            return res.status(422).json({error: "body or params validation error"});
        }
        internalOrderService
            .remove(req.params.id)
            .then(() => {
                res.status(204).end()
            })
            .catch(() => {
                res.status(503).json({error: "generic error"});
            });
    };
    // internalOrders Accepted is still remaining

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

const {ResourceNotFoundError, ValidationError} = require("../utils/exceptions");

function restockOrderApi(restockOrderService) {
    const orderStates = ['ISSUED', 'DELIVERY', 'DELIVERED', 'TESTED', 'COMPLETEDRETURN', 'COMPLETED']

    const getAll = (req, res) => {
        restockOrderService.getAll()
            .then((rows) => {
                res.status(200).json(rows);
            })
            .catch((err) => {
                console.error(err)
                res.status(500).json({error: "generic error"});
            });
    }

    const getIssued = (req, res) => {
        restockOrderService.getIssued()
            .then((rows) => {
                res.status(200).json(rows);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({error: "generic error"});
            });
    }

    const getById = (req, res) => {
        if (req.params.id === undefined) {
            return res.status(422).json({error: "no id"});
        }

        if (req.params.id instanceof Number) {
            return res.status(422).json({error: "wrong id type"})
        }

        restockOrderService.getById(req.params.id)
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
    }

    const getItems = async (req, res) => {
        if (req.params.id === undefined) {
            return res.status(422).json({error: "no id"});
        }
        if (req.params.id instanceof Number) {
            return res.status(422).json({error: "wrong id type"});
        }

        restockOrderService.getItems(req.params.id).then((rows) => {
            return res.status(200).json(rows);
        }).catch((err) => {
            if (err instanceof ResourceNotFoundError) {
                return res.status(404).end();
            }
            if (err instanceof ValidationError) {
                return res.status(422).json({error: err.message});
            }
            console.log(err)
            return res.status(503).end();
        });
    }

    const add = (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "empty body request"});
        }

        if (req.body.issueDate === undefined || req.body.products === undefined || req.body.supplierId === undefined) {
            return res.status(422).json({error: "wrong value in the body"})

        }

        if (req.body.issueDate instanceof String || req.body.products instanceof String || req.body.supplierId instanceof Number) {
            return res.status(422).json({error: "wrong type(s) in the body"})
        }

        restockOrderService.add(
            req.body.issueDate,
            req.body.products,
            req.body.supplierId
        )
            .then((id) => {
                console.log(`Restock order ${id} was created.`)
                return res.status(201).json({message: "order created"});
            })
            .catch((err) => {
                console.log(err);
                return res.status(503).json({error: "generic error"});
            });
    }

    const update = (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "empty body request"});
        }

        if (typeof (req.body.newState) !== 'string' ||
            !orderStates.includes(req.body.newState)) {
            return res.status(422).json({error: "wrong value in the body"})
        }

        restockOrderService.update(req.params.id, req.body.newState)
            .then((id) => {
                console.log(`Restock order updated ${id}`)
                return res.status(200).end()
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                if (err instanceof ValidationError) {
                    return res.status(422).json({error: err.message});
                }
                return res.status(503).json({error: "generic error"})
            })
    }

    const addTransportNoteById = (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "empty body request"});
        }

        if (typeof (req.body.transportNote) !== 'object' ||
            req.body.transportNote.deliveryDate === undefined) {
            return res.status(422).json({error: "wrong value in the body"})
        }

        restockOrderService.addTransportNoteById(req.params.id, req.body.transportNote,
            req.body.transportNote.deliveryDate)
            .then((id) => {
                console.log(`Restock order updated ${id}`)
                return res.status(200).end()
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                if (err instanceof ValidationError) {
                    return res.status(422).json({error: err.message});
                }
                return res.status(503).json({error: "generic error"})
            })
    }
    const addItems = async (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "empty body request"});
        }
        if (req.body.skuItems instanceof String) {
            return res.status(422).json({error: "wrong type in the body"})
        }

        restockOrderService.addItems(req.params.id, req.body.skuItems)
            .then((id) => {
                console.log(`Added items on restock id ${id}`)
                return res.status(200).json({message: "Items added to the order"})
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                if (err instanceof ValidationError) {
                    return res.status(422).json({error: err.message});
                }
                console.log(err)
                return res.status(503).end();
            });
    }
    const remove = async (req, res) => {
        const id = req.params.id;
        if (Number(req.params.id) < 0) {
            return res.status(422).json({error: "invalid id"});
        }
        restockOrderService.remove(id).then(() => {
            console.log(`returnOrder ${id} removed`)
            return res.status(204).json({message: "returnOrder deleted"});
        }).catch((err) => {
            console.log(err)
            return res.status(503).json({message: "Service Unavailable"});
        });
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

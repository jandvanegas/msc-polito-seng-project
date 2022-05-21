const helper = require("./helper");
const {ResourceNotFoundError} = require("../utils/exceptions");

function returnOrdersApi(returnOrderService) {
    const apiHelper = helper()
    const getAll = (req, res) => {
        returnOrderService
            .getAll()
            .then((rows) => {
                res.status(200).json(rows);
            })
            .catch(() => {
                res.status(500).json({error: "generic error"});
            });
    }
    const add = (req, res) => {
        try {
            apiHelper.validateFields(req, res, [
                    ['returnDate', 'string'],
                    ['restockOrderId', 'number'],
                    ['products', 'object'],
                ], [
                    Array.isArray(req.body.products)]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
        }

        returnOrderService.add(
            req.body.returnDate,
            req.body.products,
            req.body.restockOrderId,
        ).then((id) => {
            console.log(`Created returnOrder ${id}`)
            return res.status(201).end();
        })
            .catch((err) => {
                console.log(err)
                return res.status(503).json({error: "generic error"});
            });
    }
    const getById = (req, res) => {
        if (req.params.id instanceof String) {
            return res.status(422).json({error: "invalid id"});
        }
        returnOrderService.getById(req.params.id).then((value) => {
            return res.status(200).json(value);
        }).catch((err) => {
            if (err instanceof ResourceNotFoundError) {
                return res.status(404).end();
            }
            console.log(err)
            return res.status(500).json({error: err});
        });

    }
    const remove = async (req, res) => {
        const id = req.params.id;
        if (req.params.id === undefined) {
            return res.status(422).json({error: "no id"});
        }
        returnOrderService.remove(id).then(() => {
            console.log(`returnOrder ${id} removed`)
            return res.status(204).json({message: "returnOrder deleted"});
        }).catch((err) => {
            console.log(err)
            return res.status(503).json({message: "Service Unavailable"});
        });
    }
    return {
        getAll: getAll,
        add: add,
        getById: getById,
        remove: remove,
    }
}

module.exports = returnOrdersApi

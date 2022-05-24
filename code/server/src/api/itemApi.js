const {ResourceNotFoundError} = require("../utils/exceptions");

function itemApi(itemService) {
    const getAll = (req, res) => {
        itemService.getAll()
            .then((rows) => {
                res.status(200).json(rows);
            })
            .catch(() => {
                res.status(500).json({error: "generic error"});
            });
    }
    const add = (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "empty body request"});
        }
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
            .catch((err) => {
                console.error(err)
                return res.status(503).json({error: "generic error"});
            });
    }
    const getById = (req, res) => {
        if (req.params.id instanceof String) {
            return res.status(422).json({error: "invalid id"});
        }
        itemService.getById(req.params.id).then((row) => {
            return res.status(200).json(row);
        }).catch((err) => {
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
        itemService.remove(id).then(() => {
            return res.status(204).end()
        }).catch((err) => {
            console.log(err)
            return res.status(503).json({message: "Service Unavailable"});
        });
    }
    const update = (req, res) => {
        if (isNaN(req.params.id)) {
            return res.status(422).json({error: "no id"});
        }

        itemService.update(req.params.id, req.body.newDescription, req.body.newPrice)
            .then((id) => {
                console.log(`Item ${id} update`)
                return res.status(200).end()
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(err)
                return res.status(503).end();
            })
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

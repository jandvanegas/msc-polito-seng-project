const {ResourceNotFoundError} = require("../utils/exceptions");
const helper = require("./helper");

function testDescriptorsApi(testDescriptorService) {
    const apiHelper = helper()
    const getAll = (req, res) => {
        testDescriptorService.getAll()
            .then((rows) => {
                res.status(200).json(rows);
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({error: "generic error"});
            });
    }
    const add = (req, res) => {
        try {
            apiHelper.validateFields(req, res, [
                    ['name', 'string'],
                    ['procedureDescription', 'string'],
                    ['idSKU', 'number'],
                ], [

                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
        }
        testDescriptorService.add(
            req.body.name,
            req.body.procedureDescription,
            req.body.idSKU,
        )
            .then((id) => {
                console.log(`testDescriptor ${id} created`)
                return res.status(201).end();
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.error(err)
                return res.status(503).json({error: "generic error"});
            });
    }
    const getById = (req, res) => {
        if (req.params.id instanceof String) {
            return res.status(422).json({error: "invalid id"});
        }
        testDescriptorService.getById(req.params.id)
            .then((rows) => {
                return res.status(200).json(rows);
            }).catch((err) => {
            if (err instanceof ResourceNotFoundError) {
                return res.status(404).end();
            }
            console.log(err);
            return res.status(503).end();
        });

    }
    const update = (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "empty body request"});
        }
        const id = req.params.id;
        if (req.params.id === undefined) {
            return res.status(422).json({error: "no id"});
        }

        testDescriptorService.update(
            id,
            req.body.newName,
            req.body.newProcedureDescription,
            req.body.newIdSKU,
        )
            .then(() => {
                console.log(`Test descriptor ${id} updated.`)
                return res.status(200).end();
            })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(err);
                return res.status(503).end();
            })
    }

    const remove = (req, res) => {
        const id = req.params.id;
        if (isNaN(Number.parseInt(id))) {
            return res.status(422).json({error: "no id"});
        }
        testDescriptorService.remove(id)
            .then(() => {
                return res.status(204).end();
            })
            .catch((err) => {
                console.log(err)
                return res.status(503).json({message: "Service Unavailable"});
            });
    }
    return {
        getAll: getAll,
        add: add,
        getById: getById,
        update: update,
        remove: remove,
    }
}

module.exports = testDescriptorsApi

function testDescriptorsApi(testDescriptorsDao) {
    const getAll = (req, res) => {
        testDescriptorsDao
            .getAll()
            .then((value) => {
                res.status(200).json(value);
            })
            .catch(() => {
                res.status(500).json({error: "generic error"});
            });
    }
    const add = (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "empty body request"});
        }

        testDescriptorsDao.add(
            req.body.name,
            req.body.procedureDescription,
            req.body.idSKU,
        ).then((value) => {
            return res.status(201).json({message: "created"});
        })
            .catch((err) => {
                return res.status(503).json({error: "generic error"});
            });
    }
    const getById = (req, res) => {
        if (req.params.id instanceof String) {
            return res.status(422).json({error: "invalid id"});
        }
        testDescriptorsDao.getById(req.params.id).then((value) => {
            let message = {
                array: value,
            };
            if (value.length === 0) {
                return res.status(404).json({error: "not found"});
            } else {
                return res.status(200).json(message);
            }
        }).catch((err) => {
            let error = {
                message: "Internal Server Error",
            };
            return res.status(500).json(error);
        });

    }
    const update = async (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "empty body request"});
        }
        const id = req.params.id;
        if (req.params.id === undefined) {
            return res.status(422).json({error: "no id"});
        }

        await testDescriptorsDao.getById(id)
            .then((value) => {
                testDescriptorsDao.update(
                    id,
                    req.body.newName ? req.body.newName : value.name,
                    req.body.newProcedureDescription ? req.body.newProcedureDescription : value.procedureDescription,
                    req.body.newIdSKU ? req.body.newIdSKU : value.idSKU,
                ).then(() => {
                    return res.status(200).end();
                })
                    .catch((err) => {
                        console.log(err);
                        return res.status(503).json({message: "Service Unavailable"});
                    });
            })
            .catch((err) => {
                console.log(err)
                return res.status(404).json({message: "Not Found"});
            });
    }

    const remove = async (req, res) => {
        const id = req.params.id;
        if (req.params.id === undefined) {
            return res.status(422).json({error: "no id"});
        }
        testDescriptorsDao.remove(id).then(() => {
            return res.status(202).json({message: "sku deleted"});
        }).catch((err) => {
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

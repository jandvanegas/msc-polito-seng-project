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
    return {
        getAll: getAll,
        add: add,
        getById: getById

    }
}

module.exports = testDescriptorsApi

function returnOrdersApi(returnOrdersDao) {
    const getAll = (req, res) => {
        returnOrdersDao
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

        returnOrdersDao.add(
            req.body.returnDate,
            req.body.products,
            req.body.restockOrderId,
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
        returnOrdersDao.getById(req.params.id).then((value) => {
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
    

    const remove = async (req, res) => {
        const id = req.params.id;
        if (req.params.id === undefined) {
            return res.status(422).json({error: "no id"});
        }
        returnOrdersDao.remove(id).then(() => {
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

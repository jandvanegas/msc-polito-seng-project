function testResultsApi(testResultsDao) {
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

        testResultsDao.add(
            req.body.rfid,
            req.body.idTestDescriptor,
            req.body.Date,
            req.body.Result ? 1 : 0,
        ).then((value) => {
            return res.status(201).end();
        })
            .catch((err) => {
                console.error(err)
                return res.status(503).json({error: "Service Unavailable"});
            });
    }
    const getByRfid = (req, res) => {
        testResultsDao.getByRfid(req.params.rfid).then((value) => {
            if (value.length === 0) {
                return res.status(404).json({error: "not found"});
            } else {
                return res.status(200).json(value);
            }
        }).catch((err) => {
            console.error(err)
            let error = {
                message: "Internal Server Error",
            };
            return res.status(500).json(error);
        });
    }
    const getByRfidAndId = (req, res) => {
        if (Number.isNaN(req.params.id)) {
            return res.status(422).json({error: "invalid id"});
        }
        if (Number.isNaN(req.params.rfid)) {
            return res.status(422).json({error: "invalid rfid"});
        }
        testResultsDao.getByRfidAndId(req.params.rfid, req.params.id).then((value) => {
            if (value.length === 0) {
                return res.status(404).json({error: "not found"});
            } else {
                return res.status(200).json(value[0]);
            }
        }).catch((err) => {
            console.error(err)
            let error = {
                message: "Internal Server Error",
            };
            return res.status(500).json(error);
        });
    }
    const update = async (req, res) => {
        if (Number.isNaN(req.params.id)) {
            return res.status(422).json({error: "invalid id"});
        }
        if (Number.isNaN(req.params.rfid)) {
            return res.status(422).json({error: "invalid rfid"});
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "empty body request"});
        }

        await testResultsDao.getByRfidAndId(req.params.rfid, req.params.id)
            .then((value) => {
                testResultsDao.update(
                    req.params.rfid,
                    req.params.id,
                    req.body.newIdTestDescriptor ? req.body.newIdTestDescriptor : value.newIdTestDescriptor,
                    req.body.newDate ? req.body.newDate : value.newDate,
                    req.body.newResult ? req.body.newResult : value.newResult,
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
        if (Number.isNaN(req.params.id)) {
            return res.status(422).json({error: "invalid id"});
        }
        if (Number.isNaN(req.params.rfid)) {
            return res.status(422).json({error: "invalid rfid"});
        }
        testResultsDao.remove(req.params.rfid, req.params.id).then(() => {
            return res.status(202).json({message: "sku deleted"});
        }).catch((err) => {
            console.log(err)
            return res.status(503).json({message: "Service Unavailable"});
        });
    }
    return {
        getAll: getAll,
        add: add,
        getByRfid: getByRfid,
        getByRfidAndId: getByRfidAndId,
        update: update,
        remove: remove,
    }
}

module.exports = testResultsApi

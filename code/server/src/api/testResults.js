const {ResourceNotFoundError} = require("../utils/exceptions");
const helper = require("./helper");

function testResultsApi(testResultService) {
    const apiHelper = helper()
    const getAll = (req, res) => {
        testResultService
            .getAll()
            .then((rows) => {
                res.status(200).json(rows);
            })
            .catch((err) => {
                console.error(err)
                res.status(500).json({error: "generic error"});
            });
    }
    const add = (req, res) => {
        try {
            apiHelper.validateFields(req, res, [
                    ['rfid', 'string'],
                    ['idTestDescriptor', 'number'],
                    ['Date', 'string'],
                    ['Result', 'boolean'],
                ], [
                    req.body.rfid.length === 32
                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
        }
        testResultService.add(
            req.body.rfid,
            Number(req.body.idTestDescriptor),
            req.body.Date,
            req.body.Result ? 1 : 0,
        ).then((id) => {
            console.log(`Test result ${id} created`)
            return res.status(201).end();
        })
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(err);
                return res.status(503).end();
            });
    }
    const getByRfid = (req, res) => {
        if (Number.isNaN(Number.parseInt(req.params.rfid)) ||
            req.params.rfid.length !== 32
        ) {
            return res.status(422).json({error: "invalid rfid"});
        }
        testResultService.getByRfid(req.params.rfid)
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
    const getByRfidAndId = (req, res) => {
        if (Number.isNaN(req.params.id)) {
            return res.status(422).json({error: "invalid id"});
        }
        if (Number.isNaN(req.params.rfid)) {
            return res.status(422).json({error: "invalid rfid"});
        }
        testResultService.getByRfidAndId(req.params.rfid, Number.parseInt(req.params.id))
            .then((row) => {
                return res.status(200).json(row);
            }).catch((err) => {
            if (err instanceof ResourceNotFoundError) {
                return res.status(404).end();
            }
            console.log(err);
            return res.status(503).end();
        });
    }
    const update = (req, res) => {
        try {
            apiHelper.validateFields(req, res, [
                    ['newIdTestDescriptor', 'number'],
                    ['newDate', 'string'],
                    ['newResult', 'boolean'],
                ], [
                !Number.isNaN(Number.parseInt(req.params.id)),
                !Number.isNaN(Number.parseInt(req.params.rfid)),
                    req.params.rfid.length === 32
                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
        }
        testResultService.update(
            req.params.rfid,
            req.params.id,
            req.body.newIdTestDescriptor,
            req.body.newDate,
            req.body.newResult,
        )
            .then((id) => {
                console.log(`Test Result ${id} updated`)
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

    const remove = async (req, res) => {
        if (Number.isNaN(req.params.id)) {
            return res.status(422).json({error: "invalid id"});
        }
        if (Number.isNaN(req.params.rfid)) {
            return res.status(422).json({error: "invalid rfid"});
        }
        testResultService.remove(req.params.rfid, req.params.id).then((id) => {
            console.log(`Test Result ${id} removed`)
            return res.status(204).end();
        }).catch((err) => {
            if (err instanceof ResourceNotFoundError) {
                return res.status(404).end();
            }
            console.log(err);
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

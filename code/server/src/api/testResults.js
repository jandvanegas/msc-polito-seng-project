const helper = require("./helper");

function testResultsApi(testResultService) {
    const apiHelper = helper()
    const getAll = (req, res, next) => {
        testResultService
            .getAll()
            .then((rows) => {
                res.status(200).json(rows);
            })
            .catch((err) => next(err));
    }
    const add = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [['rfid', 'string'],
                ['idTestDescriptor', 'number'],
                ['Date', 'string'],
                ['Result', 'boolean'],
            ],
        )
        if (!fieldsValid) return;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                req.body.rfid.length === 32
            ]
        )
        if (!conditionsValid) return;
        testResultService.add(
            req.body.rfid,
            Number(req.body.idTestDescriptor),
            req.body.Date,
            req.body.Result ? 1 : 0,
        )
            .then((id) => {
                console.log(`Test result ${id} created`)
                return res.status(201).end();
            })
            .catch((err) => next(err));
    }
    const getByRfid = (req, res, next) => {
        if (Number.isNaN(Number.parseInt(req.params.rfid)) ||
            req.params.rfid.length !== 32
        ) {
            return res.status(422).json({error: "invalid rfid"});
        }
        testResultService.getByRfid(req.params.rfid)
            .then((rows) => {
                return res.status(200).json(rows);
            })
            .catch((err) => next(err));
    }
    const getByRfidAndId = (req, res, next) => {
        if (Number.isNaN(req.params.id)) {
            return res.status(422).json({error: "invalid id"});
        }
        if (Number.isNaN(req.params.rfid)) {
            return res.status(422).json({error: "invalid rfid"});
        }
        testResultService.getByRfidAndId(req.params.rfid, Number.parseInt(req.params.id))
            .then((row) => {
                return res.status(200).json(row);
            })
            .catch((err) => next(err));
    }
    const update = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [['newIdTestDescriptor', 'number'],
                ['newDate', 'string'],
                ['newResult', 'boolean'],
            ],
        )
        if (!fieldsValid) return;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                !Number.isNaN(Number.parseInt(req.params.id)),
                !Number.isNaN(Number.parseInt(req.params.rfid)),
                req.params.rfid.length === 32
            ]
        )
        if (!conditionsValid) return;
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
            .catch((err) => next(err));

    }

    const remove = (req, res, next) => {
        if (Number.isNaN(req.params.id)) {
            return res.status(422).json({error: "invalid id"});
        }
        if (Number.isNaN(req.params.rfid)) {
            return res.status(422).json({error: "invalid rfid"});
        }
        testResultService.remove(req.params.rfid, req.params.id)
            .then((id) => {
                console.log(`Test Result ${id} removed`)
                return res.status(204).end();
            })
            .catch((err) => next(err));
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

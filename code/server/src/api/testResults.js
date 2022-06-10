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

        const rfid = req.body.rfid;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(Number.parseInt(rfid)),
                rfid && rfid.length === 32
            ]
        )
        if (!conditionsValid) return;

        testResultService.add(
            rfid,
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
        const rfid = req.params.rfid;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(Number.parseInt(rfid)),
                rfid && rfid.length === 32
            ]
        )
        if (!conditionsValid) return;

        testResultService.getByRfid(rfid)
            .then((rows) => {
                return res.status(200).json(rows);
            })
            .catch((err) => next(err));
    }
    const getByRfidAndId = (req, res, next) => {
        const rfid = req.params.rfid;
        const id = Number.parseInt(req.params.id);
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(Number.parseInt(rfid)),
                Number.isInteger(id),
                rfid && rfid.length === 32
            ]
        )
        if (!conditionsValid) return;

        testResultService.getByRfidAndId(rfid, id)
            .then((row) => {
                return res.status(200).json(row);
            })
            .catch((err) => next(err));
    }
    const update = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [
                ['newIdTestDescriptor', 'number'],
                ['newDate', 'string'],
                ['newResult', 'boolean'],
            ],
        )
        if (!fieldsValid) return;

        const rfid = req.params.rfid;
        const id = req.params.id;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(Number.parseInt(id)),
                Number.isInteger(Number.parseInt(rfid)),
                rfid && rfid.length === 32
            ]
        )
        if (!conditionsValid) return;

        testResultService.update(
            rfid,
            id,
            req.body.newIdTestDescriptor,
            req.body.newDate,
            req.body.newResult,
        )
            .then((idOut) => {
                console.log(`Test Result ${idOut} updated`)
                return res.status(200).end();
            })
            .catch((err) => next(err));
    }

    const remove = (req, res, next) => {
        const rfid = req.params.rfid;
        const id = req.params.id;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(Number.parseInt(id)),
                Number.isInteger(Number.parseInt(rfid)),
                rfid.length === 32
            ]
        )
        if (!conditionsValid) return;

        testResultService.remove(rfid, id)
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

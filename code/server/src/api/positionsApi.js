const helper = require('./helper')

function positionsApi(positionService) {
    const apiHelper = helper()
    const getAll = (req, res, next) => {
        positionService
            .getAll()
            .then((value) => {
                res.status(200).json(value);
            })
            .catch((err) => next(err));
    }
    const add = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [['positionID', 'string'],
                ['aisleID', 'string'],
                ['row', 'string'],
                ['col', 'string'],
                ['maxWeight', 'number'],
                ['maxVolume', 'number'],
            ],
        )
        if (!fieldsValid) return;

        const conditionsValid = apiHelper.conditionsValid(next,
            [
                req.body.positionID.length === 12,
                req.body.aisleID.length === 4,
                req.body.row.length === 4,
                req.body.col.length === 4,
                req.body.maxVolume > 0,
                req.body.maxWeight > 0,
            ]
        )
        if (!conditionsValid) return true;

        positionService.add(
            req.body.positionID,
            req.body.aisleID,
            req.body.row,
            req.body.col,
            req.body.maxWeight,
            req.body.maxVolume
        )
            .then(() => {
                res.status(201).json({message: "position created"});
            })
            .catch((err) => next(err));
    }

    const updateFull = (req, res, next) => {

        const fieldsValid = apiHelper.fieldsValid(req, res, next, [['newAisleID', 'string'],
                ['newRow', 'string'],
                ['newCol', 'string'],
                ['newMaxWeight', 'number'],
                ['newMaxVolume', 'number'],
                ['newOccupiedWeight', 'number'],
                ['newOccupiedVolume', 'number'],
            ],
        )
        if (!fieldsValid) return;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(parseInt(req.params.positionID)),
                req.body.newAisleID.length === 4,
                req.body.newRow.length === 4,
                req.body.newCol.length === 4,
                req.body.newMaxVolume > 0,
                req.body.newMaxWeight > 0,
                req.body.newOccupiedWeight > 0,
                req.body.newOccupiedVolume > 0,
            ]
        )
        if (!conditionsValid) return;

        positionService.updateFull(
            req.params.positionID,
            req.body.newAisleID,
            req.body.newRow,
            req.body.newCol,
            req.body.newMaxWeight,
            req.body.newMaxVolume,
            req.body.newOccupiedWeight,
            req.body.newOccupiedVolume,
        )
            .then((sku) => {
                return res.status(200).json(sku);
            })
            .catch((err) => next(err));
    }
    const update = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [['newPositionID', 'string'],
            ],
        )
        if (!fieldsValid) return;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                typeof (req.params.positionID) === "string",
                req.body.newPositionID.length === 12,
                Number.isInteger(parseInt(req.params.positionID)),
            ]
        )
        if (!conditionsValid) return;

        positionService.update(Number(req.params.positionID), Number(req.body.newPositionID))
            .then((position) => {
                return res.status(200).json(position)
            })
            .catch((err) => next(err));
    }
    const remove = (req, res, next) => {
        const id = parseInt(req.params.positionID)
        if (!Number.isInteger(id)) {
            return res.status(422).json({error: "no id"});
        }
        positionService.remove(id)
            .then((id) => {
                return res.status(204).json({message: "position deleted"});
            })
            .catch((err) => next(err));
    }
    return {
        getAll: getAll,
        add: add,
        updateFull: updateFull,
        update: update,
        remove: remove,
    }
}

module.exports = positionsApi

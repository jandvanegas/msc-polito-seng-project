const {ResourceNotFoundError} = require("../utils/exceptions");

const helper = require('./helper')

function positionsApi(positionService) {
    const apiHelper = helper()
    const getAll = (req, res) => {
        positionService
            .getAll()
            .then((value) => {
                res.status(200).json(value);
            })
            .catch((err) => {
                console.error(err)
                res.status(500).json({error: "generic error"});
            });
    }
    const add = async (req, res) => {
        try {
            apiHelper.validateFields(req, res, [
                    ['positionID', 'string'],
                    ['aisleID', 'string'],
                    ['row', 'string'],
                    ['col', 'string'],
                    ['maxWeight', 'number'],
                    ['maxVolume', 'number'],
                ],
                [
                    req.body.positionID.length === 12,
                    req.body.aisleID.length === 4,
                    req.body.row.length === 4,
                    req.body.col.length === 4,
                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
        }

        await positionService
            .add(
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
            .catch((err) => {
                console.log(err);
                res.status(503).json({error: "generic error"});
            });
    }
    const updateFull = async (req, res) => {

        try {
            apiHelper.validateFields(req, res, [
                    ['positionID', 'string'],
                    ['newAisleID', 'string'],
                    ['newRow', 'string'],
                    ['newCol', 'string'],
                    ['newMaxWeight', 'number'],
                    ['newMaxVolume', 'number'],
                    ['newOccupiedWeight', 'number'],
                    ['newOccupiedVolume', 'number'],
                ],
                [
                    typeof (req.params.positionID) === "number",
                    req.body.positionID.length === 12,
                    req.body.newAisleID.length === 4,
                    req.body.newRow.length === 4,
                    req.body.newCol.length === 4,
                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
        }

        positionService.updateFull(
            req.params.id,
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
            .catch((err) => {
                if (err instanceof ResourceNotFoundError) {
                    return res.status(404).end();
                }
                console.log(err)
                return res.status(503).end();
            })
    }
    const update = async (req, res) => {
        try {
            apiHelper.validateFields(req, res, [
                    ['newPositionID', 'string'],
                ],
                [
                    typeof (req.params.positionID) === "string",
                    req.body.newPositionID.length === 12,
                ]
            )
        } catch (err) {
            return res.status(422).json({error: err.message});
        }

        positionService.update(Number(req.params.positionID), Number(req.body.newPositionID)).then((position) => {
            return res.status(200).json(position)
        }).catch((err) => {
            if (err instanceof ResourceNotFoundError) {
                return res.status(404).end();
            }
            console.log(err)
            return res.status(503).end();
        })
    }
    const remove = async (req, res) => {
        const id = req.params.positionID;
        if (req.params.positionID === undefined) {
            return res.status(422).json({error: "no id"});
        }
        await positionService.remove(id)
            .then((id) => {
                return res.status(202).json({message: "position deleted"});
            })
            .catch((err) => {
                return res.status(204).json({message: "position sku"});
            });
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

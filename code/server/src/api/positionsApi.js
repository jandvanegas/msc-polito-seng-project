function positionsApi(positionDao) {
    const getAll = async (req, res) => {
        const result = await positionDao
            .getAll()
            .then((value) => {
                res.status(200).json(value);
            })
            .catch((error) => {
                console.error(error)
                res.status(500).json({error: "generic error"});
            });
    }
    const add = async (req, res) => {

        if (Object.keys(req.body).length === 0 ||
            req.body.positionID === undefined ||
            req.body.aisleID === undefined ||
            req.body.row === undefined ||
            req.body.col === undefined ||
            req.body.maxWeight === undefined ||
            !typeof (req.body.positionID) === "string" ||
            !typeof (req.body.aisleID) === "string" ||
            !typeof (req.body.row) === "string" ||
            !typeof (req.body.col) === "string" ||
            !typeof (req.body.maxWeight) === "number" ||
            !typeof (req.body.maxVolume) === "number" ||
            req.body.positionID.length !== 12 ||
            req.body.aisleID.length !== 4 ||
            req.body.row.length !== 4 ||
            req.body.col.length !== 4 ||
            req.body.maxVolume === undefined
        ) {
            return res.status(422).json({error: "body validation error"});
        }

        const result = await positionDao
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
        //body
        if (req.params.positionID === undefined ||
            Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "body or params validation error"});
        }
        //undefined
        if (req.body.newAisleID === undefined || req.body.newRow === undefined || req.body.newCol === undefined || req.body.newMaxWeight === undefined || req.body.newMaxVolume === undefined || req.body.newOccupiedWeight === undefined || req.body.newOccupiedVolume === undefined || req.params.positionID === undefined) {
            return res.status(422).json({error: "body or params validation error"})
        }
        //type
        if (!typeof (req.body.newAisleID) === "string" || !typeof (req.body.newRow) === "string" || !typeof (req.body.newCol) === "string" || !typeof (req.body.newMaxWeight) === "number" || !typeof (req.body.newMaxVolume) === "number" || !typeof (req.body.newOccupiedWeight) === "number" || !typeof (req.body.newOccupiedVolume) === "number" || !typeof (req.params.positionID) === "number") {
            return res.status(422).json({error: "body or params validation error"})
        }
        //length
        if (req.body.newAisleID.length !== 4 || req.body.newRow.length !== 4 || req.body.newCol.length !== 4) {
            return res.status(422).json({error: "body or params validation error"})
        }
        const position = positionDao
            .getById(req.params.positionID)
            .then((value) => {
                const updatePosition = positionDao
                    .updateFull(
                        req.body.newAisleID,
                        req.body.newRow,
                        req.body.newCol,
                        req.body.newMaxWeight,
                        req.body.newMaxVolume,
                        value.occupiedWeight,
                        req.body.newOccupiedWeight,
                        value.occupiedVolume,
                        req.body.newOccupiedVolume,
                        req.params.positionID
                    )
                    .then(() => {
                        return res
                            .status(200)
                            .json({message: "information about the position updated"});
                    })
                    .catch(() => {
                        return res.status(503).json({error: "general error"});
                    });
            })
            .catch(() => {
                return res.status(404).json({error: "position not found"});
            });
    }
    const update = async (req, res) => { // 503

        if (req.params.positionID === undefined || Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "body or params validation error"});
        }

        //undefined
        if (req.body.newPositionID === undefined) {
            return res.status(422).json({error: "body or params validation error"});
        }
        //type
        if (!typeof (req.body.newPositionID) === "string") {
            return res.status(422).json({error: "body or params validation error"});
        }
        //length
        if (req.body.newPositionID.length !== 12) {
            return res.status(422).json({error: "body or params validation error"});
        }

        const position = positionDao.update(Number(req.params.positionID), Number(req.body.newPositionID)).then((value) => {
            console.log(value)
            if (value === undefined) {
                return res.status(404).json({message: "position not found"})
            }
            return res.status(200).json({message: "position ID updated"})
        }).catch(() => {
            return res.status(503).json({error: "general error"})
        })

    }
    const remove = async (req, res) => {
        const id = req.params.positionID;
        if (req.params.positionID === undefined) {
            return res.status(422).json({error: "no id"});
        }
        await positionDao
            .getById(id)
            .then((value) => {
                if (value === undefined) {
                    return res.status(404).json({error: "no position found"});
                }
                positionDao.remove(id).then(() => {
                    return res.status(202).json({message: "position deleted"});
                });
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

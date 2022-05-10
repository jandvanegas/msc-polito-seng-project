function positionsApi(positionDao) {
    const getAll = async (req, res) => {
        const result = await positionDao
            .getAll()
            .then((value) => {
                res.status(200).json(value);
            })
            .catch(() => {
                res.status(500).json({error: "generic error"});
            });
    }
    const add = async (req, res) => {
        if (Object.keys(req.body).length === 0) {
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
        if (
            req.params.positionID === undefined ||
            Object.keys(req.body).length === 0
        ) {
            return res.status(422).json({error: "body or params validation error"});
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

        if (
            req.params.positionID === undefined ||
            Object.keys(req.body).length === 0
        ) {
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
    return {
        getAll: getAll,
        add: add,
        updateFull: updateFull,
        update: update
    }
}

module.exports = positionsApi

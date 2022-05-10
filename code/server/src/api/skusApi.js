function skusApi(skuDao, positionDao) {

    const getById = (req, res) => {
        if (req.params.id instanceof String) {
            return res.status(422).json({error: "invalid id"});
        }
        const sku = skuDao.getBySkuId(req.params.id);

        sku.then((value) => {
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
                message: "Internal Server Error", //it works?
            };
            return res.status(500).json(error);
        });

    }
    const getAll = (req, res) => {
        const skusArray = skuDao.getAll();

        skusArray
            .then((value) => {
                let message = {
                    array: value,
                };
                return res.status(200).json(message);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const add = (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "empty body request"});
        }

        const sku = skuDao.add(
            req.body.description,
            req.body.weight,
            req.body.volume,
            req.body.notes,
            req.body.price,
            req.body.availableQuantity
        );

        sku
            .then((value) => {
                return res.status(201).json({message: "created"});
            })
            .catch((err) => {
                return res.status(503).json({error: "generic error"});
            });
    }
    const updateById = async (req, res) => {
        //check for errors
        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "empty body request"});
        }
        const id = req.params.id;
        if (req.params.id === undefined) {
            return res.status(422).json({error: "no id"});
        }

        await skuDao.getById(id)
            .then((value) => {
                //update the sku
                const updateSku = skuDao.updateSku(
                    id,
                    req.body.newDescription,
                    req.body.newWeight,
                    req.body.newVolume,
                    req.body.newNotes,
                    req.body.newPrice,
                    req.body.newAvailableQuantity
                );
                updateSku
                    .then(() => {
                        //check for position
                        console.log(value.position);
                        if (value.position === null) {
                            //no update the position
                            return res.status(200).json({message: "updated sku only"});
                        } else {
                            //update the position
                            const updatePosition = positionDao.update(
                                value.position,
                                req.body.newWeight,
                                req.body.newVolume,
                                value.weight,
                                value.volume
                            );
                            updatePosition
                                .then(() => {
                                    return res.status(200).json({
                                        message: "updated sku and it's relative position",
                                    });
                                })
                                .catch((err) => {
                                    //update position catch
                                    return res
                                        .status(422)
                                        .json({message: "error during position update"});
                                });
                        }
                    })
                    .catch((err) => {
                        //sku updating catch
                        console.log(err);
                        return res
                            .status(503)
                            .json({message: "error during updating sku"});
                    });
            })
            .catch((err) => {
                //sku searching catch
                return res.status(404).json({message: "sku not found"});
            });
    }
    const updatePosition = async (req, res) => {
        //check for errors
        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "empty body request"});
        }
        const id = req.params.id;
        if (req.params.id === undefined) {
            return res.status(422).json({error: "no id"});
        }
        //check for authorization

        const sku = await db
            .returnSku(req.params.id)
            .then((value1) => {
                const updateSkuPosition = skuDao
                    .updatePosition(req.params.id, req.body.position)
                    .then((value2) => {
                        const updateOldPosition = positionDao
                            .update(
                                value1.position,
                                0,
                                0,
                                value1.weight,
                                value1.volume
                            )
                            .then((value3) => {
                                const updateNewPosition = positionDao
                                    .update(
                                        req.body.position,
                                        value1.weight,
                                        value1.volume,
                                        0,
                                        0
                                    )
                                    .then((value4) => {
                                        return res
                                            .status(200)
                                            .json({message: "operation completed"});
                                    })
                                    .catch((err) => {
                                        return res
                                            .status(422)
                                            .json({message: "error during new position update"});
                                    }); //update new position
                            })
                            .catch((err) => {
                                return res
                                    .status(422)
                                    .json({message: "error during old position update"});
                            }); //update old position
                    })
                    .catch((err) => {
                        return res
                            .status(422)
                            .json({message: "error during sku position update"});
                    }); //update sku position
            })
            .catch((err) => {
                return res.status(422).json({message: "error looking for sku"});
            }); //return sku
    }
    const remove = async (req, res) => {
        //check for errors
        const id = req.params.id;
        if (req.params.id === undefined) {
            return res.status(422).json({error: "no id"});
        }

        const sku = await skuDao
            .getById(id)
            .then((value) => {
                if (value === undefined) {
                    return res.status(503).json({error: "no sku found"});
                }
                if (value.position != null) {
                    const updatePosition = positionDao
                        .update(value.position, 0, 0, value.weight, value.volume)
                        .then(() => {
                            console.log("updated position");
                        })
                        .catch(() => {
                            console.log("updating error");
                        });
                }
                const deleteSku = skuDao.remove(id).then(() => {
                    return res.status(202).json({message: "sku deleted"});
                });
            })
            .catch((err) => {
                return res.status(204).json({message: "no sku"});
            });
    }
    return {
        getById: getById,
        getAll: getAll,
        add: add,
        updateById: updateById,
        updatePosition: updatePosition,
        remove: remove

    }
}

module.exports = skusApi

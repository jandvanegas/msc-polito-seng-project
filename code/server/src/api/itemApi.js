function itemApi(itemDao) {
    const getAll = (req, res) => {
        itemDao
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
        console.log(req.body.id, req.body.description, req.body.price, req.body.SKUId, req.body.supplierId)
        itemDao.add(
            req.body.id,
            req.body.description,
            req.body.price,
            req.body.SKUId,
            req.body.supplierId,
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
        itemDao.getById(req.params.id).then((value) => {
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
        itemDao.remove(id).then(() => {
            return res.status(202).json({message: "item deleted"});
        }).catch((err) => {
            console.log(err)
            return res.status(503).json({message: "Service Unavailable"});
        });
    }
    const update = async (req, res)=>{
        if (Number(req.params.id) === NaN) {
            return res.status(422).json({error: "no id"});
        } 
        const item = itemDao.getById(req.params.id).then((value)=>{
            if(value.length===0){
                return res.status(404).json({message: "item not found"})

            }
            else{
                itemDao.update(req.params.id, req.body.newDescription, req.body.newPrice).then(()=>{
                    return res.status(200).json({message: "item updated"})
                }).catch(()=>{
                    return res.status(503).json({message: "error during the update"})
                })
            }
        })
       

    }
    return {
        getAll: getAll,
        add: add,
        getById: getById,
        remove: remove,
        update: update
    }
}

module.exports = itemApi

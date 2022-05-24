const helper = require('./helper')

function restockOrderApi(restockOrderDao) {
    const apiHelper = helper();

    const orderStates = ['issued', 'delivery', 'delivered', 'tested', 'completedreturn', 'return'] 

    const getAll = (req, res) => {
        // TODO: error 401 (unauthorized) 
        restockOrderDao
        .getAll()
        .then((value) => {
            res.status(200).json(value);
        }).catch(() => {
            res.status(500).json({error: "generic error"});
        });
    }

    const getIssued = (req, res) => {
        // TODO: error 401 (unauthorized) 
        restockOrderDao
        .getIssuedOrder()
        .then((value) => {
            res.status(200).json(value);
        }).catch((err) => {
            console.log(err);
            res.status(500).json({error: "generic error"});
        });
    }

    const getById = (req, res) => {
        // TODO: error 401 (unauthorized) 

        if(req.params.id === undefined){
            return res.status(422).json({error: "no id"});
        }

        if(req.params.id instanceof Number){
            return res.status(422).json({error: "wrong id type"})
        }

        restockOrderDao
        .getById(req.params.id)
        .then((value) => {
            if(value.length === 0) {
            return res.status(404).json({error: "no restock associated to id"});
            }
            return res.status(200).json(value);
        })
        .catch(() => {
            return res.status(503).json({error: "generic error"});
        });
    }

    const getItems = async (req, res) => { //// 
        // TODO: error 401 (unauthorized) 
        const order = await restockOrderDao.getById(req.params.id);

        if(req.params.id === undefined){
            return res.status(422).json({error: "no id"});
        }

        if(req.params.id instanceof Number){
            return res.status(422).json({error: "wrong id type"});
        }

        if(order[0].state !== "COMPLETEDRETURN"){
            //TODO: test
         return res.status(422).json({error: "wrong order state"});
        }

        restockOrderDao.getItemsOfOrder(req.params.id).then((value) => {
            if(value.length === 0){
                return res.status(404).json({error: "not found"});
            }
            else{
                return res.status(200).json(value);
            }
        }).catch((err) => {
            let error = {message: "Internal server error"};
            return res.status(500).json(error);
        });
    }

    const add = (req,res) => {
        //TODO "generic error during the test"
        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "empty body request"});
        }

        if(req.body.issueDate === undefined || req.body.products === undefined  || req.body.supplierId === undefined){
            return res.status(422).json({error: "wrong value in the body"})
            
        }

        if(req.body.issueDate instanceof String || req.body.products instanceof String || req.body.supplierId instanceof Number){
            return res.status(422).json({error: "wrong type(s) in the body"})
        }

        const order = restockOrderDao.add(
            req.body.issueDate,
            req.body.products,
            req.body.supplierId
        );

        order.then((value) => {
            return res.status(201).json({message: "order created"});
        })
        .catch((err) => {
            console.log(err);
            return res.status(503).json({error: "generic error"});
        });
    }

    const update = (req, res) => {
        // TODO: error 401 (unauthorized)

        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "empty body request"});
        }

        if(req.body.newState === undefined){
            return res.status(422).json({error: "wrong value in the body"})
            
        }

        if(req.body.newState instanceof String){
            return res.status(422).json({error: "wrong type in the body"})
        }

        const restockOrder = restockOrderDao.updateState(req.params.id, req.body.newState)
        
        .then((value) => {
            if(value === undefined){
                return res.status(404).json({message: "order not found"})
            }
            return res.status(200).json({message: "order state updated"})
        }).catch(() => {
            return res.status(503).json({error: "generic error"})
        })
    }

    const addItems = async (req, res) => {
        // TODO: error 401 (unauthorized)
        const order = await restockOrderDao.getById(req.params.id)
        let items = req.body.skuItems;

        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "empty body request"});
        }

        if(req.body.skuItems === undefined || order[0].state !== "DELIVERED"){
            return res.status(422).json({error: "validation of request body or of id failed or order state != DELIVERED"})
            
        }

        if(req.body.skuItems instanceof String){
            return res.status(422).json({error: "wrong type in the body"})
        }

        if(order[0].skuItems.length !== 0){
            items = items.concat(JSON.parse(order[0].skuItems));
        };

        restockOrderDao
        .addItems(req.params.id, items)
        .then((value) => {
            if(value === undefined){
                return res.status(404).json({message: "no restock order associated to id"})
            }
            return res.status(200).json({message: "Items added to the order"})
        }).catch(() => {
            return res.status(503).json({message: "generic error"});
        });
     }

return {
    getAll: getAll,
    getIssued: getIssued,
    getById: getById,
    add: add,
    update: update,
    getItems: getItems,
    addItems: addItems,
    }

}

module.exports = restockOrderApi
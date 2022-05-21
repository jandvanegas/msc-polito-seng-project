function internalOrdersApi(internalOrdersDao) {
  const getAll = async (req, res) => {
    const result = await internalOrdersDao
      .getAll()
      .then((value) => {
        return res.status(200).json(value);
      })
      .catch((err) => {
        return res.status(503).json({ error: "Internal server error" });
      });
  };
  const getById = async (req, res) => {
    if (req.params.id === undefined) {
      return res.status(422).json({ error: "no id" });
    }

    const result = await internalOrdersDao
      .getById(req.params.id)
      .then((value) => {
        if (value.length === 0) {
          return res.status(404).json({ error: "internalOrders not found" });
        }
        return res.status(200).json(value);
      })
      .catch(() => {
        return res.status(503).json({ error: "generic error" });
      });
  };
  // not sure if it's working?
  const getAcceptedOrders = async (req, res) => {
    const result = await internalOrdersDao
      .getAcceptedOrders(req.params.id)
      .then((value) => {
        if (value.length === 0) {
          return res.status(404).json({ error: "InternalOrders not found" });
        } else {
          return res.status(200).json({ value });
        }
      })
      .catch(() => {
        return res.status(500).json({ error: "general error" });
      });
  };

  const getIssuedOrders = async (req, res) => {
    const result = await internalOrdersDao
      .getIssuedOrders()
      .then((value) => {
        if (value.length === 0) {
          return res.status(404).json({ error: "InternalOrders not found" });
        } else {
          return res.status(200).json({ value });
        }
      })
      .catch(() => {
        return res.status(500).json({ error: "general error" });
      });
  };

  // not sure if it's working?
  const update = async (req, res) => {
    if (req.params.id === undefined || Object.keys(req.body).length === 0) {
      return res.status(422).json({ error: "body or params validation error" });
    }
    const InternalOrders = await internalOrdersDao
      .getById(req.params.id)
      .then((value) => {
        if (value.length === 0) {
          res.status(404).json({ error: "internalOrders not found" });
        } else {
          if (req.body.newState === "COMPLETED") {
            const updateStatusAndProducts = internalOrdersDao
              .updateStateAndProducts(req.params.id, req.body.newState, JSON.stringify(req.body.products))
              .then(() => {
                res.status(200).json({ message: "internalOrders updated" });
              })
              .catch(() => {
                res.status(503).json({ error: "error during the update" });
              });
          } else if(req.body.newState === "ACCEPTED"){
            const updateStatus = internalOrdersDao
              .updateState(req.params.id, req.body.newState)
              .then(() => {
                res.status(200).json({ message: "internalOrders updated" });
              })
              .catch(() => {
                res.status(503).json({ error: "error during the update accepted" });
              });
          }else{
            res.status(503).json({ error: "body validation error" });
          }
        }
      })
      .catch(() => {
        res.status(503).json({ message: "generic error" });
      });
  };
  const add = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(422).json({ error: "body validation error" });
    }

    const result = await internalOrdersDao
      .add(req.body.issueDate, req.body.products, req.body.customerId)
      .then(() => {
        res.status(201).json({ message: " internalOrders created" });
      })
      .catch((err) => {
        console.log(err);
        res.status(503).json({ error: "generic error" });
      });
  };
  const remove = async (req, res) => {
    if (req.params.id === undefined) {
      return res.status(422).json({ error: "body or params validation error" });
    }
    const result = await internalOrdersDao
      .remove(req.params.id)
      .then(() => {
        res.status(204).json({ message: "internalOrders deleted" });
      })
      .catch(() => {
        res.status(503).json({ error: "generic error" });
      });
  };
  // internalOrders Accepted is still remaining

  return {
    getAll: getAll,
    getById: getById,
    getAcceptedOrders: getAcceptedOrders,
    getIssuedOrders: getIssuedOrders,
    add: add,
    update: update,
    remove: remove,
  };
}

module.exports = internalOrdersApi;

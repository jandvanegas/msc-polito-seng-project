"use strict";

const express = require("express");

const databaseHandler = require("./databaseApi");


const app = new express();
const port = 3001;
app.use(express.json());


async function main() {
  const db = new databaseApi("ezwh.sqlite");

  const sql = "CREATE TABLE IF NOT EXISTS returnOrders (id INTEGER PRIMARY KEY AUTOINCREMENT, `returnDate` DATE,`products` VARCHAR NOT NULL,`restockOrderId` INT NOT NULL)"
  db.newTable(sql);
  
   // api 49

  app.get("/api/returnOrders", async (req, res) => {
    const returnOrdersArray = db.returnOrdersArray();

    returnOrdersArray
      .then((value) => {
        let message = {
          array: value,
        };
        return res.status(200).json(message);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // api 50 

  app.get("/api/returnOrders/:id", async (req, res) => {

    if(req.params.id instanceof String){
      return res.status(422).json({error: "invalid id"});
    }
    const returnOrders = db.returnOrdersArray(req.params.id);
    returnOrders.then((value) => {
        let message = {
          array: value,
        };
        if (value.length == 0) {
          return res.status(404).json({error: "not found"});
        } else {
          return res.status(200).json(message);
        }
      })
      .catch((err) => {
        let error =  {
          message: "Internal Server Error" 
        }
        return res.status(500).json(error);
      });
  });

  // api 51

  app.post("/api/returnOrders", async (req, res) => {

    if(Object.keys(req.body).length===0){
      return res.status(422).json({error: "empty body request"})
    }

    const returnOrders = db.returnOrders(req.body.returnDate, req.body.products, req.body.restockOrderId);
    
    returnOrders.then((value)=>{
      return res.status(201).json({message: "created"})
    }).catch((err)=>{
      return res.status(503).json({error: "generic error"})
    })
  });

  // api 52 delete return orders id


  // api 53
 
  app.get("/api/internalOrders", async (req, res) => {
    const internalOrdersArray = db.internalOrdersArray();

    internalOrdersArray
      .then((value) => {
        let message = {
          array: value,
        };
        return res.status(200).json(message);
      })
      .catch((err) => {
        console.log(err);
      });
  });

// api 54 

app.get("/api/internalOrdersIssued", async (req, res) => {

    if(req.params.state instanceof String){
      return res.status(422).json({error: "invalid state"});
    }
    const internalOrdersIssued = db.internalOrdersIssued(req.params.state);
    internalOrdersIssued.then((value) => {
        let message = {
          array: value,
        };
        if (value.state = 'ISSUED') {
          return res.status(200).json(message);
        } else {
          return res.status(401).json({error: "unauthorized"});
        }
      })
      .catch((err) => {
        let error =  {
          message: "Internal Server Error" 
        }
        return res.status(500).json(error);
      });
  });

// api 55

app.get("/api/internalOrdersAccepted", async (req, res) => {

    if(req.params.state instanceof String){
      return res.status(422).json({error: "invalid state"});
    }
    const internalOrdersAccepted = db.internalOrdersAccepted(req.params.state);
    internalOrdersAccepted.then((value) => {
        let message = {
          array: value,
        };
        if (value.state = 'ACCEPTED') {
          return res.status(200).json(message);
        } else {
          return res.status(401).json({error: "unauthorized"});
        }
      })
      .catch((err) => {
        let error =  {
          message: "Internal Server Error" 
        }
        return res.status(500).json(error);
      });
  });

  // api 56 

  app.get("/api/internalOrders/:id", async (req, res) => {

    if(req.params.id instanceof String){
      return res.status(422).json({error: "invalid id"});
    }
    const internalOrders = db.internalOrders(req.params.id);
    internalOrders.then((value) => {
        let message = {
          array: value,
        };
        if (value.length == 0) {
          return res.status(404).json({error: "not found"});
        } else {
          return res.status(200).json(message);
        }
      })
      .catch((err) => {
        let error =  {
          message: "Internal Server Error" 
        }
        return res.status(500).json(error);
      });
  });

// api 57

app.get("/api/internalOrders", async (req, res) => {

    if(req.params.state instanceof String){
      return res.status(422).json({error: "invalid id"});
    }
    const internalOrders = db.internalOrders(req.params.state);
    internalOrders.then((value) => {
        let message = {
          array: value,
        };
        if (value.state= 'ISSUED') {
            return res.status(200).json(message);
          } else {
            return res.status(404).json({error: "not found"});
        }
      })
      .catch((err) => {
        let error =  {
          message: "Internal Server Error" 
        }
        return res.status(500).json(error);
      });
  });

  //api 58 i don't know how!!!


  // api 59 delete internal orders id


  // api 60 

  app.get("/api/items", async (req, res) => {
    const itemsArray = db.itemsArray();

    itemsArray
      .then((value) => {
        let message = {
          array: value,
        };
        return res.status(200).json(message);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // api 61 

  app.get("/api/items/:id", async (req, res) => {

    if(req.params.id instanceof String){
      return res.status(422).json({error: "invalid id"});
    }
    const items = db.itemsArray(req.params.id);
    items.then((value) => {
        let message = {
          array: value,
        };
        if (value.length == 0) {
          return res.status(404).json({error: "not found"});
        } else {
          return res.status(200).json(message);
        }
      })
      .catch((err) => {
        let error =  {
          message: "Internal Server Error" 
        }
        return res.status(500).json(error);
      });
  });
 
  // api 62

  app.post("/api/item", async (req, res) => {

    if(Object.keys(req.body).length===0){
      return res.status(422).json({error: "empty body request"})
    }

    const item = db.item(req.body.description, req.body.price, req.body.SKUId, req.body.supplierId);
    
    item.then((value)=>{
      return res.status(201).json({message: "created"})
    }).catch((err)=>{
      return res.status(503).json({error: "generic error"})
    })
  });

  // api 63 

  app.put("/api/item/:id", async (req, res)=>{

})


  // api 64 delete item by id










    









































}
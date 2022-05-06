"use strict";
const express = require("express");
const databaseHandler = require("./databaseHandler");

// init express
const app = new express();
const port = 3001;
app.use(express.json());

async function main() {
  //init database
  const db = new databaseHandler("ezwh.sqlite");

  //create sku table
  const sql =
    "CREATE TABLE IF NOT EXISTS skus (id INTEGER PRIMARY KEY AUTOINCREMENT, `description` VARCHAR NOT NULL,`weight` DOUBLE NOT NULL,`volume` DOUBLE NOT NULL,`notes` TEXT NOT NULL,`position` TEXT,`availableQuantity` INT NOT NULL,`price` DOUBLE NOT NULL,`testDescriptors` TEXT NOT NULL)";
  db.newTable(sql);

  //create position table
  const sql2 =
    " CREATE TABLE IF NOT EXISTS positions (position INTEGER PRIMARY KEY, occupiedWeight DOUBLE NOT NULL, occupiedVolume DOUBLE NOT NULL)";
  db.newTable(sql2);

  // ############ SKU ############

  // GET

  //1) api/skus - OK
  app.get("/api/skus", async (req, res) => {
    const skusArray = db.returnSkus();

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
  }); //401 and 500 ERRORS

  //2) api/skus/:id - OK
  app.get("/api/skus/:id", async (req, res) => {
    if (req.params.id instanceof String) {
      return res.status(422).json({ error: "invalid id" });
    } //doesn't work

    const sku = db.returnSku(req.params.id);

    sku
      .then((value) => {
        let message = {
          array: value,
        };
        if (value.length == 0) {
          return res.status(404).json({ error: "not found" });
        } else {
          return res.status(200).json(message);
        }
      })
      .catch((err) => {
        let error = {
          message: "Internal Server Error", //it works?
        };
        return res.status(500).json(error);
      });
  }); //401, 500 ERRORS

  // POST

  //3) api/sku - OK
  app.post("/api/sku", async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(422).json({ error: "empty body request" });
    }

    const sku = db.addSku(
      req.body.description,
      req.body.weight,
      req.body.volume,
      req.body.notes,
      req.body.price,
      req.body.availableQuantity
    );

    sku
      .then((value) => {
        return res.status(201).json({ message: "created" });
      })
      .catch((err) => {
        return res.status(503).json({ error: "generic error" });
      });
  }); //ERRORS

  // PUT

  //4) api/sku/:id
  app.put("/api/sku/:id", async (req, res) => {
    //check for errors
    if (Object.keys(req.body).length === 0) {
      return res.status(422).json({ error: "empty body request" });
    }
    const id = req.params.id;
    if (req.params.id === "undefined") {
      return res.status(422).json({ error: "no id" });
    }

    //retrieve the sku
    const sku = await db
      .returnSku(id)
      .then((value) => {
        //update the sku
        const updateSku = db.updateSku(
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
              return res.status(200).json({ message: "updated sku only" });
            } else {
              //update the position
              const updatePosition = db.updatePosition(
                value.position,
                req.body.newWeight,
                req.body.newVolume,
                value.weight,
                value.volume
              );
              updatePosition
                .then(() => {
                  return res
                    .status(200)
                    .json({
                      message: "updated sku and it's relative position",
                    });
                })
                .catch((err) => {
                  //update position catch
                  return res
                    .status(422)
                    .json({ message: "error during position update" });
                });
            }
          })
          .catch((err) => {
            //sku updating catch
            console.log(err);
            return res
              .status(503)
              .json({ message: "error during updating sku" });
          });
      })
      .catch((err) => {
        //sku searching catch
        return res.status(404).json({ message: "sku not found" });
      });
  });

  //5) api/sku/:id/position
  app.put("/api/sku/:id/position", async (req, res) => {

    //check for errors
    if (Object.keys(req.body).length === 0) {
      return res.status(422).json({ error: "empty body request" });
    }
    const id = req.params.id;
    if (req.params.id === "undefined") {
      return res.status(422).json({ error: "no id" });
    }
    //check for authorization 
    
    const sku = await db.returnSku(req.params.id).then((value1)=>{
      const updateSkuPosition = db.updateSkuPosition(req.params.id, req.body.position).then((value2)=>{
        const updateOldPosition = db.updatePosition(value1.position, 0, 0, value1.weight, value1.volume).then((value3)=>{
          const updateNewPosition = db.updatePosition(req.body.position, value1.weight, value1.volume, 0, 0).then((value4)=>{
            return res.status(200).json({ message: "operation completed"})
          }).catch((err) => {
            return res
              .status(422)
              .json({ message: "error during new position update" });
          }) //update new position 
        }).catch((err) => {
          return res
            .status(422)
            .json({ message: "error during old position update" });
        }) //update old position 
      }).catch((err) => {
        return res
          .status(422)
          .json({ message: "error during sku position update" });
      }) //update sku position     
    }).catch((err) => {
      return res
        .status(422)
        .json({ message: "error looking for sku" });
    }) //return sku

  });

  // DELETE

  //6) api/skus/:id

  app.delete("/api/skus/:id", async (req, res)=>{

    //check for errors
    const id = req.params.id;
    if (req.params.id === "undefined") {
      return res.status(422).json({ error: "no id" });
    }

    const sku = await db.returnSku(id).then((value)=>{
      if(value===undefined){
        return res.status(503).json({error: "no sku found"})
      }
      if(value.position!=null){
        const updatePosition = db.updatePosition(value.position, 0 , 0, value.weight, value.volume).then(()=>{
          console.log("updated position")
          }).catch(()=>{
            console.log("updating error")
        })
      }
      const deleteSku = db.deleteSku(id).then(()=>{
        return res.status(202).json({message: "sku deleted"})
      })
    }).catch((err)=>{
      return res.status(204).json({message: "no sku"})
    })
  })

  // ############ SKU ITEM ############

  // GET

  //7) api/skuitems

  //8) api/skuitems/sku/:id

  //9) api/skuitems/:rfid

  // POST

  //10) api/skuitem

  // PUT

  //11) api/skuitems/:rfid

  // DELETE

  //12) api/skuitems/:rfid

  // ############ POSITION ############

  // GET

  //13) api/positions

  // POST

  //14) api/position

  // PUT

  //15) api/position/:positionID

  //16) /api/position/:positionID/changeID

  // activate the server
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

main();

module.exports = app;

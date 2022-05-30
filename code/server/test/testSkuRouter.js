const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();

const app = require("../server");
var agent = chai.request.agent(app);

describe("test sku apis", () => {
  beforeEach(async () => {
    sku1 = {
      description: "description 1",
      weight: 100,
      volume: 50,
      notes: "note...",
      price: 19.88,
      availableQuantity: 43,
    };
    sku2 = {
      description: "description 2",
      weight: 100,
      volume: 50,
      notes: "note...",
      price: 19.88,
      availableQuantity: 43,
    };
    sku3 = {
      description: "description 3",
      weight: 100,
      volume: 50,
      notes: "note...",
      price: 19.88,
      availableQuantity: 43,
    };

    try {
      await agent.delete("/api/skus");
      await agent.post("/api/sku").send(sku1);
      await agent.post("/api/sku").send(sku2);
      await agent.post("/api/sku").send(sku3);
    } catch (err) {
      console.log(err);
    }
  });

  const data = {
    description: "description 1",
    weight: 100,
    volume: 50,
    notes: "note...",
    price: 19.88,
    availableQuantity: 43,
  };

  const newInformations = {
    newDescription: "new description",
    newWeight: 9999,
    newVolume: 9999,
    newNotes: "new notes",
    newPrice: 999.99,
    newAvailableQuantity: 9999,
  };

  /************** GET ALL THE SKUS STORED IN THE DB **************/
  //getAll();

  /************** SKU RETURNED CORRECTLY  **************/
  //getById(200, 715, data); //before testing set as id the last id stored in the table +1
  /************** SKU NOT FOUND  **************/
  //getById(404, 999999, data);
  /************** WRONG INPUT FOR ID  **************/
  //getById(422, "XXXX", data);

  /************** ADD SKU CORRECTLY **************/
  //add(201, data)
  /************** EMPTY BODY REQUEST **************/
  //add(422, {})

  /************** SKU NOT FOUND **************/
  //updateById(404, 99999, newInformations);
  /************** EMPTY BODY **************/
  //updateById(422, 99999, {} );
  /************** SKU FOUND AND UPDATED **************/
  //updateById(200, 725, newInformations); //before testing set as id the last id stored in the table +1

  /************** SKU CORRECTLY REMOVE **************/
  //remove(202, 705)
  /************** INVALID ID **************/
  //remove(422, -999999)
  /************** SKU NOT FOUND **************/
  //remove(404, 999999)

  /************** SKU POSITION UPDATED **************/
  //updatePosition(200, 706, "123456789123")
  /************** SKU NOT FOUND **************/
  //updatePosition(404, 999999, "123456789123")
  /************** EMPTY BODY **************/
  //updatePosition(422, 999999)
});

function getAll() {
  try {
    it("get all skus", function (done) {
      const startTime = performance.now();
      agent.get("/api/skus").then(function (res) {
        res.should.have.status(200);
        done();
      });
    });
    const endTime = performance.now();
    (endTime - startTime).should.lessThanOrEqual(500);
  } catch (err) {
    console.log(err);
  }
}

function getById(expectedHttpStatus, id, data) {
  try {
    it("get sku by id", function (done) {
      const startTime = performance.now();

      agent.get(`/api/skus/${id}`).then(function (res) {
        res.should.have.status(expectedHttpStatus);
        if (!res.status === 404 || !res.status === 422) {
          res.body.description.should.equal(data.description);
          res.body.weight.should.equal(data.weight);
          res.body.volume.should.equal(data.volume);
          res.body.notes.should.equal(data.notes);
          res.body.price.should.equal(data.price);
          res.body.availableQuantity.should.equal(data.availableQuantity);
        }

        done();
      });
    });
    const endTime = performance.now();
    (endTime - startTime).should.lessThanOrEqual(500);
  } catch (err) {
    console.log(err);
  }
}

function add(expectedHttpStatus, sku) {
  try {
    it("add sku", function (done) {
      const startTime = performance.now();

      agent
        .post("/api/sku")
        .send({
          description: sku.description,
          weight: sku.weight,
          volume: sku.volume,
          notes: sku.notes,
          price: sku.price,
          availableQuantity: sku.availableQuantity,
        })
        .then(function (res) {
          res.should.have.status(expectedHttpStatus);
          done();
        });
    });
    const endTime = performance.now();
    (endTime - startTime).should.lessThanOrEqual(500);
  } catch (err) {
    console.log(err);
  }
}

function updateById(expectedHttpStatus, id, newInformations) {
  try {
    it("update sku", function (done) {
      const startTime = performance.now();

      agent
        .put(`/api/sku/${id}`)
        .send({
          newDescription: newInformations.newDescription,
          newWeight: newInformations.newWeight,
          newVolume: newInformations.newVolume,
          newNotes: newInformations.newNotes,
          newPrice: newInformations.newPrice,
          newAvailableQuantity: newInformations.newAvailableQuantity,
        })
        .then(function (res) {
          res.should.have.status(expectedHttpStatus);
          done();
        });
    });
    const endTime = performance.now();
    (endTime - startTime).should.lessThanOrEqual(500);
  } catch (err) {
    console.log(err);
  }
}

function remove(expectedHttpStatus, id) {
  try {
    it("remove sku", function (done) {
      const startTime = performance.now();

      agent.delete(`/api/skus/${id}`).then(function (res) {
        console.log("status " + res.status);
        res.should.have.status(expectedHttpStatus);
        done();
      });
    });
    const endTime = performance.now();
    (endTime - startTime).should.lessThanOrEqual(500);
  } catch (err) {
    console.log(err);
  }
}

function updatePosition(expectedHttpStatus, id, position) {
  try {
    it("update sku position", function (done) {
      const startTime = performance.now();

      agent
        .put(`/api/sku/${id}/position`)
        .send({ position: position })
        .then(function (res) {
          console.log("data: ", expectedHttpStatus, id, position);
          console.log("status: " + res.status);
          res.should.have.status(expectedHttpStatus);
          done();
        });
    });
    const endTime = performance.now();
    (endTime - startTime).should.lessThanOrEqual(500);
  } catch (err) {
    console.log(err);
  }
}

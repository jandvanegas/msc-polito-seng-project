INSERT INTO returnOrders (id,products,returnDate,restockOrderId)
VALUES ('1,products...','2021/11/29 09:33', '[]');

INSERT INTO returnOrders (products,returnDate,restockOrderId)
VALUES ('products...','2021/11/29 09:33', '[]');

INSERT INTO returnOrders (products,returnDate,restockOrderId)
VALUES ('products...','2021/11/29 09:33','[]');



INSERT INTO internalOrders (id,issueDate,state,products,customerId)
VALUES('1,2021/11/29 09:33,ACCEPTED,[],1')

INSERT INTO internalOrders (id,issueDate,state,products,customerId)
VALUES('2,2021/11/30 19:33,COMPLETED,[],1')

INSERT INTO internalOrders (id,issueDate,state,products,customerId)
VALUES('1,2021/11/29 09:33,ACCEPTED,[],1')

INSERT INTO internalOrders (id,issueDate,state,products,customerId)
VALUES('1,2021/11/29 09:33,ACCEPTED,[],1')

INSERT INTO internalOrders (issueDate,state,products)
VALUES('2021/11/29 09:33,ISSUED,[]')

INSERT INTO internalOrders (newState)
VALUES('ACCEPTED')

INSERT INTO internalOrders (newState,products)
VALUES('ACCEPTED,[]')



INSERT INTO items (id,description,price,SKUId,supplierId)
VALUES('1,description...,10.99,1,2')

INSERT INTO items (id,description,price,SKUId,supplierId)
VALUES('2,description...,12.99,2,1')

INSERT INTO items (id,description,price,SKUId,supplierId)
VALUES('1,description...,10.99,1,2')

INSERT INTO items (description,price,SKUId,supplierId)
VALUES('description...,10.99,1,2')

INSERT INTO items (newDescription,newPrice )
VALUES('newDescription...,10.99')

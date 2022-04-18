# Graphical User Interface Prototype  

Authors: KEVIN CARDINALE, JUAN ANDRES VANEGAS JADAN, MARCO AMMIRATI, RAMIN HEDAYATMEHR

Date: 12 april 2022

Version: 1.0

⠀⠀⠀⠀

# Contents

## 1. Login
1. login for a general user

## 2. Log out
1. Log out for a general user

## 3. Registration
1. registration for a general user

## 4. Add internal member
1. Add general internal member of the company

## 5. Handle internal order 
1. create internal order
2. cancel internal oreder
3. modify internal order
4. close internal order

## 6. handle external order 
1. create internal order
2. cancel internal oreder
3. modify internal order
4. close internal order

## 7. Handle supplier profile
1. Modify supplier
2. Delete suppliers
3. view orders
4. view selling status

## 8. Handle warehouse profile
1. Modify warehouse profile
2. Delete warehouse

## 9. Handle supplier inventory 
1. Add item
2. delete item
3. view inventory 

## 10. Handle internal inventory 
1. add item
2. modify item 
3. delete item 
4. view inventory

## 11. Handle new item 
1. check quality (pass)
2. check quality (did not pass)

## 12. Check trust level of a supplier
1. Check trust level of a supplier 

⠀⠀⠀⠀

⠀⠀⠀⠀


# 1 LOGIN
 
### LOGIN FOR A GENERAL USER

- step 1: the user inserts email and password and then clicks on the "Log in" button

![](src/GUI/1login/login1.png)

- step 2:  the user will be redirected to the main page relative to the profile

![](src/GUI/1login/login2.png)




# 2 LOG OUT
 
### LOG OUT FOR A GENERAL USER

- step 1: the user is in a general page

![](src/GUI/2logout/logout1.png)

- step 2: the user clicks on the profile symbol on the top right of the page

![](src/GUI/2logout/logout2.png)

- step 3: the user clicks on the "log out" button and selects the option "yes"

![](src/GUI/2logout/logout3.png)

- step 4: the user is redirected to the login page

![](src/GUI/2logout/logout4.png)




# 3 REGISTRATION
 
### LOG OUT FOR A GENERAL USER

- step 1: the user is the login page and clicks on the "register" button

![](src/GUI/3registration/registration1.png)

- step 2: the user fills all the required fields and clicks of the "confirm" button

![](src/GUI/3registration/registration2.png)

- step 3: the is redirected to the main page 

![](src/GUI/3registration/registration3.png)




# 4 ADD INTERNAL MEMBER 
 
### ADD GENERAL INTERNAL MEMEBER OF THE COMPANY

- step 1: the warehouse manager clicks on the user section on the left bar and clicks on "add new user" on the top right

![](src/GUI/4addinternalmember/addinternalmember1.png)

- step 2: the warehouse manager fills all the required fields 

![](src/GUI/4addinternalmember/addinternalmember2.png)

- step 3: the warehouse manager clicks on "yes"

![](src/GUI/4addinternalmember/addinternalmember3.png)

- step 4: the system shows a confirmation pop up and the warehouse manager clicks on "go back"

![](src/GUI/4addinternalmember/addinternalmember4.png)

- step 5: the warehouse manager is redirected to the users page

![](src/GUI/4addinternalmember/addinternalmember5.png)




# 5 HANDLE INTERNAL ORDER
 
### CREATE INTERNAL ORDER

- step 1: the internal order manager clicks on the orders button and on the "new order" button

![](src/GUI/5handleinternalorder/createinternalorder/createinternalorder1.png)

- step 2: the internal order manager selects the quantity for each required item and clicks on "place order"

![](src/GUI/5handleinternalorder/createinternalorder/createinternalorder2.png)

- step 3: the system shows a confirmation box

![](src/GUI/5handleinternalorder/createinternalorder/createinternalorder3.png)




### CANCEL INTERNAL ORDER

- step 1: the internal order manager is in the order page and selects the correspondent "red bin" button 

![](src/GUI/5handleinternalorder/cancelinternalorder/cancelinternalorder1.png)

- step 2: the system shows a confirmation message and the internal order manager clicks on "yes"

![](src/GUI/5handleinternalorder/cancelinternalorder/cancelinternalorder2.png)

- step 3: the system shows a confirmation message

![](src/GUI/5handleinternalorder/cancelinternalorder/cancelinternalorder3.png)




### MODIFY INTERNAL ORDER

- step 1: the internal order manager is inside the orders page and clicks on the yellow pencil button

![](src/GUI/5handleinternalorder/modifyinternalorder/modifyinternalorder1.png)

- step 2: the internal order manager modify the quantity for each item of the order and selecs which item remove. then clicks on the "confirm edit" button

![](src/GUI/5handleinternalorder/modifyinternalorder/modifyinternalorder2.png)

- step 3: the system shows a confirmation box and the internal order manager clicks on yes

![](src/GUI/5handleinternalorder/modifyinternalorder/modifyinternalorder3.png)

- step 4: the system shows a confirmation message

![](src/GUI/5handleinternalorder/modifyinternalorder/modifyinternalorder4.png)




### CLOSE INTERNAL ORDER

- step 1: the internal order manager is the order page and clicks on the green "V" button to confirm the delivery

![](src/GUI/5handleinternalorder/closeinternalorder/closeinternalorder1.png)

- step 2: the system shows a confirmation message and the internal order manager clicks on the "yes" button

![](src/GUI/5handleinternalorder/closeinternalorder/closeinternalorder2.png)

- step 3: the system shows a confirmation pop up and redirects the internal order manager in the order page.

![](src/GUI/5handleinternalorder/closeinternalorder/closeinternalorder3.png)


# 6 HANDLE EXTENAL ORDER

### CREATE EXTERNAL ORDER

- step 1: the warehouse manager is in the order page and clicks on the "new order" button on the top right of the page

![](src/GUI/6handleexternalorder/create/create1.png)

- step 2: the warehouse manager selects the required item and the quantity

![](src/GUI/6handleexternalorder/create/create2.png)

- step 3: the system shows all the supplier with a compatible number of quantity and then the warehouse manager select the preferred supplier

![](src/GUI/6handleexternalorder/create/create3.png)

- step 4: the system shows a summary of the order and the warehouse manager clicks on the "pay" button

![](src/GUI/6handleexternalorder/create/create4.png)

- step 5: the warehouse manager fills all the required fields and clicks on the "confirm" button

![](src/GUI/6handleexternalorder/create/create5.png)

- step 6: the system shows a confirmation message to confirm the operation and the warehouse manager clicks on the "yes" button

![](src/GUI/6handleexternalorder/create/create6.png)

- step 7:  the system shows a confirmation message and the warehouse manager clicks on the "go to orders" button

![](src/GUI/6handleexternalorder/create/create7.png)




### CANCEL EXTERNAL ORDER

- step 1: the warehouse manager is in the external order page and select the red "bin" button to cancel an order

![](src/GUI/6handleexternalorder/cancel/cancel1.png)

- step 2: the system asks for a confirmation and the warehouse manager selects "yes"

![](src/GUI/6handleexternalorder/cancel/cancel2.png)

- step 3: the system shows a confirmation message

![](src/GUI/6handleexternalorder/cancel/cancel3.png)




### MODIFY EXTERNAL ORDER

- step 1: the warehouse manager is in the external order page and select the yellow "pencil" button to modify a specific order

![](src/GUI/6handleexternalorder/modify/modify1.png)

- step 2: the system asks for the new quantity, if the items have to be removed, the system compute the new total and then the warehouse manger clicks on the "confirm edit" button

![](src/GUI/6handleexternalorder/modify/modify2.png)

- step 3: the system asks for a confirmation and the warehouse manager clicks on the "yes" button

![](src/GUI/6handleexternalorder/modify/modify3.png)

- step 4: the system shows a confirmation message

![](src/GUI/6handleexternalorder/modify/modify4.png)




### CLOSE EXTERNAL ORDER

- step 1: the warehouse manager is in the external order page and select the green "V" button to confirm the delivery

![](src/GUI/6handleexternalorder/close/close1.png)

- step 2: the system asks for confirmation from the warehouse manager and the warehouse manager clicks on the "yes" button

![](src/GUI/6handleexternalorder/close/close2.png)

- step 3: the system shows a confirmation message

![](src/GUI/6handleexternalorder/close/close3.png)



# 7 HANDLE SUPPLIER PROFILE

### MODIFY SUPPLIER supplier

- step 1: the supplier is in a general page 

![](src/GUI/7handleSupplierProfile/1modifyprofile/modify1.png)

- step 2: the supplier click on the top right profile icon

![](src/GUI/7handleSupplierProfile/1modifyprofile/modify2.png)

- step 3: the system redirects the the supplier to the profile page and the supplier edits some informations. then clicks on "confirm edits"

![](src/GUI/7handleSupplierProfile/1modifyprofile/modify3.png)

- step 4: the system redirects the supplier in a general page of the system

![](src/GUI/7handleSupplierProfile/1modifyprofile/modify4.png)



### DELETE SUPPLIERS

- step 1: the supplier is in a general page 

![](src/GUI/7handleSupplierProfile/2deleteprofile/delete1.png)

- step 2: the supplier click on the top right profile icon

![](src/GUI/7handleSupplierProfile/2deleteprofile/delete2.png)

- step 3: the system redirects the supplier into the profile page. then the supplier clicks on "show advanced configuration"

![](src/GUI/7handleSupplierProfile/2deleteprofile/delete3.png)

- step 4:  the supplier clicks on "delete account"

![](src/GUI/7handleSupplierProfile/2deleteprofile/delete4.png)

- step 5: the system shows a confirmation pop up and the supplier clicks on "yes"

![](src/GUI/7handleSupplierProfile/2deleteprofile/delete5.png)

- step 6: the system redirects the user to the login page

![](src/GUI/7handleSupplierProfile/2deleteprofile/delete6.png)



### VIEW ORDERS

- step 1: the system shows all the pending orders

![](src/GUI/7handleSupplierProfile/3viewOrders/s1.png)



### VIEW SELLING STATUS

- step 1: in the profile section, the supplier can see the decision made by the administrator after the supplier's registration

![](src/GUI/7handleSupplierProfile/4viewSellingStatus/s1.png)



# 8 HANDLE WAREHOUSE PROFILE

### MODIFY WAREHOUSE PROFILE

- step 1: the warehouse manager is in a general page of the system

![](src/GUI/8handleWarehouseProfile/1modifyWarehouseProfile/s1.png)

- step 2: the warehouse manager clicks on the top right profile icon and then clicks on "edit profile"

![](src/GUI/8handleWarehouseProfile/1modifyWarehouseProfile/s2.png)

- step 3: the warehouse manager edits some information

![](src/GUI/8handleWarehouseProfile/1modifyWarehouseProfile/s3.png)

- step 4: the warehouse manager clicks on the "confirm edits" button

![](src/GUI/8handleWarehouseProfile/1modifyWarehouseProfile/s4.png)



### DELETE WAREHOUSE

- step 1: the warehouse manage is in a general page of the system

![](src/GUI/8handleWarehouseProfile/2deleteWarehouse/s1.png)

- step 2: the warehouse manager clicks on the profile button on the top right part of the page and then clicks on "edit profile"

![](src/GUI/8handleWarehouseProfile/2deleteWarehouse/s2.png)

- step 3: the system redirects the warehosue manager to the profile section and the warehouse manager clicks on "show advanced configuration"

![](src/GUI/8handleWarehouseProfile/2deleteWarehouse/s3.png)

- step 4: the system shows a delete button and the warehouse manager clicks on it

![](src/GUI/8handleWarehouseProfile/2deleteWarehouse/s4.png)

- step 5: the system shows a confirmation message and the warehouse manager clicks on "yes"

![](src/GUI/8handleWarehouseProfile/2deleteWarehouse/s5.png)

- step 6: the system redirects the user to the login page

![](src/GUI/8handleWarehouseProfile/2deleteWarehouse/s6.png)



# 9 HANDLE SUPPLIER INVENTORY

### ADD ITEM

- step 1: the supplier is in the inventory page and clicks on the "add new item" button

![](src/GUI/9handleSupplierInventory/1addItem/s1.png)

- step 2: the system redirects the supplier to a specific page and the supplier fills all the required fields. then clicks on add

![](src/GUI/9handleSupplierInventory/1addItem/s2.png)

- step 3: in case of errors (db constraints for example) the system shows the error

![](src/GUI/9handleSupplierInventory/1addItem/s3.png)


### DELETE ITEM

- step 1: the supplier, in the inventory page, clicks on the red "bin" button and the system shows a confirmation message. then the supplier clicks on "yes"

![](src/GUI/9handleSupplierInventory/2deleteItem/s1.png)



### VIEW INVENTORY

- step 1: the supplier in a general page of the system clicks on the "Inventory" button. then the system shows all the items in the inventory

![](src/GUI/9handleSupplierInventory/3viewInventory/s1.png)



# 10 HANDLE INTERNAL INVENTORY

### ADD ITEM

- step 1: the warehouse manager sees the items in the warehouse. He clicks on "add new item" button.

![](src/GUI/10handleInternalInventory/1addItem/s1.png)

- step 2: the warehouse manager fills the fields and press the add button to insert the new item.

![](src/GUI/10handleInternalInventory/1addItem/s2.png)

- step 3: in case the warehouse manager inserts an invalid item an error message appears.

![](src/GUI/10handleInternalInventory/1addItem/s3.png)



### MODIFY ITEM

- step 1: the warehouse manager sees the items in the warehouse. He clicks on one item to modify it.

![](src/GUI/10handleInternalInventory/2modifyItem/s1.png)

- step 2: the warehouse manager can modify the fields of the selected item and click on the "modify" button to update the informations of the item.

![](src/GUI/10handleInternalInventory/2modifyItem/s2.png)

- step 3: in case the warehouse manager clicks on the "go back" button without having previously saved the changes, a warning message appears.

![](src/GUI/10handleInternalInventory/2modifyItem/s3.png)

- step 4: in case the warehouse manager modifies the selected item with invalid fields, an error message appears.

![](src/GUI/10handleInternalInventory/2modifyItem/s4.png)



### DELETE ITEM

- step 1: the warehouse manager , in the inventory page, clicks on the red "bin" button and the system shows a confirmation message. then the supplier clicks on "yes"

![](src/GUI/10handleInternalInventory/3deleteItem/s1.png)




### VIEW INVENTORY

- step 1: the warehouse manager sees the items in the warehouse.

![](src/GUI/10handleInternalInventory/4viewInventory/s1.png)



# 11 HANDLE NEW ITEM

### CHECK QUALITY (PASS)

- step 1: the quality examiner sees the orders. He can see the items of the order by clicking on it.

![](src/GUI/11handleNewItem/checkQualitypass/s1.png)

- step 2: the quality examiner click on the green "V" because an item passed the quality check.

![](src/GUI/11handleNewItem/checkQualitypass/s2.png)

- step 3: a safety message appears. The quality examiner can confirm the choice or not.

![](src/GUI/11handleNewItem/checkQualitypass/s3.png)

- step 4: the status of the selected item is updated.

![](src/GUI/11handleNewItem/checkQualitypass/s4.png)




### CHECK QUALITY (DID NOT PASS)

- step 1: the quality examiner sees the orders. He can see the items of the order by clicking on it.

![](src/GUI/11handleNewItem/checkQualitydidnotpass/s1.png)

- step 2: the quality examiner click on the X button because an item didn't pass the quality check.

![](src/GUI/11handleNewItem/checkQualitydidnotpass/s2.png)

- step 3: a safety message appears. The quality examiner can confirm the choice or not.

![](src/GUI/11handleNewItem/checkQualitydidnotpass/s3.png)

- step 4: the status of the selected item is updated.

![](src/GUI/11handleNewItem/checkQualitydidnotpass/s4.png)

- step 5: the status of the order is marked as "conflicts found"

![](src/GUI/11handleNewItem/checkQualitydidnotpass/s5.png)




# 12 CHECK TRUST LEVEL OF A SUPPLIER
 
### CHECK TRUST LEVEL OF A SUPPLIER

- step 1: the administrator sees the list of requests from suppliers, he can click on the plus button to see more details

![](src/GUI/12checkTrustLevelOfASupplier/s1.png)

- step 2: the administrator sees the details of the request, he can accept or deny the request or go back to the previous window.

![](src/GUI/12checkTrustLevelOfASupplier/s2.png)

- step 3: a safety message appears. The administrator can confirm the choice or not.

![](src/GUI/12checkTrustLevelOfASupplier/s3.png)

- step 4: a safety message appears. The administrator can confirm the choice or not.

![](src/GUI/12checkTrustLevelOfASupplier/s4.png)










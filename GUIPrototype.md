# Graphical User Interface Prototype  

Authors: KEVIN CARDINALE, JUAN ANDRES VANEGAS JADAN, MARCO AMMIRATI, RAMIN HEDAYATMEHR

Date: 12 april 2022

Version: 1.0

⠀⠀⠀⠀

# Contents

## 1. Login
1. login for a general user

## 2. Log out
1. General log out for a general user

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


# LOGIN
 
### LOGIN FOR A GENERAL USER

- step 1: the user inserts email and password and then clicks on the "Log in" button

![](src/GUI/login/login1.png)

- step 2:  the user will be redirected to the main page relative to the profile

![](src/GUI/login/login2.png)




# LOG OUT
 
### LOG OUT FOR A GENERAL USER

- step 1: the user is in a general page

![](src/GUI/logout/logout1.png)

- step 2: the user clicks on the profile symbol on the top right of the page

![](src/GUI/logout/logout2.png)

- step 3: the user clicks on the "log out" button and selects the option "yes"

![](src/GUI/logout/logout3.png)

- step 4: the user is redirected to the login page

![](src/GUI/logout/logout4.png)




# REGISTRATION
 
### LOG OUT FOR A GENERAL USER

- step 1: the user is the login page and clicks on the "register" button

![](src/GUI/registration/registration1.png)

- step 2: the user fills all the required fields and clicks of the "confirm" button

![](src/GUI/registration/registration2.png)

- step 3: the is redirected to the main page 

![](src/GUI/registration/registration3.png)




# ADD INTERNAL MEMBER 
 
### ADD GENERAL INTERNAL MEMEBER OF THE COMPANY

- step 1: the warehouse manager clicks on the user section on the left bar and clicks on "add new user" on the top right

![](src/GUI/addinternalmember/addinternalmember1.png)

- step 2: the warehouse manager fills all the required fields 

![](src/GUI/addinternalmember/addinternalmember2.png)

- step 3: the warehouse manager clicks on "yes"

![](src/GUI/addinternalmember/addinternalmember3.png)

- step 4: the system shows a confirmation pop up and the warehouse manager clicks on "yes"

![](src/GUI/addinternalmember/addinternalmember4.png)

- step 5: the warehouse manager is redirected to the users page

![](src/GUI/addinternalmember/addinternalmember5.png)




# HANDLE INTERNAL ORDER
 
### CREATE INTERNAL ORDER

- step 1: the internal order manager clicks on the orders button and on the "new order" button

![](src/GUI/handleinternalorder/createinternalorder/createinternalorder1.png)

- step 2: the internal order manager selects the quantity for each required item and clicks on "place order"

![](src/GUI/handleinternalorder/createinternalorder/createinternalorder2.png)

- step 3: the system shows a confirmation box

![](src/GUI/handleinternalorder/createinternalorder/createinternalorder3.png)




### CANCEL INTERNAL ORDER

- step 1: the internal order manager is in the order page and selects the correspondent "red bin" button 

![](src\GUI\handleinternalorder\cancelinternalorder\cancelinternalorder1.png)

- step 2: the system shows a confirmation message and the internal order manager clicks on "yes"

![](src\GUI\handleinternalorder\cancelinternalorder\cancelinternalorder2.png)

- step 3: the system shows a confirmation message

![](src\GUI\handleinternalorder\cancelinternalorder\cancelinternalorder3.png)


### MODIFY INTERNAL ORDER

- step 1: the internal order manager is inside the orders page and clicks on the yellow pencil button

![](src\GUI\handleinternalorder\modifyinternalorder\modifyinternalorder1.png)

- step 2: the internal order manager modify the quantity for each item of the order and selecs which item remove. then clicks on the "confirm edit" button

![](src\GUI\handleinternalorder\modifyinternalorder\modifyinternalorder2.png)

- step 3: the system shows a confirmation box and the internal order manager clicks on yes

![](src\GUI\handleinternalorder\modifyinternalorder\modifyinternalorder3.png)

- step 4: the system shows a confirmation message

![](src\GUI\handleinternalorder\modifyinternalorder\modifyinternalorder4.png)


### CLOSE INTERNAL ORDER

- step 1: the internal order manager is the order page and clicks on the green "V" button to confirm the delivery

![](src\GUI\handleinternalorder\closeinternalorder\closeinternalorder1.png)

- step 2: the system shows a confirmation message and the internal order manager clicks on the "yes" button

![](src\GUI\handleinternalorder\closeinternalorder\closeinternalorder2.png)

- step 3: the system shows a confirmation pop up and redirects the internal order manager in the order page.

![](src\GUI\handleinternalorder\closeinternalorder\closeinternalorder3.png)




### CREATE EXTERNAL ORDER

- step 1: the warehouse manager is in the order page and clicks on the "new order" button on the top right of the page

![](src\GUI\handleexternalorder\create\create1.png)

- step 2: the warehouse manager selects the required item and the quantity

![](src\GUI\handleexternalorder\create\create2.png)

- step 3: the system shows all the supplier with a compatible number of quantity and then the warehouse manager select the preferred supplier

![](src\GUI\handleexternalorder\create\create3.png)

- step 4: the system shows a summary of the order and the warehouse manager clicks on the "pay" button

![](src\GUI\handleexternalorder\create\create4.png)

- step 5: the warehouse manager fills all the required fields and clicks on the "confirm" button

![](src\GUI\handleexternalorder\create\create5.png)

- step 6: the system shows a confirmation message to confirm the operation and the warehouse manager clicks on the "yes" button

![](src\GUI\handleexternalorder\create\create6.png)

- step 7:  the system shows a confirmation message and the warehouse manager clicks on the "go to orders" button

![](src\GUI\handleexternalorder\create\create7.png)




### CANCEL EXTERNAL ORDER

- step 1: the warehouse manager is in the external order page and select the red "bin" button to cancel an order

![](src\GUI\handleexternalorder\cancel\cancel1.png)

- step 2: the system asks for a confirmation and the warehouse manager selects "yes"

![](src\GUI\handleexternalorder\cancel\cancel2.png)

- step 3: the system shows a confirmation message

![](src\GUI\handleexternalorder\cancel\cancel3.png)




### MODIFY EXTERNAL ORDER

- step 1: the warehouse manager is in the external order page and select the yellow "pencil" button to modify a specific order

![](src\GUI\handleexternalorder\modify\modify1.png)

- step 2: the system asks for the new quantity, if the items have to be removed, the system compute the new total and then the warehouse manger clicks on the "confirm edit" button

![](src\GUI\handleexternalorder\modify\modify2.png)

- step 3: the system asks for a confirmation and the warehouse manager clicks on the "yes" button

![](src\GUI\handleexternalorder\modify\modify3.png)

- step 4: the system shows a confirmation message

![](src\GUI\handleexternalorder\modify\modify4.png)




### CLOSE EXTERNAL ORDER

- step 1: the warehouse manager is in the external order page and select the green "V" button to confirm the delivery

![](src\GUI\handleexternalorder\close\close1.png)

- step 2: the system asks for confirmation from the warehouse manager and the warehouse manager clicks on the "yes" button

![](src\GUI\handleexternalorder\close\close2.png)

- step 3: the system shows a confirmation message

![](src\GUI\handleexternalorder\close\close3.png)









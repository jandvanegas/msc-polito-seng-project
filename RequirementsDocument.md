#Requirements Document

Date: 22 march 2022

Version: 0.0

| Version number | Change |
| -------------- | :----- |
|                |        |

# Contents

- [Informal description](#informal-description)
- [Stakeholders](#stakeholders)
- [Context Diagram and interfaces](#context-diagram-and-interfaces)
  - [Context Diagram](#context-diagram)
  - [Interfaces](#interfaces)
- [Stories and personas](#stories-and-personas)
- [Functional and non functional requirements](#functional-and-non-functional-requirements)
  - [Functional Requirements](#functional-requirements)
  - [Non functional requirements](#non-functional-requirements)
- [Use case diagram and use cases](#use-case-diagram-and-use-cases)
  - [Use case diagram](#use-case-diagram)
  - [Use cases](#use-cases) + [Relevant scenarios](#relevant-scenarios)
- [Glossary](#glossary)
- [System design](#system-design)
- [Deployment diagram](#deployment-diagram)

# Informal description

Medium companies and retailers need a simple application to manage the relationship with suppliers and the inventory of physical items stocked in a physical warehouse.
The warehouse is supervised by a manager, who supervises the availability of items. When a certain item is in short supply, the manager issues an order to a supplier.
In general the same item can be purchased by many suppliers. The warehouse keeps a list of possible suppliers per item.

After some time the items ordered to a supplier are received. The items must be quality checked and stored in specific positions in the warehouse.
The quality check is performed by specific roles (quality office), who apply specific tests for item (different items are tested differently).
Possibly the tests are not made at all, or made randomly on some of the items received. If an item does not pass a quality test it may be
rejected and sent back to the supplier.

Storage of items in the warehouse must take into account the availability of physical space in the warehouse. Further the position of items must be traced to
guide later recollection of them.

The warehouse is part of a company. Other organizational units (OU) of the company may ask for items in the warehouse. This is implemented via internal orders,
received by the warehouse. Upon reception of an internal order the warehouse must collect the requested item(s), prepare them and deliver them to a pick up area.
When the item is collected by the other OU the internal order is completed.

EZWH (EaSy WareHouse) is a software application to support the management of a warehouse.

# Stakeholders

| Stakeholder name       | Description                                                 |
| ---------------------- | :---------------------------------------------------------- |
| retailer               | who supplies the products                                   |
| customer company       | company that needs a product                                |
| warehouse manager      | manager of the warehouse                                    |
| quality office         | office with the task of testing the quality of products     |
| warehouse company      | owner of a warehouse used by a company                      |
| competitors            | similar software application having the same goal           |
| organizational units   | organizational units of the company                         |
| cloud service          | cloud service to host the software                          |
| post service           | product delivery company                                    |
| internal order manager | who has the task to manage interal order inside the company |
| payment service        | service (or services) used to pay                           |

# Context Diagram and interfaces

## Context Diagram

```
@startuml
left to right direction
skinparam packageStyle rectangle
actor Administrator
actor WareHouse_Manager
actor Quality_Office
actor Internal_Order_Manager
actor Payment_Service
actor Post_Service
actor Cloud_Service

rectangle system{
  Administrator -- (EZWH)
  WareHouse_Manager -- (EZWH)
  Quality_Office -- (EZWH)
  Internal_Order_Manager -- (EZWH)
  (EZWH) -- Payment_Service
  (EZWH) -- Post_Service
  (EZWH) -- Cloud_Service
}
@enduml
```

## Interfaces

\<describe here each interface in the context diagram>

\<GUIs will be described graphically in a separate document>

| Actor                  |                     Logical Interface                      |       Physical Interface |
| ---------------------- | :--------------------------------------------------------: | -----------------------: |
| administrator          | screen, keyboard, internet connection, internet connection | graphical user interface |
| warehouse manager      | screen, keyboard, internet connection, internet connection | graphical user interface |
| quality office / QA    | screen, keyboard, internet connection, internet connection | graphical user interface |
| internal order manager | screen, keyboard, internet connection, internet connection | graphical user interface |
| payment service        |                    Internet connection                     |          API description |
| post service           |                    Internet connection                     |          API description |
| cloud service          |                    Internet connection                     |                 API, GUI |

# Stories and personas

\<A Persona is a realistic impersonation of an actor. Define here a few personas and describe in plain text how a persona interacts with the system>

\<Persona is-an-instance-of actor>

\<stories will be formalized later as scenarios in use cases>

# Functional and non functional requirements

## Functional Requirements

\<In the form DO SOMETHING, or VERB NOUN, describe high level capabilities of the system>

\<they match to high level use cases>

| ID      |          Description           |
| ------- | :----------------------------: |
| FR1     | Authorization and authenticate |
| FR1.1   |             Log in             |
| FR1.2   |            Log out             |
| FR1.3   |          Registration          |
| -----   |          :---------:           |
| FR2     |          Handle order          |
| FR2.1   |     Handle internal order      |
| FR2.1.1 |     Create internal order      |
| FR2.1.2 |     Cancel internal order      |
| FR2.1.3 |     Modify internal order      |
| FR2.1.4 |          Close order           |
| FR2.2   |     Handle external order      |
| FR2.2.1 |     Create external order      |
| FR2.2.2 |     Cancel external order      |
| FR2.2.3 |     Modify external order      |
| FR2.2.4 |          Close order           |
| FR2.2.5 | Allow to pay an external order |
| -----   |          :---------:           |
| FR3     |        Handle supplier         |
| FR3.1   |        Create supplier         |
| FR3.2   |        Modify supplier         |
| FR3.3   |        Delete supplier         |
| -----   |          :---------:           |
| FR4     |        Handle warehouse        |
| FR4.1   |        Create warehouse        |
| FR4.2   |        Modify warehouse        |
| FR4.3   |        Delete warehouse        |
| -----   |          :---------:           |
| FR5     |        Handle inventory        |
| FR5.1   |      Item status tracking      |
| FR5.2   |         QA evaluation          |
| FR5.3   |        Update inventory        |
| FR5.4   |        Report generator        |
| -----   |          :---------:           |

## Non Functional Requirements

\<Describe constraints on functional requirements>

| ID     |    Type     |            Description            |                     Refers to |
| ------ | :---------: | :-------------------------------: | ----------------------------: |
| NFR1   | Reliability |               MTBF                | < 1 failure per user per year |
| NFR2   |  Usability  |       Training hours needed       |                      < 1 hour |
| NFR3   | Performance |    Perception of waiting times    |                     < 0.1 sec |
| NFR4   | Portability | Work on ios/android/macos/windows |                          true |
| NFR5   | Scalability |            Warehouses             |                         > 100 |
| :----: |    :---:    |              :----:               |                         :---: |
| NFR6   |  Security   |  Access only to authorized users  |                          true |

# Use case diagram and use cases

## Use case diagram

\<define here UML Use case diagram UCD summarizing all use cases, and their relationships>

\<next describe here each use case in the UCD>

### Use case 1, UC1

| Actors Involved  |                                                                      |
| ---------------- | :------------------------------------------------------------------: |
| Precondition     | \<Boolean expression, must evaluate to true before the UC can start> |
| Post condition   |  \<Boolean expression, must evaluate to true after UC is finished>   |
| Nominal Scenario |         \<Textual description of actions executed by the UC>         |
| Variants         |                      \<other normal executions>                      |
| Exceptions       |                        \<exceptions, errors >                        |

##### Scenario 1.1

\<describe here scenarios instances of UC1>

\<a scenario is a sequence of steps that corresponds to a particular execution of one use case>

\<a scenario is a more formal description of a story>

\<only relevant scenarios should be described>

| Scenario 1.1   |                                                                            |
| -------------- | :------------------------------------------------------------------------: |
| Precondition   | \<Boolean expression, must evaluate to true before the scenario can start> |
| Post condition |  \<Boolean expression, must evaluate to true after scenario is finished>   |
| Step#          |                                Description                                 |
| 1              |                                                                            |
| 2              |                                                                            |
| ...            |                                                                            |

##### Scenario 1.2

##### Scenario 1.x

### Use case 2, UC2

..

### Use case x, UCx

..

# Glossary

\<use UML class diagram to define important terms, or concepts in the domain of the system, and their relationships>

\<concepts are used consistently all over the document, ex in use cases, requirements etc>

# System Design

\<describe here system design>

\<must be consistent with Context diagram>

# Deployment Diagram

\<describe here deployment diagram >

# Design Document

Authors: KEVIN CARDINALE, JUAN ANDRES VANEGAS JADAN, MARCO AMMIRATI, RAMIN HEDAYATMEHR

Date: 25/05/2022

Version: 1.1

# Contents

- [High level design](#package-diagram)
- [Low level design](#class-diagram)
- [Verification traceability matrix](#verification-traceability-matrix)
- [Verification sequence diagrams](#verification-sequence-diagrams)

# Instructions

The design must satisfy the Official Requirements document

# High level design

Ezwh is a three layered application.
* _gui_ (level "zero"): implementation of the graphical user Interface. it corresponds to the "view" of the MVC architecture
* _api_ (first level): the first logic unit of the system that interacts with the lower level of the backend and the gui. It corresponds to the the "control" of the MVC architecture
* _service_ (second level): the second logic unit of the system. it interacts with the functionalities of the database.
* _dao_ (third level): for storing data.  it corresponds to the "model" of the MVC architecture
* _data_ (fourth level): it corresponds to the persistency of the system.

![High Level Design](http://www.plantuml.com/plantuml/png/TOyn2iCm34LtdK9ajyyGwDorIyaWOf6QEf5nv0PQUlTI3AM3jUhxFPx7NQbeNHD0flbE2-DmYNmC-0B4AqRrML9KyVmyRdwf4ITumz_hasnQ91a0vI_G6NOkZpXpi_raPmbigG89JjXVb9ge7upEMMNTSmFiOcjge9rkt9qplmGZRw6kwGC0)

# Low level design

In order to manage each resource endpoint(Order, SKU, SKUItem, etc), we will implement the command pattern in the main entry point. We will create a Controller interface with a method named ‘execute’ to be implemented in different controllers. We will create one controller for each Resource(‘Order’, ‘SKU’, etc). The main method will call this `execute` method to the controllers depending on the path the requests are done(e.g. If the request is done to /order/*, the main method will call the `execute` method in the OrderController. The specific controller will implement the specific business logic for each resource.

![Low Level Design](src/img/lowLevelDesign.png)

# Verification traceability matrix

|     | Internal order | restock order | return order | internal customer | test descriptor | sku item | test result | supplier | user | warehouse | position | sku | item | customer | control |
| --- | :------------: | :-----------: | :----------: | :---------------: | :-------------: | :------: | :---------: | :------: | :--: | :-------: | :------: | :-: | :--: | :------: | :--------: |
| FR1 |                |               |              |                   |                 |          |             |          |  x   |           |          |     |      |          |     x      |
| FR2 |                |               |              |                   |                 |    x     |             |          |      |           |          |  x  |      |          |     x      |
| FR3 |                |               |              |                   |        x        |          |      x      |          |      |     x     |    x     |     |      |          |     x      |
| FR4 |                |               |              |         x         |                 |          |             |          |      |           |          |     |      |    x     |     x      |
| FR5 |                |       x       |      x       |                   |                 |    x     |             |    x     |      |           |          |  x  |  x   |    x     |     x      |
| FR6 |       x        |               |              |         x         |                 |    x     |             |          |      |           |          |  x  |  x   |          |     x      |
| FR7 |                |               |              |                   |                 |          |             |          |      |           |          |     |  x   |          |     x      |

# Verification sequence diagrams

## Create restock order
![Create restock order](http://www.plantuml.com/plantuml/png/PP51IWKn38RtFKMMkkW57Y83kXVq01BQ8CMPjgQfU7oJ3c_HJZSb-R_aJyZM15dwiJk7GGh3-RvwSbM555B5B80r0JOuCEKfNpWIVn3_fa06l5dyKh9msNVYYMLgKiBtfzOiIaH1vzGJ_FFmWDkWt-cdw_Vmw2ofujfVEVgZq8MKSOke-6HvWy240vtoeA1DeCrIRiJogi45WYVl1pP6gqL9PHPBOvOomwLpFianGBmMWhzlFhKVUvjc1rcaZNAqk_q3)

## Delete position
![Delete position](http://www.plantuml.com/plantuml/png/TP11Ii0m44NtSueisqKkK4GANa3Q4mp9A0Df4ZCJyVXEgYAbcatW__SV8QieDkr70i2WfRclyzePgXKSk69MXvKTYZkGyoMlHLYvv9tQEmSQp4_qLBAsaXArooAY8e3v_UEfSujh9BhHMxThuZZ36LjzDnbC7nIwqZJ3lHwZuJSiKYAbvs_4w3Ft_raRIIrPXjQUzk3z7zZYzXu2YRpqjFtoi5AEumC_0G00)

## Logout
![Logout](http://www.plantuml.com/plantuml/png/RP71QiCm38RlVWeVMsXU88nHw2wxjkm1XAC6WsDxajojRpzP6oi9pINu-xzVSiYH1KZQaXm4AUH_dxb5LvN742jayL2Z1_OBnBpYZP4kIBSOK7CxdaeMAYaXRSmDc430ELqqlDfSFtf2bZD-DdtjkfzXmOElmFnLQ3fukLVSEvErj5wcTVp6q0HtUxU9J3ObbVazcs3OBg5uHlbGygOd3PtHuT5gVvdLNeR1mEXlIF5wFn5Ec2L2ul_1psv7oBLanhx0la47RQoLDBVOZMwE_j92GEPhI-U7uOwOf_xdVW00)

## Login
![Login](http://www.plantuml.com/plantuml/png/PP5HQiGm34J_VGf_xdxa0aif2pr0ONC2uKo2mB5JMoezVXKLsYRh7-EPfz60xrseYQuvK9BQuizPbCDcEYVUg4YaZIFrk1ANWwuTRKJxv0Jp_VbMYxIQCzg9F0aJ2OLWYuPNpustsD3bWG-rwxBpXLPSWvi67SCDnnUI2YxNSB8STYJNvLt52TTzg-aJCWGZUkTQkld1ZU5lCjKoSrj93FYTVsxXfJVBW45UzMKOJj21MPHtOYTlSTIKhCEi-V4lvOuoxH_o3G00)

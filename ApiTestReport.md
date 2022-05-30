# Integration and API Test Report

Date: 25/05/2022

Version: 1.0

# Contents

- [Dependency graph](#dependency graph)
- [Integration approach](#integration)
- [Tests](#tests)
- [Scenarios](#scenarios)
- [Coverage of scenarios and FR](#scenario-coverage)
- [Coverage of non-functional requirements](#nfr-coverage)

# Dependency graph

![Dependency graph](http://www.plantuml.com/plantuml/png/VPMzReCm54PtFmLZk_00dH8fIwPKRL-0agkM50ooJTJ7hq2urtp-dFMUeyYS-CSSV6XSc8VUjECmZLPigDg-4nlgcqzcNjnTt39BXfqDucpJNznLtF7rlE241XcouJJwBdIZzHbn4cPdrv_AeV-Ppq462l9X41zEublNJM5q5B-9d_kGeTbBxdzBFsNVBhyohH_ogCdfUCcRw12RA25D06eJ1d28JHHdJHHfazp_RBnamw7xSasGHqNUnTsxLl8g0A0CKgm30XGgGG2q52XOIp4KIu3vFr1LNUj9gbwgqyUbUhhvqJwRs0uaetfTfzKD7hvLcQSwsQvBLqxW629Eot8ZfYtI0jd7vOxMvNp9oqavYXvNx88Gqw31wu340w708S_4DIm52iP2QFRRYzG38OQ3kJOZ47CXrrAKqJdf0mQa0QfLs9vP5NflmUw9JHAgALHXrnXKYMhfKjD8gcupq519CMHJaTvviCFKvlTVR1ebl0LfpoYpPtDNLcDlb4HTZEmr9K5PxAZdKNUjrO8VqrSNCuD77s8M54flPbfLz_86oUfrQRXmFBjyyVo7YYk6K2MDLp26R0DuztG70D3lG8gxW0gwRWu1q5YWO070-dzIO0vYh_FGcpy0)

# Integration approach

**Legend / nomenclacy** :

1. Real instance of the database: A (it may be more than one, one for each of class - ex: A1, A2, A3...)
2. Mocked instance of the database: B (it may be more than one, one for each of class - ex: B1, B2, B3...)
3. Service instance: C (it may be more than one, one for each class - ex: C1, C2, C3...)
4. Api instance: D (it may be more than one, one for each class - ex: D1, D2, D3...)

In order to test all the classes, we will use a mixed botton up apporach, starting from testing the DAO files and at the end the api files, composed of all the behind reuired classes

- **step 1:** testing the Data Access Objects classes with the version of the real database
- **step 2:** testing the Service classes with all the required DAO classes (mocked)
- **step 3:** testing the Service classes with all the required DAO classes (real)
- **step 4:** testing the Api test with all the included classes

The term "_Mixed_" is referring to the fact that only for the step 2 we are using the mocked version of the database. in this way it is possible to check if the X_dao.js class and the correspondend X_service.js classes comunicate correctly and also to check the correctness of the methods.

### Example with the sku class:

    step 1: test of the skusDAO.js class with the real db (classes involved: A1)
    step 2: test of skuService.js with the mocked instances of the skusDao and the positionsDAO (classes involved: C1, B1, B2)
    step 3: test of skusService.js with the real instances of the skusDao and the positionsDAO based on real database interactions  (classes involved: C1, A1, A2)
    step 4: test of skusApi.js with the real instance of the database and the correspondends skusService and positionService (classes involved: D1, C1, C2, A1, A2, A3, A4)

**STEP 1:** (unit test)
![step 1](http://www.plantuml.com/plantuml/png/SoWkIImgAStDuUAArefLqBLJS3HKi58eIIqkuU9oICrB0Ke10000)

**STEP 2:**
![step 2](http://www.plantuml.com/plantuml/png/SoWkIImgAStDuUAArefLqBLJS3PKi58eIIqkuGAoT842JY21ujIYiipaL0LTXTpyvEpK58MKn7ou0YDS2hWSKlDIW8O30000)

**STEP 3:**
![step 3](http://www.plantuml.com/plantuml/png/SoWkIImgAStDuUAArefLqBLJS3PKi58eIIqkuGAoT842ZY21ujIYiipaL0LTXQBKn1o5bCHykBGHTcakXzIy5A310000)

**STEP 4:** (api test)
![step 4](http://www.plantuml.com/plantuml/png/SoWkIImgAStDuUAArefLqDMrKt0nLB1IA4ajBk42ia02pY21n89C1Ls5ujIYiipaL0KkPuYK8r0ABbYKcfYZa9AO3vSqmY89DzG8Yw5647t6IFfquJhXqYROfRaSKlDIW3u10000)

# Integration Tests

The following steps are referring to the testing of the sku route.

## Step 1 : test the db only

| Classes    | mock up used | Jest test cases                          |
| ---------- | ------------ | ---------------------------------------- |
| skusDao.js | < no >       | sku_dao_dbreal.test.js > get all skus    |
| skusDao.js | < no >       | sku_dao_dbreal.test.js > get sku by id   |
| skusDao.js | < no >       | sku_dao_dbreal.test.js > add sku         |
| skusDao.js | < no >       | sku_dao_dbreal.test.js > update sku      |
| skusDao.js | < no >       | sku_dao_dbreal.test.js > remove sku      |
| skusDao.js | < no >       | sku_dao_dbreal.test.js > remove all sku  |
| skusDao.js | < no >       | sku_dao_dbreal.test.js > update position |

## Step 2 : test the service with the mocked db

| Classes        | mock up used    | Jest test cases                              |
| -------------- | --------------- | -------------------------------------------- |
| skusService.js | mock_sku_dao.js | sku_service_dbmock.test.js > get all skus    |
| skusService.js | mock_sku_dao.js | sku_service_dbmock.test.js > get sku by id   |
| skusService.js | mock_sku_dao.js | sku_service_dbmock.test.js > add sku         |
| skusService.js | mock_sku_dao.js | sku_service_dbmock.test.js > update sku      |
| skusService.js | mock_sku_dao.js | sku_service_dbmock.test.js > remove sku      |
| skusService.js | mock_sku_dao.js | sku_service_dbmock.test.js > remove all sku  |
| skusService.js | mock_sku_dao.js | sku_service_dbmock.test.js > update position |

## Step 3 : test the service with the real db

| Classes        | mock up used | Jest test cases                              |
| -------------- | ------------ | -------------------------------------------- |
| skusService.js | < no >       | sku_service_dbreal.test.js > get all skus    |
| skusService.js | < no >       | sku_service_dbreal.test.js > get sku by id   |
| skusService.js | < no >       | sku_service_dbreal.test.js > add sku         |
| skusService.js | < no >       | sku_service_dbreal.test.js > update sku      |
| skusService.js | < no >       | sku_service_dbreal.test.js > remove sku      |
| skusService.js | < no >       | sku_service_dbreal.test.js > remove all sku  |
| skusService.js | < no >       | sku_service_dbreal.test.js > update position |

## Step 4 : test the api with the service and the real db

| Classes    | mock up used | Mocha test cases                    |
| ---------- | ------------ | ----------------------------------- |
| skusApi.js | < no >       | test sku apis > get all skus        |
| skusApi.js | < no >       | test sku apis > get sku by id       |
| skusApi.js | < no >       | test sku apis > add sku             |
| skusApi.js | < no >       | test sku apis > update sku          |
| skusApi.js | < no >       | test sku apis > remove sku          |
| skusApi.js | < no >       | test sku apis > update sku position |

# Coverage of Scenarios and FR

| Scenario ID     | Functional Requirements covered | Mocha Test(s)    |
| --------------- | ------------------------------- | ---------------- |
| 1-1 , 1-2 , 1-3 | FR 2.1 create, modify           | testSkuRouter.js |
|                 | FR 2.2 delete                   | testSkuRouter.js |
|                 | FR 2.3 list all                 | testSkuRouter.js |
|                 | FR 2.4 search                   | testSkuRouter.js |

# Coverage of Non Functional Requirements

###

| Non Functional Requirement | Test name                                       |
| -------------------------- | ----------------------------------------------- |
| response time < 500 ms     | included in the "testSkuRouter.js" in all tests |

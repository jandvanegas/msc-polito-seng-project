const helper = require("./helper");

function testDescriptorsApi(testDescriptorService) {
    const apiHelper = helper()
    const getAll = (req, res, next) => {
        testDescriptorService.getAll()
            .then((rows) => {
                res.status(200).json(rows);
            })
            .catch((err) => next(err));
    }
    const add = (req, res, next) => {
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [
                ['name', 'string'],
                ['procedureDescription', 'string'],
                ['idSKU', 'number'],
            ]
        )
        if (!fieldsValid) return;

        testDescriptorService.add(
            req.body.name,
            req.body.procedureDescription,
            req.body.idSKU,
        )
            .then((id) => {
                console.log(`testDescriptor ${id} created`)
                return res.status(201).end();
            })
            .catch((err) => next(err));
    }
    const getById = (req, res, next) => {
        const id = req.params.id;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(Number.parseInt(id)),
            ]
        )
        if (!conditionsValid) return;

        testDescriptorService.getById(id)
            .then((rows) => {
                return res.status(200).json(rows);
            })
            .catch((err) => next(err));

    }
    const update = (req, res, next) => {
        const id = req.params.id;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(Number.parseInt(id)),
            ]
        )
        if (!conditionsValid) return;

        const fieldsValid = apiHelper.fieldsValid(req, res, next, [
                ['newName', 'string'],
                ['newProcedureDescription', 'string'],
                ['newIdSKU', 'number'],
            ]
        )
        if (!fieldsValid) return;

        testDescriptorService.update(
            id,
            req.body.newName,
            req.body.newProcedureDescription,
            req.body.newIdSKU,
        )
            .then(() => {
                console.log(`Test descriptor ${id} updated.`)
                return res.status(200).end();
            })
            .catch((err) => next(err));
    }

    const remove = (req, res, next) => {
        const id = req.params.id;
        const conditionsValid = apiHelper.conditionsValid(next,
            [
                Number.isInteger(Number.parseInt(id)),
            ]
        )
        if (!conditionsValid) return;

        testDescriptorService.remove(id)
            .then(() => {
                return res.status(204).end();
            })
            .catch((err) => next(err));
    }
    return {
        getAll: getAll,
        add: add,
        getById: getById,
        update: update,
        remove: remove,
    }
}

module.exports = testDescriptorsApi

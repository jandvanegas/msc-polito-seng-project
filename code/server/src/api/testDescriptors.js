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
        const fieldsValid = apiHelper.fieldsValid(req, res, next, [['name', 'string'],
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
        if (Number.isNaN(Number.parseInt(req.params.id))) {
            return res.status(422).json({error: "invalid id"});
        }
        testDescriptorService.getById(req.params.id)
            .then((rows) => {
                return res.status(200).json(rows);
            })
            .catch((err) => next(err));

    }
    const update = (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "empty body request"});
        }
        const id = req.params.id;
        if (req.params.id === undefined) {
            return res.status(422).json({error: "no id"});
        }

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
        if (isNaN(Number.parseInt(id))) {
            return res.status(422).json({error: "no id"});
        }
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

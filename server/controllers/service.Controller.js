
module.exports = {
    getCategory: async (req, res) => {
        const db = req.app.get("db")

        const categories = await db.category.getByCategory();

        res.status(200).json(categories)
;    },
    getService: async (req, res) => {
        const category_id = +req.params.category_id;
        const db = req.app.get("db");

        const service = await db.service.getCategoryService(category_id);

        res.status(200).json(service);
    },
    addService: async (req, res) => {
        const {category_id, service_id, user_id, service_description} = req.body;
        const db = req.app.get("db");

        if(!service_description) {
            res.status(409).json("Please provide a description of your service.")
        } else {
            const newService = await db.service.addService(category_id, service_id, user_id, service_description);

            res.status(200).json(newService);
        }
    },
    editService: (req, res) => {
        const {category_id, service_id, editedService} = req.body;
        const db = req.app.get("db");

        const editService = db.service.editService(category_id, service_id, editedService);

        res.status(200).json(editService);
    },
    deleteService: async (req, res) => {
        const {category_id, service_id} = req.params;
        const db = req.app.get("db");

        const deletedService = await db.service.deleteService(category_id, service_id);

        res.status(200).json(deletedService);
    }
};
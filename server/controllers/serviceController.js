
module.exports = {
    getCategory: async (req, res) => {
        const db = req.app.get("db");

        const categories = await db.category.getCategory();
        res.status(200).json(categories);
    },
    getService: async (req, res) => {
        const category_id = +req.params.category_id;
        const db = req.app.get("db");

        const service = await db.service.getCategoryService(category_id);

        res.status(200).json(service);
    },
    addService: async (req, res) => {
        const { category_id, user_id, service_description, file_url } = req.body;
        const db = req.app.get("db");

        if (!service_description) {
            res.status(409).json("Please provide a description of your service.");
        } else {
            const newService = await db.service.addService(category_id, user_id, service_description, file_url);

            res.status(200).json(newService);
        };
    },
    editService: async (req, res) => {
        const { category_id, service_id, service_description } = req.body;
        const db = req.app.get("db");

        const editService = await db.service.editService(category_id, service_id, service_description);

        res.status(200).json(editService);
    },
    deleteService: async (req, res) => {
        const { service_id, category_id } = req.params;
        const db = req.app.get("db");

        const services = await db.service.deleteService(service_id, category_id);

        res.status(200).json(services);
    }
};
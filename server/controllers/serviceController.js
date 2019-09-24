
module.exports = {
    getCategory: async (req, res) => {
        const db = req.app.get("db")

        const categories = await db.category.getCategory();
        console.log(categories)
        res.status(200).json(categories)
;    },
    getService: async (req, res) => {
        const category_id = +req.params.category_id;
        const db = req.app.get("db");

        const service = await db.service.getCategoryService(category_id);

        res.status(200).json(service);
    },
    addService: async (req, res) => {
        const {category_id, user_id, service_description} = req.body;
        const db = req.app.get("db");

        if(!service_description) {
            res.status(409).json("Please provide a description of your service.")
        } else {
            const newService = await db.service.addService(category_id, user_id, service_description);

            res.status(200).json(newService);
        }
    },
    editService: (req, res) => {
        //service_description is a placeholder for now. I "hard-coded" it to test in postman.
        //when i set up the edit method in reducer and change the state in Service component,
        //i will need to replace service_description to property name that is in state, which will
        //be saved to a variable and passed to my edit method in reducer and then sent to backend
        //to have massive change it in my database. See how eric did it in Posts.js: lines 20-23,
        //postsReducer.js: lines 35-40, and then to backend at postsController.js: lines 29-34.
        const {category_id, service_id, service_description} = req.body;
        const db = req.app.get("db");

        const editService = db.service.editService(category_id, service_id, service_description);

        res.status(200).json(editService);
    },
    deleteService: async (req, res) => {
        const {service_id} = req.params;
        const db = req.app.get("db");

        const services = await db.service.deleteService(service_id);

        res.status(200).json(services);
    }
};
const bcrypt = require("bcryptjs");

module.exports = {
    getUser: (req, res) => {
        if (req.session.user) {
            res.status(200).json(req.session.user);
        };
    },
    register: async (req, res) => {
        const { name, username, password, user_phone_number } = req.body;
        const db = req.app.get("db");

        const foundUser = await db.auth.checkForUsername(username);

        if (foundUser[0]) {
            res.status(409).json("Username Taken");
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = await db.auth.registerUser(name, username, hash, user_phone_number);

            req.session.user = {
                user_id: newUser[0].user_id,
                username: newUser[0].username,
                name: newUser[0].name,
                user_phone_number: newUser[0].user_phone_number
            };

            res.status(200).json(req.session.user);
        };
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        const db = req.app.get("db");

        const foundUser = await db.auth.checkForUsername(username);

        if (!foundUser[0]) {
            res.status(403).json("Username or Password Incorrect");
        } else {
            const isAuthenticated = bcrypt.compareSync(password, foundUser[0].password);

            if (!isAuthenticated) {
                res.status(403).json("Username or Password Incorrect");
            } else {
                req.session.user = {
                    user_id: foundUser[0].user_id,
                    username: foundUser[0].username,
                    name: foundUser[0].name,
                    user_phone_number: foundUser[0].user_phone_number
                };
                res.status(200).json(req.session.user);
            };
        };
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    updateName: async (req, res) => {
        const { name } = req.body;
        const { user_id } = req.session.user;
        const db = req.app.get("db");

        const nameEdit = await db.auth.updateName(user_id, name);

        req.session.user = {
            user_id: nameEdit[0].user_id,
            username: nameEdit[0].username,
            name: nameEdit[0].name,
            user_phone_number: nameEdit[0].user_phone_number
        };

        res.status(200).json(req.session.user);
    },
    updateUsername: async (req, res) => {
        const { username } = req.body;
        const { user_id } = req.session.user;
        const db = req.app.get("db");

        const foundUser = await db.auth.checkForUsername(username);

        if (foundUser[0]) {
            res.status(409).json("Username Taken");
        } else {
            const usernameEdit = await db.auth.updateUsername(user_id, username);

            req.session.user = {
                user_id: usernameEdit[0].user_id,
                username: usernameEdit[0].username,
                name: usernameEdit[0].name,
                user_phone_number: usernameEdit[0].user_phone_number
            };

            res.status(200).json(req.session.user);
        };
    },
    updateNumber: async (req, res) => {
        const { user_phone_number } = req.body;
        const { user_id } = req.session.user;
        const db = req.app.get("db");

        const editNumber = await db.auth.updateUserPhoneNumber(user_id, user_phone_number);

        req.session.user = {
            user_id: editNumber[0].user_id,
            username: editNumber[0].username,
            name: editNumber[0].name,
            user_phone_number: editNumber[0].user_phone_number
        };

        res.status(200).json(req.session.user);
    }
};
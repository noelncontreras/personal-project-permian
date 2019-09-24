const bcrypt = require("bcryptjs");

module.exports = {
    getUser: (req, res) => {
        if (req.session.user) {
            res.status(200).json(req.session.user);
        }
    },
    register: async (req, res) => {
        const {name, username, password} = req.body;
        const db = req.app.get("db");

        const foundUser = await db.auth.checkForUsername(username);

        if(foundUser[0]) {
            res.status(409).json("Username Taken")
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = await db.auth.registerUser(name, username, hash);

            req.session.user = {
                user_id: newUser[0].user_id,
                username: newUser[0].username,
                name: newUser[0].name
            };

            res.status(200).json(req.session.user);
        }
    },
    login: async (req, res) => {
        const {username, password} = req.body;
        const db = req.app.get("db");

        const foundUser = await db.auth.checkForUsername(username);

        if(!foundUser[0]) {
            res.status(403).json("Username or Password Incorrect")
        } else {
            const isAuthenticated = bcrypt.compareSync(password, foundUser[0].password)

            if(!isAuthenticated) {
                res.status(403).json("Username or Password Incorrect")
            } else {
                req.session.user = {
                    user_id: foundUser[0].user_id,
                    username: foundUser[0].username,
                    name: foundUser[0].name
                };
                console.log(req.session.user)
                res.status(200).json(req.session.user);
            }
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
};
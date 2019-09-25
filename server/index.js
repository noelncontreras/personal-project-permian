require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const session = require('express-session');
const AC = require("./controllers/authController");
const SC = require("./controllers/serviceController");
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected')
});

//authentication endpoints

//below will check who the user is on session
app.get("/auth/user", AC.getUser);
//below will register a new user
app.post("/auth/register", AC.register);
//below will login a user
app.post("/auth/login", AC.login);
//below will logout a user
app.post("/auth/logout", AC.logout);

//user service post endpoints

//below is a GET request that gets all by category.
//this will be used to componentDidMount and display on homepage
app.get("/user/category", SC.getCategory);
//below is a GET request that get a service depending on its category
app.get("/user/service/:category_id", SC.getService);
//below will POST, or add a new service
app.post("/user/service", SC.addService);
//below will PUT, or edit a user's service
app.put("/user/service", SC.editService);
//below will DELETE a user's service
app.delete("/user/service/:service_id/:category_id", SC.deleteService);

app.listen(SERVER_PORT, () => console.log(`Server listening on Port ${SERVER_PORT}`));
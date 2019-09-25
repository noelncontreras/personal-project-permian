import React from "react";
import {Switch, Route} from "react-router-dom";
import GuestLanding from "./Components/GuestLanding";
import HomePage from "./Components/HomePage";
import Service from "./Components/Service";
import AddService from "./Components/AddService";

export default (
    <Switch>
        <Route component={GuestLanding} exact path="/" />
        <Route component={HomePage} path="/category" />
        <Route component={AddService} path="/service/addService" />
        <Route component={Service} path="/service/:category_id" />
        <Route render={() => {
            return <h1>404 Not Found</h1>
        }} />
    </Switch>
)
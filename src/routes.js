import React from "react";
import { Switch, Route } from "react-router-dom";
import GuestLanding from "./Components/GuestLanding";
import HomePage from "./Components/HomePage";
import Service from "./Components/Service";
import AddService from "./Components/AddService";
import UserProfilePage from "./Components/UserProfilePage";

export default (
    <Switch>
        <Route component={GuestLanding} exact path="/" />
        <Route component={HomePage} exact path="/category" />
        <Route component={AddService} exact path="/service/addService" />
        <Route component={Service} exact path="/service/:category_id" />
        <Route component={UserProfilePage} exact path="/user/profile" />
        <Route render={() => {
            return <h1>404 Not Found</h1>
        }} />
    </Switch>
)
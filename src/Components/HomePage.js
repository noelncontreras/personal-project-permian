import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import {connect} from "react-redux";
import { getSession, logoutUser } from "../redux/reducers/userReducer";

class HomePage extends Component {
    
    render() {
        if(!this.props.user_id) {
            return <Redirect to="/" />
        };
        return (
            <div>
                <h1>HomePage</h1>
            </div>
        )
    };
};

const mapPropsToState = reduxState => {
    return {
        user_id: reduxState.userReducer.user_id
    };
};

export default connect (mapPropsToState, { getSession, logoutUser })(HomePage);
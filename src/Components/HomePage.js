import React, { Component } from "react";
import Loading from "./Loading";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSession, logoutUser } from "../redux/reducers/userReducer";
import { updateCategory } from "../redux/reducers/serviceReducer";

class HomePage extends Component {
    componentDidMount() {
        this.props.updateCategory();
    }
    render() {
        const {loading} = this.props.userReducer;
        if (!this.props.user_id) {
            return <Redirect to="/" />
        };
        const categoryMapped = this.props.category.map((category, i) => {
            return (
                <div key={i}>
                    <Link to={`/user/${category.category_id}`}>
                        <h1>{category.category_name}</h1>
                    </Link>
                </div>
            )
        })
        return (
            <main>
                {loading ? <Loading /> : null}
                <div>
                    <h1>Service Categories</h1>
                    <span>{categoryMapped}</span>
                </div>
            </main>
        )
    };
};

const mapPropsToState = reduxState => {
    return {
        user_id: reduxState.userReducer.user_id,
        category: reduxState.serviceReducer.category,
        userReducer: reduxState.userReducer
    };
};

export default connect(mapPropsToState, { getSession, logoutUser, updateCategory })(HomePage);
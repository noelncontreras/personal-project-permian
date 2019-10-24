import React, { Component } from "react";
import Loading from "./Loading";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSession, logoutUser } from "../redux/reducers/userReducer";
import { updateCategory } from "../redux/reducers/serviceReducer";
import "../styles/HomePage/HomePage.scss";

class HomePage extends Component {
    componentDidMount() {
        this.props.updateCategory();
    };

    render() {
        if (!this.props.user_id) {
            return <Redirect to="/" />
        };
        const { loading } = this.props.userReducer;

        const categoryMapped = this.props.category.map((category, i) => {
            return (
                <div key={i} className="category-name">
                    <Link style={{ textDecoration: "none" }} to={`/service/${category.category_id}`}>
                        <h2 className="category-links">{category.category_name}</h2>
                    </Link>
                </div>
            );
        });

        return (
            <div className="background-home">
                <main className="main-homepage">
                    {loading ? <Loading /> : null}
                    <div className="service-categories">
                        <h1 id="homepage-title">Service Categories</h1>
                    </div>
                    <div className="service-and-button">
                        <span id="category-box">{categoryMapped}</span>
                    </div>
                </main>
            </div>
        );
    };
};

const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.userReducer.user_id,
        category: reduxState.serviceReducer.category,
        userReducer: reduxState.userReducer
    };
};

export default connect(mapStateToProps, { getSession, logoutUser, updateCategory })(HomePage);
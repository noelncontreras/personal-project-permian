import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getSession, logoutUser } from "../redux/reducers/userReducer";
import "../styles/Header/Header.scss";

class Header extends Component {

    componentDidMount() {
        this.props.getSession();
    };

    handleLogout = () => {
        this.props.logoutUser();
        this.props.history.push("/");
    };

    render() {
        const { name } = this.props;
        const userOnSession = name ? name : null;

        return (
            <>
                <nav>
                    <div className="nav-container">
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/">
                            <h1 id="permian">Permian</h1>
                        </Link>
                        {this.props.user_id ?
                            <div className="welcome-box">
                                <Link
                                    to="/user/profile"
                                    style={{ textDecoration: "none" }}>
                                    <h6 className="profile-route">Welcome, {userOnSession}</h6>
                                </Link>
                                <ul id="header-routes">
                                    <Link
                                        style={{ textDecoration: "none" }}
                                        to="/category">
                                        <li className="home-route">Home</li>
                                    </Link>
                                    <Link
                                        style={{ textDecoration: "none" }}
                                        to="/service/addService">
                                        <li className="addService-route">Add Service</li>
                                    </Link>
                                </ul>
                                <button
                                    className="logout-button"
                                    onClick={this.handleLogout}>LOGOUT</button>
                            </div>
                            : null}
                    </div>
                </nav>
            </>
        );
    };
};

const mapPropsToState = reduxState => {
    return {
        user_id: reduxState.userReducer.user_id,
        name: reduxState.userReducer.name
    };
};

export default withRouter(connect(mapPropsToState, { getSession, logoutUser })(Header));
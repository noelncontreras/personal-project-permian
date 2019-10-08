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
        const { name, user_id } = this.props;
        const userOnSession = name ? name : null;

        return (
            <>
                <nav>
                    <div className="nav-container">
                        {user_id ?
                            <div className="welcome-box">
                                <Link
                                    style={{ textDecoration: "none" }}
                                    to="/">
                                    <h1 id="permian-session-true">Permian</h1>
                                </Link>
                                <Link
                                    to="/user/profile"
                                    style={{ textDecoration: "none" }}>
                                    <h6 className="profile-route">Welcome, {userOnSession}</h6>
                                </Link>
                                <ul>
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
                            :
                            <div className="guestLanding-header">
                                <div>
                                    <Link
                                        style={{ textDecoration: "none", color: "black" }}
                                        to="/">
                                        <h1 id="permian-session-false">Permian</h1>
                                    </Link>
                                </div>
                                <div className="anchor-text">
                                    <h6>Created by Noel Contreras</h6>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://github.com/noelncontreras"
                                        style={{ textDecoration: "none", color: "black" }}>
                                        <img alt="github logo" src="https://img.icons8.com/ios-glyphs/60/000000/github.png" />
                                    </a>
                                </div>
                            </div>
                        }
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
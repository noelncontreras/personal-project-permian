import React, { Component } from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { getSession, logoutUser } from "../redux/reducers/userReducer";
import "../styles/Header/Header.scss";

class Header extends Component {
    componentDidMount() {
        this.props.getSession();
    };

    handleLogout = () => {
        this.props.logoutUser();
    };

    render() {
        const { name } = this.props;
        const userOnSession = name ? name : null;

        return (
            <>
                <header>
                    <div>
                        <div className="nav-container">
                            <h1>Permian</h1>
                            {this.props.user_id ?
                                <div className="welcome-box">
                                    <h6>Welcome, {userOnSession}</h6>
                                    <ul>
                                        <Link to="/category"><li>Category</li></Link>
                                        <Link to="/service/addService"><li>Add Service</li></Link>
                                    </ul>
                                    <button
                                        className="logout-button"
                                        onClick={this.handleLogout}>LOGOUT</button>
                                </div>
                                : null}
                        </div>
                    </div>
                </header>
            </>
        )
    };
};

const mapPropsToState = reduxState => {
    return {
        user_id: reduxState.userReducer.user_id,
        name: reduxState.userReducer.name
    };
};

export default connect(mapPropsToState, { getSession, logoutUser })(Header);
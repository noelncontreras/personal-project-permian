import React, { Component } from "react";
import Loading from "./Loading";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {registerUser, loginUser} from "../redux/reducers/userReducer";
import "../styles/GuestLanding/GuestLanding.scss";

class GuestLanding extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            username: "",
            password: ""
        };
    };

    handleInputChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleSubmit = e => {
        e.preventDefault();
        const formName = e.target.name;
        const {name, username, password} = this.state;
        const {registerUser, loginUser} = this.props;

        if (formName === "login") {
            loginUser({username, password})
        }
        else {
            registerUser({name, username, password})
        }
    };

    render() {
        const {loading} = this.props.userReducer;
        if(this.props.user_id) {
            return <Redirect to="/category" />
        }
        return (
            <main className="main-container">
                {loading ? <Loading /> : null}
                <div>
                    <form className="existing-user" name="login" onSubmit={this.handleSubmit}>
                        <h1>Existing User:</h1>
                        <br />
                        <label>Username:</label>
                        <input 
                        name="username" 
                        type="text"
                        onChange={this.handleInputChange} />
                        <br />
                        <label>Password:</label>
                        <input 
                        name="password" 
                        type="password"
                        onChange={this.handleInputChange} />
                        <br />
                        <button type="submit">LOGIN</button>
                    </form>
                </div>
                <br />
                <div>
                    <form className="new-user"name="register" onSubmit={this.handleSubmit}>
                        <h1>New User:</h1>
                        <br />
                        <label>Name:</label>
                        <input 
                        name="name" 
                        type="text"
                        onChange={this.handleInputChange} />
                        <br />
                        <label>Username:</label>
                        <input 
                        name="username" 
                        type="text"
                        onChange={this.handleInputChange} />
                        <br />
                        <label>Password:</label>
                        <input 
                        name="password" 
                        type="text"
                        onChange={this.handleInputChange} />
                        <br />
                        <button type="submit">REGISTER</button>
                    </form>
                </div>
            </main>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.userReducer.user_id,
        userReducer: reduxState.userReducer
    };
};

export default connect(mapStateToProps, {registerUser, loginUser})(GuestLanding);
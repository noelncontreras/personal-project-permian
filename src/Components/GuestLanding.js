import React, { Component } from "react";
import Loading from "./Loading";
import axios from "axios";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {registerUser, loginUser} from "../redux/reducers/userReducer";
import "../styles/GuestLanding/GuestLanding.scss";

class GuestLanding extends Component {
    constructor() {
        super();
        this.state = {
            realName: "",
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

        const {realName, username, password} = this.state;
        const {registerUser, loginUser} = this.props;

        if(formName === "login") {
            // loginUser({username, password})
            axios.post("/auth/login", {
                username, password
            }).then(response => {
                loginUser(response.data);
            }).catch(e => {
                if(e.response.data === "Username or Password Incorrect") {
                    alert(e.response.data);
                };
            });
        //     if (!username || !password) {
        //         alert ("Please enter Username/Password");
        //     };
        // if(username !== this.props.username || password !== this.props.password) {
        //         alert ("Please enter correct Username/Password");
        //     };
        };
        if(formName === "register") {
            // registerUser({name, username, password})
            axios.post("/auth/register", {
                name: realName, username, password
            }).then(response => {
                registerUser(response.data);
            }).catch(e => {
                if(e.response.status === 409) {
                    alert(e.response.data);
                };
            });
            // if(!name || !username || !password) {
            //     alert("Please fill in credentials below");
            // };
        };
    };

    render() {
        const {loading} = this.props.userReducer;
        if(this.props.user_id) {
            return <Redirect to="/category" />
        };
        return (
            <main className="main-guestlanding">
                {loading ? <Loading /> : null}
                <div>
                    <form className="existing-user" name="login" onSubmit={this.handleSubmit}>
                        <h1>Existing User:</h1>
                        <p>Please enter username and password</p>
                        <br />
                        <label>Username:</label>
                        <input 
                        required
                        name="username" 
                        type="text"
                        onChange={this.handleInputChange} />
                        <br />
                        <label>Password:</label>
                        <input 
                        required
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
                        <p>Please fill in all credentials</p>
                        <br />
                        <label>Name:</label>
                        <input 
                        required
                        name="realName" 
                        type="text"
                        onChange={this.handleInputChange} />
                        <br />
                        <label>Username:</label>
                        <input 
                        required
                        name="username" 
                        type="text"
                        onChange={this.handleInputChange} />
                        <br />
                        <label>Password:</label>
                        <input 
                        required
                        name="password" 
                        type="text"
                        onChange={this.handleInputChange} />
                        <br />
                        <button type="submit">REGISTER</button>
                    </form>
                </div>
            </main>
        )
    };
};

const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.userReducer.user_id,
        username: reduxState.userReducer.username,
        password: reduxState.userReducer.password,
        userReducer: reduxState.userReducer
    };
};

export default connect(mapStateToProps, {registerUser, loginUser})(GuestLanding);
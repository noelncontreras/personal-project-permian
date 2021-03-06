import React, { Component } from "react";
import Loading from "./Loading";
import { connect } from "react-redux";
import { getSession, updateName, updateUsername, updateUserPhoneNumber, deleteUser } from "../redux/reducers/userReducer";
import "../styles/UserProfilePage/UserProfilePage.scss";

class UserProfilePage extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            username: "",
            user_phone_number: "",
            editStatus: false
        };
    };

    componentDidMount() {
        this.props.getSession();
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleEditStatus = () => {
        this.setState({ editStatus: true });
    };

    handleUserChanges = () => {
        const { name, username, user_phone_number } = this.state;

        if (name === "") {
            this.setState({ name: this.props.name })
        } else {
            this.props.updateName({ name });
        };

        if (username === "") {
            this.setState({ username: this.props.username })
        } else {
            this.props.updateUsername({ username });
        };

        if (user_phone_number === "") {
            this.setState({ user_phone_number: this.props.user_phone_number })
        } else {
            this.props.updateUserPhoneNumber({ user_phone_number });
        };

        this.setState({ editStatus: false });
    };

    handleCancelChanges = () => {
        this.setState({ editStatus: false });
    };

    handleDeleteUser = () => {
        const { name } = this.props;

        const result = window.confirm(`${name}: Your account will be deleted if you click OK!`);
        if (result) {
            this.props.deleteUser();
            this.props.history.push("/");
        };
    };


    render() {
        const { loading } = this.props.userReducer;
        const { name, username, user_phone_number } = this.props;

        return (
            <main className="main-profile">
                {loading ? <Loading /> : null}
                <div>
                    <h1>{`${name}'s Profile`}</h1>
                </div>
                <br />
                {this.state.editStatus ?
                    <div>
                        <form className="profile-information">
                            <h1>Profile Information</h1>
                            <br />
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={name}
                                onChange={this.handleInputChange} />
                            <br />
                            <label>Username:</label>
                            <input
                                type="text"
                                name="username"
                                defaultValue={username}
                                onChange={this.handleInputChange} />
                            <br />
                            <label>Phone Number:</label>
                            <p>In the format(12223334444)</p>
                            <input
                                type="tel"
                                name="user_phone_number"
                                defaultValue={user_phone_number}
                                pattern="[1]{1}[0-9]{3}[0-9]{3}[0-9]{4}"
                                onChange={this.handleInputChange} />
                            <br />
                            <div className="profile-buttons">
                                <button onClick={this.handleUserChanges}>UPDATE</button>
                                <button onClick={this.handleCancelChanges}>CANCEL</button>
                            </div>
                        </form>
                    </div>
                    :
                    <div>
                        <div className="profile-information">
                            <h1>Profile Information</h1>
                            <br />
                            <label>Name:</label>
                            <h3>{name}</h3>
                            <br />
                            <label>Username:</label>
                            <h3>{username}</h3>
                            <br />
                            <label>Phone Number:</label>
                            <h3>{user_phone_number}</h3>
                            <br />
                            <div className="profile-buttons">
                                <button onClick={this.handleEditStatus}>EDIT</button>
                                <button onClick={this.handleDeleteUser}>DELETE</button>
                            </div>
                        </div>
                    </div>
                }
            </main>
        );
    };
};


const mapStateToProps = reduxState => {
    return {
        userReducer: reduxState.userReducer,
        name: reduxState.userReducer.name,
        username: reduxState.userReducer.username,
        user_phone_number: reduxState.userReducer.user_phone_number
    };
};

export default connect(mapStateToProps, { getSession, updateName, updateUsername, updateUserPhoneNumber, deleteUser })(UserProfilePage);
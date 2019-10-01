import React, { Component } from "react";
import axios from "axios";
import "../styles/EditCheck/EditCheck.scss";


export default class EditCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service_description: "",
            edit: false,
            contactButton: false,
            number: "",
            userNumber: "",
            message: ""
        };
    };

    handleEdit = (service_description) => {
        this.setState({ edit: true, service_description });
    };

    handleEditChange = e => {
        this.setState({ service_description: e.target.value });
    };

    handleMessageChange = e => {
        this.setState({ message: e.target.value });
    };

    handleUserNumberChange = e => {
        this.setState({ userNumber: e.target.value });
    }

    sendMessage = (number, name) => {
        const { userNumber, message } = this.state;
        axios
            .post("/sms", { number, name, userNumber, message })
            .then(res => {
                if (res.data.success === true) {
                    alert(`Message was successfully sent to ${name}.`)
                    this.setState({ contactButton: false, userNumber: "", message: "" });
                } else {
                    alert("Sorry. Message was not sent successfully. Please try again.");
                };
            });
    };

    handleSubmit = (category_id, service_id) => {
        const serviceInfo = { category_id, service_id, service_description: this.state.service_description };

        this.props.editService(serviceInfo);

        this.setState({ edit: false });
    };

    handleCancel = () => {
        this.setState({ edit: false, contactButton: false });
        this.setState({ message: "" });
    };

    handleDelete = (service_id, category_id) => {
        this.props.deleteService(service_id, category_id);
    };

    render() {
        const { service } = this.props;

        return (
            <div key={this.props.key} className="user-and-description">

                {!this.state.edit ?
                    <div className="editFalse-info">
                        <h1 className="underline">{service.name}</h1>
                        <h3>{service.service_description}</h3>
                    </div>
                    :
                    <div className="editTrue-info">
                        <h1 className="underline">{service.name}</h1>
                        <textarea
                            rows="3"
                            cols="50"
                            value={this.state.service_description}
                            onChange={this.handleEditChange} />
                        <div className="stacked-buttons">
                            <button onClick={() => this.handleSubmit(service.category_id, service.service_id)}>SUBMIT</button>
                            <button onClick={this.handleCancel}>CANCEL</button>
                        </div>
                    </div>
                }
                {
                    this.props.userId === service.user_id ?
                        <div className="stacked-buttons">
                            <button onClick={() => this.handleEdit(service.service_description)}>EDIT</button>
                            <button onClick={() => this.handleDelete(service.service_id, service.category_id)}>DELETE</button>
                        </div>
                        : <button onClick={() => this.setState({ contactButton: true })}>CONTACT</button>
                }
                {!this.state.contactButton ?
                    null
                    :
                    <form className="contact-form">
                        <div className="contact-labels">
                            <label className="underline">Your Phone Number:</label>
                            <input
                                required
                                type="tel"
                                id="number-input"
                                placeholder={`To be contacted by ${service.name}`}
                                value={this.state.userNumber}
                                onChange={this.handleUserNumberChange} />
                            <label className="underline">Message:</label>
                            <textarea
                                rows="3"
                                cols="50"
                                required
                                type="text"
                                placeholder={`Please leave a message to send to ${service.name}`}
                                value={this.state.message}
                                onChange={this.handleMessageChange} />
                            <div className="stacked-buttons">
                                <button
                                    disabled={!this.state.userNumber}
                                    onClick={() => this.sendMessage(service.user_phone_number, service.name)}>SEND</button>
                                <button onClick={this.handleCancel}>CANCEL</button>
                            </div>
                        </div>
                    </form>
                }
            </div>
        );
    };
};
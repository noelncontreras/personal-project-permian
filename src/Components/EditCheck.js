import React, { Component } from "react";
import axios from "axios";
import { storage } from "../Config/FirebaseConfig";
import "../styles/EditCheck/EditCheck.scss";


export default class EditCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: "",
            edit: false,
            file: null,
            file_url: "",
            message: "",
            userNumber: "",
            contactButton: false,
            service_description: ""
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
    };

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

    handleFileEditChange = e => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            this.setState(() => ({ file }));
        };
    };

    handleFileUploadChange = () => {
        const { file } = this.state;
        const uploadTask = storage.ref(`files/${file.name}`).put(file);
        uploadTask.on("state_changed",
            snapshot => {
                console.log(snapshot);
            },
            error => {
                console.log(error);
            },
            () => {
                storage.ref("files").child(file.name).getDownloadURL().then(url => {
                    this.setState({ file_url: url })
                });
            });
    };


    handleSubmit = (category_id, service_id) => {
        const serviceInfo = { category_id, service_id, service_description: this.state.service_description, file_url: this.state.file_url };
        this.props.editService(serviceInfo);
        this.setState({ edit: false });
    };

    handleCancel = () => {
        this.setState({ edit: false, contactButton: false });
        this.setState({ message: "" });
    };

    handleDelete = (category_id, service_id) => {
        this.props.deleteService(category_id, service_id);
    };

    render() {
        const { service } = this.props;

        return (
            <div key={this.props.key} className="user-and-description">

                {!this.state.edit ?
                    <div className="editFalse-info">
                        <div className="name-and-link">
                            <h1 className="underline">{service.name}</h1>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={service.file_url}
                                className="pdf-img">
                                <span
                                    role="img"
                                    aria-label="clipboard">&#128203;</span></a>
                        </div>
                        <div>
                            <h3>{service.service_description}</h3>
                        </div>
                    </div>
                    :
                    <div className="editTrue-info">
                        <div className="name-and-link">
                            <h1 className="underline">{service.name}</h1>
                            <input
                                type="file"
                                id="editTrue-input"
                                onChange={this.handleFileEditChange} />
                            <button id="upload-button" onClick={this.handleFileUploadChange}>UPLOAD</button>
                        </div>
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
                            <button onClick={() => this.handleEdit(service.service_description, service.file_url)}>EDIT</button>
                            <button onClick={() => this.handleDelete(service.category_id, service.service_id)}>DELETE</button>
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
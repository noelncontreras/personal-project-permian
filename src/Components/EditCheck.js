import React, { Component } from "react";
import axios from "axios";


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
        this.setState({ service_description: e.target.value })
    };

    handleMessageChange = e => {
        this.setState({ message: e.target.value })
    };

    handleUserNumberChange = e => {
        this.setState({ userNumber: e.target.value })
    }

    // handleSendTwilio = e => {
    //     e.preventDefault();
    //     this.sendMessage()
    // }

    sendMessage = (number, name) => {
        console.log(number)
        const {userNumber, message} = this.state;
        axios
            .post("/sms", {number, name, userNumber, message})
            .then(res => {
                console.log(res.data)
            })
    };

    handleSubmit = (category_id, service_id) => {
        const serviceInfo = { category_id, service_id, service_description: this.state.service_description };

        this.props.editService(serviceInfo);

        this.setState({ edit: false });
    };

    handleCancel = () => {
        this.setState({ edit: false, contactButton: false });
        this.setState({message: ""});
    };

    handleDelete = (service_id, category_id) => {
        this.props.deleteService(service_id, category_id);
    };

    render() {
        const { service } = this.props;

        return (
            <div key={this.props.key}>

                {!this.state.edit ?
                    <div>
                        <h1>{service.name}</h1>
                        <h3>{service.service_description}</h3>
                    </div>
                    :
                    <div>
                        <input
                            value={this.state.service_description}
                            onChange={this.handleEditChange} />
                        <div>
                            <button onClick={() => this.handleSubmit(service.category_id, service.service_id)}>SUBMIT</button>
                            <button onClick={this.handleCancel}>CANCEL</button>
                        </div>
                    </div>
                }
                {
                    this.props.userId === service.user_id ? (
                        <div>
                            <button onClick={() => this.handleEdit(service.service_description)}>EDIT</button>
                            <button onClick={() => this.handleDelete(service.service_id, service.category_id)}>DELETE</button>
                        </div>
                    ) : <button onClick={() => this.setState({ contactButton: true })}>CONTACT</button>
                }
                {/* contact form. service.user_phone */}
                {!this.state.contactButton ?
                    null
                    :
                    <form>
                        <div>
                            <div>
                                <div>
                                    <label>Your Phone Number:</label>
                                    <input 
                                    required
                                    placeholder="Please provide a number to be contacted"
                                    value={this.state.userNumber}
                                    onChange={this.handleUserNumberChange}/>
                                    <label>Message:</label>
                                    <textarea 
                                    rows="4"
                                    cols="30"
                                    placeholder= {`Please leave a message to send to ${service.name}`}
                                    required 
                                    value={this.state.message}
                                    onChange={this.handleMessageChange}/>
                                    <button onClick={() => this.sendMessage(service.user_phone_number, service.name)}>Send</button>
                                    <button onClick={this.handleCancel}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>
                }
            </div>
        )
    };
};
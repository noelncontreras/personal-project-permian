import React, { Component } from "react";
import Loading from "./Loading";
import { connect } from "react-redux";
import { updateService, addService, editService, deleteService } from "../redux/reducers/serviceReducer";

class Service extends Component {
    constructor() {
        super();
        this.state = {
            service_description: "",
            edit: false
        };
    };

    componentDidMount() {
        this.props.updateService(this.props.match.params.category_id);
    };

    handleEdit = (service_description) => {
        this.setState({ edit: true, service_description });
    };

    handleEditChange = e => {
        this.setState({service_description: e.target.value })
    };

    handleSubmit = (category_id, service_id) => {
        const serviceInfo = { category_id, service_id, service_description: this.state.service_description };

        this.props.editService(serviceInfo)

        this.setState({edit: false});
    };

    handleCancel = () => {
        this.setState({edit: false});
    };

    handleDelete = (service_id, category_id) => {
        this.props.deleteService(service_id, category_id);
    };

    render() {
        const { loading } = this.props.userReducer;
        const serviceMapped = this.props.service.map((service, i) => {
            return (
                <div key={i}>
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
                        this.props.user_id === service.user_id ? (
                            <div>
                                <button onClick={() => this.handleEdit(service.service_description)}>EDIT</button>
                                <button onClick={() => this.handleDelete(service.service_id, service.category_id)}>DELETE</button>
                            </div>
                        ) : null
                    }
                </div>
            )
        });

        return (
            <div>
                <main>
                    {loading ? <Loading /> : null}
                    <div>
                        <h1>Services</h1>
                    </div>
                    <span>{serviceMapped}</span>
                </main>
            </div >
        );
    };
};

const mapPropsToState = reduxState => {
    return {
        user_id: reduxState.userReducer.user_id,
        service: reduxState.serviceReducer.service,
        userReducer: reduxState.userReducer
    };
};

export default connect(
    mapPropsToState,
    {
        updateService, addService, editService, deleteService
    })(Service);
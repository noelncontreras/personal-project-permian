import React, { Component } from "react";
import Loading from "./Loading";
import { connect } from "react-redux";
import { updateService, addService, editService, deleteService } from "../redux/reducers/serviceReducer";

class Service extends Component {
    constructor() {
        super();
        this.state = {
            serviceDescription: "",
            edit: false
        }
    }

    componentDidMount() {
        this.props.updateService(this.props.match.params.category_id);
    };

    handleEdit = (category_id, service_id) => {
        this.setState({ edit: true });
        const serviceInfo = { category_id, service_id, serviceDescription: this.state.serviceDescription };

        this.props.editService(serviceInfo);
    };

    handleInputChange = e => {
        this.setState({ serviceDescription: e.target.value })
    };

    render() {
        // const { loading } = this.props.userReducer;
        const serviceMapped = this.props.service.map((service, i) => {
            console.log(this.props.user_id)
            console.log(service.user_id)
            return (
                <div key={i}>
                    {
                        this.props.user_id === service.user_id ? (
                            <div>
                                <button onClick={this.handleEdit}>EDIT</button>
                                <button>DELETE</button>
                            </div>
                        ) : null
                    }
                    {!this.state.edit ?
                        <div>
                            <h1>{service.name}</h1>
                            <h3>{service.service_description}</h3>
                        </div>
                        :
                        <div>
                            <input
                                value={service.service_description}
                                onChange={this.handleInputChange} />
                            <div>
                                <button>SUBMIT</button>
                                <button>CANCEL</button>
                            </div>
                        </div>
                    }
                </div>
            )
        });


        return (
            <div>
                <main>
                    {/* {loading ? <Loading /> : null} */}
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
        service: reduxState.serviceReducer.service
    };
};

export default connect(
    mapPropsToState,
    {
        updateService, addService, editService, deleteService
    })(Service);
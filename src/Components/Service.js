import React, { Component } from "react";
import Loading from "./Loading";
import EditCheck from "./EditCheck";
import { connect } from "react-redux";
import { updateService, addService, editService, deleteService } from "../redux/reducers/serviceReducer";
import "../styles/Service/Service.scss";

class Service extends Component {

    componentDidMount() {
        this.props.updateService(this.props.match.params.category_id);
    };

    render() {
        const { loading } = this.props.userReducer;

        console.log(this.props.service)
        const serviceMapped = this.props.service.map((service, i) => {
            return (
                <EditCheck
                    key={i}
                    service={service}
                    userId={this.props.user_id}
                    editService={this.props.editService}
                    deleteService={this.props.deleteService} />
            );
        });

        return (
            <div className="background-services">
                <main className="main-services">
                    {loading ? <Loading /> : null}
                    <div className="services-title">
                        <h1 id="serviceMQ">Services</h1>
                    </div>
                    <span id="service-box">{serviceMapped}</span>
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
import React, { Component } from "react";
import Loading from "./Loading";
import EditCheck from "./EditCheck";
import { connect } from "react-redux";
import { updateService, addService, editService, deleteService } from "../redux/reducers/serviceReducer";
import "../styles/Service/Service.scss";
import { getSession } from "../redux/reducers/userReducer";

class Service extends Component {

    componentDidMount() {
        this.props.updateService(this.props.match.params.category_id);
    };

    render() {
        const { loading } = this.props.userReducer;

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

        // const serviceName = this.props.category.map((category, i) => {
        //     return (
        //         <div key={i}>
        //             <h1>
                        // {this.props.match.params.category_id == category.category_id ? category.category_name[0] : category.category_name[1]};
        //             </h1>
        //         </div>
        //     );
        // });

        return (
            <div className="background-services">
                <main className="main-services">
                    {loading ? <Loading /> : null}
                    <div className="services-title">
                        <h1 id="serviceMQ">Services</h1>
                        {/* <h1 id="serviceMQ">{`${serviceName} Services`}</h1> */}
                    </div>
                    <span id="service-box">{serviceMapped}</span>
                </main>
            </div >
        );
    };
};

const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.userReducer.user_id,
        service: reduxState.serviceReducer.service,
        category: reduxState.serviceReducer.category,
        userReducer: reduxState.userReducer
    };
};

export default connect(
    mapStateToProps,
    {
        updateService, addService, editService, deleteService, getSession
    })(Service);
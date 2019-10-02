import React, { Component } from "react";
import Loading from "./Loading";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { addService } from "../redux/reducers/serviceReducer";
import "../styles/AddService/AddService.scss";

class AddService extends Component {
    constructor() {
        super();
        this.state = {
            service_description: "",
            category_id: 0
        };
    };

    handleMenuChange = e => {
        this.setState({ category_id: +e.target.value });
    };

    handleInputChange = e => {
        this.setState({ service_description: e.target.value });
    };

    handleSubmit = () => {
        const { category_id, service_description } = this.state;
        const { user_id } = this.props;
        const newService = { category_id: category_id, user_id, service_description: service_description };

        if (category_id === 0) {
            alert("Please choose a category");
            return <Redirect to="/service/addService" />
        };

        if (user_id) {
            this.props.addService(newService);
        };
        this.props.history.push(`/service/${category_id}`);
    };


    render() {
        const { loading } = this.props;

        return (
            <section className="background-addService">
                {loading ? <Loading /> : null}
                <div className="addService-title">
                    <h1>Add a Service</h1>
                </div>
                <br />
                <div className="category">
                    <label className="category-title">Category:</label>
                    <select onChange={this.handleMenuChange} className="dropDown">
                        <option value="0">Choose a category</option>
                        <option value="1">HotShot</option>
                        <option value="2">Graphic Design</option>
                    </select>
                </div>
                <br />
                <div className="service-description">
                    <label className="service-description-title">Service Description:</label>
                    <br />
                    <form>
                        <textarea
                            rows="4"
                            cols="40"
                            required
                            placeholder="Please provide a description of your service"
                            value={this.state.service_description}
                            onChange={this.handleInputChange} />
                        <button type="submit" onClick={this.handleSubmit}>SUBMIT</button>
                    </form>
                </div>
            </section>
        );
    };
};

const mapPropsToState = reduxState => {
    return {
        user_id: reduxState.userReducer.user_id,
        userReducer: reduxState.userReducer
    };
};

export default connect(mapPropsToState, { addService })(AddService);
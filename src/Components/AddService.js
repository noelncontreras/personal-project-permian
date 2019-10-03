import React, { Component } from "react";
import Loading from "./Loading";
import { storage } from "../Config/FirebaseConfig";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { addService } from "../redux/reducers/serviceReducer";
import "../styles/AddService/AddService.scss";

class AddService extends Component {
    constructor() {
        super();
        this.state = {
            file: null,
            fileUrl: "",
            progress: 0,
            category_id: 0,
            service_description: ""
        };
    };

    handleMenuChange = e => {
        this.setState({ category_id: +e.target.value });
    };

    handleInputChange = e => {
        this.setState({ service_description: e.target.value });
    };

    handleFileChange = e => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            this.setState(() => ({ file }));
        };
    };

    handleSubmit = () => {
        const { category_id, service_description, file } = this.state;
        const { user_id } = this.props;

        const uploadTask = storage.ref(`files/${file.name}`).put(file);

        const setThatState = url => {
            console.log(url)
            this.setState({ fileUrl: url }, () => {
                const newService = { category_id: category_id, user_id, service_description: service_description, fileUrl: this.state.fileUrl };
                console.log(newService)

                if (category_id === 0) {
                    alert("Please choose a category");
                    return <Redirect to="/service/addService" />
                };

                if (user_id) {
                    this.props.addService(newService);
                };
                // this.props.history.push(`/service/${category_id}`);
            });
        };

        // const updateProgress = progress => {
        //     console.log(progress);
        //     this.setState({progress});
        // };

        if(this.state.file === null) {
            alert("Please add a price sheet");
        } else {
            uploadTask.on("state_changed",
                snapshot => {
                    console.log(snapshot);
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    console.log(progress);
                    this.setState({progress});
                    // updateProgress(progress);
                },
                error => {
                    console.log(error);
                },
                () => {
                    storage.ref("files").child(file.name).getDownloadURL().then(url => {
                        setThatState(url)
                    });
                });
        }
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
                        <div>
                            <progress value={this.state.progress} max="100"/>
                            <label>Add a Pricesheet</label>
                            <input 
                            type="file" 
                            required 
                            onChange={this.handleFileChange} />
                        </div>
                        <button 
                        type="submit" 
                        // disabled={this.state.file === null}
                        onClick={this.handleSubmit}>SUBMIT</button>
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
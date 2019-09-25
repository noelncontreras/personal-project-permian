import React, {Component} from "react";

export default class AddService extends Component {
    constructor() {
        super();
        this.state = {
            service_description: ""
        };
    };


    render() {
        return (
            <div>
                <h1>Add a Service</h1>
                <label>Category:</label>
                <select>
                    <option value="test1">HotShot</option>
                    <option value="test2">Graphic</option>
                </select>
            </div>
        )
    }
}
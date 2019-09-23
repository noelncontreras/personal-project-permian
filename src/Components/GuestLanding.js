import React, { Component } from 'react';
import "../styles/GuestLanding/GuestLanding.scss";

export default class GuestLanding extends Component {

    render() {
        return (
            <main className="main-container">
                <div>
                    <form>
                        <h1>Existing User:</h1>
                        <br />
                        <label>Username:</label>
                        <input />
                        <br />
                        <label>Password</label>
                        <input />
                        <br />
                        <button>LOGIN</button>
                    </form>
                </div>
                <hr />
                <div>
                    <form>
                        <h1>New User:</h1>
                        <br />
                        <label>Name:</label>
                        <input />
                        <br />
                        <label>Username:</label>
                        <input />
                        <br />
                        <label>Password:</label>
                        <input />
                        <br />
                        <button>REGISTER</button>
                    </form>
                </div>
            </main>
        )
    }
}
import React, { Component } from 'react';
import "../styles/Header/Header.scss";

export default class Header extends Component {

    render() {
        return (
            <>
                <header>
                    <div className="nav-container">
                        <img className="logo" alt="permian logo" src="https://i.imgur.com/5XhQnz3.png" />
                        <h1>Permian</h1>
                    </div>
                </header>
            </>
        )
    }
}
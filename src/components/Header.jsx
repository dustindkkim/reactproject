import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";


class Header extends Component {
    render() {
        return (
            <div>
                <nav>
                    <NavLink to="/">홈</NavLink>
                    <NavLink to="/book" >북</NavLink>
                </nav>
            </div>
        );
    }
}

export default Header;
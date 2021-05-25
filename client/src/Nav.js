import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">DietNER</Link>
                    <DropDownButton />
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <NavLinks />
                    </div>
                </div>
            </nav>
        )
    }
}

function DropDownButton() {
    return (
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
    )
}

function NavLinks() {
    return (
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
                <Link to="/new_user" className="nav-link">New User</Link>
            </li>
            <li className="nav-item">
                <Link to="/user/all" className="nav-link"> User List</Link>
            </li>
        </ul>
    )
}

export default Nav;
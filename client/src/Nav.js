import React, {Component} from "react";
import {Link} from "react-router-dom";

class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    {/*<a className="navbar-brand" href="http://localhost:3000">Navbar</a>*/}
                   <Link to="/" className="navbar-brand">DietNER</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDropdown"
                            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                    <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                {/*<a className="nav-link" href="http://localhost:3000/user">New User</a>*/}
                               <Link to="/new_user" className="nav-link">New User</Link>
                            </li>
                            <li className="nav-item">
                                {/*<a className="nav-link" href="http://localhost:3000/user/all">User List</a>*/}
                                    <Link to="/user/all" className="nav-link"> User List</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Nav;
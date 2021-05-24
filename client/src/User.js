import React, {Component} from "react";
import {Link} from "react-router-dom";

class User extends Component {
    render() {
        const {name, _id: id} = this.props.user
        return (
            <div className="card mt-3 ml-3 pt-2 flex-grow-0 align-content-md-start" style={{width: "16rem"}}>
                <img className="card-img-top img-responsive"
                     src={`${process.env.PUBLIC_URL}/user_2.svg`} style={{width: "55%"}} alt="Card cap"/>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">Click the Button to open the diet page for any user.</p>
                    <Link to={`/diet/${id}`} className="btn btn-primary">Diet</Link>
                </div>
            </div>
        )
    }
}

export default User;
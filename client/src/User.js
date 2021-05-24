import React, {Component} from "react";
import {Link} from "react-router-dom";

class User extends Component {
    render() {
        const {name, _id: id} = this.props.user
        return (
            <div className="container mt-3">
                <div className="d-flex flex-row justify-content-around">
                    <div className="card" style={{width: "18rem"}}>
                        <img className="card-img-top" src={`${process.env.PUBLIC_URL}/user.svg`} alt="Card cap"/>
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text">Click the Button to open the diet page for any user.</p>
                            {/*<a href={`http://localhost:3000/${id}/diet`} className="btn btn-primary">Diet</a>*/}
                            <Link to={`/diet/${id}`} className="btn btn-primary">Diet</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default User;
import React, {Component} from "react";
import {Link} from "react-router-dom";

class User extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.deleteUser(this.props.user._id)
    }

    render() {
        const {name, _id: id} = this.props.user
        return (
            <div className="card mt-3 mx-4 pt-2" style={{width: "18rem"}}>
                <img className="card-img-top img-responsive"
                     src={`${process.env.PUBLIC_URL}/user_2.svg`}
                     style={{width: "45%", margin: "0 auto"}} alt="Card cap"/>
                <div className="card-body text-capitalize mt-2">
                    <h5 className="card-title text-center">{name}</h5>
                    <p className="card-text">Click the Button to open the diet page for any user.</p>
                    <hr/>
                    <div className="d-flex justify-content-center">
                        <Link to={`/diet/${id}`} className="btn btn-primary mr-4">Diet</Link>
                        <button className="btn btn-danger" onClick={this.handleClick}>Delete User</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default User;
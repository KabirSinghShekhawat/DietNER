import React, {Component} from "react";

class User extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {name, _id: id} = this.props.user
        return (
            <div className="container mt-5">
                <div className="d-flex flex-row justify-content-around">
                    <div className="card" style={{width: "18rem"}}>
                        <img className="card-img-top" src={`${process.env.PUBLIC_URL}/user.svg`} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text">Total Calories: 1000</p>
                            <a href={`http://localhost:3000/${id}/diet`} className="btn btn-primary">Diet</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default User;
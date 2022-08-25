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
        const {name, _id: id, weight, height} = this.props.user
        const link = `/diet/${id}`

        return (<div className="card mt-3 mx-4" style={{width: "18rem"}}>
            <CardImage imgName={'user_4.svg'}/>
            <div className="card-body mt-2">
                <CardBody name={name} height={height} weight={weight}/>
                <CardButtons link={link} click={this.handleClick}/>
            </div>
        </div>)
    }
}

function getBMITag(height, weight) {
    const BMI = weight / Math.pow(height, 2);
    if (BMI >= 25) return <span className="badge badge-danger">overweight</span>
    if (BMI < 18) return <span className="badge badge-info">underweight</span>
    return <span className="badge badge-success">normal</span>
}

function CardImage(props) {
    const url = `${process.env.PUBLIC_URL}/${props.imgName}`
    return (<React.Fragment>
        <img className="card-img-top img-responsive" src={url}
             style={{width: "100%", margin: "0 auto"}} alt="Card cap"/>
    </React.Fragment>)
}

function CardBody(props) {
    return (<React.Fragment>
        <h5 className="card-title text-capitalize text-center">{props.name}</h5>
        <h6 className="card-title text-capitalize text-center">{props.weight} KG | {props.height} m | {getBMITag(props.height, props.weight)}</h6>
        <p className="card-text">Click the Diet button to view {props.name}'s diet plan.</p>
        <hr/>
    </React.Fragment>)
}

function CardButtons(props) {
    return (<React.Fragment>
        <div className="d-flex justify-content-center">
            <Link to={props.link} className="btn btn-primary mr-4">Diet</Link>
            <button className="btn btn-danger" onClick={props.click}>Delete User</button>
        </div>
    </React.Fragment>)
}

export default User;
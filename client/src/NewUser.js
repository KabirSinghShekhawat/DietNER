import React, {Component} from "react";
import Axios from "axios";
import config from "./config";

class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', weight: 0, height: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(evt) {
        evt.preventDefault()

        try {
            await Axios.post(`${config.HOST}/user`, {
                name: this.state.name, weight: this.state.weight, height: this.state.height
            })
        } catch (error) {
            console.log(error.response);
        } finally {
            this.setState({name: '', height: 0, weight: 0})
        }
    }

    handleChange(evt) {
        this.setState({[evt.target.name]: evt.target.value})
    }

    render() {
        return (<div className="container my-5">
            <form action="/user" method="POST" onSubmit={this.handleSubmit}>
                <UserName name={this.state.name} onChange={this.handleChange}/>
                <UserWeight weight={this.state.weight} onChange={this.handleChange}/>
                <UserHeight height={this.state.height} onChange={this.handleChange}/>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>)
    }
}

function UserName(props) {
    return (<React.Fragment>
        <div className="mb-3 form-group">
            <label htmlFor="name" className="form-label">Name:</label>
            <input type="text" className="form-control"
                   id="name" name="name"
                   aria-describedby="name"
                   value={props.name}
                   onChange={props.onChange}
            />
            <small id="nameHelp" className="form-text text-muted">Please enter your name to register.</small>
        </div>
    </React.Fragment>)
}

function UserWeight(props) {
    return (<React.Fragment>
        <div className="mb-3 form-group">
            <label htmlFor="weight" className="form-label">Weight:</label>
            <input type="number" className="form-control"
                   id="weight" name="weight"
                   aria-describedby="weight"
                   value={props.weight}
                   onChange={props.onChange}
            />
            <small id="weightHelp" className="form-text text-muted">Please enter your weight.</small>
        </div>
    </React.Fragment>)
}

function UserHeight(props) {
    return (<React.Fragment>
        <div className="mb-3 form-group">
            <label htmlFor="height" className="form-label">Height:</label>
            <input type="number" className="form-control"
                   id="height" name="height"
                   aria-describedby="height"
                   value={props.height}
                   onChange={props.onChange}
            />
            <small id="heightHelp" className="form-text text-muted">Please enter your height.</small>
        </div>
    </React.Fragment>)
}

export default NewUser;

import React, { Component } from "react";
import Axios from "axios";

class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(evt) {
        evt.preventDefault()
        await Axios.post(`http://localhost:3000/user`, {
            name: this.state.name
        })
            .then(function (response) {
                //handle success
                console.log('ok')

            })
            .catch(function (error) {
                //handle error
                console.log(error.response);
            });
        this.setState({ name: ''})
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    render() {
        return (
            <div className="container my-5">
                <form action="/user" method="POST" onSubmit={this.handleSubmit}>
                    <UserName name={this.state.name} onChange={this.handleChange} />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

function UserName(props) {
    return (
        <React.Fragment>
            <div className="mb-3 form-group">
                <label htmlFor="name" className="form-label">Name:</label>
                <input type="text" className="form-control"
                    id="name" name="name"
                    aria-describedby="name"
                    value={props.name}
                    onChange={props.onChange}
                />
                <small id="nameHelp" className="form-text text-muted">Please enter your name to register.</small>
                {/* <div id="nameHelp" className="form-text">Please enter your name to register.</div> */}
            </div>
        </React.Fragment>
    )
}

export default NewUser;
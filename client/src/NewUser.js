import React, {Component} from "react";
import Axios from "axios";

class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    async handleSubmit(evt) {
        evt.preventDefault()
        await Axios.post(`http://localhost:3000/user`, {
            name: evt.target.value
        })
            .then(function (response) {
                //handle success
                console.log(response.data)

            })
            .catch(function (error) {
                //handle error
                console.log(error.response);
            });
    }

    handleChange(evt) {
        this.setState({[evt.target.name]: evt.target.value})
    }

    render() {
        return (
            <div className="container my-5">
                <form action="/user" method="POST">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name: </label>
                        <input type="text"
                               className="form-control"
                               id="name" name="name"
                               aria-describedby="name"
                               onClick={this.handleChange}
                        />
                        <div id="nameHelp" className="form-text">Please enter your name to register.</div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default NewUser;
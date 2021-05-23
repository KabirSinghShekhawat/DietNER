import React, {Component} from "react";

class FoodData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            foodData: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleSubmit(evt) {
        evt.preventDefault()
        const user = {
            username: this.state.username,
            foodData: this.state.foodData
        }
        this.props.addFood(user)
        this.setState({username: '', foodData: ''})
    }

    handleChange(evt) {
        this.setState({[evt.target.name]: evt.target.value})
    }

    render() {
        return (
            <div className="container my-5 ml-5">
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3 form-group">
                        <label htmlFor="name" className="form-label">User's Name:</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               aria-describedby="name"
                               name="username"
                               value={this.state.username}
                               onChange={this.handleChange} />
                        <div id="nameHelp" className="form-text">Please enter user's name to add a food to diet.</div>
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="food-text" className="form-label">Enter Food Info</label>
                        <textarea className="form-control"
                                  value={this.state.foodData}
                                  onChange={this.handleChange}
                                  id="food-text" name="foodData" rows="3"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default FoodData;
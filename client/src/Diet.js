import React, {Component} from "react";
import Axios from "axios";

class Diet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diet: {},
        }
        this.displayDiet = this.displayDiet.bind(this)
    }

    async componentDidMount() {
        const id = this.props.match.params.id
        const diet = await Axios.get(`http://localhost:3000/user/list/${id}`)
        this.setState({diet: diet.data[0]})
    }

    displayDiet() {
        const diet = this.state.diet.diet
        if (typeof diet == 'undefined' || diet.length === 0) return 'loading...'
        const dietList = diet.map((food) => {
            return <li className="list-group-item" key={food._id}>{food.foodName}</li>
        })
        return <ul className="list-group"> {dietList} </ul>
    }

    render() {
        const diet = this.state.diet
        const name = (typeof diet.name == 'undefined' || diet.name.length === 0)
                    ? '' :
                    <h3 className="text-lg-center">{this.state.diet.name}'s Diet Plan</h3>
        return (
            <React.Fragment>
                <div className="container-fluid mt-3">
                    {name}
                </div>
                <div className="container my-5">{this.displayDiet()}</div>
            </React.Fragment>
        )
    }
}

export default Diet;

import React, {Component} from "react";
import Axios from "axios";
import FoodItem from "./FoodItem";

class Diet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diet: {},
        }
        this.displayDiet = this.displayDiet.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }

    async componentDidMount() {
        const id = this.props.match.params.id
        const diet = await Axios.get(`http://localhost:3000/user/list/${id}`)
        this.setState({diet: diet.data[0]})
    }

    async deleteItem(id) {
        const user = this.props.match.params.id
        await Axios.patch(`http://localhost:3000/user/list/${user}/diet/${id}`)
        const diet = await Axios.get(`http://localhost:3000/user/list/${user}`)
        this.setState({diet: diet.data[0]})

    };

    displayDiet() {
        const diet = this.state.diet.diet
        if (typeof diet == 'undefined') return 'loading...'
        if(diet.length === 0) return 'Add some food items'
        return diet.map((food) => {
            return <FoodItem food={food} key={food._id} deleteItem={this.deleteItem}/>
        })
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
                <div className="container mt-5">
                    <div className="d-md-flex flex-wrap flex-row justify-content-around">
                        {this.displayDiet()}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Diet;

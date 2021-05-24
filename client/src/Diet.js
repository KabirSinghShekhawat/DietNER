import {Component} from "react";
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
        if (typeof diet == 'undefined' || diet.length === 0) return ''
        const dietList = diet.map((food) => {
            return <li key={food._id}>{food.foodName}</li>
        })
        return <ul> {dietList} </ul>
    }

    render() {
        return (
            <div>{this.displayDiet()}</div>
        )
    }
}

export default Diet;

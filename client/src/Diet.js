import React, { Component } from "react";
import Axios from "axios";
import FoodItem from "./FoodItem";

class Diet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diet: {},
        }
        this.displayDiet = this.displayDiet.bind(this)
        this.totalNutritionalInfo = this.totalNutritionalInfo.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }

    async componentDidMount() {
        const id = this.props.match.params.id
        const diet = await Axios.get(`http://localhost:3000/user/list/${id}`)
        this.setState({ diet: diet.data[0] })
    }

    async deleteItem(id) {
        const user = this.props.match.params.id
        await Axios.patch(`http://localhost:3000/user/list/${user}/diet/${id}`)
        const diet = await Axios.get(`http://localhost:3000/user/list/${user}`)
        this.setState({ diet: diet.data[0] })
    };

    displayDiet() {
        const diet = this.state.diet.diet
        if (typeof diet == 'undefined') return 'loading...'
        if (diet.length === 0) return 'Add some food items'
        return diet.map((food) => {
            return <FoodItem food={food} key={food._id} deleteItem={this.deleteItem} />
        })
    }

    totalNutritionalInfo() {
        const diet = this.state.diet.diet
        if (typeof diet == 'undefined') return 'loading...'
        if (diet.length === 0) return ''

        const nutritionalInfo = {
            calories: diet.reduce((total, food) => {
                return total + food.calories
            }, 0),
            protein: diet.reduce((total, food) => {
                return total + food.protein
            }, 0),
            fat: diet.reduce((total, food) => {
                return total + food.fat
            }, 0),
            carbohydrates: diet.reduce((total, food) => {
                return total + food.carbohydrates
            }, 0)
        }

        const nutritionRows = Object.keys(nutritionalInfo).map((key, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td className="text-capitalize">{key}</td>
                    <td>{nutritionalInfo[key].toFixed(2)}{key === 'calories' ? ' kcal' : ' gm'}</td>
                </tr>
            )
        })

        const tableHead =
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nutrient</th>
                <th scope="col">Value</th>
            </tr>

        return (
            <table className="table">
                <thead>{tableHead}</thead>
                <tbody>{nutritionRows}</tbody>
            </table>
        )
    }

    render() {
        const diet = this.state.diet
        const name = (typeof diet.name == 'undefined' || diet.name.length === 0)
            ? '' : <h3 className="text-lg-center text-capitalize">{diet.name}'s Diet Plan</h3>

        let nutritionalTable = this.totalNutritionalInfo()
        let currentDiet = this.displayDiet()
        return (
            <React.Fragment>
                <div className="container-fluid mt-4">{name}</div>
                <div className="container mt-4">
                    {nutritionalTable}
                </div>
                <div className="container mt-5 mb-4">
                    <hr />
                    <div className="d-md-flex flex-wrap flex-row justify-content-around">
                        {currentDiet}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Diet;

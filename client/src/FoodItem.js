import React, { Component } from "react";

class FoodItem extends Component {
    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this)
    }

    handleRemove() {
        this.props.deleteItem(this.props.food._id)
    }

    render() {
        const food = this.props.food

        return (
            <div className="card mt-3 ml-3 flex-grow-1" style={{ width: "18rem" }}>
                <div className="card-body bg-light">
                    <FoodInfo food={food} />
                    <button onClick={this.handleRemove} type="button"
                        className="btn btn-danger" aria-label="Delete">
                        Delete
                    </button>
                </div>
            </div>
        )
    }
}

function FoodInfo(props) {
    const food = props.food

    const nutritionalInfo = {
        calories: food.calories,
        protein: food.protein,
        carbohydrates: food.carbohydrates,
        fat: food.fat
    }

    const nutritionalInfoText = Object.keys(nutritionalInfo).map((key, index) => {
        return (
            <p className="card-text text-capitalize" key={index}>
                {key}: {nutritionalInfo[key].toFixed(2)}{key === 'calories' ? ' kcal' : ' gm'}
            </p>
        )
    })
    
    return (
        <React.Fragment>
            <h5 className="card-title text-capitalize">{food.foodName}</h5>
            <hr />
            {nutritionalInfoText}
        </React.Fragment>
    )
}

export default FoodItem;
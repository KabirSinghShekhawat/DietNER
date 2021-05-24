import React, {Component} from "react";

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
            <div className="card mt-3 ml-3 flex-grow-1" style={{width: "18rem"}}>
                <div className="card-body bg-light">
                    <h5 className="card-title text-capitalize">{food.foodName}</h5>
                    <hr />
                    <p className="card-text">Calories: {food.calories} kcal</p>
                    <p className="card-text">Protein: {food.protein} gm</p>
                    <p className="card-text">Carbohydrates: {food.carbohydrates} gm</p>
                    <p className="card-text">Fat: {food.fat} gm</p>
                    <button onClick={this.handleRemove} type="button"
                            className="btn btn-danger" aria-label="Delete">
                        Delete
                    </button>
                </div>
            </div>
        )
    }
}

export default FoodItem;
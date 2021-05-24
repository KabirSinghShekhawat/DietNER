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
            <li className="list-group-item" key={food._id}>
                {food.foodName}
                <button onClick={this.handleRemove}>
                    &#10008;
                </button>
            </li>
        )
    }
}

export default FoodItem;
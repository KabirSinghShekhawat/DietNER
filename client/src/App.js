import React, {Component} from "react";
import Axios from "axios";
import Nav from "./Nav";
import FoodData from "./FoodData";
import NewUser from "./NewUser";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import UserList from "./UserList";

class App extends Component {
    constructor(props) {
        super(props);
        this.addFood = this.addFood.bind(this)
    }

    addFood(user) {
        const {username, foodData} = user
        Axios.post('http://localhost:3000/api/ner', {
            username: username,
            foodData: foodData
        })
            .then(function (response) {
                //handle success
                for (let food of response.data)
                    console.log(food);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    async componentDidMount() {
        // let dataApi = await Axios.get("http://localhost:3000/api/test")
        // this.setState({data: dataApi.data})
    }

    render() {
        return (
            <React.Fragment>
                <Router>
                    <Nav/>
                    <Switch>
                        <Route exact path="/user/all">
                            <UserList />
                        </Route>
                        <Route exact path="/new_user">
                            <NewUser/>
                        </Route>
                        <Route path="/">
                            <FoodData addFood={this.addFood}/>
                        </Route>
                    </Switch>

                </Router>
            </React.Fragment>
        )
    }
}

export default App;
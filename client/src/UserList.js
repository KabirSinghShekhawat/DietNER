import React, {Component} from "react";
import Axios from "axios";
import User from "./User";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
        this.userList = this.userList.bind(this)
    }

    async componentDidMount() {
        const users = await Axios.get('http://localhost:3000/user/list')
        this.setState({users: users.data})
    }

    userList() {
        const users = this.state.users
        if(typeof users == 'undefined' || users.length === 0) return 'Loading...'

        const cards = users.map((user) => {
            return (
                <User key={user._id} user={user} />
            )
        })
        return cards
    }

    render() {
        return (
            <div className="container mt-5">
                <div className="d-md-flex flex-row justify-content-around">
                    {this.userList()}
                </div>
            </div>
        )
    }
}

export default UserList;
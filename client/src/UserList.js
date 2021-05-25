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
        this.deleteUser = this.deleteUser.bind(this)
    }

    async componentDidMount() {
        const users = await Axios.get('http://localhost:3000/user/list')
        this.setState({users: users.data})
    }

    userList() {
        const users = this.state.users
        if(typeof users == 'undefined' || users.length === 0) return 'Loading...'
        return users.map((user) => {
            return (
                <User key={user._id} user={user} deleteUser={this.deleteUser} />
            )
        })
    }

    async deleteUser(id) {
            await Axios.delete(`http://localhost:3000/user/list/${id}`)
            const users = await Axios.get('http://localhost:3000/user/list')
            this.setState({users: users.data})
    }

    render() {
        const userList = this.userList()
        return (
            <div className="container">
                <div className="d-flex flex-wrap flex-row justify-content-center">
                    {userList}
                </div>
            </div>
        )
    }
}

export default UserList;
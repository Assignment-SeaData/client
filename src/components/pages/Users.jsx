import { useEffect, useState } from "react"
import { connection } from "../../config/config";

const Users = () => {

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const response = await connection.getUsers();
        const data = await response.json();
        setUsers(data)
    }

    useEffect(() => {
        getUsers();
        console.log(users);
    }, [])

    return <div>
        users
    </div>
}

export default Users
import { useEffect, useRef, useState } from "react"
import { ThemeProvider } from '@mui/material/styles'
import { useDispatch } from "react-redux";

import Users from './components/pages/Users';
import UserForm from "./components/forms/UserForm.jsx";
import DeleteUserForm from "./components/forms/DeleteUserForm.jsx";
import Header from "./components/Header.jsx";
import AlertInfo from "./components/AlertInfo.jsx";
import { connection } from "./config/config";
import { alertActions } from "./redux/slices/alertSlice.js";
import { userTheme } from './util/UsersTheme.js'

function App() {

    const dispatch = useDispatch();

    const [users, setUsers] = useState({ filter: [], display: [] });
    const [openUserDialog, setOpenUserDialog] = useState(false)
    const [openDeleteUserDialog, setOpenDeleteUserDialog] = useState(false)
    const selectedUserRef = useRef(null)

    const getUsers = async () => {
        const response = await connection.getUsers();
        const data = await response.json();
        setUsers({ filter: data, display: data })
    }

    const handleOpenAddDialog = () => {
        setOpenUserDialog(true)
    }

    const handleOpenEditDialog = (e, cellValue) => {
        selectedUserRef.current = cellValue.row
        setOpenUserDialog(true)
    }

    const handleCloseUserDialog = () => {
        selectedUserRef.current = null
        setOpenUserDialog(false)
    }

    const handleOpenDeleteDialog = (e, cellValue) => {
        selectedUserRef.current = cellValue.row
        setOpenDeleteUserDialog(true)
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteUserDialog(false)
    }

    const handleSubmitAddForm = async (event, userData) => {
        event.preventDefault();
        // const formData = new FormData(event.currentTarget);
        // const userData = {
        //     fullName: formData.get('fullname'),
        //     country: formData.get('country'),
        //     city: formData.get('city'),
        //     email: formData.get('email'),
        //     phoneNumber: formData.get('phoneNumber'),
        //     jobTitle: formData.get('jobTitle'),
        //     experience: +formData.get('experience'),
        // }
        const response = await connection.addUser(userData)
        if (response.ok) {
            const data = await response.json();
            setUsers(prevUsers => {
                const newUsers = prevUsers.filter.slice()
                newUsers.push(data);
                return { display: newUsers, filter: newUsers };
            })
            handleCloseUserDialog()
            dispatch(alertActions.set({ message: "User was added", severity: "success" }))
        } else {
            const message = JSON.parse(await response.text())
            dispatch(alertActions.set({ ...message, severity: "error" }))
        }
    }

    const handleSubmitEditForm = async (event, userData) => {
        event.preventDefault();
        const selectedId = selectedUserRef.current?.id;
        const response = await connection.editUser(selectedId, userData)
        if (response.ok) {
            const data = await response.json();
            setUsers(prevUsers => {
                const newUsers = prevUsers.filter.map(user => user.id != selectedId ? user : data);
                return { display: newUsers, filter: newUsers };
            })
            handleCloseUserDialog();
            dispatch(alertActions.set({ message: "User was edited", severity: "success" }))
        } else {
            const message = JSON.parse(await response.text())
            dispatch(alertActions.set({ ...message, severity: "error" }))
        }
    }

    const handleSubmitDeleteForm = async (event) => {
        event.preventDefault();
        const selectedId = selectedUserRef.current.id;
        const response = await connection.deleteUser(selectedUserRef.current.id)
        if (response.ok) {
            setUsers(prevUsers => {
                const newUsers = prevUsers.filter.filter(user => user.id != selectedId);
                return { display: newUsers, filter: newUsers };
            })
            selectedUserRef.current = null;
            handleCloseDeleteDialog();
            dispatch(alertActions.set({ message: "User was deleted", severity: "success" }))
        } else {
            const message = JSON.parse(await response.text())
            dispatch(alertActions.set({ ...message, severity: "error" }))
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div>
            <Header users={users} setUsers={setUsers} handleOpenAddDialog={handleOpenAddDialog} />
            <ThemeProvider theme={userTheme}>
                <Users users={users.display} handleOpenDeleteDialog={handleOpenDeleteDialog} handleOpenEditDialog={handleOpenEditDialog} />
            </ThemeProvider>
            {openUserDialog && <UserForm onClose={handleCloseUserDialog} onSubmit={selectedUserRef.current == null ? handleSubmitAddForm : handleSubmitEditForm} selectedUser={selectedUserRef} />}
            {openDeleteUserDialog && <DeleteUserForm onClose={handleCloseDeleteDialog} onSubmit={handleSubmitDeleteForm} />}
            <AlertInfo />
        </div>
    );
}

export default App;

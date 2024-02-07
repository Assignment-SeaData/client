import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

const Searching = (props) => {

    const { users, setUsers } = props

    const [value, setValue] = useState('');

    useEffect(() => {
        setUsers(prevUsers => {
            return { ...prevUsers, display: value ? prevUsers.filter.filter(user => user.full_name == value) : prevUsers.filter }
        })
    }, [value])

    return <Autocomplete
        style={{ width: '100%' }}
        size='small'
        fullWidth
        disablePortal
        options={users.filter.map(user => user.full_name)}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Users" />}
        onChange={(event, newValue) => {
            setValue(newValue)
        }}
        value={value}
    />

}

export default Searching
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';

const Searching = (props) => {

    const { users, setUsers } = props

    const [value, setValue] = useState('');

    useEffect(() => {
        setUsers(prevUsers => {
            return { ...prevUsers, display: value ? prevUsers.filter.filter(user => user.fullName == value) : prevUsers.filter }
        })
    }, [value])

    return <Autocomplete
        style={{ width: '100%', backgroundColor: '#fff', borderRadius: '.5rem', overflow: 'hidden' }}
        size='small'
        fullWidth
        disablePortal
        options={Array.from(new Set(users.filter.map(user => user.fullName)))}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Users" />}
        onChange={(event, newValue) => {
            setValue(newValue == null ? '' : newValue)
        }}
        value={value}
    />

}

export default Searching
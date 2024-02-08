import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Searching from './Searching.jsx';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header = (props) => {

    const { users, setUsers, handleOpenAddDialog } = props
    console.log(users);

    const theme = useTheme();
    const lessThanSmall = useMediaQuery(theme.breakpoints.down("md"));

    return <AppBar position="sticky" color='primary' sx={{ display: 'flex' }}>
        <Box sx={{ margin: '.5rem', display: 'flex', gap: '.5rem', justifyContent: 'center' }}>
            <Box sx={{ width: '10%', display: 'flex', justifyContent: 'center' }}>
                {lessThanSmall ?
                    <IconButton color="secondary" onClick={handleOpenAddDialog}>
                        <AddIcon />
                    </IconButton>
                    :
                    <Button variant="contained" color="secondary" fullWidth sx={{ fontSize: '10px' }} onClick={handleOpenAddDialog}>
                        Add User
                    </Button>
                }
            </Box>
            <Box sx={{ width: `calc(100vw - 10%)` }}>
                <Searching users={users} setUsers={setUsers} />
            </Box>
        </Box>
    </AppBar>
}

export default Header
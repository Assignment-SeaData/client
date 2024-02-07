import { useEffect, useState } from "react"
import { connection } from "./config/config";
import './App.css';
import Searching from './components/Searching.jsx';
import Users from './components/pages/Users';
import { theme } from './util/UsersTheme.js'
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { useTheme } from "@mui/material/styles";

function App() {

    const t = useTheme();
    const lessThanSmall = useMediaQuery(t.breakpoints.down("md"));

    const [users, setUsers] = useState({ filter: [], display: [] });

    const getUsers = async () => {
        const response = await connection.getUsers();
        const data = await response.json();
        setUsers({ filter: data, display: data })
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div>
            <AppBar position="sticky" color='primary' sx={{ display: 'flex' }}>
                <Box sx={{ margin: '.5rem', display: 'flex', gap: '.5rem' }}>
                    <Box sx={{ width: '10%' }}>
                        {lessThanSmall ?
                            <Button variant="contained" startIcon={<AddIcon sx={{ margin: 0 }} />} sx={{ height: '100%', width: '100%', margin: 0, fontSize: '10px' }}>
                            </Button>
                            :
                            <Button variant="contained" fullWidth sx={{ height: '100%', margin: 0, fontSize: '10px' }}>
                                Add User
                            </Button>
                        }
                    </Box>
                    <Box sx={{ width: `calc(100vw - 15%)` }}>
                        <Searching users={users} setUsers={setUsers} />
                    </Box>
                </Box>
            </AppBar>
            <ThemeProvider theme={theme}>
                <Users users={users.display} />
            </ThemeProvider>
        </div>
    );
}

export default App;

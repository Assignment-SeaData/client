import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, gridClasses } from '@mui/x-data-grid';

import Username from '../Username';
import { useEffect, useState } from 'react';

const Users = (props) => {

    const { users, handleOpenDeleteDialog, handleOpenEditDialog } = props

    const [appBarHeight, setAppBarHeight] = useState(0)

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70,
            editable: false,
            disableColumnMenu: true,
        },
        {
            field: 'fullName',
            headerName: 'Full Name',
            flex: 1,
            editable: false,
            disableColumnMenu: true,
            renderCell: (params) => <Username text={params.row.fullName} className={+params.row.experience <= 1 ? 'table-cell-junior' : ''} />
        },
        {
            field: 'country',
            headerName: 'Country',
            flex: 1,
            editable: false,
            disableColumnMenu: true,
        },
        {
            field: 'city',
            headerName: 'City',
            flex: 1,
            editable: false,
            disableColumnMenu: true,
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone',
            flex: 1,
            editable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const phoneNumberArr = params.row.phoneNumber.split(' ')
                return <>{phoneNumberArr.join('')}</>
            }
        },
        {
            field: 'jobTitle',
            headerName: 'Job Title',
            flex: 1,
            editable: false,
            disableColumnMenu: true,
        },
        {
            field: 'experience',
            headerName: 'Experience (age)',
            type: 'number',
            flex: 1,
            editable: false,
            disableColumnMenu: true,
        },
        {
            field: 'Actions',
            headerName: '',
            editable: false,
            disableColumnMenu: true,
            sortable: false,
            renderCell: (cellValue) => {
                return <Box className='table-actions' display={'none'}>
                    <IconButton color="error" aria-label="delete" onClick={(e) => handleOpenDeleteDialog(e, cellValue)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={(e) => handleOpenEditDialog(e, cellValue)}>
                        <EditIcon />
                    </IconButton>
                </Box>
            },
        }
    ];

    useEffect(() => {
        setAppBarHeight(document.getElementById("appBar").clientHeight);
    }, [])

    return <Box sx={{
        height: `calc(100vh - ${appBarHeight}px - 1rem)`,
        margin: '.5rem',
        paddingX: '10%',
        color: '#808080',
        background: '#fff',
    }}>
        <DataGrid
            autoPageSize
            sx={{
                maxHeight: '100%',
                "& .MuiDataGrid-columnHeaders": {
                    background: '#36304a',
                    color: "white",
                    fontWeight: "bold"
                },
                '& span.table-cell-junior': {
                    color: 'orange'
                },
                [`& .${gridClasses.row}.even`]: {
                    background: '#f5f5f5',
                },
                [`& .${gridClasses.row}:hover, .${gridClasses.row}&.Mui-hovered`]: {
                    background: 'lightgray',
                    cursor: 'pointer'
                },
                [`& .${gridClasses.row}:hover .table-actions, .${gridClasses.row}&.Mui-hovered .table-actions`]: {
                    display: 'block'
                }
            }}
            disableRowSelectionOnClick
            rows={users}
            columns={columns}
            getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
        />
    </Box>
}

export default Users
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Username from '../Username';

const Users = (props) => {

    const { users, handleOpenDeleteDialog, handleOpenEditDialog } = props

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70,
            // flex: 1,
            editable: false,
            disableColumnMenu: true,
            headerClassName: 'table-header'
        },
        {
            field: 'fullName',
            headerName: 'Full Name',
            // width: 150,
            flex: 1,
            editable: false,
            disableColumnMenu: true,
            headerClassName: 'table-header',
            renderCell: (params) => <Username text={params.row.fullName} className={+params.row.experience <= 1 ? 'table-cell-junior' : ''} />
        },
        {
            field: 'country',
            headerName: 'Country',
            // width: 150,
            flex: 1,
            editable: false,
            disableColumnMenu: true,
            headerClassName: 'table-header'
        },
        {
            field: 'city',
            headerName: 'City',
            // width: 110,
            flex: 1,
            editable: false,
            disableColumnMenu: true,
            headerClassName: 'table-header'
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone',
            type: 'number',
            // width: 110,
            flex: 1,
            editable: false,
            disableColumnMenu: true,
            headerClassName: 'table-header'
        },
        {
            field: 'jobTitle',
            headerName: 'Job Title',
            // width: 110,
            flex: 1,
            editable: false,
            disableColumnMenu: true,
            headerClassName: 'table-header'
        },
        {
            field: 'experience',
            headerName: 'Experience (age)',
            type: 'number',
            // width: 110,
            flex: 1,
            editable: false,
            disableColumnMenu: true,
            headerClassName: 'table-header'
        },
        {
            field: 'Actions',
            headerName: '',
            editable: false,
            disableColumnMenu: true,
            headerClassName: 'table-header',
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

    return <Box sx={{
        margin: '.5rem',
        paddingX: '10%',
        paddingY: '1rem',
        color: '#808080',
        background: '#fff',
        '& .table-header': {
            background: '#36304a',
            color: 'white'
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
    }}>
        <DataGrid
            disableRowSelectionOnClick
            rows={users}
            columns={columns}
            getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
        />

    </Box>
}

export default Users
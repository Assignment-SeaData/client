import Box from '@mui/material/Box';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Username from '../Username';

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90,
        headerClassName: 'table-header'
    },
    {
        field: 'full_name',
        headerName: 'Full Name',
        width: 150,
        editable: false,
        disableColumnMenu: true,
        headerClassName: 'table-header',
        renderCell: (params) => <Username text={params.row.full_name} className={+params.row.years_of_experience <= 1 ? 'table-cell-junior' : ''} />
    },
    {
        field: 'country',
        headerName: 'Country',
        width: 150,
        editable: false,
        disableColumnMenu: true,
        headerClassName: 'table-header'
    },
    {
        field: 'city',
        headerName: 'City',
        width: 110,
        editable: false,
        disableColumnMenu: true,
        headerClassName: 'table-header'
    },
    {
        field: 'phone_number',
        headerName: 'Phone',
        type: 'number',
        width: 110,
        editable: false,
        disableColumnMenu: true,
        headerClassName: 'table-header'
    },
    {
        field: 'job_title',
        headerName: 'Job Title',
        width: 110,
        editable: false,
        disableColumnMenu: true,
        headerClassName: 'table-header'
    },
    {
        field: 'years_of_experience',
        headerName: 'Experience (age)',
        type: 'number',
        width: 110,
        editable: false,
        disableColumnMenu: true,
        headerClassName: 'table-header'
    }
];

const Users = (props) => {

    const { users } = props

    return <Box sx={{
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
        }
    }}>
        <DataGrid
            rows={users}
            columns={columns}
            getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
        />

    </Box>
}

export default Users
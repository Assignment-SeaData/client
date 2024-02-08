import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch } from "react-redux";
import { useSelectorAlert } from "../redux/store";
import { alertActions } from "../redux/slices/alertSlice";

const AlertInfo = () => {

    const dispatch = useDispatch();
    const alertData = useSelectorAlert();

    return <Snackbar open={alertData.show} autoHideDuration={5000} onClose={() => dispatch(alertActions.clear())}>
        <Alert
            onClose={() => dispatch(alertActions.clear())}
            severity={alertData.severity}
            variant="filled"
            sx={{ width: '100%' }}
        >
            {alertData.message}
        </Alert>
    </Snackbar>
}

export default AlertInfo
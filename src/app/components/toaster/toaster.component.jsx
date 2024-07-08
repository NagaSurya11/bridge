import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../features/reducer";

function ToasterComponent() {
    const Toaster = useSelector(state => state.Toaster);
    const dispatch = useDispatch();
    return (
        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={Toaster.open} autoHideDuration={6000} onClose={() => dispatch(actions.CLOSE_ALERT())}>
            <Alert
                severity={Toaster.severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {Toaster.message}
            </Alert>
        </Snackbar>
    )
}

export default ToasterComponent;
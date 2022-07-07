import { Alert } from "@mui/material";
import { setMessageAC } from "../../Redux/AppReducer";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";

const Error = () => {
    const dispatch = useAppDispatch();
    const infoMessage = useAppSelector(state => state.app.message)
    const errorStatus = useAppSelector(state => state.app.errorStatus)


    setTimeout(() => {
        dispatch(setMessageAC("", false));
    }, 3000)


    if (!errorStatus && infoMessage === "") {
        return null;
    }

    return (
            <Alert variant="filled" severity={errorStatus ? "error" : "success"}>
                {infoMessage}
            </Alert>
    )
}

export default Error;
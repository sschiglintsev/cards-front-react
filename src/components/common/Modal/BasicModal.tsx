import React, {FC} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Input from "@mui/material/Input";
import {useAppDispatch} from "../../../Redux/hooks";
import {editCardTC} from "../../../Redux/CardsReducer";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type propsType = {
    children: any,
    open:boolean
    handleClose:()=>void
}

 export const BasicModal: FC<propsType> = ({children, open, handleClose}) => {

   return (
        <>



            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {React.cloneElement(children, {handleClose})}
                </Box>
            </Modal>
        </>
    );
}
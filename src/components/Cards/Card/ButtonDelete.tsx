import Button from "@mui/material/Button";
import React, {FC} from "react";
import {BasicModal} from "../../common/Modal/BasicModal";
import {ModalDeleteCard} from "../ModalDeleteCard/ModalDeleteCard";

type propsType = {
    id:string,
    deleteCard: (id:string)=>void,
}

export const ButtonDelete: FC<propsType> =({id, deleteCard}) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={() => deleteCard(id)}
                    variant="outlined"
                    color="error"
                    sx={{
                        width: 30,
                        height: 25,
                    }}>
                Delete
            </Button>
            <BasicModal handleClose={handleClose} open={open}>
                <ModalDeleteCard />
            </BasicModal>
        </div>
    );
};

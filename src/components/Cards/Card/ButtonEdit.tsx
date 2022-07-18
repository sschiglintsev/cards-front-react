import Button from "@mui/material/Button";
import React, {FC} from "react";
import {ModalEditCard} from "../ModalEditCard/ModalEditCard";
import {BasicModal} from "../../common/Modal/BasicModal";

type propsType = {
    question:string,
    answer:string,
    id:string
}

export const ButtonEdit: FC<propsType>=({question, answer, id})=> {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}
                    variant="contained"
                    color="success"
                    sx={{
                        width: 30,
                        height: 25,
                    }}>
                Edit
            </Button>
            <BasicModal handleClose={handleClose} open={open} >
                <ModalEditCard question={question} answer={answer} _id={id} />
            </BasicModal>
        </div>
    );
};

import { Input } from "@mui/material";
import { FC, useState } from "react";
import tableCellClasses from "@mui/material/TableCell/tableCellClasses";
import TableCell from "@mui/material/TableCell";
import styled from "@mui/material/styles/styled";

type PropsType = {
    isEditCard: boolean
    text: string
    onChangeEvent: (text: string) => void
}

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#ECECF9',
        color: '#2D2E46',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '13px',
        lineHeight: '16px',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const SuperCardInput: FC<PropsType> = ({isEditCard, text, onChangeEvent}) => {
    const [inputValue, setInputValue] = useState<string>('');

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        onChangeEvent(event.target.value);
    }

    return (
        <>
            {!isEditCard ?
                <StyledTableCell component="th" scope="row">{text}</StyledTableCell>
                :
                <Input type='text' onChange={onChangeInput} value={inputValue}></Input>
            }
        </>
    );
}
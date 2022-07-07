import React, {useEffect, useState} from 'react';
import style from "./Cards.module.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import tableCellClasses from "@mui/material/TableCell/tableCellClasses";
import styled from "@mui/material/styles/styled";
import Button from "@mui/material/Button";
import {Navigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../Redux/hooks";
import {changeCardEditStatus, setCardsTC} from "../../Redux/CardsReducer";
import { CardsApi } from '../../api/cards-api';
import { PATH } from '../Routes/Routes';
import { NavLink } from 'react-router-dom';
import { Card } from './Card/Card';


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

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const Cards = () => {

    const dispatch = useAppDispatch()

    const [redirect, setRedirect] = useState(false);

    const cards = useAppSelector(state => state.cards)

    const rows = cards.cards
    const page = cards.page
    const pageCount = cards.pageCount
    const cardsTotalCount = cards.cardsTotalCount

    const {cardsPack_id} = useParams();

    //setCards

    useEffect(() => {
        dispatch(setCardsTC({cardsPack_id}))
    }, [])

    //Pagination

    const [pageValue, setPageValue] = React.useState(page);
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageValue(value);
    };

    const [text, setText] = useState('');

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    // Buttons func

    const deleteCard = (id: string) => {
        CardsApi.deleteCard(id);
    }

    // const redirectToCard = () => {
    //     setRedirect(true);
    // }

    // if (redirect) {
    //   return <Navigate to={PATH.ADD_NEW_CARD}/>
    // }

    return (
        <div className={style.Wrapper}>
            <Container maxWidth="lg">
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item marginTop={15}>
                        <Paper className={style.Paper}>

                            <div className={style.backPack}>
                                <ArrowBackIcon/>
                                <Typography
                                    sx={{flex: '1 1 100%'}}
                                    variant="h6"
                                    id="tableTitle"
                                    component="div"
                                >
                                    Pack Name
                                </Typography>
                            </div>

                            <div className={style.search}>
                                <Box
                                    sx={{
                                        width: 960,
                                        maxWidth: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                    }}
                                >
                                    <input 
                                        className={style.searchInput}
                                        value={text}
                                        onChange={onChangeInput}
                                        type='text'
                                        placeholder='Search...'>    
                                    </input>
                                    <NavLink to={`${PATH.ADD_NEW_CARD}/${cardsPack_id}`} className={style.link}>
                                        <Button 
                                                sx={{backgroundColor: '#21268F', width: '184px', borderRadius: '30px'}}
                                                variant="contained"
                                                >
                                                Add new card
                                        </Button>
                                    </NavLink>
                                    
                                </Box>
                            </div>

                            <div className={style.TableContainer}>
                                <TableContainer component={Paper}>
                                    <Table sx={{minWidth: 700}} aria-label="customized table">
                                        <TableHead>
                                            <TableRow sx={{backgroundColor: '#ECECF9'}}>
                                                <StyledTableCell>Question</StyledTableCell>
                                                <StyledTableCell align="right">Answer</StyledTableCell>
                                                <StyledTableCell align="right">Last Update</StyledTableCell>
                                                <StyledTableCell align="right">Grade</StyledTableCell>
                                                <StyledTableCell align="right">Actions</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((card) => (
                                                <Card card={card} deleteCard={deleteCard} key={card._id} />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>

                            <div className={style.pagination}>
                                <Stack spacing={2}>
                                    <Pagination count={cardsTotalCount > 0 ? Math.ceil(cardsTotalCount / pageCount) : 0}
                                                page={pageValue} onChange={handleChangePage}/>
                                </Stack>
                            </div>

                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

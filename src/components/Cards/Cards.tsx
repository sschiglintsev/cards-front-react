import React, {useEffect} from 'react';
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
import {useParams, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../Redux/hooks";
import { clearCardsTC, setCardsTC} from "../../Redux/CardsReducer";


const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
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
    const cards = useAppSelector(state => state.cards)

    const rows = cards.cards
    const page = cards.page
    const pageCount = cards.pageCount
    const cardsTotalCount = cards.cardsTotalCount

    console.log(pageCount)
    console.log(cardsTotalCount)
    console.log(Math.ceil(cardsTotalCount / pageCount))

    const {cardsPack_id} = useParams();

    //setCards

    useEffect(() => {
        dispatch(setCardsTC({cardsPack_id}))
    }, [cardsPack_id])

    console.log(cardsPack_id)

    //Pagination

    let navigate = useNavigate();

    const [pageValue, setPageValue] = React.useState(page);

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        navigate(`/profile/card/${cardsPack_id}&page=${value}`)
        setPageValue(value);

    };

    // Buttons func

    const deleteCard = (id: string) => {
        console.log('delete')
    }

    const editButton = (id: string) => {
        console.log('edit')
    }

    // Back in Paks list
     const backInPacks = () => {
         navigate(`/profile`)
         dispatch(clearCardsTC())
     }

    return (
        <div className={style.Wrapper}>
            <Container maxWidth="lg">
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item marginTop={15}>
                        <Paper className={style.Paper}>

                            <div className={style.backPack} onClick={backInPacks}>
                                <ArrowBackIcon/>
                                <Typography
                                    sx={{flex: '1 1 100%'}}
                                    variant="h6"
                                    id="tableTitle"
                                    component="div"
                                >
                                    {cards.namePack}
                                </Typography>
                            </div>

                            <div className={style.search}>
                                <Box
                                    sx={{
                                        width: 960,
                                        maxWidth: '100%',
                                    }}
                                >
                                    <TextField fullWidth label="🔍" id="fullWidth"/>
                                </Box>
                            </div>

                            <div className={style.TableContainer}>
                                <TableContainer component={Paper}>

                                    {cardsTotalCount > 0
                                        ? <Table sx={{minWidth: 700}} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>Question</StyledTableCell>
                                                    <StyledTableCell align="right">Answer</StyledTableCell>
                                                    <StyledTableCell align="right">Last Update</StyledTableCell>
                                                    <StyledTableCell align="right">Grade</StyledTableCell>
                                                    <StyledTableCell align="right">Actions</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <StyledTableRow key={row.question}>
                                                        <StyledTableCell component="th" scope="row">
                                                            {row.question}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="right">{row.answer}</StyledTableCell>
                                                        <StyledTableCell align="right">{row.updated}</StyledTableCell>
                                                        <StyledTableCell align="right">{row.grade}</StyledTableCell>
                                                        <StyledTableCell align="right">
                                                            <div className={style.buttons}>
                                                                <Button onClick={() => deleteCard(row._id)}
                                                                        variant="outlined"
                                                                        color="error"
                                                                        sx={{
                                                                            width: 30,
                                                                            height: 25,
                                                                        }}>
                                                                    Delete
                                                                </Button>
                                                                <Button onClick={() => {
                                                                    editButton(row._id)
                                                                }}
                                                                        variant="contained"
                                                                        color="success"
                                                                        sx={{
                                                                            width: 30,
                                                                            height: 25,
                                                                        }}>
                                                                    Edit
                                                                </Button>
                                                            </div>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        : <></>
                                    }

                                </TableContainer>
                            </div>

                            {cardsTotalCount > 0
                                ? <div className={style.pagination}>
                                    <Stack spacing={2}>
                                        <Pagination
                                            count={cardsTotalCount > 0 ? Math.ceil(cardsTotalCount / pageCount) : 0}
                                            page={pageValue} onChange={handleChangePage}/>
                                    </Stack>
                                </div>
                                : <></>
                            }


                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

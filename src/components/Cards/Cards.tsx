import React, {useDeferredValue, useEffect, useState} from 'react';
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
import {useParams, useNavigate, NavLink} from 'react-router-dom';
import useDebounce, {useAppDispatch, useAppSelector} from "../../Redux/hooks";
import {clearCardsTC, setCardsTC} from "../../Redux/CardsReducer";
import {PATH} from "../Routes/Routes";
import {Card} from "./Card/Card";
import {CardsApi} from "../../api/cards-api";


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
    }, [cardsPack_id])


    //Pagination

    let navigate = useNavigate();

    const [pageValue, setPageValue] = React.useState(page);

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        navigate(`/profile/card/${cardsPack_id}&page=${value}`)
        setPageValue(value);

    };


    // Buttons func

    const deleteCard = (id: string) => {
        CardsApi.deleteCard(id);
    }

    const editButton = (id: string) => {
        console.log('edit')
    }

    // Back in Paks list
    const backInPacks = () => {
        navigate(`/profile`)
        dispatch(clearCardsTC())
    }

    //Search
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);



    useEffect(
        () => {
            if (debouncedSearchTerm) {
                setIsSearching(true);
                console.log(debouncedSearchTerm)
                // searchCharacters(debouncedSearchTerm)
                //     .then(results => {
                //         setIsSearching(false);
                //         setResults(results);
                //     });
            } else {
                setResults([]);
            }
        },
        [debouncedSearchTerm]
    );

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
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                    }}
                                >
                                    <input
                                        className={style.searchInput}
                                        onChange={e => setSearchTerm(e.target.value)}
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
                                                {rows.map((card) => (
                                                    <Card card={card} deleteCard={deleteCard} key={card._id}/>
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

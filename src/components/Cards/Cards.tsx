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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import tableCellClasses from "@mui/material/TableCell/tableCellClasses";
import styled from "@mui/material/styles/styled";
import Button from "@mui/material/Button";
import {useParams, useNavigate, NavLink, useSearchParams, useLocation, Navigate} from 'react-router-dom';
import useDebounce, {useAppDispatch, useAppSelector} from "../../Redux/hooks";
import {clearCardsTC, deleteCardTC, setCardsTC} from "../../Redux/CardsReducer";
import {PATH} from "../Routes/Routes";
import {Card} from "./Card/Card";
import {CardsApi} from "../../api/cards-api";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const Cards = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const cards = useAppSelector(state => state.cards)

    const rows = cards.cards
    const pageCount = cards.pageCount
    const cardsTotalCount = cards.cardsTotalCount
    const [isDeleteCard, setIsDeleteCard] = useState(false)

    const {cardsPack_id} = useParams();

    //Search Param in url
    let [searchParams, setSearchParams] = useSearchParams();

    let pageStr = searchParams.get('page')
    let valueSearchURLCardAnswer = searchParams.get('cardAnswer')
    let valueSearchURLCardQuestion = searchParams.get('cardQuestion')

    //Search
    const [searchTermAnswer, setSearchTermAnswer] = useState('');
    const [searchTermQuestion, setSearchTermQuestion] = useState('');

    const debouncedSearchTermAnswer = useDebounce(searchTermAnswer, 500);
    const debouncedSearchTermQuestion = useDebounce(searchTermQuestion, 500);

    const onChangeSearchAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setSearchParams({...Object.fromEntries(searchParams), cardAnswer: value})
        setPageValue(1)
        setSearchTermAnswer(value)
    }

    const onChangeSearchQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setSearchParams({...Object.fromEntries(searchParams), cardQuestion: value})
        setPageValue(1)
        setSearchTermQuestion(value)
    }

    //Sort last update
    const [sortCardsUpdated, setSortCardsUpdated] = useState('0')

    //setCards

    useEffect(() => {
        const cardQuestion = valueSearchURLCardQuestion == null ? '' : valueSearchURLCardQuestion
        const cardAnswer = valueSearchURLCardAnswer == null ? '' : valueSearchURLCardAnswer
        const page = pageStr === null ? 1 : parseInt(pageStr, 10)
        const sortCards =sortCardsUpdated  + 'updated'

        dispatch(setCardsTC({cardsPack_id, page, cardAnswer, cardQuestion, sortCards}))
    }, [cardsPack_id, pageStr, debouncedSearchTermAnswer,debouncedSearchTermQuestion, sortCardsUpdated,isDeleteCard])

    //Pagination

    let navigate = useNavigate();

    const initPage = pageStr === null ? 1 : parseInt(pageStr, 10)
    const [pageValue, setPageValue] = useState(initPage);

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setSearchParams({...Object.fromEntries(searchParams), page: String(value)})
        setPageValue(value);
    };

    // Buttons func
    const deleteCard = (id: string) => {
        dispatch(deleteCardTC(id))
        setIsDeleteCard(!isDeleteCard)
    }

    const editButton = (id: string) => {
        console.log('edit')
    }

    // Back in Paks list
    const backInPacks = () => {
        navigate(`/profile`)
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
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
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                    }}
                                >
                                    <input
                                        className={style.searchInput}
                                        value={searchTermQuestion === null ? '' : searchTermQuestion}
                                        onChange={onChangeSearchQuestion}
                                        type='text'
                                        placeholder='Search question...'>
                                    </input>
                                    <input
                                        className={style.searchInput}
                                        value={searchTermAnswer === null ? '' : searchTermAnswer}
                                        onChange={onChangeSearchAnswer}
                                        type='text'
                                        placeholder='Search answer...'>
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
                                                    <StyledTableCell align="right">Last Update
                                                        {sortCardsUpdated === '0'
                                                            ? <ArrowDownwardIcon sx={{
                                                                cursor: 'pointer',
                                                                fontSize: 'medium'
                                                            }} onClick={() => setSortCardsUpdated('1')}/>
                                                            : <ArrowUpwardIcon sx={{
                                                                cursor: 'pointer',
                                                                fontSize: 'medium'
                                                            }} onClick={() => setSortCardsUpdated('0')}/>
                                                        }
                                                    </StyledTableCell>
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

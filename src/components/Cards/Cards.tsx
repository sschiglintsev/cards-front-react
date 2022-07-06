import React from 'react';
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
import {useParams } from 'react-router-dom';


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

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
) {
    return {name, calories, fat, carbs};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24),
    createData('Ice cream sandwich', 237, 9.0, 37),

];

export const Cards = () => {

    const {cardsPack_id} = useParams();
    console.log(cardsPack_id)

    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

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
                                    }}
                                >
                                    <TextField fullWidth label="🔍" id="fullWidth"/>
                                </Box>
                            </div>

                            <div className={style.TableContainer}>
                                <TableContainer component={Paper}>
                                    <Table sx={{minWidth: 700}} aria-label="customized table">
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
                                                <StyledTableRow key={row.name}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {row.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                                    <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        <div className={style.buttons}>
                                                        <Button
                                                            variant="outlined"
                                                            color="error"
                                                            sx={{
                                                                width: 30,
                                                                height: 25,
                                                            }}>
                                                            Delete
                                                        </Button>
                                                        <Button
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
                                </TableContainer>
                            </div>

                            <div className={style.pagination}>
                                <Stack spacing={2}>
                                    <Pagination count={10} page={page} onChange={handleChange}/>
                                </Stack>
                            </div>

                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

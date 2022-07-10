import React, { ChangeEvent, ChangeEventHandler, MouseEvent, MouseEventHandler, useEffect, useState } from 'react'
import s from './Table.module.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Input, InputAdornment, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {  getPacksTC, PackType, SetPackNameAC } from '../../Redux/ProfileReducer';
import useDebounce, { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { useNavigate } from 'react-router-dom';
import { addNamePackAC } from "../../Redux/CardsReducer";

const PacksListTable = () => {

    const dispatch = useAppDispatch();
    let [page, setPage] = useState(0);

    let packs = useAppSelector(state => state.profile.packs);
    let totalCount = useAppSelector(state => state.profile.totalCount);
    let minMax = useAppSelector(state => state.profile.minMax);
    let packName = useAppSelector(state => state.profile.packName);

    let pageCount = Math.ceil(totalCount / 8);

    useEffect(() => {
        dispatch(getPacksTC(page + 1))
    }, [page, dispatch, minMax]);

    useEffect(() => {
        setPage(0);
    }, [minMax])

    let navigate = useNavigate();

    function onChangeHandler(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        console.log(event.target.value);
        dispatch(SetPackNameAC(event.target.value));
    }

    const debouncedSearchTerm = useDebounce(packName, 500);

    useEffect(
        () => {
            if (debouncedSearchTerm) {
                dispatch(getPacksTC(page));
            }
        },
        [debouncedSearchTerm]
    );

    const columns: GridColDef[] = [

        {
            field: 'name', headerName: 'Name', width: 210,
            renderCell: (params) => {
                const onClick = (e: MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation();
                    navigate(`/profile/card/${params.id}`);
                    // @ts-ignore
                    dispatch(addNamePackAC(params.row.name))
                }
                return <div style={{ cursor: "pointer" }} onClick={onClick}>{params.row.name}</div>
            }
        },
        { field: 'cards', headerName: 'Cards', width: 110 },
        { field: 'lastUpdated', headerName: 'Last Updated', width: 150 },
        {
            field: 'createdBy',
            headerName: 'Created by',
            type: 'string',
            width: 110,
        },
        {
            field: 'actions',
            headerName: 'Actions',

            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 80,
            renderCell: (params) => {
                const onClick = (e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    //*navigate();
                }
                return <Button onClick={onClick}>Learn</Button>
            }
        },
    ];

    const rows = packs.map((p: PackType) => ({ id: p._id, name: p.name, cards: p.cardsCount, lastUpdated: p.updated, createdBy: p.user_name, actions: "" }));

    return (
        <div className={s.Table}>
            <Input
                fullWidth
                id="input-with-icon-adornment"
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
                onChange={onChangeHandler}
            />
            <div style={{ height: 535.5, width: '100%', paddingTop: 10 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[10]}
                    components={{
                        Pagination: CustomPagination
                    }}
                    componentsProps={{
                        pagination: { count: pageCount, page: page, setPage: setPage }
                    }}
                />
            </div>
        </div>
    )
}

type PaginationPropsType = {
    count: number,
    page: number,
    setPage: (value: number) => void
}

function CustomPagination(props: PaginationPropsType) {
    return (
        <Pagination
            count={props.count}
            page={props.page + 1}
            onChange={(event, value) => props.setPage(value - 1)}
        />
    );
}


export default PacksListTable;




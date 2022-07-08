import React, {MouseEvent, MouseEventHandler, useEffect, useState} from 'react'
import s from './Table.module.css';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {Button, Input, InputAdornment, Pagination} from '@mui/material';
import {packsAPI} from '../../api/packs-api';
import SearchIcon from '@mui/icons-material/Search';
import {getPacksTC, PackType} from '../../Redux/ProfileReducer';
import {useAppDispatch, useAppSelector} from '../../Redux/hooks';
import {useNavigate} from 'react-router-dom';
import {addNamePackAC} from "../../Redux/CardsReducer";

const PacksListTable = () => {

    const dispatch = useAppDispatch();
    let [page, setPage] = useState(0);
    let packs = useAppSelector(state => state.profile.packs)
    let totalCount = useAppSelector(state => state.profile.totalCount);
    let pageCount = Math.ceil(totalCount / 8);

    useEffect(() => {
        dispatch(getPacksTC(page + 1))
    }, [page, dispatch])
    let navigate = useNavigate();

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
                return <div style={{cursor: "pointer"}} onClick={onClick}>{params.row.name}</div>
            }
        },
        {field: 'cards', headerName: 'Cards', width: 110},
        {field: 'lastUpdated', headerName: 'Last Updated', width: 150},
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

    const rows = packs.map((p: PackType) => ({
        id: p._id,
        name: p.name,
        cards: p.cardsCount,
        lastUpdated: p.updated,
        createdBy: p.user_name,
        actions: ""
    }));

    return (
        <div className={s.Table}>
            <Input
                fullWidth
                id="input-with-icon-adornment"
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                }
                onChange={() => {
                }}
            />
            <div style={{height: 537, width: '100%', paddingTop: 10}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[10]}
                    components={{
                        Pagination: CustomPagination
                    }}
                    componentsProps={{
                        pagination: {count: pageCount, page: page, setPage: setPage}
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




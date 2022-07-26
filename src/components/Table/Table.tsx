import React, { ChangeEvent, ChangeEventHandler, MouseEvent, MouseEventHandler, useEffect, useState } from 'react'
import s from './Table.module.css';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Input, InputAdornment, Pagination } from '@mui/material';
import { useDispatch } from 'react-redux';
import { packsAPI } from '../../api/packs-api';
import SearchIcon from '@mui/icons-material/Search';
import { addPackTC, deletePackTC, GetPacksAC, getPacksTC, PackType, SetIsMyActiveAC, SetPackNameAC, SetSortPacksAC } from '../../Redux/ProfileReducer';
import useDebounce, { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { useNavigate } from 'react-router-dom';
import { addNamePackAC } from "../../Redux/CardsReducer";
import { PATH } from '../Routes/Routes';
import IconButton from '@mui/material/IconButton';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { ButtonAdd } from './ButtonAdd/ButtonAdd';
import { ButtonDelete } from './ButtonDelete/ButtonDelete';




export const ProfileTable = React.memo(() => {

    const dispatch = useAppDispatch();
    let [page, setPage] = useState(0);

    let packs = useAppSelector(state => state.profile.packs);
    let totalCount = useAppSelector(state => state.profile.totalCount);
    let minMax = useAppSelector(state => state.profile.minMax);
    let packName = useAppSelector(state => state.profile.packName);
    let sortPacks = useAppSelector(state => state.profile.sortPacks);

    let pageCount = Math.ceil(totalCount / 8);

    useEffect(() => {
        dispatch(SetIsMyActiveAC(false));
    }, [])

    useEffect(() => {
        dispatch(getPacksTC(page + 1));
    }, [page, dispatch, minMax, sortPacks]);

    useEffect(() => {
        setPage(0);
    }, [minMax, sortPacks])

    let navigate = useNavigate();

    function onChangeHandler(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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

    function onAddClickHandler() {
        //thunk
        dispatch(addPackTC("New pack"));
    }

    const [isCardsArrowUp, setIsCardsArrowUp] = useState(false);
    const [isNameArrowUp, setIsNameArrowUp] = useState(false);
    const [isDateArrowUp, setIsDateArrowUp] = useState(false);

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
            },
            sortable: false,
            hideSortIcons: true,
            disableColumnMenu: true,
            renderHeader: (params) => {
                return <>
                    {"Name"} <IconButton style={{ float: "right" }}
                        onClick={() => {
                            let num = isNameArrowUp ? 1 : 0;
                            dispatch(SetSortPacksAC(num + "packName"));
                            setIsNameArrowUp(!isNameArrowUp);
                            setIsCardsArrowUp(false);
                            setIsDateArrowUp(false);
                        }}>
                        {isNameArrowUp ? <ArrowUpward /> : <ArrowDownward />}
                    </IconButton>
                </>
            }
        },
        {
            field: 'cards',
            headerName: 'Cards',
            width: 110,
            sortable: false,
            hideSortIcons: true,
            disableColumnMenu: true,
            renderHeader: (params) => {
                return <>
                    {"Cards"} <IconButton style={{ float: "right" }}
                        onClick={() => {
                            let num = isCardsArrowUp ? 1 : 0;
                            dispatch(SetSortPacksAC(num + "cardsCount"));
                            setIsNameArrowUp(false);
                            setIsCardsArrowUp(!isCardsArrowUp);
                            setIsDateArrowUp(false);
                        }}>
                        {isCardsArrowUp ? <ArrowUpward /> : <ArrowDownward />}
                    </IconButton>
                </>
            }
        },
        {
            field: 'lastUpdated', headerName: 'Last Updated', width: 150, sortable: false,
            hideSortIcons: true,
            disableColumnMenu: true,
            renderHeader: (params) => {
                return <>
                    {"Updated"} <IconButton style={{ float: "right" }}
                        onClick={() => {
                            let num = isDateArrowUp ? 1 : 0;
                            dispatch(SetSortPacksAC(num + "updated"));
                            setIsNameArrowUp(false);
                            setIsCardsArrowUp(false);
                            setIsDateArrowUp(!isDateArrowUp);
                        }}>
                        {isDateArrowUp ? <ArrowUpward /> : <ArrowDownward />}
                    </IconButton>
                </>
            }
        },
        {
            field: 'createdBy',
            headerName: 'Created by',
            type: 'string',
            width: 110, sortable: false,
            hideSortIcons: true,
            disableColumnMenu: true,
        },
        {
            field: 'actions',
            headerName: 'Actions',

            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 80,
            hideSortIcons: true,
            disableColumnMenu: true,
            renderCell: (params: any) => {
                const onClick = (e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    navigate(`${PATH.CARD}/${params.row.id}`);
                }

                return <Button onClick={onClick}>Learn</Button>
            }
        }
    ];

    const rows = packs.map((p: PackType) => ({ id: p._id, name: p.name, cards: p.cardsCount, lastUpdated: p.updated, createdBy: p.user_name, actions: "", userId: p.user_id }));

    return (
        <div className={s.Table}>
            <Input
                sx={{ width: "100%", marginRight: "10px" }}
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
});

const PacksListTable = React.memo(() => {

    const dispatch = useAppDispatch();

    let [page, setPage] = useState(0);

    let packs = useAppSelector(state => state.profile.packs);
    let totalCount = useAppSelector(state => state.profile.totalCount);
    let minMax = useAppSelector(state => state.profile.minMax);
    let packName = useAppSelector(state => state.profile.packName);
    let sortPacks = useAppSelector(state => state.profile.sortPacks);
    let currentUserId = useAppSelector(state => state.login._id);

    let pageCount = Math.ceil(totalCount / 8);

    useEffect(() => {
        dispatch(getPacksTC(page + 1));
    }, [page, dispatch, minMax, sortPacks]);

    useEffect(() => {
        setPage(0);
    }, [minMax, sortPacks])

    let navigate = useNavigate();

    function onChangeHandler(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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

    const [isCardsArrowUp, setIsCardsArrowUp] = useState(false);
    const [isNameArrowUp, setIsNameArrowUp] = useState(false);
    const [isDateArrowUp, setIsDateArrowUp] = useState(false);


    const columns: GridColDef[] = [
        {
            field: 'name', headerName: 'Name', width: 175, sortable: false,
            renderCell: (params) => {
                const onClick = (e: MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation();
                    navigate(`/profile/card/${params.id}`);
                    // @ts-ignore
                    dispatch(addNamePackAC(params.row.name))
                }
                return <div style={{ cursor: "pointer" }} onClick={onClick}>{params.row.name}</div>
            },
            hideSortIcons: true,
            disableColumnMenu: true,
            renderHeader: (params) => {
                return <>
                    {"Name"} <IconButton style={{ float: "right" }}
                        onClick={() => {
                            let num = isNameArrowUp ? 1 : 0;
                            dispatch(SetSortPacksAC(num + "packName"));
                            setIsNameArrowUp(!isNameArrowUp);
                            setIsCardsArrowUp(false);
                            setIsDateArrowUp(false);
                        }}>
                        {isNameArrowUp ? <ArrowUpward /> : <ArrowDownward />}
                    </IconButton>
                </>
            }
        },
        {
            field: 'cards', headerName: 'Cards', width: 95, hideSortIcons: true,
            disableColumnMenu: true, sortable: false,
            renderHeader: (params) => {
                return <>
                    {"Cards"} <IconButton style={{ float: "right" }}
                        onClick={() => {
                            let num = isCardsArrowUp ? 1 : 0;
                            dispatch(SetSortPacksAC(num + "cardsCount"));
                            setIsNameArrowUp(false);
                            setIsCardsArrowUp(!isCardsArrowUp);
                            setIsDateArrowUp(false);
                        }}>
                        {isCardsArrowUp ? <ArrowUpward /> : <ArrowDownward />}
                    </IconButton>
                </>
            }
        },
        {
            field: 'lastUpdated', headerName: 'Last Updated', width: 110, hideSortIcons: true,
            disableColumnMenu: true, sortable: false,
            renderHeader: (params) => {
                return <>
                    {"Updated"} <IconButton style={{ float: "right" }}
                        onClick={() => {
                            let num = isDateArrowUp ? 1 : 0;
                            dispatch(SetSortPacksAC(num + "updated"));
                            setIsNameArrowUp(false);
                            setIsCardsArrowUp(false);
                            setIsDateArrowUp(!isDateArrowUp);
                        }}>
                        {isDateArrowUp ? <ArrowUpward /> : <ArrowDownward />}
                    </IconButton>
                </>
            }
        },
        {
            field: 'createdBy',
            headerName: 'Created by',
            type: 'string',
            width: 120,
            hideSortIcons: true,
            disableColumnMenu: true,
            sortable: false
        },
        {
            field: 'actions',
            headerName: 'Actions',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            hideSortIcons: true,
            disableColumnMenu: true,
            renderCell: (params: any) => {
                
                let isVisible = params.row.userId === currentUserId;

                const onLearnClick = (e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    navigate(`${PATH.CARD}/${params.row.id}`);
                }
                const onEditClick = (e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    navigate(`/profile/card/${params.id}`);
                    // @ts-ignore
                    dispatch(addNamePackAC(params.row.name))
                    setPage(0);
                }

                return <>
                    <ButtonDelete isVisible={isVisible} title={params.row.name} id={params.row.id} setPage={() => setPage(0)}/>
                    <button onClick={onEditClick}
                        className={s.Button}
                        style={{ visibility: isVisible ? "visible" : "hidden" }}
                    >Edit</button>
                    <button onClick={onLearnClick} className={s.Button}>Learn</button>
                </>
            }
        }
    ];

    const rows = packs.map((p: PackType) => ({ id: p._id, name: p.name, cards: p.cardsCount, lastUpdated: p.updated, createdBy: p.user_name, actions: "", userId: p.user_id }));

    return (
        <div className={s.Table}>
            <Input
                sx={{ width: "510px", marginRight: "10px" }}
                id="input-with-icon-adornment"
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
                onChange={onChangeHandler}
            />
            <ButtonAdd/>
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
});

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




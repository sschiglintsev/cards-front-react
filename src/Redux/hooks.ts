import { useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch, AppRootStateType } from './Store';


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
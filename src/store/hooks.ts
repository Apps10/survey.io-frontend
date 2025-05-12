import {  useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';

// Hook para despachar acciones con tipado
export const useAppDispatch: () => AppDispatch = useDispatch;

// Hook para seleccionar del estado con tipado
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

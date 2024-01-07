import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { DataHandlerReducersStore } from '../DataHandler/redux/DataHandlerReducersStore'

const combinedReducer = {
    ...DataHandlerReducersStore
}

const store = configureStore({
    reducer: combinedReducer
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;
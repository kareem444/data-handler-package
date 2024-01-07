import { useDispatch } from 'react-redux'
import { RootState, useAppSelector } from '../../../redux/store'
import {
    deleteClientDataAction,
    setClientDataAction
} from '../../redux/client/ClientDataHandlerSlice'

// interface EchoStateOptions {
//     isPersist?: boolean
// }

const useEchoState = <T>(
    key: string,
    initVal?: T,
    // { isPersist }: EchoStateOptions = { isPersist: false }
) => {
    const state: T = useAppSelector(
        (state: RootState) => state.clientDataHandler.data[key]
    )
    const dispatch = useDispatch()

    const setState = (updatedState: ((prevState: T) => T) | Partial<T>) => {
        if (typeof updatedState === 'function') {
            const newState = (updatedState as (prevState: T) => T)(state)
            dispatch(setClientDataAction({ key, data: newState }))
        } else {
            const newState = { ...state, ...(updatedState as Partial<T>) }
            dispatch(setClientDataAction({ key, data: newState }))
        }
    }

    const select = <S>(selector: (state: T) => S) => {
        return selector(state)
    }

    const deleteState = () => {
        dispatch(deleteClientDataAction(key))
    }

    if (initVal && !state) {
        setState(initVal)
    }

    return {
        state,
        setState,
        select,
        deleteState
    }
}

export default useEchoState

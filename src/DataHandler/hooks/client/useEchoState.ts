import { useDispatch } from 'react-redux'
import { RootState, useAppSelector } from '../../../redux/store'
import {
    deleteClientDataAction,
    setClientDataAction
} from '../../redux/client/ClientDataHandlerSlice'

// interface EchoStateOptions {
//     isPersist?: boolean
// }

let storedState: any = undefined

const useEchoState = <T>(
    key: string,
    defaultVal?: T,
    initVal?: T
    // { isPersist }: EchoStateOptions = { isPersist: false }
) => {
    let state: T = useAppSelector(
        (state: RootState) => state.clientDataHandler.data[key]
    )
    const dispatch = useDispatch()

    if (defaultVal && !initVal && !state) {
        storedState = defaultVal
        state = defaultVal
    }

    const setState = (updatedState: ((prevState: T) => T) | Partial<T>) => {
        let newState;
        if (typeof updatedState === 'function') {
            newState = (updatedState as (prevState: T) => T)(state)
        } else {
            newState = updatedState
        }
        storedState = newState
        dispatch(setClientDataAction({ key, data: newState }))
    }

    const appendState = <S>(updatedState: S, overrideIfNotPrevVal: boolean = false) => {
        let newState;
        if (Array.isArray(storedState)) {
            newState = [...storedState, updatedState]
        } else if (storedState instanceof Object) {
            newState = { ...storedState, ...(updatedState as Partial<T>) }
        } else {
            if (overrideIfNotPrevVal) {
                newState = updatedState
            } else {
                return;
            }
        }
        storedState = newState
        dispatch(setClientDataAction({ key, data: newState }))
    }

    const select = <S>(selector: (state: T) => S) => {
        return selector(state)
    }

    const deleteState = () => {
        storedState = undefined
        dispatch(deleteClientDataAction(key))
    }

    if (initVal && !state) {
        state = initVal
        storedState = initVal
        setState(initVal)
    }

    return {
        state,
        setState,
        appendState,
        select,
        deleteState,
    }
}

export default useEchoState

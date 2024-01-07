import { useDispatch } from "react-redux";
import { RootState, useAppSelector } from "../../../redux/store";
import { IServerDataHandlerDataProperties } from "../../redux/server/ServerDataHandlerReduxInterface";
import { deleteServerDataAction, setServerDataAction } from "../../redux/server/ServerDataHandlerSlice";
import { defaultServerDataState } from "../../redux/server/ServerDataHandlerState";

const useAsyncState = <T>(key: string, initVal?: Partial<IServerDataHandlerDataProperties<T>>) => {
    const state: IServerDataHandlerDataProperties<T> | undefined = useAppSelector(
        (state: RootState) => state.serverDataHandler.data[key]
    );

    const dispatch = useDispatch();

    const setState = (
        updatedState: ((
            prevState: IServerDataHandlerDataProperties<T>
        ) => IServerDataHandlerDataProperties<T>)
            | Partial<IServerDataHandlerDataProperties<T>>
    ) => {
        if (typeof updatedState === "function") {
            const newState = (
                updatedState as (
                    prevState: IServerDataHandlerDataProperties<T>
                ) => IServerDataHandlerDataProperties<T>
            )(state);
            dispatch(setServerDataAction({ key, data: newState }));
        } else {
            const newState = { ...state, ...(updatedState as Partial<T>) };
            dispatch(setServerDataAction({ key, data: newState }));
        }
    };

    const deleteState = () => {
        dispatch(deleteServerDataAction(key))
    }

    const stateSelect = (selector: (state: IServerDataHandlerDataProperties<T> | undefined) => any) => {
        return selector(state as IServerDataHandlerDataProperties<T> | undefined);
    }

    const select = (selector: (state: T | undefined) => any) => {
        return selector(state?.data as T | undefined);
    }

    if (initVal && !state) {
        setState({ ...defaultServerDataState, ...initVal });
    }

    return {
        state: state as IServerDataHandlerDataProperties<T> | undefined,
        setState,
        deleteState,
        select,
        stateSelect
    };
};

export default useAsyncState;

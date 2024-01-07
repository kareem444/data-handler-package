import { useDispatch } from "react-redux";
import { deleteClientDataAction } from "../../redux/client/ClientDataHandlerSlice";

const useSetEchoState = (key: string) => {
    const dispatch = useDispatch();

    // const setState = (updatedState: ((prevState: any) => any) | Partial<any>) => {
    //     if (typeof updatedState === "function") {
    //         const newState = (updatedState as (prevState: any) => any)(state);
    //         dispatch(setClientDataAction({ key, data: newState }));
    //     } else {
    //         const newState = { ...state, ...(updatedState as Partial<any>) };
    //         dispatch(setClientDataAction({ key, data: newState }));
    //     }
    // }

    const deleteState = () => {
        dispatch(deleteClientDataAction(key))
    }

    return {
        deleteState
    }
};

export default useSetEchoState;

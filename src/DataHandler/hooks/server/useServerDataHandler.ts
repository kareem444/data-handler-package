import { useEffect, useMemo, useState } from 'react'
import { IServerDataHandlerDataProperties, IServerDataHandlerErrorProperties } from '../../redux/server/ServerDataHandlerReduxInterface'
import useServerDataHandlerReducer from '../../redux/server/userServerDataHandlerReducer'
import { defaultServerDataState } from '../../redux/server/ServerDataHandlerState'
import {
    IFetchDataHandlerParams,
    IMutateHandlerParams,
    IQueryOptionsProperties,
    IServerSetDataActionProperties
} from '../../interface/ServerDataHandlerInterface'
import { fetchDataAsync } from '../../service/ServerDataHandlerService'

const currentFetchingData: string[] = []

const defaultQueryOptions: IQueryOptionsProperties = {
    isEchoState: true,
    isReturnOnlySelectorProperties: true,
    isSelectorMustMatchResponseKeys: false,
    isComputedSelectorMustMatchResponseKey: true,
    isExecuteOnInit: false
}

export default function useDataHandler() {
    const { state, setData, deleteData } = useServerDataHandlerReducer()

    const setStateData = <T>({
        key,
        data
    }: IServerSetDataActionProperties<T>): void => {
        setData({ key, data })
    }

    const getStateData = useMemo((): (<T>(
        key: string
    ) => IServerDataHandlerDataProperties<T>) => {
        return <T>(key: string): IServerDataHandlerDataProperties<T> =>
            state.data[key] || defaultServerDataState
    }, [state.data])

    const handelCurrentKey = (key: string) => {
        if (currentFetchingData.indexOf(key) > -1) {
            currentFetchingData.splice(currentFetchingData.indexOf(key), 1)
        }
    }

    const fetchData = ({
        key,
        queryFn,
        options = defaultQueryOptions
    }: IFetchDataHandlerParams) => {
        const [silentData, setSilentData] = useState<
            IServerDataHandlerDataProperties<any>
        >(defaultServerDataState)

        options = { ...defaultQueryOptions, ...options }

        const query = async (queryParams?: any) => {
            await fetchDataAsync({
                key,
                queryFn,
                options,
                setStateData,
                currentFetchingData,
                setSilentData,
                queryParams
            })
            handelCurrentKey(key)
        }

        if (options?.isExecuteOnInit) {
            useEffect(() => {
                query()
            }, [])
        }

        return {
            query,
            isLoading: options?.isEchoState
                ? state.data[key]?.isLoading
                : silentData.isLoading,
            isError: options?.isEchoState
                ? state.data[key]?.isError
                : silentData.isError,
            error: options?.isEchoState ? state.data[key]?.error : silentData.error,
            data: options?.isEchoState ? state.data[key]?.data : silentData.data
        }
    }

    const mutateData = ({ queryFn, options }: IMutateHandlerParams) => {
        const [res, setRes] = useState(defaultServerDataState)

        const mutate = async (mutateParams?: any) => {
            setRes({ ...defaultServerDataState, isLoading: true })

            try {
                const response = await queryFn(mutateParams)
                setRes(_ => ({ ...defaultServerDataState, data: response }))

                if (options?.onSuccess) {
                    options.onSuccess(response, mutateParams)
                }
            } catch (error) {
                const formattedError = error as IServerDataHandlerErrorProperties
                setRes(_ => ({ ...defaultServerDataState, isError: true, error: formattedError }))
                if (options?.onError) {
                    options.onError(formattedError)
                }
            }

            setRes((prev) => ({ ...prev, isLoading: false }))
        }

        return {
            mutate,
            isLoading: res.isLoading,
            isError: res.isError,
            error: res.error,
            data: res.data
        }
    }

    return {
        data: state.data,
        setStateData,
        getStateData,
        deleteStateData: deleteData,
        fetchData,
        mutateData
    }
}

export const createPromise = async <T>(
    fnToPromise: () => Promise<T>,
    fnToReject: (error: any) => IServerDataHandlerErrorProperties
): Promise<T> => {
    try {
        return await fnToPromise()
    } catch (error) {
        throw fnToReject(error)
    }
}

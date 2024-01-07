import { defaultServerDataState } from '../redux/server/ServerDataHandlerState'
import { IServerDataHandlerDataProperties, IServerDataHandlerErrorProperties } from '../redux/server/ServerDataHandlerReduxInterface'
import { IFetchDataHandlerParams, IQueryOptionsProperties } from '../interface/ServerDataHandlerInterface'

export const fetchDataAsync = async ({
    key,
    queryFn,
    options,
    setStateData,
    currentFetchingData,
    setSilentData,
    queryParams
}: {
    key: string
    queryFn: Pick<IFetchDataHandlerParams, 'queryFn'>['queryFn']
    options?: IQueryOptionsProperties
    setStateData: Function
    currentFetchingData: string[]
    setSilentData: React.Dispatch<React.SetStateAction<IServerDataHandlerDataProperties<any>>>,
    queryParams?: any
}) => {
    if (!currentFetchingData.includes(key)) {
        currentFetchingData.push(key)
        if (options?.isEchoState) {
            setStateData({ key, data: { ...defaultServerDataState, isLoading: true } })
        } else {
            setSilentData({ ...defaultServerDataState, isLoading: true })
        }
        queryFn(queryParams)
            .then(res => {
                let data = res;
                if (options?.selectors) {
                    const selectors = options.selectors
                    data = Object.keys(selectors).reduce((acc, key) => {
                        if (options.isSelectorMustMatchResponseKeys && !(key in res)) {
                            return acc
                        }
                        acc[key] = selectors[key](res)
                        return acc
                    }, options.isReturnOnlySelectorProperties ? {} : data as Record<string, any>)
                }
                if (options?.computedSelectors) {
                    const computedSelectors = options.computedSelectors
                    data = Object.keys(computedSelectors).reduce((acc, key) => {
                        if (options.isComputedSelectorMustMatchResponseKey && !(key in data)) {
                            return acc
                        }
                        acc[key] = computedSelectors[key](data)
                        return acc
                    }, data)
                }
                if (options?.isEchoState) {
                    setStateData({ key, data: { ...defaultServerDataState, data } })
                } else {
                    setSilentData({ ...defaultServerDataState, data })
                }
                if (options?.onSuccess) options.onSuccess(data)
            })
            .catch(error => {
                const formattedError = error as IServerDataHandlerErrorProperties
                const data: IServerDataHandlerDataProperties<any> = {
                    ...defaultServerDataState,
                    error: formattedError,
                    isError: true
                }
                if (options?.isEchoState) {
                    setStateData({ key, data })
                } else {
                    setSilentData(data)
                }
                if (options?.onError) options.onError(data.error)
            })
    }
}

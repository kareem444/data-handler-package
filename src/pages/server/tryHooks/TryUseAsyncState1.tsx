import useAsyncState from '../../../DataHandler/hooks/server/useAsyncState'
import { defaultServerDataState } from '../../../DataHandler/redux/server/ServerDataHandlerState'

const TryUseAsyncState1 = () => {
    const { state, setState, deleteState, select, stateSelect } = useAsyncState<{
        name: string
    }>('kareem', undefined, { data: { name: 'kareem' } })

    const nameWithSelect = select(data => data?.name ?? 'placeholder')
    const nameWithStateSelect = stateSelect(
        data => data?.data?.name ?? 'placeholder'
    )

    return (
        <div>
            <h1>TryUseAsyncState 1</h1>
            <h2>data: {state?.data?.name ?? '-'}</h2>
            <h2>select: {nameWithStateSelect}</h2>
            <h2>state selector: {nameWithSelect}</h2>
            <h2>
                isLoading:{' '}
                {state?.isLoading ? (
                    <span style={{ color: 'blue' }}>Loading</span>
                ) : (
                    '-'
                )}
            </h2>
            <h2>
                error:{' '}
                {<span style={{ color: 'red' }}>{state?.error?.message}</span> ?? '-'}
            </h2>
            <h2>
                isError:{' '}
                {state?.isError ? <span style={{ color: 'red' }}>Error</span> : '-'}
            </h2>
            <button
                onClick={() =>
                    setState({
                        ...defaultServerDataState,
                        data: { name: 'try async state page 1' }
                    })
                }
            >
                Set data
            </button>
            <button
                onClick={() => setState({ ...defaultServerDataState, isLoading: true })}
            >
                Set loading
            </button>
            <button
                onClick={() =>
                    setState({
                        ...defaultServerDataState,
                        isError: true,
                        error: { message: 'error message' }
                    })
                }
            >
                Set error
            </button>
            <button onClick={() => deleteState()}>Delete State</button>
        </div>
    )
}

export default TryUseAsyncState1

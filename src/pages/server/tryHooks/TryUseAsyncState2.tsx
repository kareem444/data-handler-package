import useAsyncState from '../../../DataHandler/hooks/server/useAsyncState'
import { defaultServerDataState } from '../../../DataHandler/redux/server/ServerDataHandlerState'

const TryUseAsyncState2 = () => {
    const { state, setState, deleteState } = useAsyncState<{ name: string }>(
        'kareem'
    )

    return (
        <div>
            <h1>TryUseAsyncState 2</h1>
            <h2>data: {state?.data?.name ?? '-'}</h2>
            <h2>
                isLoading:{' '}
                {state?.isLoading ? <span style={{ color: 'blue' }}>Loading</span> : '-'}
            </h2>
            <h2>
                error: {<span style={{ color: 'red' }}>{state?.error?.message}</span> ?? '-'}
            </h2>
            <h2>
                isError:{' '}
                {state?.isError ? <span style={{ color: 'red' }}>Error</span> : '-'}
            </h2>
            <button
                onClick={() =>
                    setState({
                        ...defaultServerDataState,
                        data: { name: 'try use async state page 2' }
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
        </div >
    )
}

export default TryUseAsyncState2

import { AsyncHelper } from '../../DataHandler/helper/ServerDataHandlerHelper'
import useFetch from '../../DataHandler/hooks/server/useFetch'

const TryUseFetch2 = () => {
    const { query, data, isLoading, isError, error } = useFetch<{
        name: string
        age: number
    }>({
        key: 'user',
        queryFn() {
            return AsyncHelper.createPromise(
                () => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            resolve({
                                name: 'jimmy',
                                age: 18
                            })
                        }, 1000)
                    })
                },
                () => {
                    throw {
                        message: 'error from server',
                        status: 404,
                        code: 404
                    }
                }
            )
        },
        options: {
            echoState: 'data'
        }
    })

    return (
        <div>
            <h1>TryUseFetch 2</h1>
            {isLoading && <div>loading...</div>}
            {isError && <div>{error?.message}</div>}
            <div>{data?.name}</div>
            <button onClick={() => query()}>query</button>
        </div>
    )
}

export default TryUseFetch2

import axios from 'axios'
import useMutate from '../../DataHandler/hooks/server/useMutate'
import { AsyncHelper } from '../../DataHandler/helper/ServerDataHandlerHelper'

const TryUseMutate = () => {
    const { mutate, data, error, isLoading, isError } = useMutate({
        queryFn(param) {
            return AsyncHelper.createPromise(
                async () => {
                    const res = await axios.get(param)
                    return res.data
                },
                () => {
                    throw { message: 'error' }
                }
            )
        }
    })

    return (
        <div>
            <h1>TryUseMutate</h1>
            {isError && <div>{error?.message}</div>}
            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                <div>
                    {data?.map((item: any) => (
                        <div key={item.id}>{item.title}</div>
                    ))}
                </div>
            )}
            <button
                onClick={() => mutate('https://jsonplaceholder.typicode.com/posts')}
            >
                Fetch
            </button>
        </div>
    )
}

export default TryUseMutate

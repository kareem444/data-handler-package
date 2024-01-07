import axios from 'axios'
import useDataHandler, {
    createPromise
} from '../../DataHandler/hooks/server/useServerDataHandler'

const User = () => {
    const {
        data,
        setStateData,
        getStateData,
        deleteStateData,
        fetchData,
        mutateData
    } = useDataHandler()

    const {
        data: user,
        isLoading,
        error,
        isError
    } = getStateData<{ id: string }>('user')

    const kareem = async (id: string = '1') => {
        return await createPromise<any>(
            async () => {
                const res = await axios.get(
                    'https://jsonplaceholder.typicode.com/users/' + id
                )
                return res.data
            },
            error => {
                throw {
                    message: 'error from server',
                    status: 404,
                    code: 404
                }
            }
        )
    }

    const { query } = fetchData({
        key: 'user',
        queryFn: kareem,
        options: {
            isExecuteOnInit: true,
        }
    })

    // const { mutate,
    //     isLoading,
    //     isError,
    //     error,
    //     data: user
    // } = mutateData({
    //     queryFn(param) {
    //         return new Promise((resolve, reject) => {
    //             setTimeout(() => {
    //                 resolve(param)
    //                 // reject({
    //                 //     message: 'error from server',
    //                 //     status: 404,
    //                 //     code: 404
    //                 // })
    //             }, 2000)
    //         })
    //     },
    //     options: {
    //         onError(formattedError) {
    //             console.log('formattedError', formattedError);
    //         },
    //         onSuccess(data, params) {
    //             console.log('data', data, 'params', params);
    //         }
    //     }
    // })

    return (
        <div>
            <h1>User</h1>

            {isLoading ? (
                <h1>loading</h1>
            ) : (
                <p>
                    Here is the data: {user?.id || '-'} : {data.home?.data?.id || '-'}
                </p>
            )}

            <button
                onClick={() =>
                    setStateData<{ id: string }>({
                        key: 'user',
                        data: { data: { id: 'kareem from user' } }
                    })
                }
            >
                set user
            </button>
            <button onClick={() => deleteStateData('user')}>delete user</button>
            <button onClick={() => query('1')}>fetch user</button>
            {/* {
                isLoading ?
                    <h1>loading</h1>
                    :
                    isError ?
                        <h1>{error?.message}</h1>
                        :
                        <p>
                            Here is the data: {user?.id || '-'}
                        </p>
            }
            <button onClick={() => mutate({ id: 'name' })}>mutate</button> */}
        </div>
    )
}

export default User

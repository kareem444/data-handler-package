import axios from 'axios'
import useDataHandler from '../../DataHandler/hooks/server/useServerDataHandler'

const Home = () => {
    const {
        data,
        setStateData,
        getStateData,
        deleteStateData,
        fetchData,
    } = useDataHandler()

    const { data: home, isLoading, isError, error } = getStateData<any>('home')

    const { query: queryWithSuccess } = fetchData({
        key: 'home',
        queryFn: async ({ id }: { id: string } = { id: 'kareem' }) => {
            const res = await axios.get('https://jsonplaceholder.typicode.com/users/1')
            return res.data
        },
        options: {
            onSuccess(data) {
                console.log('onSuccess home', data)
            },
            onError(_, formattedError) {
                console.log('onError', formattedError)
            },
            selectors: {
                id: (data) => data.id,
                name: (data) => data.name,
                mobile: (data) => data.email,
                one: (data) => 1,
                two: (data) => 2,
            },
            computedSelectors: {
                kareem: (data) => data.mobile + " kareem",
                age: (data) => data.one + data.two,
            },
            isReturnOnlySelectorProperties: true,
            isSelectorMustMatchResponseKeys: false,
            isComputedSelectorMustMatchResponseKey: false,
            isExecuteOnInit: true,
            isEchoState: true,
        }
    })

    const { query: queryWithError } = fetchData({
        key: 'home',
        queryFn: async () => {
            const res = await axios.get('https://jsonplaceholder.typicode.com/users/a')
            return res.data
        },
    })

    // fetchData({
    //     key: 'user',
    //     queryFn: async () => {
    //         const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
    //         return res.json()
    //     },
    //     options:{
    //         isExecuteOnInit: true,
    //     }
    // })

    return (
        <div>
            <h1>Home</h1>

            {isError ? (
                <>
                    <div><b>error message:</b> {error?.message}</div>
                    <div><b>error code:</b> {error?.code}</div>
                    <div><b>error status:</b> {error?.status}</div>
                </>
            ) : isLoading ? (
                <h1>loading</h1>
            ) : (
                <>
                    <p>
                        Here is the data: {data.user?.data?.id || '-'} : {home?.id || '-'} :{home?.age}
                    </p>
                </>
            )}
            <button
                onClick={() =>
                    setStateData({
                        key: 'home',
                        data: { data: { id: 'kareem from home' } }
                    })
                }
            >
                set home
            </button>
            <button onClick={() => deleteStateData('home')}>delete home</button>
            <button onClick={() => queryWithSuccess({ id: 'name' })}>success fetch</button>
            <button onClick={() => queryWithError()}>error fetch</button>
        </div>
    )
}

export default Home

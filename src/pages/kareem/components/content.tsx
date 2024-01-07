import useEchoState from '../../../DataHandler/hooks/client/useEchoState'

const Content = () => {
    const { state, setState } = useEchoState<{
        id: string
        name: string
    }>('content')

    console.log('====================================')
    console.log('content state', state)
    console.log('====================================')

    return (
        <div>
            <h3>Content</h3>
            <button
                onClick={() =>
                    setState(prev => {
                        return { ...prev, name: 'Kareem' }
                    })
                }
            >
                set kareem
            </button>
            <button
                onClick={() => setState({ ...state, name: 'Mohamed' })}
            >
                set mohamed
            </button>
        </div>
    )
}

export default Content

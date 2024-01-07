import useEchoState from "../../../DataHandler/hooks/client/useEchoState";

const Header = () => {
    const { state, setState, select, deleteState } = useEchoState<{ id: string, name: string }>('header');

    console.log('====================================')
    console.log('header state', state, select((state) => state?.name))
    console.log('====================================')

    return (
        <div>
            <h3>Header</h3>
            <button onClick={() => setState({ ...state, name: 'Kareem' })}>set header</button>
            <button onClick={() => deleteState()}>delete</button>
        </div>
    )
};

export default Header;

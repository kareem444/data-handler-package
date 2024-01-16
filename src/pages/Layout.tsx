import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <nav style={{ display: 'flex', gap: '100px' }}>
                <ul>
                    <li>
                        <Link to="/tryUseAsyncState1">Try use async state 1</Link>
                    </li>
                    <li>
                        <Link to="/tryUseAsyncState2">Try use async state 2</Link>
                    </li>
                    <li>
                        <Link to="/tryUseFetch1">Try use fetch 1</Link>
                    </li>
                    <li>
                        <Link to="/tryUseFetch2">Try use fetch 2</Link>
                    </li>
                    <li>
                        <Link to="/tryUseMutate">Try use mutate</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/kareem">Kareem</Link>
                    </li>
                    <li>
                        <Link to="/blog">Client Blog</Link>
                    </li>
                    <li>
                        <Link to="/pos">Client  Post</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/pouch">Pouch</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
};

export default Layout;

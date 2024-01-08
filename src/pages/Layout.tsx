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
                </ul>
                <ul>
                    <li>
                        <Link to="/">Server Home</Link>
                    </li>
                    <li>
                        <Link to="/user">Server User</Link>
                    </li>
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
            </nav>
            <Outlet />
        </div>
    )
};

export default Layout;

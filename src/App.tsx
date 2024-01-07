import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("./pages/server/Home"));
const User = lazy(() => import("./pages/server/User"));
const Layout = lazy(() => import("./pages/Layout"));
const Kareem = lazy(() => import("./pages/kareem/Kareem"));
const Blog = lazy(() => import("./pages/client/Blog"));
const Post = lazy(() => import("./pages/client/Post"));
const TryUseAsyncState1 = lazy(() => import("./pages/server/tryHooks/TryUseAsyncState1"));
const TryUseAsyncState2 = lazy(() => import("./pages/server/tryHooks/TryUseAsyncState2"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='user' element={<User />} />
            <Route path='kareem' element={<Kareem />} />
            <Route path='blog' element={<Blog />} />
            <Route path='pos' element={<Post />} />
            <Route path='tryUseAsyncState1' element={<TryUseAsyncState1 />} />
            <Route path='tryUseAsyncState2' element={<TryUseAsyncState2 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

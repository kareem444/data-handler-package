import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import TryUseFetch1 from "./pages/server/TryUseFetch1";
import TryUseFetch2 from "./pages/server/TryUseFetch2";
import TryUseMutate from "./pages/server/TryUseMutate";
import PouchPage from "./pages/pouch/PouchPage";

const Layout = lazy(() => import("./pages/Layout"));
const Kareem = lazy(() => import("./pages/kareem/Kareem"));
const Blog = lazy(() => import("./pages/client/Blog"));
const Post = lazy(() => import("./pages/client/Post"));
const TryUseAsyncState1 = lazy(() => import("./pages/server/TryUseAsyncState1"));
const TryUseAsyncState2 = lazy(() => import("./pages/server/TryUseAsyncState2"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path='kareem' element={<Kareem />} />
            <Route path='blog' element={<Blog />} />
            <Route path='pos' element={<Post />} />
            <Route path='tryUseAsyncState1' element={<TryUseAsyncState1 />} />
            <Route path='tryUseAsyncState2' element={<TryUseAsyncState2 />} />
            <Route path='tryUseFetch1' element={<TryUseFetch1 />} />
            <Route path='tryUseFetch2' element={<TryUseFetch2 />} />
            <Route path='tryUseMutate' element={<TryUseMutate />} />
            <Route path='pouch' element={<PouchPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

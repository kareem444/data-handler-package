import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import { Suspense } from 'react'
import { LocalDB } from './LocalDB/LocalDB.ts'

export const kareemDB = new LocalDB('kareemDB', ['users'])

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Suspense fallback={<div></div>}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>
  // </React.StrictMode>,
)

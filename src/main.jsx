import React from 'react'
import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App'
import './index.css'
import { Authenticator } from '@aws-amplify/ui-react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Authenticator.Provider>
    <React.StrictMode>
      <Provider store={store}>
        <HashRouter>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </HashRouter>
      </Provider>
    </React.StrictMode>
  </Authenticator.Provider>
)

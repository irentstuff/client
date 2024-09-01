import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './App'
import './index.css'
import { Authenticator } from '@aws-amplify/ui-react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Authenticator.Provider>
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </Authenticator.Provider>
)

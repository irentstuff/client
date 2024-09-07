/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { ProtectedRoutes } from './components/ProtectedRoutes'
/* --------------------------------- REDUCER -------------------------------- */
import { useDispatch, useSelector } from 'react-redux'
import { updateError, updateSuccess, updateAllItems, updateAllItemCategories, updateAllUsers, updateCurrentUser } from './redux/reducer'
/* ---------------------------- API AND CONSTANTS --------------------------- */
import { apiType, apiLabels } from './services/config'
import { getAllItems, getAllItemCategories, getAllUsers } from './services/api'
/* -------------------------- PAGES AND COMPONENTS -------------------------- */
import { NoFoundPage } from './pages/NoFoundPage'
import { UnauthorisedPage } from './pages/UnauthorisedPage'
import { PageLayout } from './pages/PageLayout/PageLayout'
import { HomePage } from './pages/HomePage'
import { AddItem } from './pages/ItemManagement/AddItem'
import { ViewItem } from './pages/ItemManagement/ViewItem'
import { Login } from './pages/UserManagement/Login'
// import { Register } from './pages/UserManagement/RegisterWithAPI'

function App() {
  const dispatch = useDispatch()
  const { user } = useAuthenticator((context) => [context.user])
  const currentUser = useSelector((state) => state.iRentStuff.currentUser)

  console.log('CURRENTUSER', currentUser)

  /* ----------------- function to call get api and set redux ----------------- */
  const fetchDataAndSetGlobalState = async ({ item, apiService, updateGlobalState }) => {
    try {
      const response = await apiService()
      console.log(item, response)
      if (response.status === 200) {
        dispatch(
          updateGlobalState({
            data: response.data,
            type: apiType.initiate
          })
        )
      } else {
        dispatch(
          updateError({
            status: true,
            msg: response.statusText
          })
        )
      }
    } catch (error) {
      dispatch(
        updateError({
          status: true,
          msg: `${error.message}`
        })
      )
    }
  }

  const getAccessTokenFromLocalStorage = () => {
    // Get all keys from local storage
    const allKeys = Object.keys(localStorage)

    // Find the key that contains 'accessToken'
    const accessTokenKey = allKeys.find((key) => key.endsWith('.accessToken'))

    if (accessTokenKey) {
      // Retrieve the token value
      const token = localStorage.getItem(accessTokenKey)
      // console.log('Access Token:', token)
      return token
    } else {
      // console.error('Access token not found in local storage')
      return null
    }
  }

  useEffect(() => {
    // all items
    fetchDataAndSetGlobalState({
      item: apiLabels.allItems,
      apiService: getAllItems,
      updateGlobalState: updateAllItems
    })
    // all item categories
    fetchDataAndSetGlobalState({
      item: apiLabels.allItemsCategories,
      apiService: getAllItemCategories,
      updateGlobalState: updateAllItemCategories
    })
    // // all users
    // fetchDataAndSetGlobalState({
    //   item: apiLabels.allUsers,
    //   apiService: getAllUsers,
    //   updateGlobalState: updateAllUsers
    // })
  }, [])

  useEffect(() => {
    console.log(user)

    if (user != undefined) {
      // Function to get the access token from local storage and set state
      const token = getAccessTokenFromLocalStorage()
      dispatch(
        updateCurrentUser({
          data: { authenticated: true, userDetails: user, token: token }
        })
      )
    }
  }, [user])

  return (
    <Routes>
      <Route path='/' element={<PageLayout />}>
        <Route element={<ProtectedRoutes authenticated={currentUser.authenticated} />}>
          <Route path='MyItems' element={<HomePage myItems={true} />} />
          <Route path='ViewItem' element={<ViewItem />} />
          <Route path='MyItems/ViewItem' element={<ViewItem />} />
          <Route path='AddItem' element={<AddItem />} />
        </Route>
        <Route path='/' element={<HomePage myItems={false} />} />
        <Route path='Login' element={<Login />} />
        {/* <Route path='Register' element={<Register />} /> */}
        <Route path='*' element={<NoFoundPage />} />
        <Route path='unauthorised' element={<UnauthorisedPage />} />
      </Route>
    </Routes>
  )
}

export default App

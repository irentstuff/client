/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useAuthenticator } from '@aws-amplify/ui-react'
/* --------------------------------- REDUCER -------------------------------- */
import { useDispatch, useSelector } from 'react-redux'
import {
  updateError,
  updateAllItems,
  updateAllItemCategories,
  updateAllItemsCreatedByCurrentUser,
  updateAllRentalOffersMadeByCurrentUser,
  updateAllPurchaseOffersMadeByCurrentUser,
  updateAllRentalOffersReceivedByCurrentUser,
  updateAllPurchaseOffersReceivedByCurrentUser,
  updateCurrentUser
} from './redux/reducer'
/* ---------------------------- API AND CONSTANTS --------------------------- */
import { apiType, apiLabels } from './services/config'
import { getAllItems, getAllItemCategories, getItemsByQueryParam, getRentalDetailsForUser, getPurchaseDetailsForUser } from './services/api'
/* -------------------------- PAGES AND COMPONENTS -------------------------- */
import { ProtectedRoutes } from './components/ProtectedRoutes'
import { NoFoundPage } from './pages/NoFoundPage'
import { UnauthorisedPage } from './pages/UnauthorisedPage'
import { PageLayout } from './pages/PageLayout/PageLayout'
import { HomePage } from './pages/HomePage'
import { AddItem } from './pages/ItemManagement/AddItem'
import { ViewItem } from './pages/ItemManagement/ViewItem'
import { Login } from './pages/UserManagement/Login'
import { OfferMade } from './pages/TransactionManagement/OfferMade'
import { OfferReceived } from './pages/TransactionManagement/OfferReceived'

// import { Register } from './pages/UserManagement/RegisterWithAPI'

function App() {
  const dispatch = useDispatch()
  const { user } = useAuthenticator((context) => [context.user])
  const currentUser = useSelector((state) => state.iRentStuff.currentUser)
  const [fetchDataAgain, setFetchDataAgain] = useState(false)
  const [fetchTransactionDataAgain, setFetchTransactionDataAgain] = useState(false)

  console.log('CURRENTUSER', currentUser)

  /* ----------------- function to call get api and set redux ----------------- */
  const fetchDataAndSetGlobalState = async ({ item, apiService, updateGlobalState, queryParam }) => {
    try {
      const response = await apiService(queryParam)
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
    const idTokenKey = allKeys.find((key) => key.endsWith('.idToken'))

    if (idTokenKey) {
      // Retrieve the token value
      const token = localStorage.getItem(idTokenKey)
      // console.log('Access Token:', token)
      return token
    }
    // console.error('Access token not found in local storage')
    return null
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
    if (user !== undefined) {
      // Function to get the access token from local storage and set state
      const token = getAccessTokenFromLocalStorage()
      dispatch(
        updateCurrentUser({
          data: { authenticated: true, userDetails: user, token }
        })
      )
    }
  }, [user])

  useEffect(() => {
    if (currentUser.authenticated || fetchDataAgain) {
      // all items created by current user
      fetchDataAndSetGlobalState({
        item: apiLabels.allItemsCreatedByCurrentUser,
        apiService: getItemsByQueryParam,
        updateGlobalState: updateAllItemsCreatedByCurrentUser,
        queryParam: `owner=me&valid=0`
      })
    }

    if (fetchDataAgain) {
      fetchDataAndSetGlobalState({
        item: apiLabels.allItems,
        apiService: getAllItems,
        updateGlobalState: updateAllItems
      })
      setFetchDataAgain(false)
    }
  }, [currentUser, fetchDataAgain])

  useEffect(() => {
    if (currentUser.authenticated || fetchTransactionDataAgain) {
      //offer made by user
      fetchDataAndSetGlobalState({
        item: apiLabels.allRentalOffersMadeByCurrentUser,
        apiService: getRentalDetailsForUser,
        updateGlobalState: updateAllRentalOffersMadeByCurrentUser,
        queryParam: `as=renter`
      })
      fetchDataAndSetGlobalState({
        item: apiLabels.allPurchaseOffersMadeByCurrentUser,
        apiService: getPurchaseDetailsForUser,
        updateGlobalState: updateAllPurchaseOffersMadeByCurrentUser,
        queryParam: `as=buyer`
      })

      //offer received by user
      fetchDataAndSetGlobalState({
        item: apiLabels.allRentalOffersReceivedByCurrentUser,
        apiService: getRentalDetailsForUser,
        updateGlobalState: updateAllRentalOffersReceivedByCurrentUser,
        queryParam: `as=owner`
      })
      fetchDataAndSetGlobalState({
        item: apiLabels.allPurchaseOffersReceivedByCurrentUser,
        apiService: getPurchaseDetailsForUser,
        updateGlobalState: updateAllPurchaseOffersReceivedByCurrentUser,
        queryParam: `as=owner`
      })

      setFetchTransactionDataAgain(false)
    }
  }, [currentUser, fetchTransactionDataAgain])

  return (
    <Routes>
      <Route path='/' element={<PageLayout />}>
        <Route path='/' element={<HomePage myItems={false} />} />

        <Route element={<ProtectedRoutes />}>
          <Route path='MyItems' element={<HomePage myItems={true} setFetchDataAgain={setFetchDataAgain} />} />
          <Route path='ViewItem' element={<ViewItem />} />
          <Route path='ViewItem/:itemId' element={<ViewItem />} />
          <Route path='MyItems/ViewItem' element={<ViewItem setFetchDataAgain={setFetchDataAgain} />} />
          <Route path='AddItem' element={<AddItem setFetchDataAgain={setFetchDataAgain} />} />
          <Route path='OffersMade' element={<OfferMade setFetchDataAgain={setFetchTransactionDataAgain} />} />
          <Route path='OffersReceived' element={<OfferReceived setFetchDataAgain={setFetchTransactionDataAgain} />} />
        </Route>
        <Route path='Login' element={<Login />} />
        {/* <Route path='Register' element={<Register />} /> */}
        <Route path='*' element={<NoFoundPage />} />
        <Route path='unauthorised' element={<UnauthorisedPage />} />
      </Route>
    </Routes>
  )
}

export default App

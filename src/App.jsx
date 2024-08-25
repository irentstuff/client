import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
/* --------------------------------- REDUCER -------------------------------- */
import { useDispatch, useSelector } from 'react-redux'
import { updateError, updateSuccess } from './redux/reducer'
/* -------------------------- PAGES AND COMPONENTS -------------------------- */
import PageLayout from './pages/PageLayout/PageLayout'
import HomePage from './pages/HomePage'

function App() {
  const dispatch = useDispatch()

  /* ----------------- function to call get api and set redux ----------------- */
  // const fetchDataAndSetGlobalState = async ({ item, apiService, updateGlobalState }) => {
  //   try {
  //     const response = await apiService()
  //     if (response.status === 200) {
  //       dispatch(
  //         updateGlobalState({
  //           data: response.data,
  //           type: apiType.initiate
  //         })
  //       )
  //     } else {
  //       dispatch(
  //         updateError({
  //           status: true,
  //           msg: response.statusText
  //         })
  //       )
  //     }
  //   } catch (error) {
  //     dispatch(
  //       updateError({
  //         status: true,
  //         msg: `${error.message}`
  //       })
  //     )
  //   }
  // }

  // useEffect(() => {
  //   // active training records
  //   fetchDataAndSetGlobalState({
  //     item: getApiLabels.activeTrainingDetailsForCurrentUser,
  //     apiService: getAllActiveTrainingDetailsForCurrentUser,
  //     updateGlobalState: updateActiveTrainingDetailsForCurrentUser
  //   })
  // }, [])

  return (
    <Routes>
      <Route path='/' element={<PageLayout />}>
        <Route path='/' element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default App

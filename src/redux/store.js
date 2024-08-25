import { configureStore } from '@reduxjs/toolkit'
import iRentStuffSlice from './reducer'

export default configureStore({
  reducer: { iRentStuff: iRentStuffSlice }
})

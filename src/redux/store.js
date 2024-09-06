import { configureStore } from '@reduxjs/toolkit'
import iRentStuffSlice from './reducer'

export const store = configureStore({
  reducer: { iRentStuff: iRentStuffSlice }
})

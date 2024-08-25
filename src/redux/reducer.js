import { createSlice } from '@reduxjs/toolkit'

export const iRentStuffSlice = createSlice({
  name: 'iRentStuff',
  initialState: {
    value: ''
  },
  reducers: {
    defaultTest: (state, action) => {
      state.value = 'test'
    }
  }
})

// Action creators are generated for each case reducer function
export const { defaultTest } = iRentStuffSlice.actions

export default iRentStuffSlice.reducer

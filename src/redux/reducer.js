import { createSlice } from '@reduxjs/toolkit'

export const iRentStuffSlice = createSlice({
  name: 'iRentStuff',
  initialState: {
    //NOTIFICATION
    showSuccess: { status: false, msg: '' },
    showError: { status: false, msg: '' }
  },
  reducers: {
    //NOTIFICATION
    updateSuccess: (state, action) => {
      state.showSuccess.status = action.payload.status
      state.showSuccess.msg = action.payload.msg
    },
    updateError: (state, action) => {
      state.showError.status = action.payload.status
      state.showError.msg = action.payload.msg
    }
  }
})

// Action creators are generated for each case reducer function
export const { defaultTest } = iRentStuffSlice.actions

export default iRentStuffSlice.reducer

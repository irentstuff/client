import { createSlice } from '@reduxjs/toolkit'

export const iRentStuffSlice = createSlice({
  name: 'iRentStuff',
  initialState: {
    //NOTIFICATION
    showSuccess: { status: false, msg: '' },
    showError: { status: false, msg: '' },
    //AUTH
    allUsers: [],
    currentUser: { authenticated: true, userDetails: {} },
    //ITEMS
    allItems: []
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
    },
    //AUTH
    updateAllUsers: (state, action) => {
      state.allUsers = action.payload.data
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload.data
    },
    //ITEMS
    updateAllItems: (state, action) => {
      state.allItems = action.payload.data.results
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateSuccess, updateError, updateAllUsers, updateCurrentUser, updateAllItems } = iRentStuffSlice.actions

export default iRentStuffSlice.reducer

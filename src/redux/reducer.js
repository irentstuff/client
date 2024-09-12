import { createSlice } from '@reduxjs/toolkit'

export const iRentStuffSlice = createSlice({
  name: 'iRentStuff',
  initialState: {
    //NOTIFICATION
    showSuccess: { status: false, msg: '' },
    showError: { status: false, msg: '' },
    //AUTH
    allUsers: [],
    currentUser: { authenticated: false, userDetails: {}, token: '' },
    //ITEMS
    allItems: [],
    allItemCategories: [],
    allItemsCreatedByCurrentUser: []
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
      // console.log(action.payload.data)
      state.currentUser = action.payload.data
    },
    //ITEMS
    updateAllItems: (state, action) => {
      state.allItems = action.payload.data
    },
    updateAllItemCategories: (state, action) => {
      const allItemCategories = action.payload.data
      allItemCategories.map((cat) => {
        ;(cat.value = cat.id), (cat.label = cat.name)
      })
      state.allItemCategories = allItemCategories
    },
    updateAllItemsCreatedByCurrentUser: (state, action) => {
      state.allItemsCreatedByCurrentUser = action.payload.data
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  updateSuccess,
  updateError,
  updateAllUsers,
  updateCurrentUser,
  updateAllItems,
  updateAllItemCategories,
  updateAllItemsCreatedByCurrentUser
} = iRentStuffSlice.actions

export default iRentStuffSlice.reducer

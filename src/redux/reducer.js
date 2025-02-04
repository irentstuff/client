/* eslint-disable */
import { createSlice, current } from '@reduxjs/toolkit'

export const iRentStuffSlice = createSlice({
  name: 'iRentStuff',
  initialState: {
    //REFRESH
    refreshReviews: true,
    getImageAgain: true,
    //NOTIFICATION
    showSuccess: { status: false, msg: '' },
    showError: { status: false, msg: '' },
    //AUTH
    allUsers: [],
    currentUser: { authenticated: false, userDetails: {}, token: '' },
    //ITEMS
    allItems: [],
    allItemsImagePath: {},
    allItemsMap: {},
    allItemCategories: [],
    allItemsCreatedByCurrentUser: [],
    //OFFERS MADE
    allRentalOffersMadeByCurrentUser: [],
    allPurchaseOffersMadeByCurrentUser: [],
    //OFFERS RECEIVED
    allRentalOffersReceivedByCurrentUser: [],
    allPurchaseOffersReceivedByCurrentUser: []
  },
  reducers: {
    //REFRESH
    updateRefreshReviews: (state, action) => {
      state.refreshReviews = action.payload.data
      console.log('review-reducer', action.payload.data)
    },
    updateFetchImageAgain: (state, action) => {
      state.getImageAgain = action.payload.data
    },
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
      const allItems = action.payload.data
      state.allItems = allItems.filter((item) => item.deleted_date == null)

      const itemMap = allItems.reduce((map, item) => {
        map[item.id] = item
        return map
      }, {})

      state.allItemsMap = itemMap
    },
    updateItemById: (state, action) => {
      const newItem = action.payload.data
      const allItems = current(state.allItems)
      const allItemsMap = current(state.allItemsMap)

      const updatedAllItems = allItems.map((item) => (item.id === newItem.id ? newItem : item))
      const updatedAllItemMap = {
        ...allItemsMap,
        [newItem.id]: newItem // Replace the value for the specified key
      }

      state.allItems = updatedAllItems
      state.allItemsMap = updatedAllItemMap
    },

    updateAllItemsImagePath: (state, action) => {
      const allItemsImagePath = action.payload.data
      state.allItemsImagePath = allItemsImagePath
    },
    updateAllItemCategories: (state, action) => {
      const allItemCategories = action.payload.data
      allItemCategories.map((cat) => {
        ;(cat.value = cat.id.toString()), (cat.label = cat.name)
      })
      state.allItemCategories = allItemCategories
    },
    updateAllItemsCreatedByCurrentUser: (state, action) => {
      state.allItemsCreatedByCurrentUser = action.payload.data
    },
    //OFFER MADE
    updateAllRentalOffersMadeByCurrentUser: (state, action) => {
      const allOffersMade = action.payload.data
      const allItemsMap = current(state.allItemsMap)

      const combinedList = allOffersMade
        .filter((offer) => allItemsMap[offer.item_id]) // Keep only offers with valid item_ids
        .map((offer) => ({
          ...offer,
          itemDetails: { ...allItemsMap[offer.item_id] }
        }))

      state.allRentalOffersMadeByCurrentUser = combinedList
    },
    updateAllPurchaseOffersMadeByCurrentUser: (state, action) => {
      const allOffersMade = action.payload.data
      const allItemsMap = current(state.allItemsMap)

      const combinedList = allOffersMade
        .filter((offer) => allItemsMap[offer.item_id]) // Keep only offers with valid item_ids
        .map((offer) => ({
          ...offer,
          itemDetails: { ...allItemsMap[offer.item_id] }
        }))

      state.allPurchaseOffersMadeByCurrentUser = combinedList
    },
    //OFFERS RECEIVED
    updateAllRentalOffersReceivedByCurrentUser: (state, action) => {
      const allOffersMade = action.payload.data
      const allItemsMap = current(state.allItemsMap)

      const combinedList = allOffersMade
        .filter((offer) => allItemsMap[offer.item_id]) // Keep only offers with valid item_ids
        .map((offer) => ({
          ...offer,
          itemDetails: { ...allItemsMap[offer.item_id] }
        }))

      state.allRentalOffersReceivedByCurrentUser = combinedList
    },
    updateAllPurchaseOffersReceivedByCurrentUser: (state, action) => {
      const allOffersMade = action.payload.data
      const allItemsMap = current(state.allItemsMap)

      const combinedList = allOffersMade
        .filter((offer) => allItemsMap[offer.item_id]) // Keep only offers with valid item_ids
        .map((offer) => ({
          ...offer,
          itemDetails: { ...allItemsMap[offer.item_id] }
        }))

      state.allPurchaseOffersReceivedByCurrentUser = combinedList
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  updateRefreshReviews,
  updateFetchImageAgain,
  updateSuccess,
  updateError,
  updateAllUsers,
  updateCurrentUser,
  updateAllItems,
  updateItemById,
  updateAllItemsImagePath,
  updateAllItemCategories,
  updateAllItemsCreatedByCurrentUser,
  updateAllRentalOffersMadeByCurrentUser,
  updateAllPurchaseOffersMadeByCurrentUser,
  updateAllRentalOffersReceivedByCurrentUser,
  updateAllPurchaseOffersReceivedByCurrentUser
} = iRentStuffSlice.actions

export default iRentStuffSlice.reducer

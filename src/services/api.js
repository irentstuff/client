import axios from 'axios'
import { assetsURL, itemsURL, reviewsURL, usersURL, rentalsURL, purchasesURL } from './config'
import { store } from '../redux/store'

/* -------------------------------------------------------------------------- */
/*                                    ITEMS                                   */
/* -------------------------------------------------------------------------- */
export async function getAllItems() {
  const data = await axios({
    method: 'GET',
    // headers: {
    //   Authorization: `Bearer ${token}` // Add the JWT token here
    // },
    url: `${itemsURL}`
  })

  return data
}

export async function getItemsByQueryParam(queryParam) {
  const state = store.getState()
  const { token } = state.iRentStuff.currentUser

  const data = await axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    url: `${itemsURL}?${queryParam}`
  })

  return data
}

export async function getItemByItemId(itemDetails) {
  const data = await axios({
    method: 'GET',
    // headers: {
    //   Authorization: `Bearer ${token}` // Add the JWT token here
    // },
    url: `${itemsURL}/${itemDetails.id}`
  })

  return data
}

export async function getAllItemCategories() {
  const data = await axios({
    method: 'GET',
    // headers: {
    //   Authorization: `Bearer ${currentUser.token}` // Add the JWT token here
    // },
    url: `${itemsURL}/cat`
  })

  return data
}

export async function createNewItem(itemDetails) {
  const state = store.getState()
  const { token } = state.iRentStuff.currentUser

  const data = await axios({
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    data: itemDetails,
    url: `${itemsURL}`
  })

  return data
}

export async function editItem(itemDetails) {
  const state = store.getState()
  const { token } = state.iRentStuff.currentUser

  const data = await axios({
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    data: itemDetails,
    url: `${itemsURL}/${itemDetails.id}`
  })

  return data
}

export async function deleteItem(itemDetails) {
  const state = store.getState()
  const { token } = state.iRentStuff.currentUser

  const data = await axios({
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    data: itemDetails,
    url: `${itemsURL}/${itemDetails.id}`
  })

  return data
}

/* -------------------------------------------------------------------------- */
/*                                ITEMS IMAGES                                */
/* -------------------------------------------------------------------------- */
export async function getItemImage(url) {
  const data = await axios({
    method: 'GET',
    // headers: {
    //   Authorization: `Bearer ${token}` // Add the JWT token here
    // },
    url: `${url}`
  })

  return data
}

export async function getOneItemImage(folderPath) {
  const data = await axios({
    method: 'GET',
    // headers: {
    //   Authorization: `Bearer ${token}` // Add the JWT token here
    // },
    url: `${assetsURL}/${folderPath}?getOne=true`
  })

  return data
}

export async function uploadItemImage(payload, url) {
  const state = store.getState()
  const { token } = state.iRentStuff.currentUser

  const data = await axios({
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': payload.type
    },
    data: payload,
    url: `${url}`
  })

  return data
}

export async function deleteItemImage(url) {
  const data = await axios({
    method: 'DELETE',
    // headers: {
    //   Authorization: `Bearer ${token}` // Add the JWT token here
    // },
    url: `${url}`
  })

  return data
}

/* -------------------------------------------------------------------------- */
/*                                   REVIEWS                                  */
/* -------------------------------------------------------------------------- */
export async function getReviewsForItem(itemDetails) {
  const state = store.getState()
  const { token } = state.iRentStuff.currentUser

  const data = await axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    url: `${reviewsURL}/item/${itemDetails.id}`
  })

  return data
}

export async function getAverageReviewsForItem(itemDetails) {
  const state = store.getState()
  const { token } = state.iRentStuff.currentUser

  const data = await axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    url: `${reviewsURL}/item/${itemDetails.id}/rating`
  })

  return data
}

export async function getReviewsForUser(user_id) {
  const state = store.getState()
  const { token } = state.iRentStuff.currentUser

  const data = await axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    url: `${reviewsURL}/user/${user_id}`
  })

  return data
}

export async function getReviewsByReviewId(reviewDetails) {
  const state = store.getState()
  const { token } = state.iRentStuff.currentUser

  const data = await axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    url: `${reviewsURL}/${reviewDetails.id}`
  })

  return data
}

export async function createNewReview(reviewDetails) {
  const state = store.getState()
  const { token } = state.iRentStuff.currentUser

  const data = await axios({
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    data: reviewDetails,
    url: `${reviewsURL}`
  })

  return data
}

export async function editReview(reviewDetails) {
  const state = store.getState()
  const { token } = state.iRentStuff.currentUser

  const data = await axios({
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    data: reviewDetails,
    url: `${reviewsURL}/update/${reviewDetails.review_id}`
  })

  return data
}

export async function deleteReviews(reviewDetails) {
  const state = store.getState()
  const { token } = state.iRentStuff.currentUser

  const data = await axios({
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    // data: reviewDetails,
    url: `${reviewsURL}/delete/${reviewDetails.review_id}`
  })

  return data
}

/* -------------------------------------------------------------------------- */
/*                                   RENTAL                                   */
/* -------------------------------------------------------------------------- */
export async function createNewRental(rentalDetails, item_id) {
  const state = store.getState()
  const { token } = state.iRentStuff.currentUser

  const data = await axios({
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    data: rentalDetails,
    url: `${rentalsURL}/${item_id}/add`
  })

  return data
}

export async function getRentalDetails(item_id, rental_id) {
  const state = store.getState()
  const { token } = state.iRentStuff.currentUser

  const data = await axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    url: `${rentalsURL}/${item_id}/${rental_id}`
  })

  return data
}

export async function getRentalDetailsForUser(queryParam) {
  const state = store.getState()
  console.log(state.iRentStuff.currentUser)
  const { username } = state.iRentStuff.currentUser.userDetails
  console.log(username)
  const { token } = state.iRentStuff.currentUser

  const data = await axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    url: `${rentalsURL}/user/${username}?${queryParam}`
  })

  return data
}

export async function getRentalDetailsForItems(item_id, queryParam) {
  const state = store.getState()
  const { token } = state.iRentStuff.currentUser

  const data = await axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    url: `${rentalsURL}/${item_id}?${queryParam}`
  })

  return data
}

/* --------------- patch actions = [confirm, cancel, start, complete] -------------- */
export async function rentalPatch(item_id, rental_id, action) {
  const state = store.getState()
  const { token } = state.iRentStuff.currentUser

  const data = await axios({
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    url: `${rentalsURL}/${item_id}/${rental_id}/${action}`
  })

  return data
}

/* -------------------------------------------------------------------------- */
/*                                  PURCHASE                                  */
/* -------------------------------------------------------------------------- */
export async function createNewPurchase(payload, item_id) {
  const state = store.getState()
  const { token } = state.iRentStuff.currentUser

  const data = await axios({
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    data: payload,
    url: `${purchasesURL}/${item_id}/add`
  })

  return data
}

export async function getPurchaseDetails(item_id, purchase_id) {
  const state = store.getState()
  const { token } = state.iRentStuff.currentUser

  const data = await axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    url: `${purchasesURL}/${item_id}/${purchase_id}`
  })

  return data
}

export async function getPurchaseDetailsForUser(queryParam) {
  const state = store.getState()
  const { username } = state.iRentStuff.currentUser.userDetails
  const { token } = state.iRentStuff.currentUser

  const data = await axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    url: `${purchasesURL}/user/${username}?${queryParam}`
  })

  return data
}

/* --------------- patch actions = [confirm, cancel, complete] -------------- */
export async function purchasePatch(item_id, purchase_id, action) {
  const state = store.getState()
  const { token } = state.iRentStuff.currentUser

  const data = await axios({
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    url: `${purchasesURL}/${item_id}/${purchase_id}/${action}`
  })

  return data
}

/* -------------------------------------------------------------------------- */
/*                                    USERS                                   */
/* -------------------------------------------------------------------------- */
export async function getAllUsers() {
  const data = await axios({
    method: 'GET',
    mode: 'no-cors',
    //withCredentials: true,
    url: `${usersURL}`
  })

  return data
}

export async function registerUser(payload) {
  const data = await axios({
    method: 'POST',
    mode: 'no-cors',
    //withCredentials: true,
    data: payload,
    url: `${usersURL}`
  })

  return data
}

export async function getUserByEmailAndId(payload) {
  const data = await axios({
    method: 'GET',
    mode: 'no-cors',
    //withCredentials: true,
    data: payload,
    url: `${usersURL}?username=${payload.username}&&password=${payload.password}`
  })

  return data
}

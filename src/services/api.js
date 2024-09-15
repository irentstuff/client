import axios from 'axios'
import { itemsURL, reviewsURL, assetsURL, usersURL, rentalsURL, purchasesURL } from './config'
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
  const token = state.iRentStuff.currentUser.token

  const data = await axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    url: `${itemsURL}?${queryParam}`
  })

  return data
}

export async function getItemByItemId(payload) {
  const data = await axios({
    method: 'GET',
    // headers: {
    //   Authorization: `Bearer ${token}` // Add the JWT token here
    // },
    url: `${itemsURL}/${payload.id}`
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

export async function createNewItem(payload) {
  const state = store.getState()
  const token = state.iRentStuff.currentUser.token

  const data = await axios({
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    data: payload,
    url: `${itemsURL}`
  })

  return data
}

export async function editItem(payload) {
  const state = store.getState()
  const token = state.iRentStuff.currentUser.token

  const data = await axios({
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    data: payload,
    url: `${itemsURL}/${payload.id}`
  })

  return data
}

export async function deleteItem(payload) {
  const state = store.getState()
  const token = state.iRentStuff.currentUser.token

  const data = await axios({
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    data: payload,
    url: `${itemsURL}/${payload.id}`
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

export async function getOneItemImage(url) {
  const data = await axios({
    method: 'GET',
    // headers: {
    //   Authorization: `Bearer ${token}` // Add the JWT token here
    // },
    url: `${url}?getOne=true`
  })

  return data
}

export async function uploadItemImage(payload, url) {
  const state = store.getState()
  const token = state.iRentStuff.currentUser.token

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
  const state = store.getState()
  const token = state.iRentStuff.currentUser.token

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
export async function getReviewsForItem(payload) {
  const state = store.getState()
  const token = state.iRentStuff.currentUser.token

  const data = await axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    url: `${reviewsURL}/item/${payload.id}`
  })

  return data
}

export async function getAverageReviewsForItem(payload) {
  const state = store.getState()
  const token = state.iRentStuff.currentUser.token

  const data = await axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    url: `${reviewsURL}/item/${payload.id}/rating`
  })

  return data
}

export async function getReviewsForUser(payload) {
  const state = store.getState()
  const token = state.iRentStuff.currentUser.token

  const data = await axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    url: `${reviewsURL}/user/${payload.id}`
  })

  return data
}

export async function getReviewsByReviewId(payload) {
  const state = store.getState()
  const token = state.iRentStuff.currentUser.token

  const data = await axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    url: `${reviewsURL}/${payload.id}`
  })

  return data
}

export async function createNewReview(payload) {
  const state = store.getState()
  const token = state.iRentStuff.currentUser.token

  const data = await axios({
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    data: payload,
    url: `${reviewsURL}`
  })

  return data
}

export async function editReview(payload) {
  const state = store.getState()
  const token = state.iRentStuff.currentUser.token

  const data = await axios({
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    data: payload,
    url: `${reviewsURL}/update/${payload.review_id}`
  })

  return data
}

export async function deleteReviews(payload) {
  const state = store.getState()
  const token = state.iRentStuff.currentUser.token

  const data = await axios({
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    data: payload,
    url: `${reviewsURL}/delete/${payload.review_id}`
  })

  return data
}

/* -------------------------------------------------------------------------- */
/*                                   RENTAL                                   */
/* -------------------------------------------------------------------------- */
export async function createNewRental(payload, item_id) {
  const state = store.getState()
  const token = state.iRentStuff.currentUser.token

  const data = await axios({
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    data: payload,
    url: `${rentalsURL}/${item_id}/add`
  })

  return data
}

export async function getRentalDetails(payload) {
  const state = store.getState()
  const token = state.iRentStuff.currentUser.token

  const data = await axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    url: `${rentalsURL}/${payload.item_id}/${payload.rental_id}`
  })

  return data
}

/* --------------- patch actions = [confirm, cancel, start, complete] -------------- */
export async function rentalPatch(payload) {
  // const state = store.getState()
  // const token = state.iRentStuff.currentUser.token

  const data = await axios({
    method: 'PATCH',
    // headers: {
    //   Authorization: `Bearer ${token}` // Add the JWT token here
    // },
    url: `${rentalsURL}/${payload.item_id}/${payload.rental_id}/${payload.action}`
  })

  return data
}

export async function getRentalDetailsForUser(payload) {
  const state = store.getState()
  const token = state.iRentStuff.currentUser.token

  const data = await axios({
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    url: `${rentalsURL}/${payload.user_id}/rentals/`
  })

  return data
}

/* -------------------------------------------------------------------------- */
/*                                  PURCHASE                                  */
/* -------------------------------------------------------------------------- */
export async function createNewPurchase(payload, item_id) {
  const state = store.getState()
  const token = state.iRentStuff.currentUser.token

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

export async function getPurchaseDetails(payload) {
  const state = store.getState()
  const token = state.iRentStuff.currentUser.token

  const data = await axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}` // Add the JWT token here
    },
    url: `${purchasesURL}/${payload.item_id}/${payload.purchase_id}`
  })

  return data
}

/* --------------- patch actions = [confirm, cancel, complete] -------------- */
export async function purchasePatch(payload) {
  // const state = store.getState()
  // const token = state.iRentStuff.currentUser.token

  const data = await axios({
    method: 'PATCH',
    // headers: {
    //   Authorization: `Bearer ${token}` // Add the JWT token here
    // },
    url: `${purchasesURL}/${payload.item_id}/${payload.purchase_id}/${payload.action}`
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

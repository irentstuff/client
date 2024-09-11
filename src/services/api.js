import axios from 'axios'
import { apiURL, itemsURL, reviewsURL, usersURL } from './config'
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
/*                                   REVIEWS                                  */
/* -------------------------------------------------------------------------- */
export async function getReviewsForItem(payload) {
  const data = await axios({
    method: 'GET',
    // headers: {
    //   Authorization: `Bearer ${token}` // Add the JWT token here
    // },
    url: `${reviewsURL}/items/${payload.id}`
  })

  return data
}

export async function getAverageReviewsForItem(payload) {
  const data = await axios({
    method: 'GET',
    // headers: {
    //   Authorization: `Bearer ${token}` // Add the JWT token here
    // },
    url: `${reviewsURL}/items/${payload.id}/rating`
  })

  return data
}

export async function getReviewsForUser(payload) {
  const data = await axios({
    method: 'GET',
    // headers: {
    //   Authorization: `Bearer ${token}` // Add the JWT token here
    // },
    url: `${reviewsURL}/user/${payload.id}`
  })

  return data
}

export async function getReviewsByReviewId(payload) {
  const data = await axios({
    method: 'GET',
    // headers: {
    //   Authorization: `Bearer ${token}` // Add the JWT token here
    // },
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
    url: `${reviewsURL}/update/${payload.id}`
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
    url: `${reviewsURL}/${payload.id}`
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

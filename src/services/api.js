import axios from 'axios'
import { apiURL, itemsURL, usersURL } from './config'
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

/* -------------------------------------------------------------------------- */
/*                           SAMPLE AXIOS FUNCTIONS                           */
/* -------------------------------------------------------------------------- */
export async function getTestData(param) {
  const data = await axios({
    method: 'GET',
    withCredentials: true,
    url: `${apiURL}?param=${param}`
  })

  return data
}

export async function postTestData(payload) {
  const data = await axios({
    method: 'POST',
    withCredentials: true,
    data: payload,
    url: `${apiURL}`
  })

  return data
}

export async function putTestData(payload) {
  const data = await axios({
    method: 'PUT',
    withCredentials: true,
    data: payload,
    url: `${apiUrl}/${payload.id}`
  })

  return data
}

export async function deleteTestData(id) {
  const data = await axios({
    method: 'DELETE',
    withCredentials: true,
    url: `${apiURL}/${id}`
  })

  return data
}

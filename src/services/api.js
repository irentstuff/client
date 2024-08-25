import axios from 'axios'
import { apiURL, itemsURL } from './config'

/* -------------------------------------------------------------------------- */
/*                                    ITEMS                                   */
/* -------------------------------------------------------------------------- */
export async function getAllItems() {
  const data = await axios({
    method: 'GET',
    //withCredentials: true,
    url: `${itemsURL}`
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

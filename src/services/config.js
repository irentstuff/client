/* -------------------------------------------------------------------------- */
/*                                    APIS                                    */
/* -------------------------------------------------------------------------- */
const hostname = 'http://localhost:5000'

export const apiURL = `${hostname}`
// export const itemsURL = `${hostname}/items`
export const itemsURL = 'https://mlkou5mk3a.execute-api.ap-southeast-1.amazonaws.com/dev/items/'
export const usersURL = `${hostname}/users`

export const apiType = {
  initiate: 'initiate',
  delete: 'delete',
  update: 'update',
  add: 'add'
}

export const apiLabels = {
  allItems: 'ALL ITEMS',
  allUsers: 'ALL USERS'
}

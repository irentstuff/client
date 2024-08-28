/* -------------------------------------------------------------------------- */
/*                                    APIS                                    */
/* -------------------------------------------------------------------------- */
const hostname = 'http://localhost:5000'

export const apiURL = `${hostname}`
export const itemsURL = `${hostname}/items`
export const usersURL = `${hostname}/users`

export const apiType = {
  initiate: 'initiate',
  delete: 'delete',
  update: 'update',
  add: 'add'
}

export const apiLabels = {
  allItems: 'ALL ITEMS'
}

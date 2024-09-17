/* -------------------------------------------------------------------------- */
/*                                    APIS                                    */
/* -------------------------------------------------------------------------- */
// const hostname = 'http://localhost:5000'
const hostname = 'https://pxgwc7gdz1.execute-api.ap-southeast-1.amazonaws.com/dev'

export const usersURL = `${hostname}/users`
export const itemsURL = `${hostname}/items`
export const assetsURL = `${hostname}/assets/irentstuff-assets`
export const reviewsURL = `${hostname}/reviews`
export const rentalsURL = `${hostname}/rentals`
export const purchasesURL = `${hostname}/purchases`

export const apiType = {
  initiate: 'initiate',
  delete: 'delete',
  update: 'update',
  add: 'add'
}

export const apiLabels = {
  allItems: 'ALL ITEMS',
  allItemsCategories: 'ALL ITEMS CATEGORIES',
  allItemsCreatedByCurrentUser: 'ALL ITEMS BY CURRENT USER',
  allOffersMadeByCurrentUser: 'ALL OFFER MADE BY CURRENT USER',
  allUsers: 'ALL USERS'
}

/* -------------------------------------------------------------------------- */
/*                                 FORM FORMAT                                */
/* -------------------------------------------------------------------------- */

export const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    }
  }
}
export const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}

/* -------------------------------------------------------------------------- */
/*                                  ITEM FORM                                 */
/* -------------------------------------------------------------------------- */
export const conditionOptions = [
  {
    value: 'excellent',
    label: 'Excellent'
  },
  {
    value: 'good',
    label: 'Good'
  },
  {
    value: 'fair',
    label: 'Fair'
  },
  {
    value: 'poor',
    label: 'Poor'
  }
]
export const availabilityOptions = [
  {
    value: 'available',
    label: 'Available',
    color: 'green'
  },
  {
    value: 'activeRental',
    label: 'Active Rental',
    color: 'red'
  },
  {
    value: 'pendingPurchase',
    label: 'Pending Purchase',
    color: 'orange'
  },
  {
    value: 'sold',
    label: 'Sold',
    color: 'red'
  }
]

/* -------------------------------------------------------------------------- */
/*                                RENTAL STATUS                               */
/* -------------------------------------------------------------------------- */
export const patchActions = {
  confirm: 'confirm',
  cancel: 'cancel',
  start: 'start',
  complete: 'complete'
}

export const statusCanPatchActions = {
  confirm: ['offered'],
  cancel: ['offered', 'confirmed'],
  start: ['confirmed'],
  complete: ['ongoing'],
  review: ['completed']
}

export const rentalStatus = [
  {
    value: 'offered',
    text: 'Offered',
    label: 'Offered',
    color: 'orange'
  },
  {
    value: 'cancelled',
    text: 'Cancelled',
    label: 'Cancelled',
    color: 'red'
  },
  {
    value: 'ongoing',
    text: 'Ongoing',
    label: 'Ongoing',
    color: 'dark green'
  },
  {
    value: 'confirmed',
    text: 'Confirmed',
    label: 'Confirmed',
    color: 'green'
  }
]

/* -------------------------------------------------------------------------- */
/*                             calculate datetime                             */
/* -------------------------------------------------------------------------- */
export const dayDifference = (created_date) => {
  const difference = new Date() - new Date(created_date)
  return Math.ceil(difference / (1000 * 60 * 60 * 24))
}

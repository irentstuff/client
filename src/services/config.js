/* -------------------------------------------------------------------------- */
/*                                    APIS                                    */
/* -------------------------------------------------------------------------- */
// const hostname = 'http://localhost:5000'
const hostname = 'https://pxgwc7gdz1.execute-api.ap-southeast-1.amazonaws.com/dev/'

// export const apiURL = `${hostname}`
export const usersURL = `${hostname}/users`
export const itemsURL = `${hostname}/items`
export const reviewsURL = `${hostname}/reviews`

export const apiType = {
  initiate: 'initiate',
  delete: 'delete',
  update: 'update',
  add: 'add'
}

export const apiLabels = {
  allItems: 'ALL ITEMS',
  allItemsCategories: 'ALL ITEMS CATEGORIES',
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
    label: 'Available'
  },
  {
    value: 'activeRental',
    label: 'Active Rental'
  },
  {
    value: 'pendingPurchase',
    label: 'Pending Purchase'
  },
  {
    value: 'sold',
    label: 'Sold'
  }
]

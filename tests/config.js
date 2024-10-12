const moment = require('moment')

const config = {
  baseUrl: 'http://localhost:5173', // Replace with the actual URL of your homepage
  title: 'iRentStuff',
  username: 'test_user', // Replace with the actual username you expect to see
  password: 'test_user'
}

const secondaryUser = {
  username: 'testuser', // Replace with the actual username you expect to see
  password: 'testuser'
}

const newItemForm = {
  title: 'test_item',
  category: 'Electronics',
  condition: 'Excellent',
  condition: 'Excellent',
  availability: 'Available',
  price_per_day: 10,
  deposit: 50
}

const editItemForm = {
  title: 'test_item_again',
  category: 'Electronics',
  condition: 'Excellent',
  condition: 'Excellent',
  availability: 'Available',
  price_per_day: 10,
  deposit: 50
}

const newItemForOfferForm = {
  title: 'test_offer',
  category: 'Electronics',
  condition: 'Excellent',
  condition: 'Excellent',
  availability: 'Available',
  price_per_day: 10,
  deposit: 50
}

const rentalOfferForm = {
  start_date: moment().format('YYYY-MM-DD'),
  end_date: moment().add(10, 'days').format('YYYY-MM-DD'),
  price_per_day: parseFloat(10),
  deposit: parseFloat(50)
}

module.exports = { config, secondaryUser, newItemForm, editItemForm, newItemForOfferForm, rentalOfferForm }

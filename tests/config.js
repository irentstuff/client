const config = {
  baseUrl: 'http://localhost:5173', // Replace with the actual URL of your homepage
  title: 'iRentStuff',
  username: 'test_user', // Replace with the actual username you expect to see
  password: 'test_user'
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

module.exports = { config, newItemForm, editItemForm }

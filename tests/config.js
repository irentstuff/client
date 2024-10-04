const config = {
  baseUrl: 'http://localhost:5173', // Replace with the actual URL of your homepage
  title: 'iRentStuff',
  username: 'yingqi', // Replace with the actual username you expect to see
  password: 'password'
}

const newItemForm = {
  title: 'test_item',
  category: 'Electronics',
  condition: 'Excellent',
  price_per_day: 10,
  deposit: 50
}

module.exports = { config, newItemForm }

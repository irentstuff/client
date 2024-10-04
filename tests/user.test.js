const { Builder, By, until } = require('selenium-webdriver')
const { config, newItemForm } = require('./config')
const LoginPage = require('./LoginPage')
const ItemsFunction = require('./Items')

// describe('Login Tests', () => {
//   let driver, loginPage

//   beforeAll(async () => {
//     driver = await new Builder().forBrowser('chrome').build()
//     await driver.get(config.baseUrl)
//     loginPage = new LoginPage(driver)
//   })

//   afterAll(async () => {
//     await driver.quit()
//   })

//   it('should render the correct page', async () => {
//     let title = await driver.getTitle()
//     expect(title).toBe(config.title)
//   })

//   it('should log in successfully', async () => {
//     await loginPage.navigate()
//     await loginPage.login(config.username, config.password)
//     const usernameElement = await driver.wait(until.elementLocated(By.xpath(`//span[text()="${config.username}"]`)))

//     // Check if the username element is displayed
//     const isDisplayed = await usernameElement.isDisplayed()
//     expect(isDisplayed).toBe(true)
//   })
// })

describe('Item Tests', () => {
  let driver, loginPage, items

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build()
    await driver.get(config.baseUrl)
    loginPage = new LoginPage(driver)
    items = new ItemsFunction(driver)
  })

  afterAll(async () => {
    await driver.quit()
  })

  beforeEach(async () => {
    await loginPage.navigate()
    await loginPage.login(config.username, config.password) // Log in before each test
    await driver.wait(until.elementLocated(By.xpath(`//span[text()="${config.username}"]`)))
  })

  it('should create a new item successfully', async () => {
    await items.navigateAddNewItem()
    await items.addNewItem(newItemForm)
    const successElement = await driver.wait(until.elementLocated(By.css('.notification-success')), 10000)
    expect(successElement.getText()).toContain('Item is added successfully')
  })
})

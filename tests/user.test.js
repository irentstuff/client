const { Builder, By, until } = require('selenium-webdriver')
const { config, newItemForm, editItemForm } = require('./config')
const LoginPage = require('./LoginPage')
const ItemsFunction = require('./Items')

describe('Login Tests', () => {
  let driver, loginPage

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build()
    await driver.get(config.baseUrl)
    await driver.manage().window().maximize()
    loginPage = new LoginPage(driver)
  })

  afterAll(async () => {
    await driver.quit()
  })

  it('should render the correct page', async () => {
    let title = await driver.getTitle()

    try {
      expect(title).toBe(config.title)
      console.log('Correct page is rendered.')
    } catch (assertionError) {
      console.error('Assertion failed:', assertionError.message)
      throw new Error(`Expected ${config.title} but got "${title}"`)
    }
  })

  it('should log in successfully', async () => {
    await loginPage.navigate()
    await loginPage.login(config.username, config.password)
    await driver.sleep(1000)
    // const usernameElement = await driver.wait(until.elementLocated(By.xpath(`//span[text()="${config.username}"]`)))
    const usernameElement = await driver.wait(until.elementLocated(By.xpath(`//*[@id="root"]/div/header/div/div[3]`)), 1000)

    // Check if the username element is displayed correctly
    const textValue = await usernameElement.getText()

    // Check the text value
    if (textValue === config.username) {
      console.log('login details is correct:', textValue)
    } else {
      console.log('login details is incorrect:', textValue)
    }
    expect(textValue === config.username)
  })
})

describe('Item Tests', () => {
  let driver, loginPage, items

  beforeAll(async () => {
    try {
      /* ---------------------------------- setup --------------------------------- */
      driver = await new Builder().forBrowser('chrome').build()
      await driver.get(config.baseUrl)
      await driver.manage().window().maximize()
      loginPage = new LoginPage(driver)
      items = new ItemsFunction(driver)
      /* ---------------------------------- login --------------------------------- */
      await loginPage.navigate()
      await loginPage.login(config.username, config.password) // Log in before each test
      await driver.sleep(2000)
      const usernameElement = await driver.wait(until.elementLocated(By.xpath(`//*[@id="root"]/div/header/div/div[3]`)))
      // Get the text of the username element to verify successful login
      const usernameText = await usernameElement.getText()
      if (usernameText !== config.username) {
        throw new Error(`Login failed: Expected username '${config.username}', but found '${usernameText}'`)
      }
    } catch (error) {
      console.error('Error during setup:', error)
      throw error
    }
  })

  afterAll(async () => {
    await driver.quit()
  })

  beforeEach(async () => {
    await driver.executeScript('window.scrollTo(0, 0);')
  })

  it('should create a new item successfully', async () => {
    await items.navigateAddNewItem()
    await items.addNewItem(newItemForm)
    const successMessage = await items.getSuccessMessage()
    try {
      expect(successMessage === 'Item is added successfully')
      console.log('add assertion passed.')
    } catch (assertionError) {
      console.error('Assertion failed:', assertionError.message)
      throw new Error(`Expected "Item is added successfully" but got "${successMessage}"`)
    }

    await driver.sleep(5000)
  }, 10000)

  it('should edit an existing item successfully', async () => {
    await items.navigateEditItem()
    await items.editItem(editItemForm)
    const successMessage = await items.getSuccessMessage()
    try {
      expect(successMessage === 'Item is edited successfully')
      console.log('edit assertion passed.')
    } catch (assertionError) {
      console.error('Assertion failed:', assertionError.message)
      throw new Error(`Expected "Item is edited successfully" but got "${successMessage}"`)
    }

    await driver.sleep(5000)
  }, 10000)

  it('should delete an existing item successfully', async () => {
    await items.navigateDeleteItem()
    await items.deleteItem()
    const successMessage = await items.getSuccessMessage()
    try {
      expect(successMessage === 'Item is deleted successfully')
      console.log('delete assertion passed.')
    } catch (assertionError) {
      console.error('Assertion failed:', assertionError.message)
      throw new Error(`Expected "Item is deleted successfully" but got "${successMessage}"`)
    }

    await driver.sleep(5000)
  }, 10000)
})

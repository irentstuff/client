const { Builder, By, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const { config, secondaryUser, newItemForm, editItemForm, newItemForOfferForm, rentalOfferForm } = require('./config')
const LoginPage = require('./LoginPage')
const ItemsFunction = require('./Items')
const TransactionFunction = require('./Transactions')

describe('Login Tests', () => {
  let driver, loginPage
  const options = new chrome.Options()
  // options.setBinary('/path/to/chrome')
  options.addArguments('--disable-dev-shm-usage') // overcome limited resource problems
  options.addArguments('start-maximized') // open Browser in maximized mode
  options.addArguments('disable-infobars') // disabling infobars
  options.addArguments('--disable-extensions') // disabling extensions
  options.addArguments('--no-sandbox') // Bypass OS security model
  options.addArguments('--headless')
  options.addArguments('--remote-debugging-pipe')
  options.addArguments('--crash-dumps-dir=${crashDumpsDir}')
  options.addArguments('--disable-software-rasterizer')

  beforeAll(async () => {
    try {
      driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build()
      await driver.get(config.baseUrl)
      console.log(await driver.getTitle())
      await driver.manage().window().maximize()
      loginPage = new LoginPage(driver)
    } catch (error) {
      console.error(' before all setup error : ', error)
      throw error
    }
  }, 50000)

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
  }, 10000)

  it('should log in successfully', async () => {
    await loginPage.navigate()
    await loginPage.login(config.username, config.password)
    await driver.sleep(2000)
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
    expect(textValue).toBe(config.username)
  }, 10000)
})

describe('Item Tests', () => {
  let driver, loginPage, items
  const options = new chrome.Options()
  options.addArguments('--disable-dev-shm-usage') // overcome limited resource problems
  options.addArguments('start-maximized') // open Browser in maximized mode
  options.addArguments('disable-infobars') // disabling infobars
  options.addArguments('--disable-extensions') // disabling extensions
  options.addArguments('--no-sandbox') // Bypass OS security model
  options.addArguments('--headless')
  options.addArguments('--remote-debugging-pipe')
  options.addArguments('--crash-dumps-dir=${crashDumpsDir}')
  options.addArguments('--disable-software-rasterizer')

  beforeAll(async () => {
    try {
      /* ---------------------------------- setup --------------------------------- */
      driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build()
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
  }, 50000)

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
      expect(successMessage).toBe('Item is added successfully')
      console.log('add assertion passed.')
    } catch (assertionError) {
      console.error('Assertion failed:', assertionError.message)
      throw new Error(`Expected "Item is added successfully" but got "${successMessage}"`)
    }

    await driver.sleep(5000)
  }, 10000)

  it('should render the new item in the UI', async () => {
    const firstItemTitle = await driver.findElement(By.xpath(`//*[@id="root"]/div/main/div/div[2]/div/div[1]/div/div[3]/h3`)).getText()
    try {
      expect(firstItemTitle).toBe(newItemForm.title) // Check if the new item is rendered
      console.log('add ui render assertion passed.')
    } catch (assertionError) {
      console.error('Assertion failed:', assertionError.message)
      throw new Error(`new item is not being rendered,  ${firstItemTitle} found instead`)
    }
  }, 10000)

  it('should edit an existing item successfully', async () => {
    await items.navigateEditItem()
    await items.editItem(editItemForm)
    const successMessage = await items.getSuccessMessage()
    try {
      expect(successMessage).toBe('Item is edited successfully')
      console.log('edit assertion passed.')
    } catch (assertionError) {
      console.error('Assertion failed:', assertionError.message)
      throw new Error(`Expected "Item is edited successfully" but got "${successMessage}"`)
    }

    await driver.sleep(5000)
  }, 10000)

  it('should render the edited item in the UI', async () => {
    const itemTitle = await driver
      .findElement(By.xpath(`//*[@id="root"]/div/main/div/div/div/div[2]/div[1]/div[2]/div/div[1]/h3`))
      .getText()
    console.log(itemTitle)
    try {
      expect(itemTitle).toBe(editItemForm.title) // Check if the new item is rendered
      console.log('edit ui render assertion passed.')
    } catch (assertionError) {
      console.error('Assertion failed:', assertionError.message)
      throw new Error(`edited item is not being rendered, ${itemTitle} found instead`)
    }
  }, 10000)

  it('should delete an existing item successfully', async () => {
    await items.navigateDeleteItem()
    await items.deleteItem()
    const successMessage = await items.getSuccessMessage()
    try {
      expect(successMessage).toBe('Item is deleted successfully')
      console.log('delete assertion passed.')
    } catch (assertionError) {
      console.error('Assertion failed:', assertionError.message)
      throw new Error(`Expected "Item is deleted successfully" but got "${successMessage}"`)
    }

    await driver.sleep(5000)
  }, 10000)

  it('should not render the edited item in the UI', async () => {
    try {
      const pageSource = await driver.getPageSource()
      expect(pageSource.includes(editItemForm.title)).toBe(false) // Check if the new item is rendered
      console.log('delete ui render assertion passed.')
    } catch (assertionError) {
      console.error('Assertion failed:', assertionError.message)
      throw new Error(`deleted item is being rendered`)
    }
  }, 10000)
})

describe('Transaction Tests', () => {
  let driver, loginPage, items, transactions, loginPageItemOwner, itemsItemOwner, transactionsItemOwner
  const options = new chrome.Options()
  options.addArguments('--disable-dev-shm-usage') // overcome limited resource problems
  options.addArguments('start-maximized') // open Browser in maximized mode
  options.addArguments('disable-infobars') // disabling infobars
  options.addArguments('--disable-extensions') // disabling extensions
  options.addArguments('--no-sandbox') // Bypass OS security model
  options.addArguments('--headless')
  options.addArguments('--remote-debugging-pipe')
  options.addArguments('--crash-dumps-dir=${crashDumpsDir}')
  options.addArguments('--disable-software-rasterizer')

  beforeAll(async () => {
    try {
      /* ---------------------------------- setup --------------------------------- */
      driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build()
      await driver.get(config.baseUrl)
      await driver.manage().window().maximize()
      loginPage = new LoginPage(driver)
      items = new ItemsFunction(driver)
      transactions = new TransactionFunction(driver)

      /* ---------------------------------- login as main user --------------------------------- */
      await loginPage.navigate()
      await loginPage.login(config.username, config.password) // Log in before each test
      await driver.sleep(2000)
      const usernameElement = await driver.wait(until.elementLocated(By.xpath(`//*[@id="root"]/div/header/div/div[3]`)))
      // Get the text of the username element to verify successful login
      const usernameText = await usernameElement.getText()
      if (usernameText !== config.username) {
        throw new Error(`Login failed: Expected username '${config.username}', but found '${usernameText}'`)
      }

      /* ----------------------------- setup secondary ---------------------------- */
      driverItemOwner = await new Builder().forBrowser('chrome').setChromeOptions(options).build()
      await driverItemOwner.get(config.baseUrl)
      await driverItemOwner.manage().window().maximize()
      loginPageItemOwner = new LoginPage(driverItemOwner)
      itemsItemOwner = new ItemsFunction(driverItemOwner)
      transactionsItemOwner = new TransactionFunction(driverItemOwner)

      /* ----------------------- login in as secondary user ----------------------- */
      await loginPageItemOwner.navigate()
      await loginPageItemOwner.login(secondaryUser.username, secondaryUser.password) // Log in before each test
      await driverItemOwner.sleep(2000)

      const ItemOwnerUsernameElement = await driverItemOwner.wait(until.elementLocated(By.xpath(`//*[@id="root"]/div/header/div/div[3]`)))
      // Get the text of the username element to verify successful login
      const ItemOwnerUsernameElementText = await ItemOwnerUsernameElement.getText()
      if (ItemOwnerUsernameElementText !== secondaryUser.username) {
        throw new Error(`Login failed: Expected username '${secondaryUser.username}', but found '${ItemOwnerUsernameElementText}'`)
      }

      /* ---------------------------------- create offer test item from secondary user --------------------------------- */
      await itemsItemOwner.navigateAddNewItem()
      await itemsItemOwner.addNewItem(newItemForOfferForm)
      const successMessage = await itemsItemOwner.getSuccessMessage()
      try {
        expect(successMessage).toBe('Item is added successfully')
        console.log('add assertion passed.')
      } catch (assertionError) {
        console.error('Assertion failed:', assertionError.message)
        throw new Error(`Expected "Item is added successfully" but got "${successMessage}"`)
      }

      await driverItemOwner.sleep(2000)
    } catch (error) {
      console.error('Error during setup:', error)
      throw error
    }
  }, 50000)

  afterAll(async () => {
    // await items.navigateDeleteItem()
    // await items.deleteItem()
    // const successMessage = await items.getSuccessMessage()
    // try {
    //   expect(successMessage).toBe('Item is deleted successfully')
    //   console.log('delete assertion passed.')
    // } catch (assertionError) {
    //   console.error('Assertion failed:', assertionError.message)
    //   throw new Error(`Expected "Item is deleted successfully" but got "${successMessage}"`)
    // }
    await driver.quit()
    await driverItemOwner.quit()
  })

  beforeEach(async () => {
    await driver.executeScript('window.scrollTo(0, 0);')
  })

  it('should make rental offer successfully', async () => {
    await transactions.navigateTestOfferItem(newItemForOfferForm.title)
    await transactions.addNewRentalOffer(rentalOfferForm)
    const successMessage = await transactions.getSuccessMessage()
    try {
      expect(successMessage).toBe('Rental offer is made successfully')
      console.log('add assertion passed.')
    } catch (assertionError) {
      console.error('Assertion failed:', assertionError.message)
      throw new Error(`Expected "Rental offer is made successfully" but got "${successMessage}"`)
    }

    await driver.sleep(5000)
  }, 20000)

  it('should render rental offer successfully', async () => {
    await driver.navigate().refresh()

    try {
      const pageSource = await driver.getPageSource()
      expect(pageSource.includes(newItemForOfferForm.title)).toBe(true) // Check if the new item is rendered
      console.log('added rental offer ui render assertion passed.')
    } catch (assertionError) {
      console.error('Assertion failed:', assertionError.message)
      throw new Error(`added rental offer is being rendered`)
    }
    await driver.sleep(5000)
  }, 10000)

  it('owner should confirm rental offer successfully', async () => {
    await driverItemOwner.navigate().refresh()
    await driverItemOwner.get(`${config.baseUrl}/#/OffersReceived`)
    await transactionsItemOwner.confirmRentalOffer(newItemForOfferForm.title)
    const successMessage = await transactionsItemOwner.getSuccessMessage()
    try {
      expect(successMessage).toBe('Rental offer is updated to confirm successfully')
      console.log('confirm assertion passed.')
    } catch (assertionError) {
      console.error('Assertion failed:', assertionError.message)
      throw new Error(`Expected "Rental offer is updated to confirm successfully" but got "${successMessage}"`)
    }

    await driver.sleep(5000)
  }, 20000)

  it('rental offer should be updated to confirm for owner', async () => {
    let statusTag
    try {
      await driverItemOwner.navigate().refresh()
      await driverItemOwner.get(`${config.baseUrl}/#/OffersReceived`)
      const offerRow = await driverItemOwner.wait(
        until.elementLocated(By.xpath(`//tr[td[2][text()='${newItemForOfferForm.title}']]`)),
        5000
      )

      // Verify if the row is displayed
      const isDisplayed = await offerRow.isDisplayed()
      console.log(`Row displayed: ${isDisplayed}`)

      statusTag = await offerRow.findElement(By.xpath('td[8]')).getText()

      expect(statusTag).toBe('Confirmed')
      console.log('confirm render passed for owner.')
    } catch (assertionError) {
      console.error('Assertion failed:', assertionError.message)
      throw new Error(`Expected "Confirmed" but got "${statusTag}"`)
    }
  }, 10000)

  it('rental offer should be updated to confirm for renter', async () => {
    let statusTag

    try {
      await driver.navigate().refresh()
      await driver.get(`${config.baseUrl}/#/OffersMade`)

      const offerRow = await driver.wait(until.elementLocated(By.xpath(`//tr[td[text()='${newItemForOfferForm.title}']]`)), 5000)

      // Verify if the row is displayed
      const isDisplayed = await offerRow.isDisplayed()
      console.log(`Row displayed: ${isDisplayed}`)

      statusTag = await offerRow.findElement(By.xpath('td[7]')).getText()

      expect(statusTag).toBe('Confirmed')
      console.log('confirm render passed for renter.')
    } catch (assertionError) {
      console.error('Assertion failed:', assertionError.message)
      throw new Error(`Expected "Confirmed" but got "${statusTag}"`)
    }
  }, 10000)

  it('owner should start rental offer successfully', async () => {
    await driverItemOwner.navigate().refresh()
    await driverItemOwner.get(`${config.baseUrl}/#/OffersReceived`)
    await transactionsItemOwner.startRentalOffer(newItemForOfferForm.title)
    const successMessage = await transactionsItemOwner.getSuccessMessage()
    try {
      expect(successMessage).toBe('Rental offer is updated to start successfully')
      console.log('confirm assertion passed.')
    } catch (assertionError) {
      console.error('Assertion failed:', assertionError.message)
      throw new Error(`Expected "Rental offer is updated to start successfully" but got "${successMessage}"`)
    }

    await driver.sleep(5000)
  }, 20000)

  it('rental offer should be updated to ongoing for owner', async () => {
    let statusTag
    try {
      await driverItemOwner.navigate().refresh()
      await driverItemOwner.get(`${config.baseUrl}/#/OffersReceived`)
      await driverItemOwner.wait(until.elementsLocated(By.xpath(`//tr[td[2][text()='${newItemForOfferForm.title}']]`)), 5000)
      const offerRow = await driverItemOwner.wait(
        until.elementLocated(By.xpath(`//tr[td[2][text()='${newItemForOfferForm.title}']]`)),
        5000
      )

      // Verify if the row is displayed
      const isDisplayed = await offerRow.isDisplayed()
      console.log(`Row displayed: ${isDisplayed}`)

      statusTag = await offerRow.findElement(By.xpath('td[8]')).getText()

      expect(statusTag).toBe('Ongoing')
      console.log('confirm render passed for owner.')
    } catch (assertionError) {
      console.error('Assertion failed:', assertionError.message)
      throw new Error(`Expected "Ongoing" but got "${statusTag}"`)
    }
  }, 20000)

  it('rental offer should be updated to confirm for renter', async () => {
    let statusTag

    try {
      await driver.navigate().refresh()
      await driver.get(`${config.baseUrl}/#/OffersMade`)
      await driver.wait(until.elementsLocated(By.xpath(`//tr[td[text()='${newItemForOfferForm.title}']]`)), 5000)
      const offerRow = await driver.wait(until.elementLocated(By.xpath(`//tr[td[text()='${newItemForOfferForm.title}']]`)), 5000)

      // Verify if the row is displayed
      const isDisplayed = await offerRow.isDisplayed()
      console.log(`Row displayed: ${isDisplayed}`)

      statusTag = await offerRow.findElement(By.xpath('td[7]')).getText()

      expect(statusTag).toBe('Ongoing')
      console.log('confirm render passed for renter.')
    } catch (assertionError) {
      console.error('Assertion failed:', assertionError.message)
      throw new Error(`Expected "Ongoing" but got "${statusTag}"`)
    }
  }, 20000)
})

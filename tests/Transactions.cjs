const { By, until, Key } = require('selenium-webdriver')
const { config } = require('./config')

class ItemsFunction {
  constructor(driver) {
    this.driver = driver
  }

  async navigateTestOfferItem(testOfferItemTitle) {
    //navigate
    const searchBar = await this.driver.findElement(By.css('input[placeholder="Search for an item"]'))
    searchBar.click()
    searchBar.sendKeys(testOfferItemTitle)
    // Wait for the element to be located by its visible text
    let firstCard

    try {
      firstCard = await this.driver.findElement(By.xpath(`//*[@id="root"]/div/main/div/div[2]/div/div[1]/div`)).click()
    } catch (error) {
      console.warn(`First path not found: ${error.message}. Trying fallback path.`)
      firstCard = await this.driver.findElement(By.xpath(`//*[@id="root"]/div/main/div/div[2]/div/div/div`)).click()
    }
  }

  async navigateOfferMade() {
    //navigate
    await this.driver.get(`${config.baseUrl}/#/OffersMade`)
    const firstCard = await this.driver.findElement(By.xpath(`//*[@id="root"]/div/main/div/div[2]/div/div[1]/div`))
    if (firstCard === undefined) {
      firstCard = await this.driver.findElement(By.xpath(`//*[@id="root"]/div/main/div/div[2]/div/div/div`))
    }
    firstCard.click()
    const buttonElement = await this.driver.findElement(By.xpath("//button[contains(@class, 'ant-btn') and span[text()='Edit Item']]"))
    await this.driver.executeScript('arguments[0].scrollIntoView(true);', buttonElement) // Scroll to the button
    await this.driver.sleep(500)
    await buttonElement.click() // Click the button
  }

  async navigateOfferReceived() {
    //navigate
    await this.driver.get(`${config.baseUrl}/#/MyItems`)
    await this.driver.findElement(By.xpath(`//*[@id="root"]/div/main/div/div[2]/div/div[1]/div`)).click()
    const buttonElement = await this.driver.findElement(By.xpath("//button[contains(@class, 'ant-btn') and span[text()='Delete Item']]"))
    await this.driver.executeScript('arguments[0].scrollIntoView(true);', buttonElement) // Scroll to the button
    await this.driver.sleep(500)
    await buttonElement.click() // Click the button
  }

  async addNewRentalOffer(rentalDetails) {
    const makeOfferButtonElement = await this.driver.findElement(
      By.xpath("//button[contains(@class, 'ant-btn') and span[text()='Make Offer']]")
    )
    await this.driver.executeScript('arguments[0].scrollIntoView(true);', makeOfferButtonElement) // Scroll to the button
    await this.driver.sleep(500)
    await makeOfferButtonElement.click() // Click the button

    //fill form
    /* -------------------------------- category -------------------------------- */
    // Click to open the Select dropdown
    await this.driver.findElement(By.id('makeOffer_rental_dates')).click() // Adjust selector based on your app

    // Wait for the dropdown options to appear
    const datePicker = await this.driver.wait(until.elementLocated(By.css('.ant-picker-dropdown')), 10000)
    datePicker.click()

    const startDateToSelect = await this.driver.wait(until.elementLocated(By.xpath(`//td[@title='${rentalDetails.start_date}']`)), 10000)
    await startDateToSelect.click() // Click on the desired date

    const endDateToSelect = await this.driver.wait(until.elementLocated(By.xpath(`//td[@title='${rentalDetails.end_date}']`)), 10000)
    await endDateToSelect.click() // Click on the desired date

    /* --------------------------------- prices --------------------------------- */
    await this.driver.findElement(By.id('makeOffer_price_per_day')).sendKeys(rentalDetails.price_per_day)
    await this.driver.findElement(By.id('makeOffer_deposit')).sendKeys(rentalDetails.deposit)

    /* --------------------------------- submit --------------------------------- */
    const buttonElement = await this.driver.findElement(
      By.xpath("//button[contains(@class, 'ant-btn') and span[text()='Make Rental Offer']]")
    )
    await this.driver.executeScript('arguments[0].scrollIntoView(true);', buttonElement) // Scroll to the button
    await this.driver.sleep(500)
    await buttonElement.click() // Click the button
  }

  async editItem(itemDetails) {
    //fill form
    /* ---------------------------------- title --------------------------------- */
    const inputField = await this.driver.wait(until.elementLocated(By.id('editItem_title')), 10000)
    await this.driver.wait(until.elementIsVisible(inputField), 10000)

    const currentValue = await inputField.getAttribute('value')

    for (let i = 0; i < currentValue.length; i++) {
      await inputField.sendKeys(Key.BACK_SPACE)
    }
    await inputField.sendKeys(itemDetails.title)

    /* --------------------------------- submit --------------------------------- */
    // const buttonElement = await this.driver.findElement(By.xpath("//button[contains(@class, 'ant-btn') and span[text()='Edit Item']]"))
    const buttonElement = await this.driver.findElement(By.xpath(`/html/body/div[2]/div/div[2]/div/div[2]/div/div[3]/button[2]`))
    await this.driver.executeScript('arguments[0].scrollIntoView(true);', buttonElement) // Scroll to the button
    const clickableButton = await this.driver.wait(until.elementIsEnabled(buttonElement), 10000)

    // Click the button using JavaScript if necessary
    await this.driver.executeScript('arguments[0].click();', clickableButton)
  }

  async deleteItem() {
    /* --------------------------------- submit --------------------------------- */
    const buttonElement = await this.driver.findElement(
      By.xpath(`//*[@id="root"]/div/main/div/div/div/div[2]/div[1]/div[2]/div/div[7]/div/div[2]/button`)
    )
    await buttonElement.click() // Click the button
    const confirmationElement = await this.driver.findElement(By.xpath("//button[contains(@class, 'ant-btn') and span[text()='Yes']]"))
    const clickableButton = await this.driver.wait(until.elementIsEnabled(confirmationElement), 10000)
    // Click the button using JavaScript if necessary
    await this.driver.executeScript('arguments[0].click();', clickableButton)
  }

  async getSuccessMessage() {
    const notificationElement = await this.driver.wait(until.elementLocated(By.css('.ant-notification-notice-success')), 10000)
    // Get the notification text (message or description)
    await this.driver.wait(until.elementIsVisible(notificationElement), 10000)
    const messageElement = await notificationElement.findElement(By.css('.ant-notification-notice-message'))
    return await messageElement.getText() // Adjust selector based on your implementation
  }
}

module.exports = ItemsFunction

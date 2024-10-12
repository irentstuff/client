const { By, until, Key } = require('selenium-webdriver')
const { config } = require('./config')

class ItemsFunction {
  constructor(driver) {
    this.driver = driver
  }

  async navigateAddNewItem() {
    //navigate
    await this.driver.get(`${config.baseUrl}/#/AddItem`)
    // await this.driver.findElement(By.xpath(`//li[@data-menu-id='rc-menu-uuid-58965-4-AddItem']`)).click()
    await this.driver.wait(until.elementLocated(By.id('addNewItem_title')))
  }

  async navigateEditItem() {
    //navigate
    await this.driver.get(`${config.baseUrl}/#/MyItems`)
    await this.driver.findElement(By.xpath(`//*[@id="root"]/div/main/div/div[2]/div/div[1]/div`)).click()
    const buttonElement = await this.driver.findElement(By.xpath("//button[contains(@class, 'ant-btn') and span[text()='Edit Item']]"))
    await this.driver.executeScript('arguments[0].scrollIntoView(true);', buttonElement) // Scroll to the button
    await this.driver.sleep(500)
    await buttonElement.click() // Click the button
  }

  async navigateDeleteItem() {
    //navigate
    await this.driver.get(`${config.baseUrl}/#/MyItems`)
    let firstCard

    try {
      firstCard = await this.driver.findElement(By.xpath(`//*[@id="root"]/div/main/div/div[2]/div/div[1]/div`)).click()
    } catch (error) {
      console.warn(`First path not found: ${error.message}. Trying fallback path.`)
      firstCard = await this.driver.findElement(By.xpath(`//*[@id="root"]/div/main/div/div[2]/div/div/div`)).click()
    }
    const buttonElement = await this.driver.findElement(By.xpath("//button[contains(@class, 'ant-btn') and span[text()='Delete Item']]"))
    await this.driver.executeScript('arguments[0].scrollIntoView(true);', buttonElement) // Scroll to the button
    await this.driver.sleep(500)
    await buttonElement.click() // Click the button
  }

  async addNewItem(itemDetails) {
    //fill form
    /* ---------------------------------- title --------------------------------- */
    await this.driver.findElement(By.id('addNewItem_title')).sendKeys(itemDetails.title)

    /* -------------------------------- category -------------------------------- */
    // Click to open the Select dropdown
    await this.driver.findElement(By.xpath('//*[@id="addNewItem"]/div[3]/div/div[2]/div/div/div')).click() // Adjust selector based on your app

    // Wait for the dropdown options to appear
    const catOption = await this.driver.wait(
      until.elementLocated(By.xpath(`//div[contains(@class, 'ant-select-item-option-content') and text()="${itemDetails.category}"]`)),
      10000
    )
    // Wait until the category option is visible and enabled
    await this.driver.wait(async () => {
      const isClickable = (await catOption.isDisplayed()) && (await catOption.isEnabled())
      return isClickable
    }, 10000)
    await catOption.click()

    /* -------------------------------- condition ------------------------------- */
    // Click to open the Select dropdown
    await this.driver.findElement(By.xpath('//*[@id="addNewItem"]/div[4]/div/div[2]/div/div/div')).click() // Adjust selector based on your app
    // Wait for the dropdown options to appear
    const conditionOption = await this.driver.wait(
      until.elementLocated(By.xpath(`//div[contains(@class, 'ant-select-item-option-content') and text()="${itemDetails.condition}"]`)),
      10000
    )
    // Wait until the category option is visible and enabled
    await this.driver.wait(async () => {
      const isClickable = (await conditionOption.isDisplayed()) && (await conditionOption.isEnabled())
      return isClickable
    }, 10000)
    await conditionOption.click()

    /* -------------------------------- availability ------------------------------- */
    // Click to open the Select dropdown
    await this.driver.findElement(By.xpath('//*[@id="addNewItem"]/div[5]/div/div[2]/div/div/div/div')).click() // Adjust selector based on your app
    // Wait for the dropdown options to appear
    const availabilityOption = await this.driver.wait(
      until.elementLocated(By.xpath(`//div[contains(@class, 'ant-select-item-option-content') and text()="${itemDetails.availability}"]`)),
      10000
    )
    // Wait until the category option is visible and enabled
    await this.driver.wait(async () => {
      const isClickable = (await availabilityOption.isDisplayed()) && (await availabilityOption.isEnabled())
      return isClickable
    }, 10000)
    await availabilityOption.click()

    /* ---------------------------------- cost---------------------------------- */
    await this.driver.findElement(By.id('addNewItem_price_per_day')).sendKeys(itemDetails.price_per_day)
    await this.driver.findElement(By.id('addNewItem_deposit')).sendKeys(itemDetails.deposit)

    /* --------------------------------- submit --------------------------------- */
    const buttonElement = await this.driver.findElement(By.xpath("//button[contains(@class, 'ant-btn') and span[text()='Add New Item']]"))
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

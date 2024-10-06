const { By, until } = require('selenium-webdriver')
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

  async getSuccessMessage() {
    const notificationElement = await this.driver.wait(until.elementLocated(By.css('.ant-notification-notice-success')), 10000)
    // Get the notification text (message or description)
    const messageElement = await notificationElement.findElement(By.css('.ant-notification-notice-message'))
    return await messageElement.getText() // Adjust selector based on your implementation
  }
}

module.exports = ItemsFunction

const { By, until } = require('selenium-webdriver')
const { config } = require('./config')

class ItemsFunction {
  constructor(driver) {
    this.driver = driver
  }

  async navigateAddNewItem() {
    //navigate
    await this.driver.get(`${config.baseUrl}/AddItem`)
    await this.driver.wait(until.elementLocated(By.id('addNewItem_title')))
  }

  async addNewItem(itemDetails) {
    //fill form
    //--title
    await this.driver.findElement(By.id('addNewItem_title')).sendKeys(itemDetails.title)
    //--cat
    // Click to open the Select dropdown
    const selectCat = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="addNewItem"]/div[3]/div/div[2]/div/div/div')), // Adjust selector based on your app
      10000
    )
    await selectCat.click()

    // Wait for the dropdown options to appear
    const catOption = await this.driver.wait(
      until.elementLocated(By.xpath(`//div[contains(@class, 'ant-select-item-option-content') and text()="${itemDetails.category}"]`)),
      10000
    )
    await catOption.click()

    //--condition
    // Click to open the Select dropdown
    const selectCondition = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="addNewItem"]/div[4]/div/div[2]/div/div/div')), // Adjust selector based on your app
      10000
    )
    await selectCondition.click()

    // Wait for the dropdown options to appear
    const conditionOption = await this.driver.wait(
      until.elementLocated(By.xpath(`//*[@id="addNewItem"]/div[4]/div/div[2]/div/div/div/div`)),
      10000
    )
    await conditionOption.click()

    //--cost
    await this.driver.findElement(By.id('addNewItem_price_per_day')).sendKeys(itemDetails.price_per_day)
    await this.driver.findElement(By.id('addNewItem_deposit')).sendKeys(itemDetails.deposit)
    //--submit
    const buttonElement = await this.driver.findElement(By.xpath('//*[@id="addNewItem"]/div[9]/div/div/div/div/button'))
    await this.driver.executeScript('arguments[0].scrollIntoView(true);', buttonElement) // Scroll to the button
    await this.driver.sleep(500)
    await buttonElement.click() // Click the button
  }

  async getSuccessMessage() {
    const successElement = await this.driver.wait(until.elementLocated(By.css('.notification-success')), 10000)
    return await successElement.getText() // Adjust selector based on your implementation
  }
}

module.exports = ItemsFunction

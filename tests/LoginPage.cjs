const { By, until } = require('selenium-webdriver')
const { config } = require('./config')

class LoginPage {
  constructor(driver) {
    this.driver = driver
  }

  async navigate() {
    await this.driver.get(`${config.baseUrl}/#/login`)
    await this.driver.wait(until.elementLocated(By.name('username')))
  }

  async login(username, password) {
    await this.driver.findElement(By.name('username')).sendKeys(username)
    await this.driver.findElement(By.name('password')).sendKeys(password)
    await this.driver.findElement(By.xpath('//button[text()="Sign in"]')).click()
  }
}

module.exports = LoginPage

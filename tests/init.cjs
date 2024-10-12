const { Builder, By, until } = require('selenium-webdriver')

export class InitWebpage {
  constructor(driver) {
    this.driver = driver
  }

  async checkPageTitle() {
    await driver.get(url)
  }

  async login(username, password) {
    await this.driver.findElement(By.name('username')).sendKeys(username)
    await this.driver.findElement(By.name('password')).sendKeys(password)
    await this.driver.findElement(By.xpath('//button[text()="Login"]')).click()
  }
}

async function checkWebpageExists(url, keyword) {
  // Set up the WebDriver (using Chrome in this example)
  let driver = await new Builder().forBrowser('chrome').build()

  try {
    // Navigate to the URL
    await driver.get(url)

    // Get the page title
    let title = await driver.getTitle()

    // Check if the title contains the keyword
    if (title.toLowerCase() === keyword.toLowerCase()) {
      console.log(`The webpage exists and the title is '${keyword}': ${title}`)
    } else {
      console.error(`The webpage exists, but the title is not '${keyword}': ${title}`)
      throw new Error(`The webpage exists, but the title is not '${keyword}': ${title}`)
    }
  } catch (error) {
    console.error(`An error occurred: ${error}`)
  } finally {
    // Close the browser
    await driver.quit()
  }
}

// Example usage
checkWebpageExists('http://localhost:5173', 'iRentStuff') // Replace with your URL and keyword

const { Builder, By, until } = require('selenium-webdriver')

async function checkWebpageExists(url, keyword) {
  // Set up the WebDriver (using Chrome in this example)
  let driver = await new Builder().forBrowser('chrome').build()

  try {
    // Navigate to the URL
    await driver.get(url)

    // Get the page title
    let title = await driver.getTitle()

    // Check if the title contains the keyword
    if (title.toLowerCase().includes(keyword.toLowerCase())) {
      console.log(`The webpage exists and the title contains '${keyword}': ${title}`)
    } else {
      console.log(`The webpage exists, but the title does not contain '${keyword}': ${title}`)
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

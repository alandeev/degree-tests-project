const Selenium = require('selenium-webdriver')

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

describe('Integration - Selenium', () => {
  it('should returns authenticated message when user is valid', async () => {
    const driver = await new Selenium.Builder()
      .forBrowser(Selenium.Browser.FIREFOX)
      .build()

    const optionsMock = {
      username: 'admin',
      password: 'admin',
    }

    try {
      await driver.get('http://localhost:3000')
      await driver.findElement(Selenium.By.name('username'))
        .sendKeys(optionsMock.username, Selenium.Key.RETURN)

      await driver.findElement(Selenium.By.name('password'))
        .sendKeys(optionsMock.password, Selenium.Key.RETURN)

      await driver.findElement(Selenium.By.name('submit'))
        .click()

      const resultMessage = await driver.findElement(Selenium.By.name('result-message'))
        .getText()

      expect(resultMessage).toBe('Usuario autenticado com sucesso!')
    } finally {
      await driver.quit()
    }
  })
})

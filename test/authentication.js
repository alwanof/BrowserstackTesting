require('dotenv').config();
const cap=require('../capabilities')
const {Builder,By,Key,until}=require('selenium-webdriver');
const username = process.env.BROWSERSTACK_USERNAME;
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;
async function test_valid_login (capabilities) {
  capabilities['name']='user can login successfully with valid information';
  let driver = await new Builder()
    .usingServer('http://'+username+':'+accessKey+'@hub-cloud.browserstack.com/wd/hub')
    .withCapabilities({
      ...capabilities,
      ...capabilities['browser'] && { browserName: capabilities['browser']}  // Because NodeJS language binding requires browserName to be defined
    })
    .build();

    await driver.get(process.env.BASE_URL);
        
        let email = driver.findElement(By.id("email"));
        let password = driver.findElement(By.id("password"));
        let login=driver.findElement(By.xpath("//button[@type='submit']"));
        
        email.sendKeys(process.env.USER_LOGIN);
        password.sendKeys(process.env.USER_PASSWORD);
        await login.click();
        
       let assert=await driver.wait(until.elementLocated(By.css("#Overview > .title")),20000).getText();
        if(assert === "Overview"){
      	  await driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "I can see Overview!"}}');
        } else {
      	  await driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Overview not showed"}}');
        }
  
  
  await driver.quit();
}


test_valid_login(cap.useChrome);
test_valid_login(cap.useFirefox);
test_valid_login(cap.useSafari);


const {Builder,By,Key,until}=require('selenium-webdriver');
async function runTestWithCaps (capabilities) {
  let driver = await new Builder()
    .usingServer('http://muradalwan_yNticg:Vgs772YrvJFvgastnqwK@hub-cloud.browserstack.com/wd/hub')
    .withCapabilities({
      ...capabilities,
      ...capabilities['browser'] && { browserName: capabilities['browser']}  // Because NodeJS language binding requires browserName to be defined
    })
    .build();
    await driver.get('https://ads.admixplay.com/login');
        
        let email = driver.findElement(By.id("email"));
        let password = driver.findElement(By.id("password"));
        let login=driver.findElement(By.xpath("//button[@type='submit']"));
        
        email.sendKeys("mohammed.murad@admixplay.com");
        password.sendKeys("Zoom+9321");
        await login.click();
        let assert=await driver.wait(until.elementLocated(By.css("#Overview > .title")),20000).getText();
        if(assert === "Overview"){
      	  await driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "I can see Overview!"}}');
        } else {
      	  await driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Overview not showed"}}');
        }
        //assert(true);
        
        //assert(await driver.wait(until.elementLocated(By.css("#Overview > .title")),20000).getText() == "Overview");
 
  await driver.quit();
}
const capabilities1 = {
  'browser': 'chrome',
  'browser_version': 'latest',
  'browserstack.debug' : 'true',
  'os': 'Windows',
  'os_version': '10',
  'build': 'browserstack-build-1',
  'name': 'Parallel test 1'
}
const capabilities2 = {
	'browser': 'firefox',
  'browser_version': 'latest',
  'browserstack.debug' : 'true',
  'os': 'Windows',
  'os_version': '10',
  'build': 'browserstack-build-1',
  'name': 'Parallel test 2'
}
const capabilities3 = {
	'browser': 'safari',
  'browser_version': 'latest',
  'browserstack.debug' : 'true',
  'os': 'OS X',
  'os_version': 'Big Sur',
  'build': 'browserstack-build-1',
  'name': 'Parallel test 3'
}
runTestWithCaps(capabilities1);
runTestWithCaps(capabilities2);
runTestWithCaps(capabilities3);
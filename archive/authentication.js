
require('dotenv').config();
const {Builder,By,Key,until}=require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
describe('Authentication', function() {
  this.timeout(30000);
 
  beforeEach(async function() {
    driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless())
    //.manage().window().setRect(1920, 1090)
    //.manage().window().minimize()
    .build();

    vars = {}
  });
  afterEach(async function() {

    await driver.takeScreenshot().then(
        function(image){
            let file=this.test.title.replace(/['"]+/g, '');
            require('fs').writeFileSync('test/screenshots/'+file+'.png', image, 'base64');
        }.bind(this)
    );
    await driver.quit();
  });
  

  it('user has to get an alert when type in non-standard password', async function() {
     await driver.get('https://ads.admixplay.com/login');
     await driver.findElement(By.id("email")).sendKeys("mohammed.murad@admixplay.com");
    await driver.findElement(By.id("password")).sendKeys("zoom9314");
    await driver.findElement(By.xpath("//button[@type='submit']")).click(); 
    try {
      await driver.wait(until.elementLocated(By.css(".ant-message-notice:nth-child(1) span:nth-child(2)")),5000);
      
    } catch {

      assert(false,'No alert message has been received'); 
    }

  });
  it('user can not login with invalid password', async function() {
     
     await driver.get('https://ads.admixplay.com/login');
     await driver.findElement(By.id("email")).sendKeys("mohammed.murad@admixplay.com");
    await driver.findElement(By.id("password")).sendKeys("Zoom+9322");
    await driver.findElement(By.xpath("//button[@type='submit']")).click(); 
    try {
      await driver.wait(until.elementLocated(By.css(".ant-message-notice:nth-child(1) span:nth-child(2)")),5000);
      
    } catch  {

      assert(false,'No alert message has been received'); 
    }

  });
  it('user can not login with invalid email', async function() {

     await driver.get('https://ads.admixplay.com/login');
     // invalid email alert
     await driver.findElement(By.id("email")).sendKeys("as");
    
     assert(await driver.wait(until.elementLocated(By.css(".ant-form-item-explain > div")),20000).getText() == "Please enter a valid email!");
    
  });
  it('user can login successfully with valid information', async function() {
        
       
        await driver.get('https://ads.admixplay.com/login');
        
        let email = driver.findElement(By.id("email"));
        let password = driver.findElement(By.id("password"));
        let login=driver.findElement(By.xpath("//button[@type='submit']"));
        
        email.sendKeys("mohammed.murad@admixplay.com");
        password.sendKeys("Zoom+9321");
        await login.click();
        
        assert(await driver.wait(until.elementLocated(By.css("#Overview > .title")),20000).getText() == "Overview");
          
        
    });
});

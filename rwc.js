const puppeteer = require("puppeteer");
var schedule = require('node-schedule');

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

async function rwcLookup(url) {
    const browser = await puppeteer.launch({headless: false});

    const page = await browser.newPage();
    await page.goto(url);

    const elements = await page.$x('//*[@id="mainContent"]/div[2]/div[7]/div[15]/div/div/a')
    await elements[0].click() 

    await delay(4000);

    const element2 = await page.$x('//*[@id="divLoginOptions"]/div[2]/div[2]/div/button')
    await element2[0].click()

    await page.waitForNavigation();

    await page.type('#userNameInput', 'pa912712');
    await page.type('#passwordInput', 'FPCKnights328!');
    await page.keyboard.press('Enter')
    console.log("User logged in successfully.")

    await delay(4000);

    try {
        const element3 = await page.$x('//*[@id="mainContent"]/div[2]/div[7]/div[43]/div/div/div/button') // 9:30pm xpath selector
        await element3[0].click()
    
        await page.waitForNavigation();
        page.click('#mainContent > div:nth-child(2) > form.form-inline > div.container-fluid.clearfix.text-right > button.btn.btn-primary')
        await page.waitForNavigation();
        page.click('#checkoutButton');
    
        await delay(1000)
        page.click('#CheckoutModal > div > div.modal-footer > button.btn.btn-primary');
        console.log("User successfully signed up at 10:30am");
        console.log("Program has finished running.");
    } catch (err) {
        console.error("No reservations available at time requested. Please change selector")
    }


    
}
console.log("Attempting to sign up for 10:30am gym reserveration....\n")

var j = schedule.scheduleJob('52 10 * * *', function(){
    rwcLookup('https://ucfrwc.org/Program/GetProgramDetails?courseId=294d066b-156c-4189-9fc4-f29e66389683&semesterId=7ff5a89d-3a20-4609-a315-cca04ecedf16');
    console.log("[TIME FOUND] around 10:00am:\n")
  });

//10:30am
//console.log("Attempting to sign up for 10:30am gym reserveration....\n")
//rwcLookup('https://ucfrwc.org/Program/GetProgramDetails?courseId=294d066b-156c-4189-9fc4-f29e66389683&semesterId=7ff5a89d-3a20-4609-a315-cca04ecedf16');
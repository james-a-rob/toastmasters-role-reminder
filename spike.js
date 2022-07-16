const puppeteer = require('puppeteer');
const cron = require('node-cron');
const username = "james3";
const password = "7efb3dd3";

// const roles = [
//     {
//         name: "General Evaluator",
//         id: "I ACCEPT the 'General Evaluator' role"
//     },
//     {
//         name: "1st Evaluator",
//         id: "I ACCEPT the 'Evaluator' role"
//     },
//     {
//         name: "Ah Counter",
//         id: "I ACCEPT the 'Ah Counter' role"
//     },
//     {
//         name: "Grammarian",
//         id: "I ACCEPT the 'Grammarian' role"
//     },
//     {
//         name: "Table Topic Master",
//         id: "I ACCEPT the 'Table Topic Master' role"
//     }
// ];

// const findAvailableRoles = (rolesHtml) => {
//     return ['ah counter'];
// }

// const sendAvailableRolesToPhone = (roles) => {

// }

const getNextMeetingHtml = async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true
    });
    const page = await browser.newPage();
    await page.goto('https://toastmasterclub.org/');
    let html = await page.content();
    // console.log(html);
    await page.focus('#username');
    await page.keyboard.type(username);
    await page.focus('input[name=password]');
    await page.keyboard.type(password);

    await page.click('input[type="submit"]');
    await page.waitForSelector('#ui-id-3', { visible: true })

    const linkToNextMeeting = await page.evaluate('document.querySelector("#ui-id-4 > p:nth-child(2) > a").getAttribute("href")')
    console.log(linkToNextMeeting);
    await page.goto(`https://toastmasterclub.org/${linkToNextMeeting}`);
    await page.click('img[alt="Following meeting"]');

    // await page.screenshot({ path: 'example.png' });

    await browser.close();
}



cron.schedule('*/20 * * * * *', async () => {
    getNextMeetingHtml();
    console.log('running a task every 20 seconds');
});
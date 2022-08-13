const puppeteer = require('puppeteer');
require('dotenv').config();
const username = "james3";
const password = process.env.TM_PASSWORD;
const fullName = 'James Robertson';
class Toastmasters {

    async getNextMeeting() {
        console.log(password);
        const browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            headless: true
        });
        const page = await browser.newPage();
        await page.goto('https://toastmasterclub.org/');
        console.log('get latest meeting');
        // console.log(html);
        await page.focus('#username');
        await page.keyboard.type(username);
        await page.focus('input[name=password]');
        await page.keyboard.type(password);

        await page.click('input[type="submit"]');
        await page.waitForSelector('#ui-id-3', { visible: true })

        const nextMeetingId = await page.evaluate('document.querySelector("#ui-id-4 > p:nth-child(2) > a").getAttribute("href")')

        const linkToNextMeeting = `https://toastmasterclub.org/${nextMeetingId}`;
        await page.goto(linkToNextMeeting);
        await page.click('img[alt="Following meeting"]');
        await page.waitForSelector('#ui-id-3', { visible: true })

        const rolesHtml = await page.evaluate(() => document.querySelector('#attendance_and_roles_div > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(2)').innerHTML);
        const myAttendanceHtml = await page.evaluate(() => document.querySelector('#status_div_ > table > tbody > tr:nth-child(1) > td:nth-child(2)').innerHTML);

        await browser.close();

        return [rolesHtml, myAttendanceHtml, page.url()];
    }

    isMeetingOpen(rolesHtml) {
        return rolesHtml.includes(
            'icon_yes.gif'
        )
    }
    roleIsAsignedToMe(rolesHtml) {
        return rolesHtml.includes(
            fullName
        )
    }

    iAmAttending(myAttendanceHtml) {
        return !myAttendanceHtml.includes(
            'I am NOT'
        )
    }
}
module.exports = Toastmasters;
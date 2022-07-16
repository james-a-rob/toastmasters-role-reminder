const puppeteer = require('puppeteer');

class Toastmasters {
    async getLatestMeeting() {
        //return url and html
        const browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            headless: true
        });
        const page = await browser.newPage();
        await page.goto('https://toastmasterclub.org/');
        console.log('get latest meeting');
        const html = await page.content();
        await browser.close();

        // role section html

    }
    getNextMeeting(meetingUrl) {
        //return url and role section html
    }
}

module.exports = Toastmasters;
const puppeteer = require('puppeteer');
const username = "james3";
const password = "";

const roles = [
    {
        name: "General Evaluator",
        id: "I ACCEPT the 'General Evaluator' role"
    },
    {
        name: "1st Evaluator",
        id: "I ACCEPT the 'Evaluator' role"
    },
    {
        name: "Ah Counter",
        id: "I ACCEPT the 'Ah Counter' role"
    },
    {
        name: "Grammarian",
        id: "I ACCEPT the 'Grammarian' role"
    },
    {
        name: "Table Topic Master",
        id: "I ACCEPT the 'Table Topic Master' role"
    }
];

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://toastmasterclub.org/');
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

    await page.screenshot({ path: 'example.png' });

    await browser.close();
})();

// scrape next meetings available roles
// message avialable roles
// listen for incoming sms role choise
// fill out role selection on TM


/* <a href="view_meeting.php?action=volunteer&amp;t=80691&amp;r=4970&amp;n=0&amp;att=1"><img src="templates/TM_Blue/images/lang_english/icon_yes.gif" alt="I ACCEPT the 'Grammarian' role" title="I ACCEPT the 'Grammarian' role" border="0"></a>
<a href="view_meeting.php?action=volunteer&amp;t=80691&amp;r=4971&amp;n=0&amp;att=1"><img src="templates/TM_Blue/images/lang_english/icon_yes.gif" alt="I ACCEPT the 'Table Topic Master' role" title="I ACCEPT the 'Table Topic Master' role" border="0"></a>
<a href="view_meeting.php?action=volunteer&amp;t=80691&amp;r=4968&amp;n=0&amp;att=1"><img src="templates/TM_Blue/images/lang_english/icon_yes.gif" alt="I ACCEPT the 'General Evaluator' role" title="I ACCEPT the 'General Evaluator' role" border="0"></a>

<a href="kb.php?mode=article&amp;k=186" class="genmed">Ah Counter</a> */
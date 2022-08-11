const cron = require('node-cron');
require('dotenv').config()
const Sms = require('./sms');
const Toastmasters = require('./toastmasters');

const run = async () => {
    const toastmasters = new Toastmasters();
    const sms = new Sms();

    const [nextMeetingHtml, nextMeetingLink] = await toastmasters.getNextMeeting();
    const roleIsAsigned = toastmasters.roleIsAsignedToMe(nextMeetingHtml);
    if (roleIsAsigned) {
        console.log('nothing to do');
    } else {
        console.log('sending sms');
        await sms.sendMessage(nextMeetingLink);

    }
    console.log('- - - - finished - - - -');
}
// run();
cron.schedule('0 */12 * * *', async () => {
    try {
        await run();
    } catch (e) {
        console.log(e);
    }
});

module.exports = run;
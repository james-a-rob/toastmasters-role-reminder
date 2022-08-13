const cron = require('node-cron');
require('dotenv').config()
const Sms = require('./sms');
const Toastmasters = require('./toastmasters');

const run = async () => {
    const toastmasters = new Toastmasters();
    const sms = new Sms();

    const [nextMeetingHtml, myAttendanceHtml, nextMeetingLink] = await toastmasters.getNextMeeting();
    const roleIsAsigned = toastmasters.roleIsAsignedToMe(nextMeetingHtml);
    const iAmAttending = toastmasters.iAmAttending(myAttendanceHtml);
    if (roleIsAsigned || !iAmAttending) {
        console.log('nothing to do');
    } else {
        console.log('sending sms');
        await sms.sendMessage(nextMeetingLink);

    }
    console.log('- - - - finished - - - -');
}
// run();
cron.schedule('0 8 * * *', async () => {
    try {
        await run();
    } catch (e) {
        console.log(e);
    }
});

module.exports = run;
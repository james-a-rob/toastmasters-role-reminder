const cron = require('node-cron');
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

cron.schedule('* * * * *', async () => {
    await run();
});

module.exports = run;
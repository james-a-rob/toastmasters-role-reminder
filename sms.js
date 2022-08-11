const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const PHONE_NUMBER = '+447884000071';
class Sms {
    constructor() {

    }
    async sendMessage(nextMeetingLink) {
        const message = await client.messages
            .create({
                body: `Remeber to sign up for toastmasters ${nextMeetingLink}`,
                from: '+14013733252',
                to: PHONE_NUMBER
            });

        return message;

    }
}

new Sms().sendMessage();

module.exports = Sms;
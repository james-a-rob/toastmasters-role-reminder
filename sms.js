const accountSid = process.env.TWILIO_ACCOUNT_SID || "ACe65ec180a112c52486f3e9d30843879b";
const authToken = process.env.TWILIO_AUTH_TOKEN || "5916cfda74c9f30086e44a00b0db3bec";
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
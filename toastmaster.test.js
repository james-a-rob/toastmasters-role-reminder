const Toastmasters = require("./toastmasters");
jest.setTimeout(90000);

describe('toastmaster', () => {
    it.skip('get upcoming meeting', async () => {
        const toastmasters = new Toastmasters();
        await toastmasters.getLatestMeeting();
        // returns html and meeting url
    });

    it('get meeting by meeting url', async () => {

        // returns html and meeting url
    });

    it('checks if meeting is open', () => {
        // returns boolean
    });

    it('it checks if role asigned to me', () => {
        // returns boolean
    });
});
const Toastmasters = require("./toastmasters");
jest.setTimeout(90000);

describe('toastmaster', () => {
    it('get next meeting', async () => {
        const toastmasters = new Toastmasters();
        await toastmasters.getLatestMeeting();

    });
});
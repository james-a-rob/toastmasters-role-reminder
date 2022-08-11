const run = require('./app');
const Sms = require('./sms');
const Toastmasters = require('./toastmasters');
jest.mock('./sms');
jest.mock('./toastmasters');

afterEach(() => {
    jest.clearAllMocks();
});

describe('index', () => {
    it('send reminder sms when not signed up for role at next meeting', async () => {
        Toastmasters.mockImplementation(() => {
            return {
                getNextMeeting: async () => {
                    return "<div>blah</div>"
                },
                roleIsAsignedToMe: () => {
                    return false;
                }
            };
        });
        await run();
        expect(Sms.mock.instances[0].sendMessage).toHaveBeenCalledTimes(1);
    });

    it('do not send reminder sms when already signed up for role at next meeting', async () => {
        Toastmasters.mockImplementation(() => {
            return {
                getNextMeeting: async () => {
                    return "<div>James Robertson</div>"
                },
                roleIsAsignedToMe: () => {
                    return true;
                }
            };
        });
        await run();
        expect(Sms.mock.instances[0].sendMessage).toHaveBeenCalledTimes(0);
    });
});
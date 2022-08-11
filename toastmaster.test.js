const fs = require('fs');
const Toastmasters = require("./toastmasters");
jest.setTimeout(90000);

describe('toastmaster', () => {
    it('checks if open meeting is open', () => {
        // returns boolean
        const rolesHtml = fs.readFileSync('./html-mock-responses/meeting-table-open-unasigned.html');

        const toastmasters = new Toastmasters();
        const isMeetingOpen = toastmasters.isMeetingOpen(rolesHtml.toString());
        expect(isMeetingOpen).toEqual(true);

    });

    it('checks if closed meeting is closed', () => {
        const rolesHtml = fs.readFileSync('./html-mock-responses/meeting-table-closed.html');

        const toastmasters = new Toastmasters();
        const isMeetingOpen = toastmasters.isMeetingOpen(rolesHtml.toString());
        expect(isMeetingOpen).toEqual(false);

    });

    it('checks if role asigned to me', () => {
        const rolesHtml = fs.readFileSync('./html-mock-responses/meeting-table-asigned.html');

        const toastmasters = new Toastmasters();
        const isAsignedToMe = toastmasters.roleIsAsignedToMe(rolesHtml.toString());
        expect(isAsignedToMe).toEqual(true);
    });

    it('checks if role not asigned to me', () => {
        const rolesHtml = fs.readFileSync('./html-mock-responses/meeting-table-open-unasigned.html');

        const toastmasters = new Toastmasters();
        const isAsignedToMe = toastmasters.roleIsAsignedToMe(rolesHtml.toString());
        expect(isAsignedToMe).toEqual(false);
    });
});
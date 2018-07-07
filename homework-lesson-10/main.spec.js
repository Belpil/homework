describe('regexp', function () {

    it('isValidEmail', function () {
        expect(AppUtil.isValidEmail('email@gmail.com')).toBeTruthy();
        expect(AppUtil.isValidEmail('maksim.yakusik@intexsoft.by')).toBeTruthy();

        expect(AppUtil.isValidEmail('  maksim.yakusik@intexsoft.by')).toBeFalsy();
    });

    it('isTime', function () {
        expect(AppUtil.isTime('23:59')).toBeTruthy();
        expect(AppUtil.isTime('12:00')).toBeTruthy();
        expect(AppUtil.isTime('00:00')).toBeTruthy();

        expect(AppUtil.isTime(' 12:00')).toBeFalsy();
        expect(AppUtil.isTime('00  :00')).toBeFalsy();
        expect(AppUtil.isTime('24:00')).toBeTruthy();
        expect(AppUtil.isTime('25:34')).toBeTruthy();
    });

    it('isTimeIn12HourClock', function () {
        expect(AppUtil.isTimeIn12HourClock('12:00 pm')).toBeTruthy();
        expect(AppUtil.isTimeIn12HourClock('12:00 am')).toBeTruthy();
        expect(AppUtil.isTimeIn12HourClock('11:59 am')).toBeTruthy();
        expect(AppUtil.isTimeIn12HourClock('11:59 pm')).toBeTruthy();

        expect(AppUtil.isTimeIn12HourClock('13:00 pm')).toBeFalsy();
        expect(AppUtil.isTimeIn12HourClock('12:64 am')).toBeFalsy();
        expect(AppUtil.isTimeIn12HourClock('11:92 am')).toBeFalsy();
        expect(AppUtil.isTimeIn12HourClock('  11:59 pm')).toBeFalsy();
    });

    it('isValidNumber', function () {
        expect(AppUtil.isValidNumber('123')).toBeTruthy();
        expect(AppUtil.isValidNumber('123.02')).toBeTruthy();
        expect(AppUtil.isValidNumber('123,03')).toBeTruthy();
        expect(AppUtil.isValidNumber('.1')).toBeTruthy();
        expect(AppUtil.isValidNumber('.1e+10')).toBeTruthy();
        expect(AppUtil.isValidNumber('.1e-10')).toBeTruthy();
        expect(AppUtil.isValidNumber('123.02E-2')).toBeTruthy();
        expect(AppUtil.isValidNumber('123,03E+2')).toBeTruthy();

        expect(AppUtil.isValidNumber('123..123')).toBeFalsy();
        expect(AppUtil.isValidNumber('123.e123')).toBeFalsy();
        expect(AppUtil.isValidNumber(' 123,03E+2')).toBeFalsy();
    });

    it('isValidJsFileName', function () {
        expect(AppUtil.isValidJsFileName('test.js')).toBeTruthy();
        expect(AppUtil.isValidJsFileName('test.spec.js')).toBeTruthy();
        expect(AppUtil.isValidJsFileName('home-work.js')).toBeTruthy();
        expect(AppUtil.isValidJsFileName('home_work.js')).toBeTruthy();

        expect(AppUtil.isValidJsFileName('home_work.j')).toBeFalsy();
        expect(AppUtil.isValidJsFileName('home_work.')).toBeFalsy();
        expect(AppUtil.isValidJsFileName('home_work.gs')).toBeFalsy();
        expect(AppUtil.isValidJsFileName('home_work.s')).toBeFalsy();
        expect(AppUtil.isValidJsFileName('home_workjs')).toBeFalsy();
        expect(AppUtil.isValidJsFileName('home_work_js')).toBeFalsy();
    });

});
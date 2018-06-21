describe('Date', function() {
    describe('Creating new Date object', function() {
        it('new Date()', function() {
            var date = new Date();

            expect(date).toEqual( new Date() );
            expect(typeof date).toBe('object');
        });

        it('new Date(milliseconds)', function() {
            var date = new Date(3600 * 24 *1000);

            expect(date.toString()).toBe('Fri Jan 02 1970 03:00:00 GMT+0300 (Москва, стандартное время)');
        });

        it('new Date(year, month, date, hours, minutes, seconds, ms)', function() {
            var date = new Date(2018, 5, 20, 13, 52, 0, 500);

            expect( date.toString() ).toBe('Wed Jun 20 2018 13:52:00 GMT+0300 (Москва, стандартное время)');
            expect( new Date(2018, 5).toString() ).toBe('Fri Jun 01 2018 00:00:00 GMT+0300 (Москва, стандартное время)');
            expect( new Date(18, 5) ).not.toBe('Fri Jun 01 2018 00:00:00 GMT+0300 (Москва, стандартное время)')
            expect( new Date(null, null).toString() ).toBe('Mon Jan 01 1900 00:00:00 GMT+0150 (Москва, стандартное время)')
            expect( new Date(2018, undefined).toString() ).toBe('Invalid Date');
        });

        it('new Date(datestring)', function() {
            var date = new Date( Date.parse('2018-06-20T14:35:45.000Z') );

            expect( date.toString() ).toBe('Wed Jun 20 2018 17:35:45 GMT+0300 (Москва, стандартное время)');
            expect( date.toUTCString() ).toBe('Wed, 20 Jun 2018 14:35:45 GMT');
        });
    });

    describe('Getting date components', function() {
        it('getFullYear()', function() {
            var date = new Date(2018, 5, 20, 14, 15, 0);

            expect( date.getFullYear() ).toBe(2018);
            expect( date.getYear() ).not.toBe(2018);
        });

        it('getMonth()', function() {
            var date = new Date(2018, 5, 20, 14, 15, 0);

            expect( date.getMonth() ).toBe(5);
        });

        it('getDate()', function() {
            var date = new Date(2018, 5, 20, 14, 15, 0);

            expect( date.getDate() ).toBe(20);
        });

        it('getHours()', function() {
            var date = new Date(2018, 5, 20, 14, 15, 0);

            expect( date.getHours() ).toBe(14);
        });

        it('getMinutes()', function() {
            var date = new Date(2018, 5, 20, 14, 15, 0);

            expect( date.getMinutes() ).toBe(15);
        });

        it('getSeconds()', function() {
            var date = new Date(2018, 5, 20, 14, 15, 0);

            expect( date.getSeconds() ).toBe(0);
        });

        it('getMilliseconds()', function() {
            var date = new Date(2018, 5, 20, 14, 15, 0);

            expect( date.getMilliseconds() ).toBe(0);
        });

        it('getDay()', function() {
            var date = new Date(2018, 5, 20, 14, 15, 0);

            expect( date.getDay() ).toBe(3);
        });

        it('get UTC variants', function() {
            var date = new Date(2018, 5, 20, 14, 15, 0);

            expect( date.getUTCFullYear() ).toBe(2018);
            expect( date.getUTCMonth() ).toBe(5);
            expect( date.getUTCDate() ).toBe(20);
            expect( date.getUTCHours() ).toBe(11);
            expect( date.getUTCMinutes() ).toBe(15);
            expect( date.getUTCSeconds() ).toBe(0);
            expect( date.getUTCMilliseconds() ).toBe(0);
        });

        it('getTime()', function() {
            var date = new Date(3600 * 24 * 1000);

            expect( date.getTime() ).toBe(86400000);
        });

        it('getTimezoneOffset()', function() {
            expect( new Date().getTimezoneOffset() ).toBe(-180);
        });
    });

    describe('Setting date components', function() {
        it('setFullYear(year, month, date)', function() {
            var date = new Date();

            date.setFullYear(2020);

            expect( date.getFullYear() ).toBe(2020);

            date.setFullYear(2019, 4);

            expect( date.getFullYear() ).toBe(2019);
            expect( date.getMonth() ).toBe(4);

            date.setFullYear(2021, 8, 1);

            expect( date.getFullYear() ).toBe(2021);
            expect( date.getMonth() ).toBe(8);
            expect( date.getDate() ).toBe(1);
        });

        it('setMonth(month, date)', function() {
            var date = new Date();

            date.setMonth(1);

            expect( date.getMonth() ).toBe(1);

            date.setMonth(2, 15);

            expect( date.getMonth() ).toBe(2);
            expect( date.getDate() ).toBe(15);
        });

        it('setDate(date)', function() {
            var date = new Date();

            date.setDate(10);

            expect( date.getDate() ).toBe(10);
        });

        it('setHours(hours, minutes, seconds, ms)', function() {
            var date = new Date();

            date.setHours(22);

            expect( date.getHours() ).toBe(22);

            date.setHours(20, 15);

            expect( date.getHours() ).toBe(20);
            expect( date.getMinutes() ).toBe(15);

            date.setHours(19, 28, 35);

            expect( date.getHours() ).toBe(19);
            expect( date.getMinutes() ).toBe(28);
            expect( date.getSeconds() ).toBe(35);

            date.setHours(14, 20, 17, 500);

            expect( date.getHours() ).toBe(14);
            expect( date.getMinutes() ).toBe(20);
            expect( date.getSeconds() ).toBe(17);
            expect( date.getMilliseconds() ).toBe(500);
        });

        it('setMinutes(minutes, seconds, ms)', function() {
            var date = new Date();

            date.setMinutes(44);

            expect( date.getMinutes() ).toBe(44);

            date.setMinutes(35, 11);

            expect( date.getMinutes() ).toBe(35);
            expect( date.getSeconds() ).toBe(11);

            date.setMinutes(2, 15, 340);

            expect( date.getMinutes() ).toBe(2);
            expect( date.getSeconds() ).toBe(15);
            expect( date.getMilliseconds() ).toBe(340);
        });

        it('setSeconds(seconds, ms)', function() {
            var date = new Date();

            date.setSeconds(23);

            expect( date.getSeconds() ).toBe(23);

            date.setSeconds(27, 210);

            expect( date.getSeconds() ).toBe(27);
            expect( date.getMilliseconds() ).toBe(210);
        });

        it('setMilliseconds(ms)', function() {
            var date = new Date();

            date.setMilliseconds(753);

            expect( date.getMilliseconds() ).toBe(753);
        });

        it('setTime(ms)', function() {
            var date = new Date();

            date.setTime(13000000000);

            expect(date.toString()).toBe('Sun May 31 1970 14:06:40 GMT+0300 (Москва, стандартное время)');
        });

        it('set UTC variants', function() {
            var date = new Date();

            date.setUTCFullYear(2102);
            date.setUTCMonth(10);
            date.setUTCDate(25);
            date.setUTCHours(15);
            date.setUTCMinutes(3);
            date.setUTCSeconds(26);
            date.setUTCMilliseconds(931);

            expect( date.getUTCFullYear() ).toBe(2102);
            expect( date.getUTCMonth() ).toBe(10);
            expect( date.getUTCDate() ).toBe(25);
            expect( date.getUTCHours() ).toBe(15);
            expect( date.getUTCMinutes() ).toBe(3);
            expect( date.getUTCSeconds() ).toBe(26);
            expect( date.getUTCMilliseconds() ).toBe(931);
        });

        it('autocorrection', function() {
            var date = new Date(2018, 11, 45);

            expect( date.getFullYear() ).toBe(2019);
            expect( date.getMonth() ).toBe(0);
            expect( date.getDate() ).toBe(14);

            date = new Date(2015, 6, 21, 17, 25);

            date.setDate(date.getDate() + 2);

            expect( date.getDate() ).toBe(23);

            date.setMinutes(date.getMinutes() + 5);

            expect( date.getMinutes() ).toBe(30);

            date.setDate(0);

            expect( date.getMonth() ).toBe(5);
            expect( date.getDate() ).toBe(30);

            date.setDate(-1);

            expect( date.getMonth() ).toBe(4);
            expect( date.getDate() ).toBe(30);
        });

        it('convert into number', function() {
            var date = new Date();

            expect(+date).toBe(date.valueOf());
        });
    });

    describe('Date difference', function() {
        it('time measurement', function() {
            var start = new Date(),
                sum = 0,
                end;

            for (var i = 0; i < 1000000; i++){
                sum += i;
            }

            end = new Date();

            expect(end - start).toBeGreaterThan(0);
        });

        it('benchmarking', function() {
            var array = [],
                totalIn = 0,
                totalLength = 0;

            for (var i = 0; i < 100; i++){
                array[i] = i;
            }

            for (var i = 0; i < 100; i++) {
                totalIn += bench(walkIn);
                totalLength += bench(walkLength);
            }

            expect(totalLength).toBeLessThan(totalIn);

            function walkLength(array) {
                for (var i = 0; i < array.length; i++) {
                    i++;
                }
            }

            function walkIn(array) {
                for (var key in array) {
                    array[key]++;
                }
            }

            function bench(f) {
                var date = new Date();

                for (var i = 0; i < 100; i++){
                    f(array);
                }

                return new Date() - date;
            }

        });

        it('performance.now()', function() {
            expect( performance.now() ).toBeGreaterThan(0);
        });
    });

    describe('Date formatting and output', function() {
        it('toLocaleString(), toLocaleDateString(), toLocaleTimeString()', function() {
            var date = new Date(2018, 5, 20, 17, 35, 45),
                options = {
                    era: 'long',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    weekday: 'short',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                };

            expect( date.toLocaleString('ru', {weekday: 'short'}) ).toBe('ср');
            expect( date.toLocaleString('en-US', {weekday: 'short'}) ).toBe('Wed');
            expect( date.toLocaleString('ru', options) ).toBe('ср, 20 июн. 2018 г. от Рождества Христова, 17:35:45');
            expect( date.toLocaleString('en-US', options) ).toBe('Wed, Jun 20, 2018 Anno Domini, 5:35:45 PM');

            expect( date.toLocaleDateString() ).toBe('20.06.2018');
            expect( date.toLocaleDateString('en-US') ).toBe('6/20/2018');
            expect( date.toLocaleDateString('en-GB') ).toBe('20/06/2018');

            expect( date.toLocaleTimeString() ).toBe('17:35:45');
            expect( date.toLocaleTimeString('en-US') ).toBe('5:35:45 PM');
            expect( date.toLocaleTimeString('en-GB') ).toBe('17:35:45');
        });

        it('toString(), toUTCString()', function() {
            var date = new Date(2018, 5, 20, 17, 35, 45);

            expect( date.toString() ).toBe('Wed Jun 20 2018 17:35:45 GMT+0300 (Москва, стандартное время)');
            expect( typeof date.toString() ).toBe('string');

            expect( date.toUTCString() ).toBe('Wed, 20 Jun 2018 14:35:45 GMT');
        });

        it('toISOString()', function() {
            var date = new Date(2018, 5, 20, 17, 35, 45);

            expect( date.toISOString() ).toBe('2018-06-20T14:35:45.000Z');
        });

        it('Date.parse()', function() {
            var string = '2018-06-20T14:35:45.000Z',
                date = new Date( Date.parse(string) );

            expect( Date.parse(string) ).toBe(1529505345000);
            expect( Date.parse('2018-06-20T14:35:45.000Z') ).toBe(1529505345000);
            expect( date.toString() ).toBe('Wed Jun 20 2018 17:35:45 GMT+0300 (Москва, стандартное время)');
            expect( date.toUTCString() ).toBe('Wed, 20 Jun 2018 14:35:45 GMT');
        });

        it('Date.parse() for IE8-', function() {
            var ms = Date.parse('January 26, 2011 13:51:50');

            expect(ms).toBe(1296042710000);
        });
    });
});

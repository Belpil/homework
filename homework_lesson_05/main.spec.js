describe('Strings', function() {
    describe('string creation', function() {
        it('creation of a string using single quotes', function() {
            var str = 'someString';

            expect(str).toBe('someString');
            expect(typeof str).toBe('string');
        });

        it('creation of a string using double quotes', function() {
            var str = "123456";

            expect(str).toBe("123456");
            expect(typeof str).toBe("string");
        });

        it('special chars', function() {
            expect('Hello \n World!').toContain('\n');
            expect('Hello \b World!').toContain('\b');
            expect('Hello \f World!').toContain('\f');
            expect('Hello \r World!').toContain('\r');
            expect('\n'.length).toBe(1);
        });

        it('displaying of special chars', function() {
            expect('Type of "string" is string').toContain('"string"');
            expect("Type of 'string' is string").toContain("'string'");
            expect('I\'m fine').toContain("I'm");
            expect('I\'m fine'.charAt(1)).toBe("'");
            expect('\a').toBe('a');
            expect('\n').not.toBe('n');
        });
    });

    describe('Methods and properties', function() {
        it('.length prop', function() {
            expect('My book'.length).toBe(7);
            expect('My\n book'.length).toBe(8);
            expect(''.length).toBe(0);
            expect(' '.length).toBe(1);
        });

        it('charAt() method', function() {
            var str = 'string';

            expect(str.charAt(0)).toBe('s');
            expect(typeof str.charAt(0)).toBe('string');
            expect(str[1]).toBe('t');
            expect('someStr'.charAt(3)).toBe('e');
            expect('someStr' [3]).toBe('e');

            expect(str[20]).toBe(undefined);
            expect(str.charAt(20)).toBe('');

            expect(''.charAt(0)).toBe('');
            expect('' [0]).not.toBe('');
            expect('' [0]).toBe(undefined);
        });

        it('string changes', function() {
            var string = 'someStr';

            string = string[4] + string[5] + string[6];

            expect(string).toBe('Str');
        });

        it('Registr change', function() {
            expect('hugeString'.toUpperCase()).toBe('HUGESTRING');
            expect('hugestring'.toUpperCase()).toBe('HUGESTRING');
            expect('hUgEsTrInG'.toUpperCase()).toBe('HUGESTRING');
            expect('hUgEsTrInG mOrE'.toUpperCase()).toBe('HUGESTRING MORE');
            expect('HUGESTRING MORE'.toUpperCase()).toBe('HUGESTRING MORE');

            expect('HUGESTRING'.toLowerCase()).toBe('hugestring');
            expect('hugestring'.toLowerCase()).toBe('hugestring');
            expect('hUgEsTrInG mOrE'.toLowerCase()).toBe('hugestring more');
        });

        it('method indexOf() - substring search', function() {
            var str = 'page id with page-id';

            expect(str.indexOf('id')).toBe(5);
            expect(str.indexOf('id', 6)).toBe(18);
            expect(str.indexOf('ag')).toBe(1);
            expect(str.indexOf('fig')).toBe(-1);
        });

        it('all matches', function() {
            var string = 'very very very long veryfication string',
                target = 'ry',
                pos = 0,
                spy = jasmine.createSpy('spy');

            while( (pos = string.indexOf(target, pos + 1)) !== -1 ) {
                spy(target);
            }

            expect(spy.calls.count()).toBe(4);
            expect(spy).toHaveBeenCalledWith('ry');
        });
    });

    describe('Recieving a substring', function() {
        it('substring() method', function() {
            var string = 'extinguisher';

            expect(string.substring(0, 2)).toBe('ex');
            expect(string.substring(2)).toBe('tinguisher');
            expect(string.substring()).toBe('extinguisher');
        });

        it('substr() method', function() {
            var string = 'extinguisher';

            expect(string.substr(0, 5)).toBe('extin');
            expect(string.substr(0, 5).length).toBe(5);
            expect(string.substr()).toBe('extinguisher');
        });

        it('slice() method', function() {
            var string = 'extinguisher';

            expect(string.slice(2)).toBe('tinguisher');
            expect(string.slice(2, 4)).toBe('ti');
            expect(string.slice()).toBe('extinguisher');
        });

        it('substring() method with negative arguments', function() {
            var string = 'extinguisher';

            expect(string.substring(-3)).toBe('extinguisher');
            expect(string.substring(4, -3)).toBe('exti');
            expect(string.substring(4, -3)).toBe(string.substring(0, 4));
        });

        it('substring() with arg > string.length', function() {
            expect('someLongString'.substring(0, 50)).toBe('someLongString');
            expect('someLongString'.substring(0, 50)).toBe('someLongString'.substring());
        });

        it('substring(start, end) with start > end', function() {
            expect('testThis'.substring(4, -1)).toBe('test');
            expect('testThis'.substring(4, -1)).toBe('testThis'.substring(0, 4));
            expect('testThis'.substring(4, 2)).toBe('testThis'.substring(2, 4));
            expect('testThis'.substring(4, 2)).toBe('st');
        });

        it('substr() with first negative arg', function() {
            expect('someString'.substr(-3)).toBe('ing');
            expect('someString'.substr(-3, 2)).toBe('in');
        });

        it('slice() with negative args', function() {
            expect('newString'.slice(-4)).toBe('ring');
            expect('newString'.slice(-4, -2)).toBe('ri');
            expect('newString'.slice(1, -2)).toBe('ewStri');
        });
    });

    describe('UNICODE', function() {
        it('compare letters', function() {
            expect('А' > 'а').toBeFalsy();
            expect('Я' < 'а').toBeTruthy();
            expect('Ё').toBeLessThan('А');
            expect('ё').toBeGreaterThan('я');
        });

        it('getting a code of a char', function() {
            expect('Аа'.charCodeAt(0)).toBe(1040);
            expect('Аа'.charCodeAt(1)).toBe(1072);
            expect('Ёё'.charCodeAt(0)).toBe(1025);
            expect('Ёё'.charCodeAt(1)).toBe(1105);
            expect('Яя'.charCodeAt(0)).toBe(1071);
            expect('Яя'.charCodeAt(1)).toBe(1103);
            expect('0'.charCodeAt(0)).toBe(48);
            expect('9'.charCodeAt(0)).toBe(57);
            expect(''.charCodeAt(0)).toBeNaN();
            expect(' '.charCodeAt(0)).toBe(32);
        });

        it('getting a char from a code', function() {
            expect(String.fromCharCode(1072)).toBe('а');
            expect(String.fromCharCode(1103)).toBe('я');
        });

        it('compare strings', function() {
            expect('Code' < 'Core').toBeTruthy();
            expect('go' < 'going').toBeTruthy();
            expect('' < 'going').toBeTruthy();
            expect(' ' > '').toBeTruthy();
        });

        it('compare numbers as strings', function() {
            expect('19' > '9').toBeFalsy();
            expect('-12' > '9').toBeFalsy();
            expect('-12' < '-9').toBeTruthy();
            expect(9 < '19').toBeTruthy();
        });

        it('compare strings using .localeCompare()', function() {
            expect('Ёлки'.localeCompare('Яблони')).toBe(-1);
            expect('Ананас'.localeCompare('ананас')).toBe(1);
            expect('Ананас'.localeCompare('Ананас')).toBe(0);
            expect(''.localeCompare(' ')).toBe(-1);
        });
    });
});
function addition(left, right) {
    return left + right;
}

function isNull(value) {
    return value === null;
}

function getGreeting(name) {
    return 'Hello ' + name;
}

function parseBoolean(value) {
    return value.trim().toLowerCase() === 'true';
}

function getPathByHash(hash) {
    return hash.split('/').map(function (item) {
        return item.trim();
    }).filter(function (item) {
        return item !== '';
    });
}

describe('Test for addition', function() {
    it('must return number 3 if both args are numbers', function() {
        expect(addition(1, 2)).toBe(3);
    });

    it('must return string "12" if one arg is string', function() {
        expect(addition('1', 2)).toBe('12');
    });

    it('must return string "12" if both args are strings', function() {
        expect(addition('1', '2')).toEqual('12');
    });
    // write tests here
});

describe('Test for isNull', function() {
    it('must return true', function() {
        expect(isNull(null)).toBe(true);
    })

    it('must return false for undefined', function() {
        expect(isNull(undefined)).toBe(false);
    });

    it('must return false for "null" string', function() {
        expect(isNull('null')).not.toBe(true);
    });
    // write tests here
});

describe('Test for getGreeting', function() {
    it('must return string "Hello Alex"', function() {
        expect(getGreeting('Alex')).toBe('Hello Alex');
    })

    it('The result string must contain "Alex"', function() {
        expect(getGreeting('Alex')).toContain('Alex');
    });
    // write tests here
});

describe('Test for parseBoolean', function() {

    it('must return true for " TruE" string', function() {
        expect(parseBoolean(' TruE')).toBe(true);
    });

    it('must return true for "TRUE" string', function() {
        expect(parseBoolean('TRUE')).toBe(true);
    });

    it('must return false for " FaLsE   " string', function() {
        expect(parseBoolean(' FaLsE   ')).not.toBe(true);
    });

    it('must return false for string value', function() {
        expect(parseBoolean(' someString')).toBe(false);
    });
    // write tests here
});

describe('Test for getPathByHash', function() {

    it('must return ["user", "create"] for "user/create" hash string', function() {
        expect(getPathByHash('user/create')).toEqual(['user', 'create']);
    });

    it('must return ["user"] for "user" hash string', function() {
        expect(getPathByHash('user')).toEqual(['user']);
    });

    it('must return ["user", "create", "page"] for "user/create/page" hash string', function() {
        expect(getPathByHash('user/create/page')).toEqual(['user', 'create', 'page']);
    });

    it('must return ["user", "page", "id"] for "  user/page/id    " hash string', function() {
        expect(getPathByHash('  user/page/id    ')).toEqual(["user", "page", "id"]);
    });

    it('must return ["user", "page"] for "user/""/page" hash string', function() {
        expect(getPathByHash('user/' + '' + '/page')).toEqual(["user", "page"]);
    });
    // write tests here
});




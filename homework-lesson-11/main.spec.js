describe('Patterns; User\'s API', function() {
    it('Singleton', function() {
        var myApp = {
            mainControl: new MainControl(),
            userControl: new UserControl()
        };

        function UserControl() {
            var main = this,
                namePattern = /^[A-Z]\w+$/;

            main.get = function(id){
                var result = myApp.mainControl.find(id);

                if (result === undefined || result.deleteDate !== undefined) {
                    throw new Error('User not found by ID: ' + id);
                }

                return result;
            };

            main.create = function(id, user) {
                if (getTypeOf(id) !== 'number' ||
                    getTypeOf(user) !== 'object') {
                    throw new Error('Enter the correct arguments');
                }

                if (getTypeOf(user.name) !== 'string') {
                    throw new Error('User name should be a string');
                }

                if ( !isValidUserName(user.name, namePattern) ) {
                    throw new Error('Enter the correct user name');
                }

                if ( myApp.mainControl.find(id) ) {
                    throw new Error('User with such ID ' + id + ' is already exist');
                }

                myApp.mainControl.save(id, user);
            };

            main.delete = function(id, fullDelete) {
                var result;

                if (fullDelete) {
                    result = myApp.mainControl.delete(id);
                } else {
                    result = myApp.mainControl.find(id);
                }

                if (!result) {
                    throw new Error('User not found by id: ' + id);
                }

                if (!fullDelete) {
                    result.deleteDate = new Date;
                    myApp.mainControl.save(id, result);
                }


                return result;
            };
        }

        function MainControl() {
            var main = this,
                storage = {};

            main.save = function(id, data) {
                storage[id] = Object.assign({}, data);
            };

            main.find = function(id) {
                var result = storage[id];

                if (result) {
                    result = Object.assign({}, result);
                }

                return result;
            };

            main.findAll = function(ids) {
                return ids.map(function(id) {
                    return storage[id];
                });
            };

            main.delete = function(id) {
                var result = main.find(id);

                delete storage[id];

                return result;
            };

            main.update = function(id, data) {
                var result = storage[id];

                if (result) {
                    result = Object.assign(result, data);
                }

                return result;
            };
        }

        function getTypeOf(value) {
            var result;

            if (value === null) {
                result = 'null';
            } else {
                result = typeof value;
            }

            return result;
        }

        function isValidUserName(name, namePattern) {
            var result = true,
                userName = name.split(' ');

            for (var i = 0; i < userName.length; i++) {
                if ( !namePattern.test(userName[i]) ) {
                    result = false;
                    break;
                }
            }

            return result;
        }

        myApp.userControl.create(1, {name: 'Alex Kryskevich'});
        myApp.userControl.create(10, {name: 'Vasya Ivanov'});

        expect( myApp.mainControl.find(1).name ).toBe('Alex Kryskevich');

        expect( function() { myApp.userControl.create(1, {name: 'Ivan'}) } ).
                toThrow(new Error('User with such ID 1 is already exist'));
        expect( function() { myApp.userControl.create(2, {name: 10}) } ).
                toThrow(new Error('User name should be a string'));
        expect( function() { myApp.userControl.create(3, {name: 'alex kryskevich'}) } ).
                toThrow(new Error('Enter the correct user name'));
        expect( function() { myApp.userControl.create(3, {name: 'Alex kryskevich'}) } ).
                toThrow(new Error('Enter the correct user name'));
        expect( function() { myApp.userControl.create(4, 'Alex') } ).
                toThrow(new Error('Enter the correct arguments'));
        expect( function() { myApp.userControl.create('5', {name: 'Alex'}) } ).
                toThrow(new Error('Enter the correct arguments'));
        expect( function() { myApp.userControl.delete(10000) } ).
                toThrow(new Error('User not found by id: 10000'));

        expect( typeof myApp.mainControl.find(1) ).toBe('object');
        expect( myApp.mainControl.find(1).name ).toBe('Alex Kryskevich');
        expect( typeof myApp.mainControl.findAll([1, 10]) ).toBe('object');
        expect( myApp.mainControl.findAll([1, 10]) instanceof Array).toBeTruthy();
        expect( myApp.mainControl.findAll([1, 10]).length).toBe(2);
        expect( myApp.mainControl.findAll([1, 10])[0] instanceof Object).toBeTruthy();

        myApp.userControl.delete(1, true);

        expect( myApp.mainControl.find(1) ).toBeUndefined();
    });

    it('Injection of control', function() {
        var userControl = new UserControl(),
            mainControl = new MainControl();

        userControl.setMainControl(mainControl);

        function UserControl() {
            var main = this,
                namePattern = /^[A-Z]\w+$/;

            main.setMainControl = function(_mainControl) {
                mainControl = _mainControl;
            };

            main.get = function(id){
                var result = mainControl.find(id);

                if (result === undefined || result.deleteDate !== undefined) {
                    throw new Error('User not found by ID: ' + id);
                }

                return result;
            };

            main.create = function(id, user) {
                if (getTypeOf(id) !== 'number' ||
                    getTypeOf(user) !== 'object') {
                    throw new Error('Enter the correct arguments');
                }

                if (getTypeOf(user.name) !== 'string') {
                    throw new Error('User name should be a string');
                }

                if ( !isValidUserName(user.name, namePattern) ) {
                    throw new Error('Enter the correct user name');
                }

                if ( mainControl.find(id) ) {
                    throw new Error('User with such ID ' + id + ' is already exist');
                }

                mainControl.save(id, user);
            };

            main.delete = function(id, fullDelete) {
                var result;

                if (fullDelete) {
                    result = mainControl.delete(id);
                } else {
                    result = mainControl.find(id);
                }

                if (!result) {
                    throw new Error('User not found by id: ' + id);
                }

                if (!fullDelete) {
                    result.deleteDate = new Date;
                    mainControl.save(id, result);
                }


                return result;
            };
        }

        function MainControl() {
            var main = this,
                storage = {};

            main.save = function(id, data) {
                storage[id] = Object.assign({}, data);
            };

            main.find = function(id) {
                var result = storage[id];

                if (result) {
                    result = Object.assign({}, result);
                }

                return result;
            };

            main.findAll = function(ids) {
                return ids.map(function(id) {
                    return storage[id];
                });
            };

            main.delete = function(id) {
                var result = main.find(id);

                delete storage[id];

                return result;
            };

            main.update = function(id, data) {
                var result = storage[id];

                if (result) {
                    result = Object.assign(result, data);
                }

                return result;
            };
        }

        function getTypeOf(value) {
            var result;

            if (value === null) {
                result = 'null';
            } else {
                result = typeof value;
            }

            return result;
        }

        function isValidUserName(name, namePattern) {
            var result = true,
                userName = name.split(' ');

            for (var i = 0; i < userName.length; i++) {
                if ( !namePattern.test(userName[i]) ) {
                    result = false;
                    break;
                }
            }

            return result;
        }

        userControl.create(1, {name: 'Alex Kryskevich'});
        userControl.create(10, {name: 'Vasya Ivanov'});

        expect( mainControl.find(1).name ).toBe('Alex Kryskevich');

        expect( function() { userControl.create(1, {name: 'Ivan'}) } ).
                toThrow(new Error('User with such ID 1 is already exist'));
        expect( function() { userControl.create(2, {name: 10}) } ).
                toThrow(new Error('User name should be a string'));
        expect( function() { userControl.create(3, {name: 'alex kryskevich'}) } ).
                toThrow(new Error('Enter the correct user name'));
        expect( function() { userControl.create(3, {name: 'Alex kryskevich'}) } ).
                toThrow(new Error('Enter the correct user name'));
        expect( function() { userControl.create(4, 'Alex') } ).
                toThrow(new Error('Enter the correct arguments'));
        expect( function() { userControl.create('5', {name: 'Alex'}) } ).
                toThrow(new Error('Enter the correct arguments'));
        expect( function() { userControl.delete(10000) } ).
                toThrow(new Error('User not found by id: 10000'));

        expect( typeof mainControl.find(1) ).toBe('object');
        expect( mainControl.find(1).name ).toBe('Alex Kryskevich');
        expect( typeof mainControl.findAll([1, 10]) ).toBe('object');
        expect( mainControl.findAll([1, 10]) instanceof Array).toBeTruthy();
        expect( mainControl.findAll([1, 10]).length).toBe(2);
        expect( mainControl.findAll([1, 10])[0] instanceof Object).toBeTruthy();

        userControl.delete(1, true);

        expect( mainControl.find(1) ).toBeUndefined();
    });

    it('Constructor injection', function() {
        var mainControl = new MainControl(),
            userControl = new UserControl(mainControl);

        function UserControl(mainControl) {
            var main = this,
                namePattern = /^[A-Z]\w+$/;

            main.get = function(id){
                var result = mainControl.find(id);

                if (result === undefined || result.deleteDate !== undefined) {
                    throw new Error('User not found by ID: ' + id);
                }

                return result;
            };

            main.create = function(id, user) {
                if (getTypeOf(id) !== 'number' ||
                    getTypeOf(user) !== 'object') {
                    throw new Error('Enter the correct arguments');
                }

                if (getTypeOf(user.name) !== 'string') {
                    throw new Error('User name should be a string');
                }

                if ( !isValidUserName(user.name, namePattern) ) {
                    throw new Error('Enter the correct user name');
                }

                if ( mainControl.find(id) ) {
                    throw new Error('User with such ID ' + id + ' is already exist');
                }

                mainControl.save(id, user);
            };

            main.delete = function(id, fullDelete) {
                var result;

                if (fullDelete) {
                    result = mainControl.delete(id);
                } else {
                    result = mainControl.find(id);
                }

                if (!result) {
                    throw new Error('User not found by id: ' + id);
                }

                if (!fullDelete) {
                    result.deleteDate = new Date;
                    mainControl.save(id, result);
                }


                return result;
            };
        }

        function MainControl() {
            var main = this,
                storage = {};

            main.save = function(id, data) {
                storage[id] = Object.assign({}, data);
            };

            main.find = function(id) {
                var result = storage[id];

                if (result) {
                    result = Object.assign({}, result);
                }

                return result;
            };

            main.findAll = function(ids) {
                return ids.map(function(id) {
                    return storage[id];
                });
            };

            main.delete = function(id) {
                var result = main.find(id);

                delete storage[id];

                return result;
            };

            main.update = function(id, data) {
                var result = storage[id];

                if (result) {
                    result = Object.assign(result, data);
                }

                return result;
            };
        }

        function getTypeOf(value) {
            var result;

            if (value === null) {
                result = 'null';
            } else {
                result = typeof value;
            }

            return result;
        }

        function isValidUserName(name, namePattern) {
            var result = true,
                userName = name.split(' ');

            for (var i = 0; i < userName.length; i++) {
                if ( !namePattern.test(userName[i]) ) {
                    result = false;
                    break;
                }
            }

            return result;
        }

        userControl.create(1, {name: 'Alex Kryskevich'});
        userControl.create(10, {name: 'Vasya Ivanov'});

        expect( mainControl.find(1).name ).toBe('Alex Kryskevich');

        expect( function() { userControl.create(1, {name: 'Ivan'}) } ).
                toThrow(new Error('User with such ID 1 is already exist'));
        expect( function() { userControl.create(2, {name: 10}) } ).
                toThrow(new Error('User name should be a string'));
        expect( function() { userControl.create(3, {name: 'alex kryskevich'}) } ).
                toThrow(new Error('Enter the correct user name'));
        expect( function() { userControl.create(3, {name: 'Alex kryskevich'}) } ).
                toThrow(new Error('Enter the correct user name'));
        expect( function() { userControl.create(4, 'Alex') } ).
                toThrow(new Error('Enter the correct arguments'));
        expect( function() { userControl.create('5', {name: 'Alex'}) } ).
                toThrow(new Error('Enter the correct arguments'));
        expect( function() { userControl.delete(10000) } ).
                toThrow(new Error('User not found by id: 10000'));

        expect( typeof mainControl.find(1) ).toBe('object');
        expect( mainControl.find(1).name ).toBe('Alex Kryskevich');
        expect( typeof mainControl.findAll([1, 10]) ).toBe('object');
        expect( mainControl.findAll([1, 10]) instanceof Array).toBeTruthy();
        expect( mainControl.findAll([1, 10]).length).toBe(2);
        expect( mainControl.findAll([1, 10])[0] instanceof Object).toBeTruthy();

        userControl.delete(1, true);

        expect( mainControl.find(1) ).toBeUndefined();
    });
});

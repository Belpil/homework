'use strict';

describe('prototype style', function() {
    describe('object prototype', function() {
        it('__proto__', function() {
            var firstObject = {
                firstProperty: true
            },
                secondObject = {
                secondProperty: true
            };

            secondObject.__proto__ = firstObject;

            expect(secondObject.secondProperty).toBeTruthy();
            expect(secondObject.firstProperty).toBeTruthy();

            secondObject.firstProperty = false;

            expect(firstObject.firstProperty).toBeTruthy();
            expect(secondObject.firstProperty).toBeFalsy();
        });

        it('hasOwnProperty()', function() {
            var firstObject = {
                firstProperty: true
            },
                secondObject = {
                secondProperty: true
            },
                spy = jasmine.createSpy('spy'),
                secondSpy = jasmine.createSpy('secondSpy');

            secondObject.__proto__ = firstObject;

            for (var key in secondObject) {
                spy(key);
            }

            expect( spy.calls.count() ).toBe(2);
            expect(spy).toHaveBeenCalledWith('firstProperty');
            expect(spy).toHaveBeenCalledWith('secondProperty');

            expect( secondObject.hasOwnProperty('firstProperty') ).toBeFalsy();
            expect( secondObject.hasOwnProperty('secondProperty') ).toBeTruthy();

            for (var key in secondObject) {
                if ( !secondObject.hasOwnProperty(key) ) {
                    continue;
                } else {
                    secondSpy(key);
                }
            }

            expect( secondSpy.calls.count() ).toBe(1);
            expect(secondSpy).toHaveBeenCalledWith('secondProperty');
        });

        it('Object.create(null)', function() {
            var firstObject = {
                text: 'someTextHere'
            },
                secondObject = Object.create(null);

            secondObject.text = 'someSecondTextHere';

            expect(firstObject.toString).toBeDefined();
            expect(secondObject.toString).toBeUndefined();
        });

        it('Object.getPrototypeOf(obj)', function() {
            var firstObj = {
                firstProp: 'firstValue'
            },
                secondObj = {
                secondProp: 'secondValue'
            };

            secondObj.__proto__ = firstObj;

            expect( Object.getPrototypeOf(secondObj) ).toBe(firstObj);
        });

        it('Object.setPrototypeOf(obj, proto)', function() {
            var firstObj = {
                firstProp: 'firstValue'
            },
                secondObj = {
                secondProp: 'secondValue'
            };

            Object.setPrototypeOf(secondObj, firstObj);

            expect( Object.getPrototypeOf(secondObj) ).toBe(firstObj);

            Object.setPrototypeOf(secondObj, null);

            expect( Object.getPrototypeOf(secondObj) ).toBeNull();
        });
    });

    describe('F.prototype, create via new', function() {
        it('F.prototype property', function() {
            var vehicle = {
                engine: true
            },
                familyCar;

            function CarConstructor(name) {
                this.name = name;
                this.__proto__ = vehicle;
            }

            familyCar = new CarConstructor('Van');

            expect(familyCar.name).toBe('Van');
            expect(familyCar.engine).toBeTruthy();
        });

        it('Object.prototype', function() {
            var vehicle = {
                engine: true
            },
                familyCar,
                doorsNumber = 4;

            function CarConstructor(name) {
                this.name = name;
            }

            CarConstructor.prototype = vehicle;

            familyCar = new CarConstructor('Van');

            expect(familyCar.name).toBe('Van');
            expect(familyCar.engine).toBeTruthy();

            CarConstructor.prototype = doorsNumber;

            expect(familyCar.doorsNumber).not.toBe(4);
        });

        it('constructor property', function() {
            var firstCar,
                secondCar;

            function CarConstructor() {}

            expect( Object.getOwnPropertyNames(CarConstructor.prototype) ).toEqual(['constructor']);
            expect(CarConstructor.prototype.constructor == CarConstructor).toBe(true);

            function Car(name) {
                this.name = name;
            }

            firstCar = new Car('Van');
            secondCar = new firstCar.constructor('Bus');

            expect(firstCar.name).toBe('Van');
            expect(secondCar.name).toBe('Bus');
        });

        it('lose of constructor property', function() {
            function CarConstructor() {
                this.engine = true;
            }

            function HouseConstructor() {
                this.flatsAmmount = 100;
            }

            CarConstructor.prototype = {
                windShield: true
            };

            expect(CarConstructor.prototype.constructor == CarConstructor).not.toBeTruthy();

            CarConstructor.prototype = {
                constructor: CarConstructor
            };

            expect(CarConstructor.prototype.constructor == CarConstructor).toBeTruthy();

            HouseConstructor.prototype.entry = true;

            expect(HouseConstructor.prototype.constructor == HouseConstructor).toBeTruthy();
        });

        it('emulation of Object.create(proto)', function() {
            var vehicle = {
                engine: true,
                exhaust: true
            },
                firstCar,
                secondCar;

            function inherit(proto) {
                function F() {}
                F.prototype = proto;
                var object = new F;
                return object;
            }

            firstCar = inherit(vehicle);
            secondCar = Object.create(vehicle);

            expect(firstCar).toEqual(secondCar);
            expect( Object.getPrototypeOf(firstCar) ).toBe( Object.getPrototypeOf(secondCar) );
        });
    });

    describe('Mounted classes in JavaScript', function() {
        it('{} methods', function() {
            var obj = {};

            expect({}.__proto__.toString).not.toBeUndefined();

            expect(obj.toString == Object.prototype.toString).toBeTruthy();
            expect(obj.__proto__ == Object.prototype).toBeTruthy();
            expect(obj.__proto__.__proto__).toBeNull();
        });

        it('Mounted classes', function() {
            var array = [];

            expect(array.__proto__ == Array.prototype).toBeTruthy();
            expect(Array.prototype.__proto__ == Object.prototype).toBeTruthy();

            function someFunc() {}

            expect(someFunc.__proto__).toBe(Function.prototype);
            expect(Function.prototype.__proto__).toBe(Object.prototype);

            expect(Object.prototype.__proto__).toBeNull();
        });

        it('methods from prototype via "call" and "apply" to args', function() {
            var firstString = function() {
                return [].join.call(arguments, '-');
            },
                secondString = function() {
                return Array.prototype.join.call(arguments, '-');
            },
                thirdString = function() {
                return [].join.apply(arguments, ['-']);
            },
                forthString = function() {
                return Array.prototype.join.apply(arguments, ['-']);
            };

            expect( firstString('Jack', 'Jimmy', 'Mike') ).toBe( secondString('Jack', 'Jimmy', 'Mike') )
            expect( thirdString('Jack', 'Jimmy', 'Mike') ).toBe( forthString('Jack', 'Jimmy', 'Mike') )
        });

        it('primitives', function() {
            var number = 1,
                string = 'someText',
                boolean = true;

            expect(number.__proto__).toBe(Number.prototype);
            expect(string.__proto__).toBe(String.prototype);
            expect(boolean.__proto__).toBe(Boolean.prototype);
        });

        it('change mounted prototypes', function() {
            var array = [1, 2, 3];

            expect( array.toString() ).toBe('1,2,3');

            Array.prototype.toString = function() {
                return this.join('/');
            }

            expect( array.toString() ).toBe('1/2/3');
        });
    });

    describe('Own classes on prototypes', function() {
        it('class via prototype', function() {
            var car;

            function Car(name) {
                this.name = name;
                this.speed = 0;
            }

            Car.prototype.accelerate = function(speed) {
                this.speed += speed;
            };

            Car.prototype.stop = function() {
                this.speed = 0;
            };

            car = new Car('Van');

            expect(car.speed).toBe(0);

            car.accelerate(100);

            expect(car.speed).toBe(100);

            car.stop();

            expect(car.speed).toBe(0);
        });
    });

    describe('class inheritance in JavaScript', function() {
        it('inheritance', function() {
            var aircraft,
                newAircraft;

            function Vehicle(name) {
                this.name = name;
                this.speed = 0;
                this.doors = 'closed';
            }

            Vehicle.prototype.accelerate = function(speed) {
                this.speed += speed;
            };

            Vehicle.prototype.stop = function(){
                this.speed = 0;
            };

            function Plane(name) {
                this.name = name;
                this.speed = 0;
                this.doors = 'closed';
            }

            Plane.prototype.openDoors = function() {
                this.doors = 'opened';
            };

            aircraft = new Plane('Boeing');

            expect(Plane.prototype.accelerate).toBeUndefined();

            Plane.prototype = Object.create(Vehicle.prototype);
            Plane.prototype.constructor = Plane; 

            newAircraft = new Plane('Airbus');

            newAircraft.accelerate(1000);

            expect(Plane.prototype.accelerate).toBeDefined();
            expect(newAircraft.speed).toBe(1000);
        });

        it('call parent constructor', function() {
            var car;

            function Vehicle(name) {
                this.name = name;
                this.speed = 0;
            }

            function Car(name) {
                Vehicle.apply(this, arguments);
            }

            car = new Car('Van');

            expect(car.name).toBe('Van');
            expect(car.speed).toBe(0);
        });

        it('change method', function() {
            var car;

            function Vehicle(name) {
                this.name = name;
                this.speed = 0;
            }

            Vehicle.prototype.accelerate = function(speed) {
                this.speed += speed;
            };

            function Car(name) {
                Vehicle.apply(this, arguments);
            }

            Car.prototype.accelerate = function() {
                this.speed++;
            };

            car = new Car('Van');

            car.accelerate();

            expect(car.speed).toBe(1);

            car.accelerate(20);

            expect(car.speed).not.toBe(20);
            expect(car.speed).toBe(2);
        });

        it('call parent\'s method inside', function() {
            var car;

            function Vehicle(name) {
                this.name = name;
                this.speed = 0;
            }

            Vehicle.prototype.accelerate = function(speed) {
                this.speed += speed;
            };

            function Car(name) {
                Vehicle.apply(this, arguments);
            }

            Car.prototype.accelerate = function() {
                Vehicle.prototype.accelerate.apply(this, arguments);
                this.speed++;
            };

            car = new Car('Van');

            car.accelerate(20);

            expect(car.speed).toBe(21);
        });
    });

    describe('instanceOf', function() {
        it('algoritm of instanceof', function() {
            var car,
                array = [];

            function Car() {}

            car = new Car();

            expect(car instanceof Car).toBeTruthy();
            expect(array instanceof Array).toBeTruthy();
            expect(array instanceof Object).toBeTruthy();

            expect(car.__proto__).toBe(Car.prototype);
            expect(array.__proto__).toBe(Array.prototype);
            expect(array.__proto__.__proto__).toBe(Object.prototype);

            Car.prototype = {};

            expect(car instanceof Car).toBeFalsy();
            expect(car.__proto__).not.toBe(Car.prototype);
        });
    });

    describe('Errors; inheritance from Error', function() {
        it('error\'s object', function() {
            function PropertyError(property) {
                Error.call(this, property);

                this.name = 'PropertyError';
                this.property = property;

                if (Error.captureStackTrace) {
                    Error.captureStackTrace(this, PropertyError);
                } else {
                    this.stack = ( new Error() ).stack;
                }
            }

            PropertyError.prototype = Object.create(Error.prototype);

            function readUser(data) {
                var user = JSON.parse(data);

                if(!user.age) {
                    throw new PropertyError("age");
                } else if (!user.name) {
                    throw new PropertyError("name")
                }

                return user;
            }

            try {
                var user = readUser('{"age": 25}');
            } catch (err) {
                expect(err.property).toBe('name');
                expect(err.name).toBe('PropertyError');
                expect(err instanceof PropertyError).toBeTruthy();
            }
        });
    });

    describe('Mixin', function() {
        it('mixin example', function() {
            var sayMixin = {
                sayHi: function() {
                    return 'Hello ' + this.name;
                },
                sayBye: function() {
                    return 'Goodbye ' + this.name;
                }
            },
                spy = jasmine.createSpy('spy'),
                user;

            function User(name) {
                this.name = name;
            }

            for (var key in sayMixin) {
                User.prototype[key] = sayMixin[key];
                spy(key);
            }

            user = new User('Ivan');

            expect( user.sayHi() ).toBe('Hello Ivan');
            expect( user.sayBye() ).toBe('Goodbye Ivan');
            expect( spy.calls.count() ).toBe(2);
            expect(spy).toHaveBeenCalledWith('sayHi');
            expect(spy).toHaveBeenCalledWith('sayBye');
        });
    });
});
describe('MatrixUtil', function () {
    describe('create', function () {
        it('simple', function () {
            var result = MatrixUtil.create(2, 2);

            expect(result).toEqual([
                [undefined, undefined],
                [undefined, undefined]
            ]);
        });

        it('with one argument', function () {
            var result = MatrixUtil.create(3);

            expect(result).toEqual([
                [undefined, undefined, undefined],
                [undefined, undefined, undefined],
                [undefined, undefined, undefined]
            ]);
        });

        it('with a default value', function () {
            var result = MatrixUtil.create(3, 3, true);

            expect(result).toEqual([
                [true, true, true],
                [true, true, true],
                [true, true, true]
            ]);
        });
    });

    it('toString', function () {
        var toStringForMatrixBooleanValue = MatrixUtil.toString(function (item) {
                return item ? 'x' : 'o';
            }),
            matrix = MatrixUtil.create(2, 2, true);

        expect(toStringForMatrixBooleanValue(matrix)).toEqual(
            'xx\n' +
            'xx'
        );

        matrix[0][0] = false;
        matrix[1][1] = false;

        expect(toStringForMatrixBooleanValue(matrix)).toEqual(
            'ox\n' +
            'xo'
        );
    });

    describe('setValueForSector', function () {
        it('set for all, left and top part', function () {
            var matrix = MatrixUtil.create(3, 3, true),
                setValueForMyMatrix = MatrixUtil.setValueForSector(matrix),
                setValueForAll = setValueForMyMatrix(0, 0, 2, 2),
                setValueForLeftPart = setValueForMyMatrix(0, 0, 2, 0);
                setValueForTopPart = setValueForMyMatrix(0, 0, 0, 2);

            setValueForAll(false);

            expect(matrix).toEqual([
                [false, false, false],
                [false, false, false],
                [false, false, false]
            ]);

            setValueForLeftPart(true);

            expect(matrix).toEqual([
                [true, false, false],
                [true, false, false],
                [true, false, false]
            ]);

            setValueForTopPart(true);

            expect(matrix).toEqual([
                [true, true, true],
                [true, false, false],
                [true, false, false]
            ]);
        });
    });

    describe('my tests for setValueForSector', function() {
        it('set for all', function() {
            var matrix = MatrixUtil.create(4),
                setValueForMyMatrix = MatrixUtil.setValueForSector(matrix),
                setValueForAll = setValueForMyMatrix(0, 0, 3, 3);

            setValueForAll(true);

            expect(matrix).toEqual([
                [true, true, true, true],
                [true, true, true, true],
                [true, true, true, true],
                [true, true, true, true]
            ]);
        });

        it('set for left column', function() {
            var matrix = MatrixUtil.create(4),
                setValueForMyMatrix = MatrixUtil.setValueForSector(matrix),
                setValueForAll = setValueForMyMatrix(0, 0, 3, 0);

            setValueForAll(true);

            expect(matrix).toEqual([
                [true, undefined, undefined, undefined],
                [true, undefined, undefined, undefined],
                [true, undefined, undefined, undefined],
                [true, undefined, undefined, undefined]
            ]);
        });

        it('set for right column', function() {
            var matrix = MatrixUtil.create(4, 3, false),
                setValueForMyMatrix = MatrixUtil.setValueForSector(matrix),
                setValueForAll = setValueForMyMatrix(0, 2, 3, 2);

            setValueForAll(true);

            expect(matrix).toEqual([
                [false, false, true],
                [false, false, true],
                [false, false, true],
                [false, false, true]
            ]);
        });

        it('set for top row', function() {
            var matrix = MatrixUtil.create(4, 4, false),
                setValueForMyMatrix = MatrixUtil.setValueForSector(matrix),
                setValueForAll = setValueForMyMatrix(0, 0, 0, 3);

            setValueForAll(true);

            expect(matrix).toEqual([
                [true, true, true, true],
                [false, false, false, false],
                [false, false, false, false],
                [false, false, false, false]
            ]);
        });

        it('set for bottom row', function() {
            var matrix = MatrixUtil.create(4),
                setValueForMyMatrix = MatrixUtil.setValueForSector(matrix),
                setValueForAll = setValueForMyMatrix(3, 0, 3, 3);

            setValueForAll(true);

            expect(matrix).toEqual([
                [undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined],
                [true, true, true, true]
            ]);
        });

        it('set for middle row', function() {
            var matrix = MatrixUtil.create(3, 3, false),
                setValueForMyMatrix = MatrixUtil.setValueForSector(matrix),
                setValueForAll = setValueForMyMatrix(1, 0, 1, 2);

            setValueForAll(true);

            expect(matrix).toEqual([
                [false, false, false],
                [true, true, true],
                [false, false, false]
            ]);
        });

        it('set for middle column', function() {
            var matrix = MatrixUtil.create(3, 3, false),
                setValueForMyMatrix = MatrixUtil.setValueForSector(matrix),
                setValueForAll = setValueForMyMatrix(0, 1, 2, 1);

            setValueForAll(true);

            expect(matrix).toEqual([
                [false, true, false],
                [false, true, false],
                [false, true, false]
            ]);
        });
    });
});

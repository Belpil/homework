(function (global) {
    'use strict';

    var MatrixUtil = {};

    global.MatrixUtil = MatrixUtil;
    
    MatrixUtil.create = function (height, width, value) {
        var result = new Array(height),
            line;

        width = width || height;

        for (var index = 0 ; height > index; index++) {
            line = new Array(width);
            line.fill(value);

            result[index] = line;
        }

        return result;
    };

    MatrixUtil.toString = function (valueConverter) {
        return function (matrix) {
            return matrix.map(function (line) {
                return line.map(function (item) {
                    return valueConverter(item);
                }).join('');
            }).join('\n');
        };
    };

    MatrixUtil.setValueForSector = function (matrix) {
        return function (aY, aX, bY, bX) {
            return function (value) {
                // write code here
                for (var i = aY; i <= bY; i++) {
                    for (var j = aX; j <= bX; j++) {
                        matrix[i][j] = value;
                    }
                }
            };
        };
    };


})(typeof module !== 'undefined' ? module.exports : window);

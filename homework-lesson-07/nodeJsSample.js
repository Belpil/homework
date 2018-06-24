var MatrixUtil = require('./main.js').MatrixUtil,
    toStringForMatrixBooleanValue = MatrixUtil.toString(function (item) {
        return item ? 'x' : 'o';
    }),
    matrix = MatrixUtil.create(5, 5, false),
    setValueForMyMatrix = MatrixUtil.setValueForSector(matrix),
    setValueForLeftPart = setValueForMyMatrix(0, 0, 4, 0),
    result;

setValueForLeftPart(true);

result = toStringForMatrixBooleanValue(matrix);

console.log(result);

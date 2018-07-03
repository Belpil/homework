(function (AppUtil) {

    var debounceBlockElements = getBlockElemets('blockWithDebounce'),
        setValueInDebounceSpan = AppUtil.debounce(getFormatedName, 500, function (value) {
            debounceBlockElements.span.text(value || '-');
        }),
        throttleBlockElements = getBlockElemets('blockWithThrottle'),
        setValueInThrottleSpan = AppUtil.throttle(getFormatedName, 1000, function (value) {
            throttleBlockElements.span.text(value || '-');
        });

    setInputListener(debounceBlockElements.input, setValueInDebounceSpan);
    setInputListener(throttleBlockElements.input, setValueInThrottleSpan);

    function setInputListener(element, callback) {
        element.on('input', function (event) {
            var input = element.val();

            callback(input);
        });
    }

    function getBlockElemets(blockId) {
        var blockElement = $('#' + blockId);

        return {
            input: blockElement.find('input'),
            span: blockElement.find('span')
        }
    }

    function getFormatedName(input) {
        return getSeparateWords(input)
            .map(toUpperFirstLetter)
            .join(' ');
    }

    function getSeparateWords(string) {
        var result;

        if (string) {
            result = string.split(' ').filter(function (word) {
                return !!word;
            });
        } else {
            result = [];
        }

        return result;
    }

    function toUpperFirstLetter(string) {
        var result;

        if (string) {
            result = string.charAt(0).toUpperCase() +
                string.slice(1).toLowerCase();
        } else {
            result = '';
        }

        return result;
    }
})(AppUtil);
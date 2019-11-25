var AlpacaBasic = function() {


    var _componentAlpaca = function() {
        if (!$().alpaca) {
            console.warn('Warning - alpaca.min.js is not loaded.');
            return;
        }

        // External data source
        $('#field-available-qualifications').alpaca({
            schema: {
                type: 'string',
                title: 'Pick an Action Hero'
            },
            options: {
                label: 'Qualification',
                helper: 'Select the qualification',
                type: 'select',
                focus: false,
                dataSource: 'data/datasource-example.json'
            }
        });
    };


    return {
        init: function() {
            _componentAlpaca();
        }
    }
}();


document.addEventListener('DOMContentLoaded', function() {
    AlpacaBasic.init();
});

/* ------------------------------------------------------------------------------
 *
 *  # Buttons extension for Datatables. HTML5 examples
 *
 *  Demo JS code for datatable_extension_buttons_html5.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var DatatableButtonsHtml5 = function() {


    //
    // Setup module components
    //

    // Basic Datatable examples
    var _componentDatatableButtonsHtml5 = function() {
        if (!$().DataTable) {
            console.warn('Warning - datatables.min.js is not loaded.');
            return;
        }

        // Setting datatable defaults
        $.extend($.fn.dataTable.defaults, {
            autoWidth: false,
            dom: '<"datatable-header"fBl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
            language: {
                search: '<span>Filter:</span> _INPUT_',
                searchPlaceholder: 'Type to filter...',
                lengthMenu: '<span>Show:</span> _MENU_',
                paginate: { 'first': 'First', 'last': 'Last', 'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;', 'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;' }
            }
        });

        // Column selectors
        $('.datatable-button-html5-columns').DataTable({

            order: [0, 'asc'],
            lengthMenu: [
                [5, 10, 25, 50, -1],
                [5, 10, 25, 50, "All"]
            ],
            responsive: true,
            buttons: {
                buttons: [{
                        extend: 'pdfHtml5',
                        className: 'btn btn-light',
                        text: '<i class="icon-file-pdf mr-2"></i> PDF',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6]
                        }
                    },
                    {
                        extend: 'csvHtml5',
                        className: 'btn btn-light',
                        text: '<i class="icon-file-spreadsheet mr-2"></i> CSV',
                        fieldSeparator: '\t',
                        extension: '.csv',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6]
                        }
                    }
                ]
            }
        });

        /*$('#datatable-student tfoot th').each(function() {
            var title = $(this).text();
            $(this).html('<input type="text" placeholder="Search ' + title + '" />');
        });*/

        // Column selectors
        /*var table = */
        $('.datatable-button-html5-columns-student').DataTable({
            orderCellsTop: true,
            dom: 'Bfrtip',
            order: [0, 'asc'],
            lengthMenu: [
                [5, 10, 25, 50, -1],
                [5, 10, 25, 50, "All"]
            ],
            responsive: true,
            buttons: {
                buttons: [{
                        extend: 'pdfHtml5',
                        className: 'btn btn-light',
                        text: '<i class="icon-file-pdf mr-2"></i> PDF',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6]
                        }
                    },
                    {
                        extend: 'csvHtml5',
                        className: 'btn btn-light',
                        text: '<i class="icon-file-spreadsheet mr-2"></i> CSV',
                        fieldSeparator: '\t',
                        extension: '.csv',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6]
                        }
                    }
                ]
            },



            initComplete: function() {
                this.api().columns([0, 1, 2, 3, 4, 5, 6]).every(function() {
                    var column = this;
                    var select = $('<select class="form-control filter-select"><option value=""></option></select>')
                    //var select = $('<select><option value=""></option></select>')
                        .appendTo($("#datatable-student thead tr:eq(1) th").eq(column.index()).empty())
                        .on('change', function() {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );

                            column
                                .search(val ? '^' + val + '$' : '', true, false)
                                .draw();
                        });

                    column.data().unique().sort().each(function(d, j) {
                        var val = $('<div/>').html(d).text();
                        select.append('<option value="' + val + '">' + val + '</option>')
                    });
                });
            }
        });

        /*$(".filterhead").each(function(i) {
            var select = $('<select><option value=""></option></select>')
                .appendTo($(this).empty())
                .on('change', function() {
                    var term = $(this).val();
                    tableStudent.column(i).search(term, false, false).draw();
                });
            tableStudent.column(i).data().unique().sort().each(function(d, j) {
                var val = $('<div/>').html(d).text();
                select.append('<option value="' + val + '">' + val + '</option>')
            });
        });*/

        /*table.columns().every(function() {
            var that = this;

            $('input', this.footer()).on('keyup change clear', function() {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });*/

        /*var table = */
        $('.datatable-button-html5-columns-lecturer').DataTable({            
            orderCellsTop: true,
            dom: 'Bfrtip',
            order: [0, 'asc'],
            lengthMenu: [
                [5, 10, 25, 50, -1],
                [5, 10, 25, 50, "All"]
            ],
            responsive: true,
            buttons: {
                buttons: [{
                        extend: 'pdfHtml5',
                        className: 'btn btn-light',
                        text: '<i class="icon-file-pdf mr-2"></i> PDF',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6, 7]
                        }
                    },
                    {
                        extend: 'csvHtml5',
                        className: 'btn btn-light',
                        text: '<i class="icon-file-spreadsheet mr-2"></i> CSV',
                        fieldSeparator: '\t',
                        extension: '.csv',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6, 7]
                        }
                    }
                ]
            },

            initComplete: function() {
                this.api().columns([0, 1, 2, 3, 4, 5, 6, 7]).every(function() {
                    var column = this;
                    var select = $('<select class="form-control filter-select"><option value=""></option></select>')
                    //var select = $('<select class="form-control filter-select" data-placeholder="Filter"><option value=""></option></select>')
                        .appendTo($("#datatable-lecturer thead tr:eq(1) th").eq(column.index()).empty())
                        .on('change', function() {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );

                            column
                                .search(val ? '^' + val + '$' : '', true, false)
                                .draw();
                        });

                    column.data().unique().sort().each(function(d, j) {
                        var val = $('<div/>').html(d).text();
                        select.append('<option value="' + val.trim() + '">' + val.trim() + '</option>')
                        //select.append('<option value="' + d + '">' + d + '</option>')
                    });
                });
            }
        });



        /*var table = */
        $('.datatable-button-html5-columns-details').DataTable({
            orderCellsTop: true,
            dom: 'Bfrtip',
            order: [0, 'asc'],
            lengthMenu: [
                [5, 10, 25, 50, -1],
                [5, 10, 25, 50, "All"]
            ],
            responsive: true,
            buttons: {
                buttons: [{
                        extend: 'pdfHtml5',
                        className: 'btn btn-light',
                        text: '<i class="icon-file-pdf mr-2"></i> PDF',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5]
                        }
                    },
                    {
                        extend: 'csvHtml5',
                        className: 'btn btn-light',
                        text: '<i class="icon-file-spreadsheet mr-2"></i> CSV',
                        fieldSeparator: '\t',
                        extension: '.csv',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5]
                        }
                    }
                ]
            },

            initComplete: function() {
                this.api().columns([0, 1, 2, 3, 4, 5]).every(function() {
                    var column = this;
                    var select = $('<select class="form-control filter-select"><option value=""></option></select>')
                    //var select = $('<select><option value=""></option></select>')
                        .appendTo($("#datatable-lecturer-details thead tr:eq(1) th").eq(column.index()).empty())
                        .on('change', function() {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );

                            column
                                .search(val ? '^' + val + '$' : '', true, false)
                                .draw();
                        });

                    column.data().unique().sort().each(function(d, j) {
                        var val = $('<div/>').html(d).text();
                        select.append('<option value="' + val + '">' + val + '</option>')
                    });
                });
            }
        });



    };




    // Select2 for length menu styling
    var _componentSelect2 = function() {
        if (!$().select2) {
            console.warn('Warning - select2.min.js is not loaded.');
            return;
        }

        // Initialize
        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity,
            dropdownAutoWidth: true,
            width: 'auto'
        });
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _componentDatatableButtonsHtml5();
            _componentSelect2();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    DatatableButtonsHtml5.init();
});
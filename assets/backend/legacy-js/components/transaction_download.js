const $ = require('jquery');

(function ($) {
    $(document).ready(function () {
        $('#download-transactions').click(function (event) {
            event.preventDefault();
            event.stopPropagation();
            const $target = $(event.target);

            $target.addClass('disabled');

            const $form = $('.filter-form');
            const params = $form.serialize();

            const location = $target.attr('href');
            const documentLocation = location + '?' + params;

            try {
                window.open(documentLocation, '_self');
            } catch (e) {
                alert('An error occurred while generating this report.');
            }

            setTimeout(function () {
                $target.removeClass('disabled');
            }, 2000);
        });
    });
})($);

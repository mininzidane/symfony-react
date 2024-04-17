const $ = require("jquery");
require("select2");

(function() {
  $(document).ready(function() {
    $("select.is-multiselect").each(function() {
      const $el = $(this);

      $el.select2({
        placeholder: $el.data("placeholder") || "",
        closeOnSelect: $el.data("open-on-select") !== true,
        allowClear: true
      });

      $el.on('select2:select', function () {
        const $selectEl = $el.parent().find('.select2-container');
        if ($selectEl.length) {
          $selectEl.find('.select2-search__field').val('');
        }
      });
    });
  });
})();

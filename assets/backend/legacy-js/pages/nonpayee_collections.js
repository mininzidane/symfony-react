const $ = require("jquery");

(function($) {
  $(document).ready(function() {
    const $collectionsForm = $("#collections-form");
    const $selectAll = $("input[name=\"select-all\"]");
    const $invoiceCheckboxes = $("input.select-input");

    $selectAll.on("change", function() {
      if (this.checked) {
        $invoiceCheckboxes.prop("checked", true);
      } else {
        $invoiceCheckboxes.prop("checked", false);
      }
    });

    $collectionsForm.on("submit", function(e) {
      e.preventDefault();

      const action = this.action;
      const vals = $(this).serializeArray();
      $invoiceCheckboxes.each(function(_, el) {
        if (el.checked) {
          vals.push({ name: "collectionsInvoice[]", value: el.value});
        }
      });

      return $.post(action, vals, function (response) {
        if (response && response.redirect) {
          window.location.href = response.redirect;
        } else {
          window.alert('An error occurred while processing this request.');
        }
      });
    });
  });
})($);

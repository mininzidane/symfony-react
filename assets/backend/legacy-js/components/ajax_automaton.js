const $ = require('jquery');
const swal = require('sweetalert');

module.exports = function () {

  function AjaxAutomaton() {
    /**
     * Confirm Modal
     * pulls data-confirm-x attributes to build a confirmation modal,
     *     the last step of which fires an Ajax Request to the HREF
     *     expecting JSON data response containing:
     *          result: 'success'|'Error Title'
     *          message:'modal result message'
     *
     * Add to an Anchor tag the following attributes (All optional):
     *     data-confirm-title="Confirm Modal Title"
     *     data-confirm-message="Confirm Modal Message"
     *     data-confirm-type="[danger|warning|success|error]"
     *     data-confirm-button="Confirm Button Text"
     **/

    // EX: $('someselector').each( AjaxAutomaton.confirmModal );
    // firstClick --> sweetAlert --> sweetAlertCallback -> ajaxComplete

    this.confirmModal = function () {
      var mainEl = this;
      var $mainEl = $(this);

      $mainEl.on('click', function (e) {
        e.preventDefault();
        mainEl.sweetAlert();
        return false;
      });

      this.sweetAlertCallback = function () {
        $.ajax({
            url: $mainEl.attr('href'),
            type: 'get'
          })
          .done(mainEl.ajaxComplete)
          .fail(mainEl.ajaxFailed);
      };

      this.ajaxComplete = function (data) {
        var style = 'error';
        if (data.message) {
          var title = data.result;
          if (data.result === 'success') {
            style = 'success';
            title = 'Success';
          }
          swal(title, data.message, style);
        } else {
          swal('Done', 'Action Complete');
        }
      };

      this.ajaxFailed = function () {
        swal('Error!', 'Unable to process the request!', "error");
      };

      this.sweetAlertMessage = {
        title: $mainEl.attr('data-confirm-title') ? $mainEl.attr('data-confirm-title') : "Are you sure?",
        text: $mainEl.attr('data-confirm-message') ? $mainEl.attr('data-confirm-message') : "Please confirm this action, it cannot be undone.",
        type: $mainEl.attr('data-confirm-type') ? $mainEl.attr('data-confirm-type') : "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: $mainEl.attr('data-confirm-button') ? $mainEl.attr('data-confirm-button') : "Confirm",
        closeOnConfirm: false,
        showLoaderOnConfirm: true
      };

      this.sweetAlert = function () {
        swal(mainEl.sweetAlertMessage, mainEl.sweetAlertCallback);
      };
    };
  }

  return new AjaxAutomaton();
}();

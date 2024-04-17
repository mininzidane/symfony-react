var $ = require('jquery');
var _ = require('lodash');
require('typeahead.js');

$(document).ready(function () {

  $('.member-autocomplete').each(function () {
    var $el = $(this);
    var requestUrl = $el.data('url');

    /** Override autofocus state to match theme for typeahead field */
    $el.on('focus', function () {
      $el.parents('.form-group').addClass('holds-focus');
    });

    $el.on('focusout', function () {
      $el.parents('.form-group').removeClass('holds-focus');
    });

    $el.on('keydown', function (event) {
      if (event.keyCode === 13) {
        $el.parents('form').submit();
      }
    });

    if (!requestUrl) {
      return false;
    }

    var currentRequest;
    var results = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      identify: function (obj) {
        return obj.id;
      },
      remote: {
        url: requestUrl,
        wildcard: '%QUERY',
        prepare: function (query, settings) {
          settings.url = settings.url + '?q=' + encodeURIComponent(query);
          settings.beforeSend = function (e) {
            if (currentRequest) {
              currentRequest.abort();
            }

            currentRequest = e;
          };

          return settings;
        },
      },
      rateLimitBy: 'throttle',
      rateLimitWait: 400,
    });

    $el.typeahead({
      highlight: true,
      minLength: 2,
    }, {
      source: results.ttAdapter(),
      limit: Number.MAX_SAFE_INTEGER,
      display: function (obj) {
        return obj.email;
      },
      templates: {
        suggestion: _.template("<div class='ac-card'>" +
          "<div class='ac-row'><%= firstName %> <%= lastName %> <%= bidderId ? ', #' + bidderId : '' %></div>" +
          "<div class='ac-row'>e: <%= email %> p: <%= phoneNumber %></div>" +
          "<div class='ac-row'>a: <%= address %></div>" +
          "<div class='ac-row'><%= city %>, <%= state %>, <%= country %></div>" +
          "</div>"),
      },
    });

    /* Ensure that the input is populated and submit the form */
    $el.bind('typeahead:select', function (ev, suggestion) {
      setTimeout(function () {
        $el.parents('form').submit();
      }, 250);
    });
  });
});

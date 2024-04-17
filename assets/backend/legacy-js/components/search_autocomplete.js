require('typeahead.js');
const $ = require('jquery');

$(document).ready(function () {
  $('.autocomplete').each(function () {
    var el = $(this);

    // instantiate the bloodhound suggestion engine
    var results = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: [],
      remote: {
        url: el.data('url'),
        wildcard: '%25QUERY',
        rateLimitWait: 250,
      }
    });

    // initialize the bloodhound suggestion engine
    results.initialize();

    el.typeahead({
      delay: 400,
      items: 10,
      source: results.ttAdapter()
    });
  });
});

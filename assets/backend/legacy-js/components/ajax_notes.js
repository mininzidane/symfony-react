const $ = require("jquery");

const PROCESS_LENGTH = 50;

function appendNotesHtml(notes) {
  for (const key in notes) {
    if (notes.hasOwnProperty(key)) {
      const customerNotes = notes[key];
      $(`#notes-lot_purchase-${key}`).append(customerNotes);
    }
  }
}

function retrieveNotes(lpIds) {
  $.ajax({
    type: 'GET',
    url: '/abm-acp/api/v1/title-notes',
    contentType: "application/json",
    data: {
      lpIds: JSON.stringify(lpIds)
    },
    success: function (data) {
      if (data && data.notes) {
        appendNotesHtml(data.notes);
      }
    },
    error: function () {
      /** Ignore */
    }
  })
}

(function($) {
  $(document).ready(function() {
    const noteIds = [];
    $('[data-lp-note]').each(function (_, note) {
      noteIds.push($(note).data('lp-note'));
    });

    if (!noteIds.length) {
      return;
    }

    while (noteIds.length) {
      const lpIds = noteIds.splice(0, PROCESS_LENGTH);
      retrieveNotes(lpIds);
    }
  });
})($);

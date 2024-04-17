const $ = require('jquery');

$(document).ready(() => {
  $('#crm-stats-download').click(event => {
    const downloadUrl = $(event.target).data('url');
    const $form = $("form[name='backend_statistics']");
    let requestType = $(event.target).data('request-type');
    if (!requestType) {
      requestType = 'POST';
    }

    const values = {};
    $.each($form.serializeArray(), function (i, field) {
      values[field.name] = field.value;
    });

    $.ajax({
      type: requestType,
      url: downloadUrl,
      data: values,
      xhrFields: {
        responseType: 'blob'
      },
      success: function (data, status, xhr) {
        let filename = "crm_stats.csv";
        const disposition = xhr.getResponseHeader('Content-Disposition');
        if (disposition && disposition.indexOf('attachment') !== -1) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(disposition);
          if (matches !== null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
        }

        const link = document.createElement('a');
        const url = window.URL.createObjectURL(data);
        link.href = url;
        link.download = filename;
        document.body.append(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }
    });
  });

});

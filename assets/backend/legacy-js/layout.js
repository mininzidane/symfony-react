'use strict';

require('jquery-ui');
require('bootstrap-sass');
require('metismenu');
require('jquery-slimscroll');
const toastr = require('toastr');
require('daterangepicker');
require('bootstrap-datepicker');
require('bootstrap-hover-dropdown');
require('../static/visa_2.png'); // static image
require('./components/common');
require('./components/fees_calculator');
require('./components/search_autocomplete');
require('./components/customer_autocomplete');
require('./components/blueimp_gallery');
require('./components/csv_statistics_export');
require('./components/transaction_download');
require('./components/multi_select.js');
require('./components/ajax_notes');
require('./components/copy_link');

const swal = require('sweetalert');
const AjaxAutomaton = require('./components/ajax_automaton');
const SectionLoader = require('./components/section_specific');
const $ = require('jquery');

$(document).ready(function () {
  // Add body-small class if window less than 768px
  if ($(this).width() < 769) {
    $('body').addClass('body-small')
  } else {
    $('body').removeClass('body-small')
  }

  // MetsiMenu
  $('#side-menu').metisMenu({
    toggle: false,
  });

  // Collapse ibox function
  $('.collapse-link').on('click', function () {
    var ibox = $(this).closest('div.ibox');
    var button = $(this).find('i');
    var content = ibox.children('.ibox-content');
    content.slideToggle(200);
    button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
    ibox.toggleClass('').toggleClass('border-bottom');
    setTimeout(function () {
      ibox.resize();
      ibox.find('[id^=map-]').resize();
    }, 50);
  });

  // Close ibox function
  $('.close-link').on('click', function () {
    var content = $(this).closest('div.ibox');
    content.remove();
  });

  // Fullscreen ibox function
  $('.fullscreen-link').on('click', function () {
    var ibox = $(this).closest('div.ibox');
    var button = $(this).find('i');
    $('body').toggleClass('fullscreen-ibox-mode');
    button.toggleClass('fa-expand').toggleClass('fa-compress');
    ibox.toggleClass('fullscreen');
    setTimeout(function () {
      $(window).trigger('resize');
    }, 100);
  });

  // Close menu in canvas mode
  $('.close-canvas-menu').on('click', function () {
    $("body").toggleClass("mini-navbar");
    SmoothlyMenu();
  });

  // Dropdown hover
  if ($(this).width() > 991) {
    $('.dropdown-toggle-hover').dropdownHover({
      delay: 200,
    });
  }

  $('.mobile-btn-dropdown-toggle').on('click', function (event) {
    event.stopPropagation();

    const $el = $(this).parent();
    $el.toggleClass('open');
    document.addEventListener("click", function (e) {
      if (!$(e.target).closest($el).length) {
        $el.removeClass('open');
      }
    }, { once : true });
  });

  // Run menu of canvas
  $('body.canvas-menu .sidebar-collapse').slimScroll({
    height: '100%',
    railOpacity: 0.9
  });

  // Open close right sidebar
  $('.right-sidebar-toggle').on('click', function () {
    $('#right-sidebar').toggleClass('sidebar-open');
  });

  // Initialize slimscroll for right sidebar
  $('.sidebar-container').slimScroll({
    height: '100%',
    railOpacity: 0.4,
    wheelStep: 10
  });

  // Open close small chat
  $('.open-small-chat').on('click', function () {
    $(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
    $('.small-chat-box').toggleClass('active');
  });

  // Initialize slimscroll for small chat
  $('.small-chat-box .content').slimScroll({
    height: '234px',
    railOpacity: 0.4
  });

  // Small todo handler
  $('.check-link').on('click', function () {
    var button = $(this).find('i');
    var label = $(this).next('span');
    button.toggleClass('fa-check-square').toggleClass('fa-square-o');
    label.toggleClass('todo-completed');
    return false;
  });


  // Minimalize menu
  $('.navbar-minimalize').on('click', function (event) {
    event.preventDefault();
    $("body").toggleClass("mini-navbar");
    SmoothlyMenu();

  });

  // Tooltips demo
  $('.tooltip-demo').tooltip({
    selector: "[data-toggle=tooltip]",
    container: "body"
  });


  // Full height of sidebar
  function fix_height() {
    var heightWithoutNavbar = $("body > #wrapper").height() - 61;
    $(".sidebar-panel").css("min-height", heightWithoutNavbar + "px");

    var navbarHeigh = $('nav.navbar-default').height();
    var wrapperHeigh = $('#page-wrapper').height();

    if (navbarHeigh > wrapperHeigh) {
      $('#page-wrapper').css("min-height", navbarHeigh + "px");
    }

    if (navbarHeigh < wrapperHeigh) {
      $('#page-wrapper').css("min-height", $(window).height() + "px");
    }

    if ($('body').hasClass('fixed-nav')) {
      if (navbarHeigh > wrapperHeigh) {
        $('#page-wrapper').css("min-height", navbarHeigh - 60 + "px");
      } else {
        $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
      }
    }

  }

  fix_height();

  // Fixed Sidebar
  $(window).bind("load", function () {
    if ($("body").hasClass('fixed-sidebar')) {
      $('.sidebar-collapse').slimScroll({
        height: '100%',
        railOpacity: 0.9
      });
    }
  });

  // Move right sidebar top after scroll
  $(window).scroll(function () {
    if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
      $('#right-sidebar').addClass('sidebar-top');
    } else {
      $('#right-sidebar').removeClass('sidebar-top');
    }
  });

  $(window).bind("load resize scroll", function () {
    if (!$("body").hasClass('body-small')) {
      fix_height();
    }
  });

  $("[data-toggle=popover]")
    .popover();

  // Add slimscroll to element
  $('.full-height-scroll').slimscroll({
    height: '100%'
  })
});


// Minimalize menu when screen is less than 768px
$(window).bind("resize", function () {
  if ($(this).width() < 769) {
    $('body').addClass('body-small')
  } else {
    $('body').removeClass('body-small')
  }
});

// Local Storage functions
// Set proper body class and plugins based on user configuration
$(document).ready(function () {
  if (localStorageSupport()) {
    var collapse = localStorage.getItem("collapse_menu");
    var fixedsidebar = localStorage.getItem("fixedsidebar");
    var fixednavbar = localStorage.getItem("fixednavbar");
    var boxedlayout = localStorage.getItem("boxedlayout");
    var fixedfooter = localStorage.getItem("fixedfooter");
    var body = $('body');

    if (fixedsidebar == 'on') {
      body.addClass('fixed-sidebar');
      $('.sidebar-collapse').slimScroll({
        height: '100%',
        railOpacity: 0.9
      });
    }

    if (collapse == 'on') {
      if (body.hasClass('fixed-sidebar')) {
        if (!body.hasClass('body-small')) {
          body.addClass('mini-navbar');
        }
      } else {
        if (!body.hasClass('body-small')) {
          body.addClass('mini-navbar');
        }

      }
    }

    if (fixednavbar == 'on') {
      $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
      body.addClass('fixed-nav');
    }

    if (boxedlayout == 'on') {
      body.addClass('boxed-layout');
    }

    if (fixedfooter == 'on') {
      $(".footer").addClass('fixed');
    }
  }
});

// check if browser support HTML5 local storage
function localStorageSupport() {
  return (('localStorage' in window) && window['localStorage'] !== null)
}

// For demo purpose - animation css script
function animationHover(element, animation) {
  element = $(element);
  element.hover(
    function () {
      element.addClass('animated ' + animation);
    },
    function () {
      //wait for animation to finish before removing classes
      window.setTimeout(function () {
        element.removeClass('animated ' + animation);
      }, 2000);
    });
}

function SmoothlyMenu() {
  if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
    // Hide menu in order to smoothly turn on when maximize menu
    $('#side-menu').hide();
    // For smoothly turn on menu
    setTimeout(
      function () {
        $('#side-menu').fadeIn(400);
      }, 200);
  } else if ($('body').hasClass('fixed-sidebar')) {
    $('#side-menu').hide();
    setTimeout(
      function () {
        $('#side-menu').fadeIn(400);
      }, 100);
  } else {
    // Remove all inline style from jquery fadeIn function to reset menu state
    $('#side-menu').removeAttr('style');
  }
}

function formSubmitResult($form, data) {
  var message, toastType;
  toastType = toastr.error;
  if (data.hasOwnProperty('success')) {
    message = data.success;
    toastType = toastr.success;
  } else if (data.hasOwnProperty('error')) {
    message = data.error;
  }
  if (message) {
    toastType(message);
  }
}

function confirmLinkAction(text, link) {
  swal({
      title: "Are you sure?",
      text: text,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Confirm",
      closeOnConfirm: false,
      showLoaderOnConfirm: true
    },
    function () {
      window.location = link;
    });
}
var addFormError, removeFormError, convertNumber;

addFormError = function (input, text) {
  input.closest('div.form-group').addClass('has-error');
  return input.closest('div').append('<span class="help-block"><ul class="list-unstyled"><li><span class="glyphicon glyphicon-exclamation-sign"></span> ' + text + '</li></ul></span>');
};

removeFormError = function (input) {
  input.closest('div.form-group').removeClass('has-error');
  return input.closest('div').find('.help-block').remove();
};

convertNumber = function (string, separator, afterZero) {
  var decimal, i, n, result, str, whole, wholeColumn;
  str = string.toString();
  whole = str.split('.')[0];
  decimal = str.split('.')[1] || '';
  if (separator) {
    wholeColumn = '';
    n = 0;
    i = whole.length - 1;
    while (i >= 0) {
      n++;
      wholeColumn += whole[i];
      if (n === 3 && i > 0) {
        wholeColumn += ',';
        n = 0;
      }
      i--;
    }
    whole = wholeColumn.split('').reverse().join('');
  }
  if (decimal.length > afterZero) {
    decimal = decimal.substring(0, afterZero);
  }
  if (decimal.length < afterZero) {
    decimal += '000000000000000'.substring(0, afterZero - decimal.length);
  }
  if (afterZero !== 0) {
    decimal = '.' + decimal;
  }
  result = whole + decimal;
  return result;
};

jQuery(document).ready(function ($) {
  var $genericModal = $('#myModal');

  $(document).on('click', '[data-toggle="load-modal"][href]:not([data-target])', function (e) {
      e.preventDefault();

      var refreshOnClose = $(this).data('refresh-on-close');

      $genericModal.load($(this).attr('href'), function () {
        $genericModal.modal('show');
      });

      if (refreshOnClose === true) {
        $genericModal.on('hidden.bs.modal', function () {
          window.location.reload();
        });
      }
    });

  $(document).on('submit', 'form[data-ajax]', function (e) {
    var $form, $submits;
    e.preventDefault();
    $form = $(this);
    $submits = $form.find('[type=submit]');
    if ($submits.hasClass('loading') || $submits.hasClass('disabled')) {
      return false;
    }
    $submits.addClass('loading');
    $.ajax({
      type: $form.prop('method'),
      url: $form.attr('action'),
      data: $form.serialize(),
      success: function (data) {
        formSubmitResult($form, data);
        if (data.toString().length > 500) {
          $genericModal.html(data.toString());
          $genericModal.modal("show");
        } else {
          $genericModal.modal("hide");
        }

        window.dispatchEvent(new CustomEvent("onModalSubmitSuccess", { detail: data }));
      },
      fail: e => {
        console.error(e);

        window.dispatchEvent(new CustomEvent("onModalSubmitError", { detail: e}));
      }
    }).always(() => {
      $submits.removeClass("loading");
    })
  });

  // Modal Ajax Forms
  $(document).on('submit', '.modal-form[data-ajax]', function (e) {
    var $form, $submits;
    e.preventDefault();
    $form = $(this);
    $submits = $form.find('[type=submit]');
    if ($submits.hasClass('loading') || $submits.hasClass('disabled')) {
      return false;
    }
    $submits.addClass('loading');
    $.ajax({
      type: $form.prop('method'),
      url: $form.attr('action'),
      data: $form.serialize(),
      dataType: 'json',
      success: function (data) {
        if (data.hasOwnProperty('error')) {
          var $errorsEl = $form.find('.errors');
          var errors = data.error;

          if ($errorsEl.length) {
            $errorsEl.html(''); // Clear exiting errors

            for (var key in errors) {
              if (errors.hasOwnProperty(key)) {
                var errorMessage = '<div class="alert alert-danger">' + errors[key] + '</div>';
                $errorsEl.append(errorMessage);
              }
            }

            $('#myModal').animate({
              scrollTop: 0
            }, 'slow');
          }

          window.dispatchEvent(new CustomEvent("onModalSubmitError", { detail: data }));
        } else if (data.hasOwnProperty('redirect')) {
          window.location = data.redirect;
        }
      },
      complete: function () {
        $submits.removeClass('loading');
      }
    });
  });

  $(document).on('click', '.require-confirmation', function (e) {
    var $this, message, dataMessage;
    $this = $(this);
    e.preventDefault();

    message = 'This operation requires a second confirmation before execution, are you sure you want to execute it?';
    dataMessage = $this.attr('data-confirm-message');
    if (typeof dataMessage !== typeof undefined) {
      message = dataMessage;
    }
    confirmLinkAction(message, $this.attr('href'));
  });

  $(document).popover({
    selector: '[data-toggle="external-popover"]',
    html: true,
    trigger: 'hover',
    content: function () {
      return $('#' + $(this).attr('data-content-id')).html();
    }
  });

  $('[data-toggle="popover-image"]').popover({
    html: true,
    trigger: 'hover',
    container: 'body',
    template: '<div class="popover popover-image" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
    content: function () {
      return $('#content-popover-' + $(this).attr('data-content-id')).html();
    }
  });

  $('.delete-action').click(function (e) {
    e.preventDefault();
    var $el = $(this);
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this item once you delete it!",
        type: "warning",
        showCancelButton: true,
        showLoaderOnConfirm: true,
        closeOnConfirm: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel"
      },
      function () {
        $.getJSON($el.attr('href'))
          .done(function (json) {
            if (json.hasOwnProperty('success')) {
              swal("Deleted!", json.success, "success");
              setTimeout(function () {
                location.reload();
              }, 200);
            } else if (json.hasOwnProperty('error')) {
              swal("Error", json.error, "error");
            } else {
              swal("Error", "We encountered an error while trying to remove the element", "error");
            }
          })
          .fail(function (jqxhr, textStatus, error) {
            swal("Error", "We encountered an error while trying to remove the element. " + textStatus + ", " + error, "error");
          });
      });
  });

  $('.dropdown-menu.selector a').click(function (event) {
    event.preventDefault();
    $(this).closest('ul').siblings('button').find('.text').text($(this).text());
    $('#top-search-type').val($(this).data('val'))
  });

  $(document).on('click', 'table th [data-check-all]', function () {
    $(this).closest('table').find('input[type=checkbox]')
      .not(this).prop('checked', $(this).prop('checked'));
  });

  if ($('.dropzone').length) {
    Dropzone.options.myDropzone = {
      autoProcessQueue: false,
      uploadMultiple: true,
      parallelUploads: 10,
      maxFiles: 10,

      // Dropzone settings
      init: function () {
        var myDropzone = this;

        this.element.querySelector("button[type=submit]").addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          myDropzone.processQueue();
        });
        this.on("sendingmultiple", function () {});
        this.on("successmultiple", function (files, response) {
          window.location.href = window.location;
        });
        this.on("errormultiple", function (files, response) {});
      }
    }
  }
});

// clock -> index

$('.clockModifiedToggle').on('click', function () {
  var target = '.' + $(this).data('target');
  var state = $(this).data('state');
  if (state) {
    $(target).fadeOut();
    $(this).data('state', 0);
    $(this).find('i').removeClass('fa-chevron-down');
    $(this).find('i').addClass('fa-chevron-left');
  } else {
    $(target).fadeIn();
    $(this).data('state', 1);
    $(this).find('i').removeClass('fa-chevron-left');
    $(this).find('i').addClass('fa-chevron-down');
  }
});

$(document).ready(function () {
  $('input[name="daterange"]').daterangepicker({
    autoUpdateInput: false,
    locale: {
      cancelLabel: 'Clear'
    }
  }).on('apply.daterangepicker', function (ev, picker) {
    $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
  }).on('cancel.daterangepicker', function (ev, picker) {
    $(this).val('');
  });

});

// lot_purchase
$('.documentHistoryToggle').on('click', function () {
  var target = '.' + $(this).data('target');
  var state = $(this).data('state');
  if (state) {
    $(target).slideDown();
    $(this).data('state', 0);
    $(this).find('i').removeClass('fa-chevron-down');
    $(this).find('i').addClass('fa-chevron-left');
  } else {
    $(target).slideUp();
    $(this).data('state', 1);
    $(this).find('i').removeClass('fa-chevron-left');
    $(this).find('i').addClass('fa-chevron-down');
  }
});

// invoice
var zeroLineItems;

function ZeroItems() {
  var main = this;
  this.toggleBut = $('#zero-toggle');

  this.toggle = function () {
    if (main.toggleBut.prop('checked')) {
      $('.invoice-item-zero').show();
    } else {
      $('.invoice-item-zero').hide();
    }
  };

  this.enableUI = function () {
    $('.invoice-item-zero-toggle').show();
  };

  this.init = function () {
    if ($('.invoice-item-zero').length > 0) {
      this.enableUI();
      this.toggle();
      this.toggleBut.click(main.toggle);
    }
  };

  this.init();
}

$(function () {
  zeroLineItems = new ZeroItems();
});

// received at office
(function ($) {
  $(document).ready(function () {
    function addVehicle(el) {
      // Get the data-prototype explained earlier
      var prototype = $wrapper.data('prototype');

      // get the new index
      var index = $wrapper.data('index');

      var newForm = prototype;

      // Replace '__name__' in the prototype's HTML to
      // instead be a number based on how many items we have
      newForm = newForm.replace(/__name__/g, index);

      // increase the index with one for the next item
      $wrapper.data('index', index + 1);

      // Display the form in the page before the "new" link
      el.before(newForm);
    }

    var $wrapper = $('.js-title-received-at-office-wrapper');
    if ($wrapper.length) {
      $wrapper.on('click', '.js-remove-vehicle', function (e) {
        e.preventDefault();

        $(this).closest('.js-vehicle-item')
          .fadeOut()
          .remove();
      });

      $wrapper.on('click', '.js-vehicle-add', function (e) {
        e.preventDefault();
        addVehicle($(this));
      });
      addVehicle($('.js-vehicle-add'));
    }
  });
})(jQuery);


// lot search
$('.toggleTable').on('click', function () {
  var target = $(this).parent().find('div.data');
  var state = $(this).data('state');
  if (state) {
    $(target).slideDown();
    $(this).data('state', 0);
    $(this).parent().find('span').removeClass('fa-arrow-circle-left');
    $(this).parent().find('span').addClass('fa-arrow-circle-down');
  } else {
    $(target).slideUp();
    $(this).data('state', 1);
    $(this).parent().find('span').removeClass('fa-arrow-circle-down');
    $(this).parent().find('span').addClass('fa-arrow-circle-left');
  }
});

// ajax confirm modal
$('a.confirm-modal').each(AjaxAutomaton.confirmModal);

// section specific scripts
SectionLoader.load();

// default expanded left nav
(function ($) {
  $(document).ready(function () {
    const localStorageKey = 'ACP::MenuHiddenSections';
    var $menu = $('#side-menu');
    $menu.find('.nav-second-level').each(function () {
      let hiddenSections = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
      const $li = $(this).closest("li");
      const label = $li.find(".nav-label").text();
      if (!hiddenSections.includes(label)) {
        $(this).addClass("in");
        $li.addClass("active");
        $li.find("a").attr("aria-expanded", true)
      }
    });
    $menu.on('hide.metisMenu', function (e) {
      let hiddenSections = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
      const label = $(e.target).closest("li").find(".nav-label").text();
      hiddenSections.push(label);
      window.localStorage.setItem(localStorageKey, JSON.stringify(hiddenSections));
    });
    $menu.on('show.metisMenu', function (e) {
      let hiddenSections = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
      const label = $(e.target).closest("li").find(".nav-label").text();
      delete hiddenSections[hiddenSections.indexOf(label)];
      window.localStorage.setItem(localStorageKey, JSON.stringify(hiddenSections.filter(item => item)));
    });
  });
})(jQuery);

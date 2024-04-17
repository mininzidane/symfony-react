const $ = require('jquery');
const IntlTelInput = require('intl-tel-input');
require('jquery-mask-plugin/dist/jquery.mask.min');

$(function () {
  /**
   * Form enhancements
   */
  $('.datepicker').attr('type', 'text').datepicker({
    autoclose: true,
    todayBtn: "linked",
    format: "mm/dd/yyyy"
  });

  $(document).on('focus', 'input', function () {
    $(this).parent('.form-group').addClass('holds-focus');
  });

  $(document).on('blur', 'input', function () {
    $(this).parent('.form-group').removeClass('holds-focus');
  });

  function handleAddNotesForm(e) {
    e.preventDefault();

    const $form = $(this);
    let formData = false;
    const reloadOnSuccess = $form.data('reload-on-success') || false;
    if (window.FormData) {
      formData = new FormData($form[0]);
    }

    $.ajax({
      type: $form.prop('method'),
      url: $form.attr('action'),
      data: formData ? formData : $form.serialize(),
      dataType: 'json',
      processData: false,
      contentType: false,
      beforeSend: () => {
        $form.find(':input').prop('disabled', true);
      },
      success: function(data) {
        if (data.error) {
          alert(data.error);
        } else if (data.success) {
          if (data.note) {
            $('#notes-' + $form.data('add-notes')).prepend(data.note);
          }
        }

        $form.trigger('reset');
        if (reloadOnSuccess) {
          window.location.reload();
        }
      },
      error: function(xhr) {
        let errorMessage = 'An error occurred while submitting this request';
        if (xhr.responseText) {
          const response = JSON.parse(xhr.responseText);
          if (response.errors) {
            errorMessage = '';
            Object.keys(response.errors).forEach(key => {
              const message = response.errors[key];
              errorMessage += message;
            })
          }
        }

        alert(errorMessage);
      },
      complete: function () {
        $form.find(':input').prop('disabled', false);
      }
    });
  }

  $(document).on('submit','.modal-content form[data-add-notes]', handleAddNotesForm);
  $('form[data-add-notes]').on('submit', handleAddNotesForm);

  $(document).on('click', 'a[data-ajax-request]', function (e) {
    var $el;
    $el = $(this);
    e.preventDefault();
    $.getJSON($el.attr('href'), function (data) {
      if ('refresh' === data.action) {
        location.reload();
      } else {
        window.dispatchEvent(new CustomEvent("onModalSubmitSuccess", { detail: data }));
      }
    });
  });

  $(document).on('click', '.modal-link [data-dismiss="modal"]', function () {
    window.dispatchEvent(new CustomEvent("closeModalWindow"));
  });

  $(document).on('click', '.changeEmailLog', function () {
    var $btn, $id, $oldWindow, $oldData, $newWindow, $newData, $buttons;
    $buttons = document.getElementsByClassName('changeEmailLog');

    for (var i = 0; i < $buttons.length; i++) {
      $buttons.item(i).classList.remove('btn-primary');
    }
    $btn = $(this);
    $id = $btn.attr('id');

    $oldWindow = document.getElementById('old-log');
    $newWindow = document.getElementById('new-log');

    $oldData = document.getElementById('old-log-' + $id).innerText;
    $newData = document.getElementById('new-log-' + $id).innerText;

    $oldWindow.innerHTML = $oldData;
    $newWindow.innerText = $newData;

    $btn.addClass('btn-primary');
  });

  /**
   *  Clean Form Reset
   *  usage:
   *  add class to child of form: form-reset (form .form-reset)
   *
   *  EX: <form><div><input></div><div class="form-reset"></div></form>
   */
  $('form:has(.form-reset)').each(function () {
    var $form = $(this);
    $form.reset = function () {
      var fields = $form[0].elements;
      for (var i = 0; i < fields.length; i++) {
        var field_type = fields[i].type.toLowerCase();
        switch (field_type) {
          case "text":
          case "password":
          case "textarea":
          case "hidden":
            fields[i].value = "";
            break;
          case "radio":
          case "checkbox":
            if (fields[i].checked) {
              fields[i].checked = false;
            }
            break;
          case "select-one":
          case "select-multi":
            fields[i].selectedIndex = -1;
            break;
          default:
            break;
        }
      }
    };

    $form.find('.form-reset').each(function () {
      $(this).css({
        'cursor': 'pointer'
      });
      $(this).on('click', function () {
        $form.reset();
      });
    });
  });

  $(document).on("click", ".send-email-templates__item", e => {
    e.preventDefault();

    const subject = e.target.getAttribute('data-subject');
    const message = e.target.getAttribute('data-message');
    const templateName = e.target.getAttribute('data-template-name');
    document.getElementById('customer_send_email_subject').value = subject;
    document.getElementById('customer_send_email_message').value = message;
    document.getElementById('customer_send_email_templateName').value = templateName;
  });

  $(document).on("click", ".send-sms-templates__item", e => {
    e.preventDefault();

    document.getElementById('customer_send_sms_message').value = e.target.getAttribute('data-message');
  });
});

var app,
  hasProp = {}.hasOwnProperty;

app = {
  $window: $(window),
  $body: $('body'),
  nodeInitFuncs: {},
  pageInitFuncs: {},
  options: {},
  initPage: function (object) {
    var key, results, value;
    if (object == null) {
      object = app.pageInitFuncs;
    }
    results = [];
    for (key in object) {
      if (!hasProp.call(object, key)) continue;
      value = object[key];
      results.push(object[key]());
    }
    return results;
  },
  initNode: function ($node, object) {
    var key, results, value;
    if ($node == null) {
      $node = app.$body;
    }
    if (object == null) {
      object = app.nodeInitFuncs;
    }
    results = [];
    for (key in object) {
      if (!hasProp.call(object, key)) continue;
      value = object[key];
      results.push(object[key]($node));
    }
    return results;
  }
};

$(function () {
  app.initNode();
  return app.initPage();
});


app.nodeInitFuncs.ajaxForm = function ($node) {
  return $node.find('form').filter('[data-ajax]').sbsAjaxForm();
};
//
// app.nodeInitFuncs.selectric = function($node) {
//     return $node.find('select.dropdown').selectric({
//         disableOnMobile: true,
//         onInit: function() {
//             var selectedClass, wrap;
//             selectedClass = $(this).parents('.selectric-wrapper').find('.dropdown').find('option:selected').attr('class');
//             wrap = $(this).parents('.selectric-wrapper');
//             wrap.find('.label').addClass(selectedClass);
//             wrap.find('.selectric-spinner').remove();
//             return wrap.find('.selectric').append('<div class="selectric-spinner"></div>');
//         }
//     }).on('selectric-before-open', function() {
//         var options;
//         options = $(this).find('option');
//         return $(this).parent().siblings('.selectric-items').find('li').each(function(index, el) {
//             var currentClass;
//             currentClass = options.eq(index).attr('class');
//             return $(el).addClass(currentClass).data('class', currentClass);
//         });
//     }).on('selectric-change', function() {
//         var pickedClass;
//         pickedClass = $(this).parent().siblings('.selectric-items').find('li.selected').data('class');
//         $(this).parents('.selectric-wrapper').find('.label').attr('class', 'label ' + pickedClass + ' changed');
//         makeSelectDone($(this).parents('.multiple-select'));
//         return showNextSelect($(this));
//     });
// };

app.nodeInitFuncs.selectChain = function ($node) {
  return $node.find('[data-cascade]').on('change', function () {
    var $el, $target, url;
    $el = $(this);
    $target = $node.find('#' + $el.attr('data-cascade'));
    $target.find('option').not('option[value=""], option:not([value]), option[value=0]').remove();
    url = $el.attr('data-url').replace(/%value%/, $el.val());
    return $.getJSON(url, function (data) {
      $target.sbsFillSelect(data);
      if ($target.hasClass('dropdown')) {
        return $target.selectric('refresh');
      }
    });
  });
};

app.nodeInitFuncs.tabSwitcher = function ($node) {
  var $anchorTabTriggers, $tabTriggers;
  $tabTriggers = $node.find('.tab-triggers');
  if (!$tabTriggers.length) {
    return;
  }
  $tabTriggers.each(function () {
    var $target, activeTab, firstTab;
    if ($(this).hasClass('select-tab-switcher')) {
      $target = $($(this).attr('data-target'));
      $(this).find('select').on('change', function () {
        var value;
        value = $(this).val();
        if (value === '') {
          value = 'default';
        }
        $target.find('[data-tab-container]').hide();
        return $target.find('[data-tab-container=' + value + ']').show().siblings().hide();
      });
      if ($(this).hasClass('auto-trigger-disabled')) {
        return;
      }
      $(this).find('select').trigger('change');
    }
    if ($(this).hasClass('radio-wrapper') && $(this).is(':visible')) {
      $(this).find('label').on('click', function () {
        var value;
        value = $('#' + $(this).attr('for')).val();
        return $('[data-tab-container="' + value + '"]').show().siblings().hide();
      });
      if ($(this).hasClass('auto-trigger-disabled')) {
        return;
      }
      return $(this).find('label').first().click();
    } else {
      $(this).find('.tab-trigger').each(function () {
        var $tabTrigger;
        $tabTrigger = $(this);
        return $tabTrigger.on('click', function (e) {
          if ($(this).prop('tagName') !== 'LABEL') {
            e.preventDefault();
          }
          $target = $($(this).attr('data-target'));
          $target.closest('.tab-containers').find('.tab-container').hide();
          $target.show();
          return $(this).addClass('active').closest('.tab-triggers').find('.tab-trigger').not(this).removeClass('active');
        });
      });
      if ($(this).hasClass('auto-trigger-disabled')) {
        return;
      }
      activeTab = $(this).find('.tab-trigger.active');
      firstTab = $(this).find('.tab-trigger').first();
      if (activeTab.length) {
        return activeTab.click();
      } else {
        return firstTab.click();
      }
    }
  });
  $anchorTabTriggers = $node.find('.anchor-tab-trigger');
  if (!$anchorTabTriggers.length) {
    return;
  }
  return $anchorTabTriggers.each(function () {
    var $anchorTabTrigger;
    $anchorTabTrigger = $(this);
    return $anchorTabTrigger.on('click', function (e) {
      e.preventDefault();
      return $(".tab-trigger[data-target='" + ($(this).attr('data-target')) + "']").click();
    });
  });
};

app.nodeInitFuncs.toggler = function ($node) {
  return $node.find('[data-toggler]').each(function () {
    var $target, $toggler, className, target, trigger, type;
    $toggler = $(this);
    target = $toggler.attr('data-target');
    trigger = $toggler.attr('data-trigger');
    type = $toggler.attr('data-toggler');
    className = $toggler.attr('data-class');
    $target = (function () {
      switch (false) {
        case target !== 'self':
          return $toggler;
        case target !== 'parent':
          return $toggler.parents('[data-toggler]');
        default:
          return $(target);
      }
    })();
    if (trigger === 'change') {
      if (type === 'class') {
        $toggler.on('change fake-change', function (e) {
          e.preventDefault();
          if ($toggler.is('[data-reverse]')) {
            if ($toggler.is(':checked')) {
              return $target.removeClass(className);
            } else {
              return $target.addClass(className);
            }
          } else {
            if ($toggler.is(':checked')) {
              return $target.addClass(className);
            } else {
              return $target.removeClass(className);
            }
          }
        });
      }
    }
    if (trigger === 'click') {
      if (type === 'class') {
        $toggler.on('click', function (e) {
          e.preventDefault();
          return $target.toggleClass(className);
        });
      }
      if (type === 'slide') {
        $toggler.on('click', function (e) {
          e.preventDefault();
          return $target.slideToggle();
        });
      }
      if (type === 'fade') {
        $toggler.on('click', function (e) {
          e.preventDefault();
          return $target.fadeToggle();
        });
      }
      if (type === 'both') {
        $toggler.on('click', function (e) {
          e.preventDefault();
          $toggler.toggleClass(className);
          return $target.slideToggle();
        });
      }
    }
    if (trigger === 'hover') {
      if (type === 'class') {
        $toggler.on('mouseenter', function () {
          return $target.addClass(className);
        }).on('mouseleave', function () {
          return $target.removeClass(className);
        });
      }
      if (type === 'slide') {
        $toggler.on('mouseenter', function () {
          return $target.slideDown();
        }).on('mouseleave', function () {
          return $target.slideUp();
        });
      }
    }
    if ($toggler.is('[onload]')) {
      if (trigger === 'change') {
        return $toggler.trigger('fake-change');
      }
    }
  });
};

/** @see assets/frontend/js/components/Form/PlaneTheme/PhoneInputPlane/index.jsx */
app.nodeInitFuncs.telephoneInput = function($node) {
  const $phoneInputs = $node.find('input.intl-phone-input');
  if (!$phoneInputs.length) {
    return;
  }

  const getSelectedCountry = (iti) => {
    const country = iti && iti.getSelectedCountryData();

    if (country && !country.dialCode) {
      return null;
    }

    return country;
  }

  const getMask = (iti) => {
    const country = getSelectedCountry(iti) || {};
    const numberType = window.intlTelInputUtils.numberType.MOBILE;
    let example = window.intlTelInputUtils.getExampleNumber(country.iso2, false, numberType);
    if (example) {
      example = example.replace(/\d/g, '9');
    }

    return example || '+999999999999999';
  };

  const setMask = ($el, mask) => {
    $el.mask(mask, {placeholder: " "});
  }

  const getDialCode = () => {
    const country = getSelectedCountry();
    if (!country) {
      return "";
    }

    return `+${country.dialCode}`;
  }

  const moveCursorToEnd = ($el) => {
    const el = $el[0];
    if (el.setSelectionRange) {
      // Double the length because Opera is inconsistent about whether a carriage return is one character or two.
      const len = el.value.length * 2;

      // Timeout seems to be required for Blink
      setTimeout(function() {
        el.setSelectionRange(len, len);
      }, 1);
    } else {
      // As a fallback, replace the contents with itself
      // Doesn't work in Chrome, but Chrome supports setSelectionRange
      // eslint-disable-next-line no-self-assign
      el.value = el.value;
    }
  };

  $phoneInputs
      .each(function () {
        const $this = $(this);
        const iti = IntlTelInput(this, {
          utilsScript: "/vendor/intl-tel-input-utils.min.js",
          nationalMode: false,
          formatOnDisplay: true,
          autoHideDialCode: false,
          preferredCountries: ["us", "ua", "ng", "ru", "by", "sv"],
        });

        window.addEventListener("load", () => {
          iti.handleUtils();
          setTimeout(() => {
            try {
              const mask = getMask(iti);
              setMask($this, mask);
            } catch (e) {
              /** Ignore */
            }
          }, 300);
        });

        $this.on('focus', function () {
          if (window.intlTelInputUtils) {
            const mask = getMask(iti);
            setMask($this, mask);
            const selectedCountry = getSelectedCountry(iti);
            if (selectedCountry) {
              $this.data('default-country-set', true);
            }
          }
        });

        $this.on('countrychange', function (event) {
          const { target: { value }} = event;
          const defaultCountryIsSet = $this.data('default-country-set') || false;

          const country = getSelectedCountry(iti);
          const dialCode = getDialCode();
          if (value && country && !dialCode.includes(value) && !value.includes(dialCode)) {
            $this.val("");
          }

          if (!value && dialCode) {
            $this.val(dialCode);
          }

          if (defaultCountryIsSet && value !== '+' && country) {
            moveCursorToEnd($this);
          }

          $this.data('default-country-set', true);
          const mask = getMask(iti);
          setMask($this, mask);
        });

      })
  ;
};

(function ($) {
  $.fn.sbsAjaxForm = function (options) {
    options = $.extend($.fn.sbsAjaxForm.defaults, options);
    return this.each(function () {
      return $(this).submit(function (e) {
        var $el, $submits;
        e.preventDefault();
        $el = $(this);
        $submits = $el.find('[type=submit]');
        if ($submits.hasClass('loading') || $submits.hasClass('disabled')) {
          return false;
        }
        $submits.addClass('loading');
        $el.find('.input-wrapper_-error, [data-error]').removeClass('input-wrapper_-error').removeAttr('data-error');
        $el.find('.error-widget').hide().find('.error-prototype').siblings().remove();
        return $.ajax({
          type: 'POST',
          url: $el.attr('action'),
          data: $el.serialize(),
          dataType: 'json',
          success: function (data) {
            var doneLoading;
            doneLoading = false;
            if (data.error || data.errors) {
              if (typeof options.onErrorReceived === 'function') {
                doneLoading = true;
                options.onErrorReceived.call($el, data);
              }
            } else if (data.message) {
              if (typeof options.onSuccessMessage === 'function') {
                doneLoading = true;
                options.onSuccessMessage.call($el, data);
              }
            } else if (data.redirect) {
              if (typeof options.onRedirectRequest === 'function') {
                options.onRedirectRequest.call($el, data);
              }
            }
            if (doneLoading) {
              return $el.find('[type=submit]').removeClass('loading');
            }
          },
          error: function () {
            $el.find('[type=submit]').removeClass('loading');
            if (typeof options.onFailedAjax === 'function') {
              return options.onFailedAjax.call(this);
            }
          }
        });
      });
    });
  };
  return $.fn.sbsAjaxForm.defaults = {
    onFailedAjax: null,
    onSuccessMessage: function (data) {
      var $form, $target;
      $form = $(this);
      if ($form.data('globalTarget') === 1) {
        $target = $($form.data('target'));
      } else {
        $target = $form.find($form.data('target'));
      }
      $target.show().html(data.message);
      $('html, body').scrollTop($target.offset().top);
      if ($form.data('onSuccess') === 'reset') {
        this[0].reset();
      }
      if ($form.data('onSuccess') === 'hide-form') {
        $form.hide();
        $target.find('.back').on('click', function (e) {
          e.preventDefault();
          $target.hide();
          return $form.show();
        });
      }
      if (data['close-form']) {
        $(this).find('[type=submit]').hide();
      }
      return setTimeout(function () {
        return app.initNode($target);
      }, 10);
    },
    onRedirectRequest: function (data) {
      return window.location.href = data.redirect;
    },
    onErrorReceived: function (data) {
      var $errorPrototype, $mainErrorHolder, $newError, $newTarget, $target, errors, i, name, prototypeContent, subName;
      if (data.error) {
        this.find(':input').not('[type=\'hidden\']').first().closest('div.input-wrapper').addClass('input-wrapper_-error').attr('data-error', data.error);
      } else {
        $mainErrorHolder = this.find('.error-widget');
        if ($mainErrorHolder.length) {
          $errorPrototype = $mainErrorHolder.find('.error-prototype');
          prototypeContent = $errorPrototype.html();
        }
        for (name in data.errors) {
          errors = [];
          if (typeof data.errors[name] === 'string') {
            errors.push(data.errors[name]);
          } else {
            for (subName in data.errors[name]) {
              errors.push(data.errors[name][subName]);
            }
          }
          $target = this.find('#' + name);
          if (0 === $target.length) {
            if ($mainErrorHolder.length) {
              $mainErrorHolder.show();
              for (i in errors) {
                $newError = $errorPrototype.clone().html(prototypeContent.replace('{#error_message#}', errors[i])).removeClass('error-prototype');
                $errorPrototype.before($newError);
                $newError.show();
              }
            } else {
              console.log('Can\'t find input with id ' + name + ' for error messages: ' + errors.join(','));
            }
          }
          $newTarget = $target.data('errorBubble');
          if ($newTarget) {
            $('#' + $newTarget).attr('data-error', errors.join('<br>')).addClass('input-wrapper_-error').find('.input-wrapper');
          } else {
            $target.closest('div.input-wrapper').addClass('input-wrapper_-error').attr('data-error', errors.join('<br>'));
          }
        }
      }
      return $('.error:visible:first').each(function () {
        return $('html, body').animate({
          scrollTop: $(this).offset().top
        }, 800);
      });
    }
  };
})(jQuery);

(function ($) {
  return $.fn.sbsFillSelect = function (values) {

    /** @TODO: Account for 1<->many */
    var el, optionsHtml;
    el = $(this);
    optionsHtml = '';
    $.each(values, function () {
      return optionsHtml += '<option value=' + this.value + '>' + this.label + '</option>';
    });
    el.html(optionsHtml);
    if (el.hasClass('selectric')) {
      el.selectric('refresh');
    }
    return el;
  };
})(jQuery);

$(function () {

  /** customer -> edit */
  function updateStateList(country_el, state_el) {
    $.getJSON('/en/json/states/' + $(country_el).val(), {}, function (data) {
      var stateOptions;
      stateOptions = '';
      $.each(data, function () {
        return stateOptions += '<option value="' + this.value + '">' + this.label + '</option>';
      });

      $(state_el).html(stateOptions);
    });
  }

  $('#acp_contact_informationCountry').on('change', function () {
    updateStateList('#acp_contact_informationCountry', '#acp_contact_informationState');
  });

  $('#acp_contact_information_mailingCountry').on('change', function () {
    updateStateList('#acp_contact_information_mailingCountry', '#acp_contact_information_mailingState');
  });

  $('#consignee_country').on('change', function () {
    updateStateList('#consignee_country', '#consignee_state');
  });

  $('#lot_title_form_mailingCountry').on('change', function () {
    updateStateList('#lot_title_form_mailingCountry', '#lot_title_form_mailingState');
  });

  $('#inventory_location_add_country').on('change', function () {
    updateStateList('#inventory_location_add_country', '#inventory_location_add_state');
  });

  $('#btn-add-amount').on('click', function () {
    $('#container-add-amount').toggle();
  });

  $('#btn-add-recurring-amount').on('click', function () {
    $('#container-add-recurring').toggle();
  });

  $('#carrier_label_custom_form_shipperCountry').on('change', function () {
    updateStateList('#carrier_label_custom_form_shipperCountry', '#carrier_label_custom_form_shipperState');
  });

  $('#carrier_label_custom_form_recipientCountry').on('change', function () {
    updateStateList('#carrier_label_custom_form_recipientCountry', '#carrier_label_custom_form_recipientState');
  });

  $('#acp_contact_information_country').on('change', function () {
    updateStateList('#acp_contact_information_country', '#acp_contact_information_state');
  });

  $('#copart-bidders #country').on('change', function () {
    updateStateList('#copart-bidders #country', '#copart-bidders #state');
  });

  /** popup links */
  $(document).on("click", "[data-popup]", function(e) {
      e.preventDefault();

      var url = '' + $(this).prop('href');
      var title = '' + $(this).text();
      var dataTitle = '' + $(this).data('popup');
      if (dataTitle.length > 0) {
        title = dataTitle;
      }

      var style = 'width=850,height=800,resizable=yes,scrollbars=yes';
      var dataStyle = $(this).data('popup-style');
      if (dataStyle && dataStyle.length > 0) {
        style = dataStyle + ',resizable=yes,scrollbars=yes';
      }

      window.open(url, title, style);

      return false;
  });

  $('.js-counterbid').on('click', function (e) {
    e.preventDefault();
    var type = $(this).data('type');

    $('#counterbidding_type').val(type);
    $('form[name="counterbidding"]').submit();
  });

  function updateAuctionLocationList(auction_el, location_el) {
    $.getJSON('/abm-acp/api/v1/auction-locations/' + $(auction_el).val(), {}, function (data) {
      var locationOptions;
      locationOptions = '';
      $.each(data, function () {
        return locationOptions += '<option value="' + this.value + '">' + this.label + '</option>';
      });

      $(location_el).html(locationOptions);
    });
  }

  $('#lot_purchase_create_auction').on('change', function () {
    updateAuctionLocationList('#lot_purchase_create_auction', '#lot_purchase_create_auctionLocation');
  });

  $(".file-preview.is-hoverable").each(function() {
    var $el = $(this);
    var $displayEl = $(this).find(".file-display");
    var displayTimeout;

    $el.on("mouseenter", function() {
      clearTimeout(displayTimeout);
      if (!$displayEl.hasClass("hidden")) {
        return;
      }

      if (currentDisplay && currentDisplay !== $displayEl) {
        currentDisplay.addClass("hidden");
      }

      currentDisplay = $displayEl;
      $displayEl.removeClass("hidden");
    });

    $el.on("mouseleave", function() {
      if ($displayEl.hasClass("hidden")) {
        return;
      }

      displayTimeout = setTimeout(function() {
        $displayEl.addClass("hidden");
      }, 500);
    });
  });

  $('.select-office-location-countries').on('change', function () {
    const localesString = $(this).find('option:selected').data('locales');
    const locales = localesString.split(',');
    const localizedAddresses = $('.input-localized-address');

    localizedAddresses.prop('disabled', true);
    localizedAddresses.each(function () {
      $(this).closest('.form-group').addClass('hidden').next().addClass('hidden');
    });

    locales.forEach((locale) => {
      $('.input-localized-address[name$="['+locale+']"')
        .prop('disabled', false)
        .closest('.form-group')
        .removeClass('hidden')
        .next()
        .removeClass('hidden');
    })
  }).trigger('change');

  function updateRelatedList($currentEl) {
    const $relatedEl = $(`#${$currentEl.data("cascade")}`);
    if (!$currentEl.val()) {
      if ($currentEl.data("placeholder")) {
        $relatedEl.html(`<option value="">${$currentEl.data("placeholder")}</option>`);
        return;
      }
      $relatedEl.html("");
      return;
    }
    $.getJSON($currentEl.data("url").replace("%value%", $currentEl.val()), {}, function(data) {
      let options = "";
      $.each(data, function() {
        return (options += "<option value=\"" + this.value + "\">" + this.label + "</option>");
      });

      $relatedEl.html(options);
    });
  }

  $(document).on("change", ".update-related-list", (e) => {
    updateRelatedList($(e.target));
  });
});

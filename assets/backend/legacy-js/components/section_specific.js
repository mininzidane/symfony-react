const $ = require('jquery');
const FormSorter = require('./form_sorter');
var sectionLoader = require('./section_loader');

var Sec = sectionLoader.definer;

// form sorter for bidder activity
Sec('#copart-bidders', function () {
  FormSorter.initialize({
    sortFieldInput: '#sort',
    sortOrderInput: '#sortOrder'
  });
});


Sec('#backend-chargeback', function () {
  FormSorter.initialize({
    sortFieldInput: '#sort',
    sortOrderInput: '#sortOrder'
  });
});

Sec('#customer-tab', function () {
  FormSorter.initialize({
    sortFieldInput: '#sort',
    sortOrderInput: '#sortOrder'
  });
});

Sec('#bank-feed', function () {
  FormSorter.initialize({
    sortFieldInput: '#sort',
    sortOrderInput: '#sortOrder'
  });
});

Sec('#wire-confirmation-list', function () {
  FormSorter.initialize({
    sortFieldInput: '#sort',
    sortOrderInput: '#sortOrder'
  });
});

Sec('#customer-parent-list', function () {
  FormSorter.initialize({
    sortFieldInput: '#sort',
    sortOrderInput: '#sortOrder'
  });
});

Sec('#analyze-syc-orders', function () {
  FormSorter.initialize({
    sortFieldInput: '#sort',
    sortOrderInput: '#sortOrder'
  });
});

Sec('#purchases-analytics', function () {
  FormSorter.initialize({
    sortFieldInput: '#sort',
    sortOrderInput: '#sortOrder'
  });
});

// change buyer-power calculations
Sec('#change-buyer-power', function () {
  function BuyerPowerCalculator(elements) {
    this.sourceData = elements;
    var main = this;

    this.init = function () {
      main.sourceData.used = +main.sourceData.usedEl.text().replace(/[$,]/g, '');
      main.sourceData.deposit = +main.sourceData.depositEl.text().replace(/[$,]/g, '');

      main.sourceData.allocEl
        .on('change', main.calc)
        .on('keyup', main.calc);

      main.sourceData.depositEl.on('click', function (e) {
        e.preventDefault();
        main.applyDeposit();
        return false;
      });
    };

    this.format = function (val) {
      switch (main.sourceData.format) {
        case 'money':
          return '$' + String(val).replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        default:
          return val;
      }
    };

    this.calc = function () {
      var alloc = +main.sourceData.allocEl.val();
      var used = main.sourceData.used;
      var result = main.format(alloc - used);
      main.sourceData.remainEl.html(result);
    };

    this.applyDeposit = function () {
      main.sourceData.allocEl.val(main.sourceData.deposit);
      main.calc();
    };
  }

  // Count
  var count = new BuyerPowerCalculator({
    remainEl: $('#remainCount'),
    depositEl: $('#depositCount'),
    allocEl: $('#change_bidding_limit_blCount'),
    usedEl: $('#usedCount'),
    format: 'int'
  });

  // Amount
  var amount = new BuyerPowerCalculator({
    remainEl: $('#remainAmount'),
    depositEl: $('#depositAmount'),
    allocEl: $('#change_bidding_limit_blAmount'),
    usedEl: $('#usedAmount'),
    format: 'money'
  });

  count.init();
  amount.init();
});

module.exports = {
  load: function () {
    sectionLoader.loader.load();
  }
};

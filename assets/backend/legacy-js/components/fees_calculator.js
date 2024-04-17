const $ = require('jquery');

var bidCalc = new feesCalculator('fees-calculator', 'final-bid');

function feesCalculator(mainId, inputId) {
  this.debugMode = false;
  this.inputElement = $('#' + inputId);
  this.mainElement = $('#' + mainId);

  // called at the last line of the feesCalculator definition
  this.init = function () {
    // input fallbacks
    if (!this.checkElement(this.inputElement)) {
      this.inputElement = $('#final-bid');
    }
    if (!this.checkElement(this.inputElement)) {
      this.inputElement = $('#place_bid_amount');
    }
    if (!this.checkElement(this.inputElement)) {
      return;
    }

    // event handlers
    this.addHandlersTo(this.inputElement, 1);
    this.addHandlersTo('#place_bid_amount');
  }

  this.checkElement = function (e) {
    if ((typeof e.val) == "function") {
      var val = e.val();
      if (val) {
        if (val.length) {
          return true;
        }
      }

    }

    return false;
  };

  this.addHandlersTo = function (selector, onready) {
    var element = $(selector);
    var self = this;
    if (element.length) {
      element
        .change(function () {
          self.calculate(element);
        })
        .keyup(function () {
          self.calculate(element);
        });

      if (onready) {
        element.ready(function () {
          self.calculate(element);
        })
      }
    }
  }

  // main function
  this.calculate = function (currentAmountInput) {
    this.debug('--calc start--');

    // grab the bid from the calc, then check for an alternate bid input
    bid = Number(this.inputElement.val().replace('$', ''));
    if (typeof (currentAmountInput.val) == "function") {
      bid = Number(currentAmountInput.val().replace('$', ''));
      this.inputElement.val('$' + bid);
    }

    exchangeRate = this.getDomData(this.mainElement, 'exchange_rate');
    copart_fee = this.getCopartFee(bid);

    this.debug(1, '   bid', bid);
    this.debug(1, '   exch', exchangeRate);
    this.debug(1, '   copart', copart_fee);

    this.taxes(bid + copart_fee);

    total = parseFloat(bid * 1 / exchangeRate);
    total += parseFloat(copart_fee * 1 / exchangeRate);
    total += this.getDomData('[data-fee="transaction"]', 'amount');
    total += this.getDomData('[data-fee="documentation"]', 'amount');
    total += this.getDomData('[data-fee="haz_mat_compliance"]', 'amount');

    total = Math.round(total * 100) / 100;

    this.debug(1, '   total', total);

    $('[data-fee="auction"]').html(Number(copart_fee));
    $('[data-fee="total"]').html(Number(total));
  };

  this.getCopartFee = function (bid) {
    mailing_fee = 10;
    return this.getBuyerFee(bid) + this.getInternetBidFee(bid) + mailing_fee;
  };

  /*
   * feeSearch
   * @param feeList array     list( bid => fee )
   * @param key float         bid amount to find fee for
   * @param multiplier        percent rate to bid if bid exceeds largest key
   *    will find the largest bid-threshold that does not exceed key
   *
   * @return float fee
   */
  this.feeSearch = function (feeList, key, oversizeMult) {
    var resultFee = key * oversizeMult;
    var thresholds = Object.keys(feeList);
    var resultKey;

    if (key <= Math.max.apply(null, thresholds)) {
      // if key is less than the largest key in the threshold...
      thresholds.forEach(function (threshold) {
        // finds the largest index which is less than key
        // i.e.: feeList( 4, 6, 10 )  key( 9 ) -- stores the key 6
        if (key < threshold) this.resultKey = threshold;
      }, this.feeSearch);

      if (resultKey) {
        resultFee = feeList[resultKey];
      }
    }

    return resultFee;
  };

  // main block for calculating fee and gate.
  // most of the buisness logic for how to calculate the fee based on user or location
  this.getBuyerFee = function (amount) {
    var location_id = this.getDomData(this.mainElement, 'location_id');
    var fee = 0
    var gate = 59;

    if (location_id == 311 || location_id == 312) {

      fee = this.feeSearch(this.buyerFeeThresholdLocations, amount, 0.10);
      fee = parseInt(fee);
      gate = 50;

    } else if (this.getDomData(this.mainElement, 'homeowners')) {
      fee = amount * 0.20;

    } else {
      fee = this.feeSearch(this.buyerFeeThreshold, amount, 0.02);
      fee = parseInt(fee);

    }

    return fee + gate;
  };

  this.getInternetBidFee = function (amount) {
    var fee = 79;
    var maxKey = Math.max.apply(null, Object.keys(this.internetFeeThreshold));

    if (amount <= maxKey) {
      // only search if bid is <= max bid in threshold list
      fee = this.feeSearch(this.internetFeeThreshold, amount, 0);
    }

    return fee;
  };

  // grab a data-value from dom element
  // only handles float data
  // e.x.:
  //    getDomData('#someId', 'somefield');
  //    will grab [VALUE] from:  <div id='someId' data-somefield='[VALUE]'>
  this.getDomData = function (selector, dataField) {
    var result = 0;
    var element;
    if (typeof (selector) == 'object') {
      element = selector;
    } else {
      element = $(selector);
    }

    if (element.data(dataField) != null) {
      fee = parseFloat(element.data(dataField));
    }

    this.debug(2, 'getDomData: ' + element.selector + '.data(' + dataField + ') = ' + fee);

    if (fee > 0) {
      return fee;
    } else {
      return 0;
    }
  };

  // migrated from old code... doesn't look like its actually doing anything
  this.taxes = function (amount) {
    hstTax = $('[data-fee="hst-tax"]');
    if (hstTax.length) {
      hst_tax = Math.round(amount * 0.13 * 100) / 100;
      hstTax.html(Number(hst_tax));
    }
    gstTax = $('[data-fee="gst-tax"]');
    if (gstTax.length) {
      gst_tax = Math.round(amount * 0.05 * 100) / 100;
      gstTax.html(Number(gst_tax));
    }
  };

  this.buyerFeeThresholdLocations = {
    50: 30,
    100: 45,
    200: 70,
    300: 100,
    400: 120,
    500: 140,
    600: 160,
    700: 180,
    800: 210,
    900: 230,
    1000: 250,
    1200: 275,
    1400: 310,
    1600: 330,
    1800: 360,
    2000: 400,
    2500: 440,
    3000: 480,
    5000: 575,
    7500: 675,
    8000: 775,
    9000: 875,
    10000: 975
  };

  this.buyerFeeThreshold = {
    50: 1,
    100: 1,
    200: 25,
    300: 50,
    400: 75,
    500: 110,
    600: 125,
    700: 140,
    800: 155,
    900: 170,
    1000: 185,
    1200: 200,
    1400: 225,
    1600: 250,
    1800: 275,
    2000: 300,
    2500: 325,
    3000: 350,
    5000: 400,
    7500: 425,
    10000: 450,
    15000: 500,
    20000: 550,
    25000: 600,
    35000: 700
  };

  this.internetFeeThreshold = {
    100: 0,
    500: 29,
    1000: 39,
    1500: 49,
    2000: 59,
    4000: 69
  };

  this.debug = function (lvl, msg, arg) {
    if (this.debugMode) {
      if (typeof (lvl) == 'string') {
        msg = lvl;
        arg = msg;
      } else {
        msg = '   '.repeat(lvl) + msg;
      }

      if (arg) {
        msg += ': ' + arg;
      }

      console.log(msg);
    }
  };

  this.init();
}

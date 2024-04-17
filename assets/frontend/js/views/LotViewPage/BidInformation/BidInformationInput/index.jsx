import React, { useState, useEffect, createRef, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CurrencyService from 'frontend/js/api/CurrencyService';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import Amount from 'frontend/js/components/Amount';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import NumberService from 'frontend/js/lib/utils/NumberService';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';

function BidInformationInput({
  value,
  minValue,
  onChange,
  onFocus,
  delta,
  hasError,
  hasSeparator,
  hasMinValueWarning,
  isStartingBid,
  currencyFeeFormat,
  currencySymbol,
}) {
  const classes = useStyles();

  const [isFocused, setFocused] = useState(false);
  const [isWarningShown, setIsWarningShown] = useState(false);
  const { increment, decrement } = delta;
  const { formatCurrency } = NumberService;
  const displayValue = value ? formatCurrency(value, currencyFeeFormat) : currencySymbol;
  const inputRef = createRef();
  const timeout = useRef(null);

  function correctValue() {
    let nextVal;

    if (value < minValue) {
      nextVal = minValue;
    } else {
      nextVal = Math.round(value / increment) * increment;
    }

    onChange(nextVal);
  }

  function handleChange(event) {
    const rawValue = parseInt(event.target.value.replace(/\D/g, '').slice(0, 6), 10); // added length limit and removed non-digit chars
    const nextValue = rawValue || 0;

    onChange(nextValue);
  }

  function handleFocus() {
    setFocused(true);
    onFocus();
  }

  function handleBlur() {
    correctValue();
  }

  function handleClickAway() {
    setFocused(false);
  }

  function handleIncrease() {
    onChange(value + increment);
    inputRef.current.focus();
  }

  function handleDecrease() {
    onChange(value - decrement);
    inputRef.current.focus();
  }

  useEffect(() => {
    correctValue();

    if (!ViewportService.isMobile()) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const isBelowMinimum = value < minValue;
    window.dispatchEvent(new CustomEvent('toggleBidNowButtonState', { detail: { isBelowMinimum, isStartingBid } }));

    if (!isStartingBid) {
      return;
    }

    clearTimeout(timeout.current);

    if (isBelowMinimum) {
      timeout.current = setTimeout(() => {
        setIsWarningShown(true);
      }, 750);
    } else {
      setIsWarningShown(false);
    }
  }, [value, minValue]);

  return (
    <ClickAwayListener onClickAway={handleClickAway} mouseEvent="onMouseDown">
      <>
        <div className={classes.root}>
          <input
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            ref={inputRef}
            value={displayValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={classnames(classes.input, { 'is-focused': isFocused, 'is-error': hasError || isWarningShown })}
          />

          {value > minValue && (
            <button
              type="button"
              className={classnames(classes.control, 'is-minus', { 'is-focused': isFocused })}
              onClick={handleDecrease}
            >
              <svg viewBox="-780 8379 16 16">
                <g transform="translate(-1102 7521)">
                  <circle className={classes.circle} cx="8" cy="8" r="8" transform="translate(322 858)" />
                  <g transform="translate(326.766 865.684)">
                    <rect fill="#fff" width="7.973" height="0.973" transform="translate(-1 0)" />
                  </g>
                </g>
              </svg>
            </button>
          )}

          <button
            type="button"
            className={classnames(classes.control, 'is-plus', { 'is-focused': isFocused })}
            onClick={handleIncrease}
          >
            <svg viewBox="-780 8359 16 16">
              <g transform="translate(-1102 7521)">
                <circle className={classes.circle} cx="8" cy="8" r="8" transform="translate(322 838)" />
                <g transform="translate(326.766 842.766)">
                  <rect fill="#fff" width="6.809" height="0.973" transform="translate(0 2.918)" />
                  <rect fill="#fff" width="6.809" height="0.973" transform="translate(2.918 6.809) rotate(-90)" />
                </g>
              </g>
            </svg>
          </button>
        </div>

        {hasMinValueWarning && isWarningShown && (
          <div className={classes.minValueWarning}>
            <FormattedMessage
              id="lotPage.bidInformation.minBidWarning"
              values={{ value: <Amount value={minValue} fontWeight={400} currency={formatCurrency} /> }}
            />
          </div>
        )}

        {hasSeparator && <div className={classes.separator} />}
      </>
    </ClickAwayListener>
  );
}

BidInformationInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  value: PropTypes.number.isRequired,
  delta: PropTypes.shape({
    increment: PropTypes.number,
    decrement: PropTypes.number,
  }).isRequired,
  minValue: PropTypes.number,
  hasError: PropTypes.bool,
  hasSeparator: PropTypes.bool,
  hasMinValueWarning: PropTypes.bool,
  isStartingBid: PropTypes.bool,
  currencyFeeFormat: PropTypes.string,
  currencySymbol: PropTypes.string,
};

BidInformationInput.defaultProps = {
  minValue: 1,
  onFocus: () => {},
  hasError: false,
  hasSeparator: false,
  hasMinValueWarning: false,
  isStartingBid: false,
  currencyFeeFormat: CurrencyService.CURRENCY_USD,
  currencySymbol: CurrencyService.CURRENCY_USD_SYMBOL,
};

export default BidInformationInput;

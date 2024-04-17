import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Button from 'frontend/js/components/Button';
import PaymentService from 'frontend/js/api/PaymentService';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function CouponCode({ couponApplied }) {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [isInputShown, setIsInputShown] = useState(false);
  const [value, setValue] = useState('');
  const { coupon } = useCheckoutContext();

  useEffect(() => {
    if (couponApplied) {
      coupon.set(couponApplied);
    }
  }, []);

  function handleCouponCodeSubmit() {
    PaymentService.coupon(value)
      .then((data) => coupon.set(data.coupon))
      .catch(() => setError(true));
  }

  function removeCouponCode() {
    coupon.set(null);
    setIsInputShown(false);
    setValue('');
  }

  if (coupon.applied) {
    return (
      <div className={classes.root}>
        <div>
          <div className={classes.successMessage}>
            <FormattedMessage id="checkoutPage.summary.couponCodeIsApplied" />
          </div>{' '}
          <button type="button" className={classes.remove} onClick={removeCouponCode}>
            <FormattedMessage id="shared.cta.remove" />
          </button>
        </div>
      </div>
    );
  }

  const MIN_COUPON_LENGTH = 3;
  const isShowButton = value && value.length >= MIN_COUPON_LENGTH;

  return (
    <div className={classes.root}>
      <button
        type="button"
        className={classnames(classes.cta, { 'is-input-shown': isInputShown })}
        onClick={() => setIsInputShown(!isInputShown)}
      >
        <FormattedMessage id="checkoutPage.summary.haveCouponCode" />{' '}
        <span>
          <FormattedMessage id="shared.label.apply" />
        </span>
      </button>
      {isInputShown && (
        <div className={classnames(classes.form, { 'is-active': isShowButton })}>
          <div>
            <InputPlane
              id="couponCode"
              name="couponCode"
              placeholder="Type coupon code here"
              value={value}
              error={error && <FormattedMessage id="checkoutPage.couponCodeIsNotValid" />}
              onChange={(_, v) => setValue(v)}
              touched
            />
          </div>
          {isShowButton && (
            <Button
              color="blue"
              label={<FormattedMessage id="shared.label.apply" />}
              onClick={handleCouponCodeSubmit}
            />
          )}
        </div>
      )}
    </div>
  );
}

CouponCode.propTypes = {
  couponApplied: PropTypes.object,
};

CouponCode.defaultProps = {
  couponApplied: null,
};

export default CouponCode;

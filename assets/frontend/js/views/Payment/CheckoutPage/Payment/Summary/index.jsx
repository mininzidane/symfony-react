import React, { useState, useRef, useLayoutEffect } from 'react';
import classnames from 'classnames';
import Slide from '@material-ui/core/Slide';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import Card from 'frontend/js/components/Card';
import Alert from 'frontend/js/components/Form/Alert';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';
import PaymentProcessing from 'frontend/js/views/Payment/CheckoutPage/Payment/Summary/PaymentProcessing';
import SecureServices from './SecureServices';
import Agreement from './Agreement';
import CouponCode from './CouponCode';
import Submit from './Submit';
import useStyles from './useStyles';

function Summary({ couponApplied, hasInnerTitle }) {
  const [isToolbarShown, setIsToolbarShown] = useState(false);
  const classes = useStyles({ hasInnerTitle });
  const { invoices, amount, error, coupon, form } = useCheckoutContext();
  const { isBelowSm } = useBreakpoint();
  const toolbarRef = useRef();

  useLayoutEffect(() => {
    const Observer = ViewportService.createIntersectionObserver({ threshold: 1.0 });
    let handle;

    Observer.observe(toolbarRef.current, (isIntersecting) => {
      window.cancelIdleCallback(handle);

      handle = window.requestIdleCallback(
        () => {
          setIsToolbarShown(!isIntersecting);
        },
        { timeout: 200 },
      );
    });

    return () => {
      window.cancelIdleCallback(handle);
      Observer.unobserve(toolbarRef.current);
    };
  }, []);

  return (
    <div className={classes.root}>
      {isBelowSm && (
        <Slide direction="up" in={isToolbarShown} mountOnEnter unmountOnExit>
          <div className={classes.mobileStickySubmit}>
            <Submit />
          </div>
        </Slide>
      )}

      {!hasInnerTitle && (
        <h2 className={classes.title}>
          <FormattedMessage id="checkoutPage.summary.title" />
        </h2>
      )}

      {(coupon.allowed || couponApplied) && <CouponCode couponApplied={couponApplied} />}

      <Card elevation={2} className={classes.card}>
        {hasInnerTitle && (
          <h2 className={classes.innerTitle}>
            <FormattedMessage id="checkoutPage.summary.title" />
          </h2>
        )}
        {form.isProcessing && <PaymentProcessing />}
        {!form.isProcessing && (
          <>
            <div>
              {invoices &&
                invoices.map((invoice) => {
                  const entries = get(invoice, 'items', []).filter((item) => parseFloat(item.due) > 0);
                  return entries.map((entry) => (
                    <div className={classes.entry} key={`${entry.id}_${entry.productService.name}`}>
                      <div>{entry.productService.name}</div>
                      <div>{NumberService.formatCurrency(entry.due, 'USD', true)} USD</div>
                    </div>
                  ));
                })}
            </div>

            {coupon.applied && (
              <div className={classes.entry}>
                <div>
                  <FormattedMessage id="checkoutPage.summary.couponCodeDiscount" />
                </div>
                <div>{NumberService.formatCurrency(coupon.discount, 'USD', true)} USD</div>
              </div>
            )}

            <div>
              <div className={classnames(classes.entry, classes.totalDueRow)}>
                <div>
                  <FormattedMessage id="checkoutPage.summary.totalPaymentDue" />
                </div>
                <div>{NumberService.formatCurrency(amount, 'USD', true)} USD</div>
              </div>
            </div>
          </>
        )}

        <div ref={toolbarRef}>
          <Submit />
        </div>

        {error.shown && (
          <Alert isShown severity="error" className={classes.errorMessage}>
            <FormattedMessage id="form.error.general" />
          </Alert>
        )}
        <Agreement />
        <SecureServices />
      </Card>
    </div>
  );
}

Summary.propTypes = {
  couponApplied: PropTypes.object,
  hasInnerTitle: PropTypes.bool,
};

Summary.defaultProps = {
  couponApplied: null,
  hasInnerTitle: false,
};

export default Summary;

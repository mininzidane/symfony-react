import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import Button from 'frontend/js/components/Button';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import NumberService from 'frontend/js/lib/utils/NumberService';
import ButtonLink from 'frontend/js/components/ButtonLink';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useStyles from './useStyles';

function Footer({ className, formik, getQuote, createOrder, isPreorder, quote, isLoading }) {
  const intl = useIntl();
  const classes = useStyles();
  const [isSubmittingContinueToCheckout, setIsSubmittingContinueToCheckout] = useState(false);
  const { towingMarkup } = useCustomerHelper();
  let total = quote && quote.quote && quote.quote.total;
  total += towingMarkup + Object.values(quote?.fees || {}).reduce((acc, curr) => acc + curr, 0);

  const submitButtonLabel = quote
    ? intl.formatMessage({ id: isPreorder ? 'shipping.preorderShipping' : 'shipping.addShippingToMyInvoice' })
    : intl.formatMessage({ id: 'shipping.getQuote' });

  function handleSubmit(isAddShippingToMyInvoice = false) {
    formik
      .submitForm()
      .then(formik.validateForm)
      .then((errors) => {
        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
          setIsSubmittingContinueToCheckout(quote && !isPreorder && !isAddShippingToMyInvoice);
          if (!quote) {
            getQuote(formik.values);
          } else {
            createOrder(formik.values, isAddShippingToMyInvoice);
          }
        }
      })
      .catch(() => {
        /** Ignore */
      });
  }

  return (
    <div className={classnames(classes.root, className)}>
      {quote && (
        <div className={classes.total}>
          {intl.formatMessage({ id: 'shipping.shippingQuote' })}:{' '}
          {total && (
            <>
              <strong>{NumberService.formatCurrency(total)}</strong> USD
            </>
          )}
        </div>
      )}
      <Button
        onClick={() => handleSubmit(!isPreorder)}
        label={submitButtonLabel}
        isLoading={isLoading && !isSubmittingContinueToCheckout}
      />
      {!isPreorder && quote && (
        <>
          {isLoading && isSubmittingContinueToCheckout ? (
            <SpinnerWheel size={14} thickness={2} className={classes.loader} />
          ) : (
            <ButtonLink
              onClick={() => handleSubmit(false)}
              label={intl.formatMessage({ id: 'shipping.continueToCheckout' })}
              className={classes.buttonLink}
            />
          )}
        </>
      )}
    </div>
  );
}

Footer.propTypes = {
  formik: PropTypes.object.isRequired,
  getQuote: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired,
  isPreorder: PropTypes.bool.isRequired,
  quote: PropTypes.object,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

Footer.defaultProps = {
  quote: null,
  isLoading: false,
  className: '',
};

export default Footer;

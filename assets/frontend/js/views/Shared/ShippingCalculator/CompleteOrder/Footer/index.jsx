import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import Button from 'frontend/js/components/Button';
import Link from 'frontend/js/components/Link';
import QuoteDetails from './QuoteDetails';
import useStyles from './useStyles';

function Footer({ quote }) {
  const classes = useStyles();
  const { isSubmitting, submitForm } = useFormikContext();

  return (
    <div className={classes.root}>
      <div>
        <QuoteDetails quote={quote} />
      </div>
      <div className={classes.wrap}>
        <Button
          label={<FormattedMessage id="shippingCalculator.completeOrder.submit" />}
          onClick={submitForm}
          isLoading={isSubmitting}
          className={classes.cta}
          color="blue"
        />
        <div className={classes.agreement}>
          <FormattedMessage
            id="shipping.agreement.submit.lsa"
            values={{
              cta: <FormattedMessage id="shippingCalculator.completeOrder.submit" />,
              a: (chunks) => (
                <Link href={RouterService.getRoute('lsa', null, true)} isTargetBlank isNofollow>
                  {chunks}
                </Link>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
}

Footer.propTypes = {
  quote: PropTypes.shape({}).isRequired,
};

export default Footer;

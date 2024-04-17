import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from 'frontend/js/components/Button';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function CtaSection({ currentBid, currency, href, analytics, hideBid }) {
  const classes = useStyles();

  return (
    <div className={classes.grid}>
      {!hideBid && (
        <div className={classes.info}>
          <div className={classes.caption}>
            <FormattedMessage id="shared.label.currentBid" className={classes.caption} />:
          </div>
          <div className={classes.valueWrap}>
            <div className={classes.value}>{NumberService.formatCurrency(currentBid, currency)}</div>&nbsp;
            <div className={classes.currency}>{currency}</div>
          </div>
        </div>
      )}

      <Button
        href={href}
        className={classnames(classes.button, 'js-track-event')}
        data-step={analytics.step}
        data-substep={analytics.substep}
        label={<FormattedMessage id="shared.cta.viewVehicle" />}
      />
    </div>
  );
}

CtaSection.propTypes = {
  currentBid: PropTypes.number,
  currency: PropTypes.string,
  analytics: PropTypes.object,
  href: PropTypes.string.isRequired,
  hideBid: PropTypes.bool,
};

CtaSection.defaultProps = {
  analytics: {},
  currentBid: null,
  currency: null,
  hideBid: false,
};

export default CtaSection;

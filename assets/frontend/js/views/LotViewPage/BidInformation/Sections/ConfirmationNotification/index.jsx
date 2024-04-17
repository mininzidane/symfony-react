import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import Amount from 'frontend/js/components/Amount';
import Tickbox from 'frontend/js/components/Form/Tickbox';
import IncrementalBidGuidelinesLink from '../IncrementalBidGuidelinesLink';
import useStyles from './useStyles';

function ConfirmationNotification({ amount, amountDetails, type, onOneMoreIncrementChange, oneMoreIncrement }) {
  const intl = useIntl();
  const classes = useStyles();

  const translationSets = {
    yourStartingBid: intl.formatMessage({ id: 'lotPage.bidInformation.yourStartingBid' }),
    yourMaxBid: intl.formatMessage({ id: 'lotPage.bidInformation.yourMaxBid' }),
    extraIncrementLabel: intl.formatMessage({ id: 'lotPage.bidInformation.label.extraIncrement' }),
  };

  return (
    <div>
      {type === 'increaseBid' && (
        <>
          <div className={classes.card}>
            <div className={classes.amountRow}>
              <strong>{translationSets.yourMaxBid}</strong>
              <Amount value={amount} hasCurrency />
            </div>
          </div>
          <div className={classnames(classes.card, 'is-highlighted')}>
            <Tickbox
              className={classes.tickbox}
              onChange={(_, v) => onOneMoreIncrementChange(v)}
              value={oneMoreIncrement}
              id="extraIncrement"
              name="extraIncrement"
              touched
            >
              <div>
                {translationSets.extraIncrementLabel} <IncrementalBidGuidelinesLink />
              </div>
            </Tickbox>
          </div>
        </>
      )}

      {amountDetails && (
        <div className={classes.card}>
          <div className={classes.amountRow}>
            <strong>{translationSets.yourStartingBid}</strong>
            <Amount value={amountDetails.startBid} hasCurrency />
          </div>

          {type !== 'increaseBid' && (
            <div className={classes.amountRow}>
              <strong>{translationSets.yourMaxBid}</strong>
              <Amount value={amountDetails.maxBid} hasCurrency />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

ConfirmationNotification.propTypes = {
  amount: PropTypes.number.isRequired,
  type: PropTypes.string,
  amountDetails: PropTypes.object,
  onOneMoreIncrementChange: PropTypes.func,
  oneMoreIncrement: PropTypes.bool,
};

ConfirmationNotification.defaultProps = {
  type: 'bidNow',
  amountDetails: null,
  onOneMoreIncrementChange: () => {},
  oneMoreIncrement: false,
};

export default ConfirmationNotification;

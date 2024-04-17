import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import NumberService from 'frontend/js/lib/utils/NumberService';
import Amount from 'frontend/js/components/Amount';
import useStatus from './useStatus';
import useStyles from './useStyles';

function StatusValues({ consignment, isLotSold }) {
  if (!consignment) {
    return null;
  }

  const intl = useIntl();
  const classes = useStyles();
  const { status, colors } = useStatus(consignment);

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <span>{intl.formatMessage({ id: 'shared.label.bidStatus' })}:</span>
        <div className={classes.status} style={{ color: colors.status }}>
          {status}
        </div>
      </div>

      {!isLotSold && (
        <>
          <div className={classes.row}>
            <span>{intl.formatMessage({ id: 'consignment.label.sellersReserve' })}:</span>
            <strong>{NumberService.formatCurrency(consignment.reserveAmount || 0)}</strong>
          </div>
          <div className={classnames(classes.row, 'is-price')}>
            <span>{intl.formatMessage({ id: 'shared.label.currentBid' })}:</span>
            <Amount className={classes.amount} value={consignment.currentBid} hasCurrency />
          </div>
        </>
      )}
    </div>
  );
}

StatusValues.propTypes = {
  consignment: PropTypes.object,
  isLotSold: PropTypes.bool,
};

StatusValues.defaultProps = {
  consignment: {},
  isLotSold: false,
};

export default StatusValues;

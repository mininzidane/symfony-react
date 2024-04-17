import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import Tickbox from 'frontend/js/components/Form/Tickbox';
import InfoTriggerThin from 'frontend/js/components/TooltipOnHover/Triggers/InfoTriggerThin';
import useStyles from './useStyles';

function UnlimitedAuctionStorage({ formik, title, tooltip, currency, disabled }) {
  const classes = useStyles();
  const [isChecked, setIsChecked] = useState(formik.values.unlimitedAuctionStorage);

  function handleToggle() {
    setIsChecked(!isChecked);
    formik.setFieldValue('unlimitedAuctionStorage', !isChecked);
  }

  return (
    <div className={classnames(classes.root)}>
      <div className={classes.toggle}>
        <Tickbox
          className={classes.tickbox}
          onChange={handleToggle}
          value={isChecked}
          name="unlimitedAuctionStorage"
          id="unlimitedAuctionStorage"
          disabled={disabled}
        >
          {title}
        </Tickbox>

        {Boolean(tooltip) && (
          <span className={classes.tooltipWrap}>
            &nbsp;
            <TooltipOnHover
              content={tooltip}
              trigger={<InfoTriggerThin />}
              triggerClassName={classes.tooltipTrigger}
              popperClassName={classes.tooltip}
              placement="top"
              maxWidth={400}
            />
          </span>
        )}
      </div>
      <div className={classnames(classes.value)}>
        <strong>{NumberService.formatCurrency(ShippingOrderService.UNLIMITED_AUCTION_STORAGE, currency)}</strong>{' '}
        {currency}
      </div>
    </div>
  );
}

UnlimitedAuctionStorage.defaultProps = {
  tooltip: null,
  currency: 'USD',
  disabled: false,
};

UnlimitedAuctionStorage.propTypes = {
  formik: PropTypes.object.isRequired,
  title: PropTypes.node.isRequired,
  tooltip: PropTypes.node,
  currency: PropTypes.string,
  disabled: PropTypes.bool,
};

export default UnlimitedAuctionStorage;

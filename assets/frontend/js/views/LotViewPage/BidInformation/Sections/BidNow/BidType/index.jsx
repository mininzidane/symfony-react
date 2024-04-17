import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import BidService from 'frontend/js/api/BidService';
import RadioButton from 'frontend/js/components/Form/RadioButton';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import useStyles from './useStyles';

function BidType({ value, onChange }) {
  const classes = useStyles();
  const intl = useIntl();
  const { MAX_BID, MONSTER_BID } = BidService.BID_TYPES;

  return (
    <div className={classes.root}>
      <div>{intl.formatMessage({ id: 'shared.label.yourBid' })}:</div>

      <div className={classes.radioButtonsGrid}>
        <RadioButton
          className={classes.radioButton}
          label={intl.formatMessage({ id: 'shared.label.maxBid' })}
          value={MAX_BID}
          name="bidType"
          id="bidType-1"
          isChecked={value === MAX_BID}
          onChange={(_, v) => onChange(v)}
          size="sm"
        />
        <div className={classes.radioButtonWrap}>
          <RadioButton
            className={classes.radioButton}
            label={intl.formatMessage({ id: 'shared.label.monsterBid' })}
            value={MONSTER_BID}
            name="bidType"
            id="bidType-2"
            isChecked={value === MONSTER_BID}
            onChange={(_, v) => onChange(v)}
            size="sm"
          />
          <TooltipOnHover
            badgeMarginLeft={2}
            badgeTop={-1}
            content={intl.formatMessage({ id: 'lotPage.bidInformation.monsterBid.desc' })}
            placement="bottom-end"
          />
        </div>
      </div>
    </div>
  );
}

BidType.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

BidType.defaultProps = {
  value: null,
  onChange: () => {},
};

export default BidType;

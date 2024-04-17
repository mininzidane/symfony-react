import React, { useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import useEventListener from 'frontend/js/hooks/useEventListener';
import config from '../config';
import Checkmark from '../Checkmark';
import MobileButtons from '../MobileButtons';
import useStyles from '../PlanCard/useStyles';

function CompareAndUpgrade({ membershipTypes, selectedLevel, customerMembershipType, selectPlan, selectedPlan }) {
  const classes = useStyles();

  const featuresColumn = useRef(null);
  const valuesColumns = [useRef(null), useRef(null), useRef(null)];

  const handleResize = () => {
    if (!featuresColumn) {
      return;
    }

    const featuresPattern = featuresColumn.current.childNodes;
    const valuesPattern = valuesColumns[0].current.childNodes;

    featuresPattern.forEach((_, i) => {
      const height1 = featuresPattern[i].getBoundingClientRect().height;
      const height2 = valuesPattern[i].getBoundingClientRect().height;
      const height = height1 > height2 ? height1 : height2;

      featuresPattern[i].style.height = `${height}px`;

      valuesColumns.forEach((item) => {
        item.current.childNodes[i].style.height = `${height}px`;
      });
    });
  };

  useEventListener('resize', handleResize);

  if (!membershipTypes) {
    return null;
  }

  const getValue = (val) => (typeof val === 'boolean' ? <Checkmark isTrue={val} /> : val);
  const convertNonBoolToCheckmark = (val) =>
    typeof val !== 'boolean' && val ? val : <Checkmark isTrue={Boolean(val)} />;

  return (
    <div className={classes.compare__root}>
      <div className={classes.compare__title}>
        <FormattedMessage id="membershipPlans.compare.title" />
      </div>
      <div className={classes.compare__subtitle}>
        <FormattedMessage id="membershipPlans.compare.subtitle" />
      </div>
      <div className={classes.compare__table}>
        <div ref={featuresColumn} className={classNames(classes.compare__column, classes.compare__feature)}>
          <div className={classes.compare__header}>Feature</div>
          <div>{config.texts.biddingCountLabel}</div>
          <div className={classes.compare__even}>{config.texts.biddingLimitAmountLabel}</div>
          <div className={classes.compare__transFee}>{config.texts.transactionFeeLabel}</div>
          <div className={classes.compare__even}>{config.texts.clearvinReportsLabel}</div>
          <div>{config.texts.liveBiddingLabel}</div>
          <div className={classes.compare__even}>{config.texts.recommendedBidLabel}</div>
          <div>{config.texts.shippingDiscountLabel}</div>
          <div className={classNames(classes.compare__prioritySupport, classes.compare__even)}>
            {config.texts.prioritySupportLabel}
          </div>
          <div>{config.texts.vehicleFinancingLabel}</div>
        </div>
        <div className={classes.compare__valuesWrapper}>
          <div className={classes.compare__values}>
            {membershipTypes.map((item, i) => (
              <div
                key={item.name}
                ref={valuesColumns[i]}
                className={classNames(classes.compare__column, classes.compare__centered, {
                  [classes.disabledPlan]: customerMembershipType.level > item.level,
                  [classes.currentPlan]: item.level === customerMembershipType.level,
                  [classes.selectedPlan]: item.level === selectedLevel,
                })}
                role="button"
                tabIndex={i}
                onKeyPress={() => selectPlan(item.level)}
                onClick={() => selectPlan(item.level)}
              >
                <div className={classes.compare__header}>{item.nameLabel}</div>
                <div>{getValue(item.biddingCount)}</div>
                <div className={classes.compare__even}>{getValue(item.biddingLimitAmount)}</div>
                <div className={classNames(classes.compare__transFeeValue, classes.compare__transFee)}>
                  {item.transFeePerc > 0 ? (
                    <>
                      <div>{item.transFeePerc}%</div>
                      <div className={classes.compare__transFeeMin}>min ${item.transFeeMin}</div>
                    </>
                  ) : (
                    <div>${item.transFeeMin}</div>
                  )}
                </div>
                <div className={classes.compare__even}>{getValue(item.clearvinReports)}</div>
                <div className={classes.compare__liveBidding}>{getValue(item.liveBidding)}</div>
                <div className={classes.compare__even}>{getValue(item.recommendedBid)}</div>
                <div>{convertNonBoolToCheckmark(item.shippingDiscount)}</div>
                <div className={classNames(classes.compare__prioritySupport, classes.compare__even)}>
                  {getValue(item.prioritySupport)}
                </div>
                <div>{getValue(item.vehicleFinancing)}</div>
                <div className={classes.compare__radio}>
                  <div className={classes.radio} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MobileButtons selectedPlan={selectedPlan} />
    </div>
  );
}

CompareAndUpgrade.propTypes = {
  membershipTypes: PropTypes.array.isRequired,
  selectedLevel: PropTypes.number.isRequired,
  customerMembershipType: PropTypes.object.isRequired,
  selectPlan: PropTypes.func.isRequired,
  selectedPlan: PropTypes.object.isRequired,
};

export default CompareAndUpgrade;

import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Card from 'frontend/js/components/Card';
import MembershipService from 'frontend/js/api/MembershipService';
import FitWidthText from 'frontend/js/components/FitWidthText';
import useIntl from 'frontend/js/hooks/useIntl';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useDiscount from 'frontend/js/views/Payment/CheckoutPage/_Context/helpers/useDiscount';
import Description from './Description';
import Extra from './Extra';
import SubmitButton from './SubmitButton';
import CurrentMembership from './CurrentMembership';

import useStyles from './useStyles';

function PlanCard({
  planData,
  isDisabledPlan,
  isBasicDisabledPurchaseLimit,
  isCurrentPlan,
  selectedLevel,
  selectPlan,
  isDescriptionOpen,
  openDescriptionHandler,
  customerMembershipType,
  coupon,
}) {
  const intl = useIntl();
  const classes = useStyles();
  const { isBelowMd } = useBreakpoint();

  const getTitle = (name) => {
    const langMap = {
      Guest: 'membershipPlans.types.Guest',
      Basic: 'membershipPlans.types.Basic',
      Premium: 'membershipPlans.types.Premium',
      Advanced: 'membershipPlans.types.Advanced',
    };

    if (langMap[name]) {
      return <FitWidthText value={intl.formatMessage({ id: langMap[name] })} />;
    }

    return name;
  };

  const discount = useDiscount(planData.price, coupon);
  const price = parseInt(planData.price, 10);

  const outputPrice = () => {
    const priceDiscounted = price - discount;
    const priceTruncated = Math.trunc(priceDiscounted);

    if (priceDiscounted === priceTruncated) {
      return <strong className={classnames(classes.value, 'qa_coast_year')}>{price}</strong>;
    }

    const priceFractional = (priceDiscounted - priceTruncated).toFixed(2).substring(1);

    return (
      <>
        <strong className={classes.value}>{priceTruncated}</strong>
        <span className={classes.fractional}>{priceFractional}</span>
      </>
    );
  };

  return (
    <Card
      className={classnames(classes.root, {
        [classes.disabledPlan]: isDisabledPlan || isBasicDisabledPurchaseLimit,
        [classes.currentPlan]: isCurrentPlan,
        [classes.selectedPlan]: selectedLevel === planData.level,
        [classes.descriptionOpened]: isDescriptionOpen,
        qa_guest_box: true,
      })}
      onClick={() => {
        if (planData.name === MembershipService.TYPE.BASIC && isBasicDisabledPurchaseLimit) {
          return;
        }

        selectPlan(planData.level);
      }}
    >
      {planData.name === MembershipService.TYPE.ADVANCED && <Extra />}
      <div className={classes.header}>
        <div className={classes.radio} />
        <div className={classes.title}>
          {getTitle(planData.name)}
          {isBelowMd && (
            <>
              {isCurrentPlan && <CurrentMembership />}
              {planData.level === customerMembershipType.level + 1 &&
                planData.name === MembershipService.TYPE.BASIC &&
                isBasicDisabledPurchaseLimit && (
                  <CurrentMembership
                    label={<FormattedMessage id="membershipPlans.card.onlyForOnePurchase" />}
                    planName={planData.name}
                  />
                )}
            </>
          )}
        </div>

        {Boolean(discount) && (
          <div
            className={classnames(classes.price, classes.price_discounted, {
              [classes.hidden]: price === 0,
            })}
          >
            <span className={classes.currency}>$</span>
            <strong className={classnames(classes.value, classes.value_discounted)}>{price}</strong>
            <span className={classes.period}>
              <span>&nbsp;/&nbsp;</span>
              <FormattedMessage id="membershipPlans.card.year" />
            </span>
            <hr className={classes.price__strike} />
          </div>
        )}

        <div className={classes.price}>
          <span className={classes.currency}>$</span>
          <>{outputPrice(discount)}</>
          <span className={classes.period}>
            <span>&nbsp;/&nbsp;</span>
            <FormattedMessage id="membershipPlans.card.year" />
          </span>
        </div>

        <div
          className={classes.switch}
          onClick={(e) => {
            openDescriptionHandler(planData.name);
            e.stopPropagation();
          }}
          role="button"
          tabIndex={0}
          onKeyPress={() => {}}
        >
          <div className={classes.switch__arrow}>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L1 9" stroke="#2158F5" />
            </svg>
          </div>
        </div>
      </div>

      <div className={classes.submitButton}>
        <SubmitButton
          planData={planData}
          customerMembershipType={customerMembershipType}
          isCurrentPlan={isCurrentPlan}
          cardData={planData}
          coupon={coupon}
          isBasicDisabledPurchaseLimit={isBasicDisabledPurchaseLimit}
        />
      </div>

      <Description planData={planData} />
    </Card>
  );
}

PlanCard.propTypes = {
  planData: PropTypes.object.isRequired,
  isDisabledPlan: PropTypes.bool.isRequired,
  isCurrentPlan: PropTypes.bool.isRequired,
  isBasicDisabledPurchaseLimit: PropTypes.bool.isRequired,
  selectedLevel: PropTypes.number.isRequired,
  selectPlan: PropTypes.func.isRequired,
  isDescriptionOpen: PropTypes.bool.isRequired,
  openDescriptionHandler: PropTypes.func.isRequired,
  customerMembershipType: PropTypes.object.isRequired,
  coupon: PropTypes.object,
};

PlanCard.defaultProps = {
  coupon: null,
};

export default PlanCard;

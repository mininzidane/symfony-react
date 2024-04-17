import React from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import MembershipService from 'frontend/js/api/MembershipService';
import config from '../config';
import CurrentMembership from './CurrentMembership';

const SubmitButton = ({ planData, customerMembershipType, isCurrentPlan, coupon, isBasicDisabledPurchaseLimit }) => {
  const QA_ID = 'qa_membership';
  const urlCouponCode = coupon ? `&coupon=${coupon.code}` : '';
  const planLevel = planData.level;
  const customerLevel = customerMembershipType.level;
  const planName = planData.name;

  if (planLevel < customerLevel) {
    return null;
  }

  if (isCurrentPlan) {
    return (
      <CurrentMembership
        label={config.btns.btnContinue[planName]}
        href={config.btns.continueUrl[planName]}
        planName={planName}
        className={QA_ID}
      />
    );
  }

  if (planLevel === customerLevel + 1 && planName === MembershipService.TYPE.BASIC) {
    if (isBasicDisabledPurchaseLimit) {
      return (
        <CurrentMembership
          label={<FormattedMessage id="membershipPlans.card.onlyForOnePurchase" />}
          planName={planName}
          className={QA_ID}
        />
      );
    }

    return (
      <ButtonOutlined
        label={config.btns.btnUpgrade[planName]}
        href={config.btns.upgradeUrl[planName] + urlCouponCode}
        className={QA_ID}
        isInline
      />
    );
  }

  return (
    <Button
      label={config.btns.btnUpgrade[planName]}
      color="yellow"
      isInline
      href={config.btns.upgradeUrl[planName] + urlCouponCode}
      className={QA_ID}
    />
  );
};

SubmitButton.propTypes = {
  planData: PropTypes.object.isRequired,
  customerMembershipType: PropTypes.object.isRequired,
  isCurrentPlan: PropTypes.bool.isRequired,
  isBasicDisabledPurchaseLimit: PropTypes.bool.isRequired,
  coupon: PropTypes.object,
};

SubmitButton.defaultProps = {
  coupon: null,
};

export default SubmitButton;

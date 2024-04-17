import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ButtonText from 'frontend/js/components/ButtonText';
import Button from 'frontend/js/components/Button';
import useStyles from './useStyles';
import useMembershipRenewalContext from '../../_Context/useMembershipRenewalContext';

function Coupon() {
  const [submitting, setSubmitting] = useState(false);
  const { customer, membershipDiscount, form, modal, steps } = useMembershipRenewalContext();
  const { originalAmount, discount } = membershipDiscount;
  const { membershipType } = customer;
  const classes = useStyles();

  async function onUseCoupon() {
    setSubmitting(true);
    if (form.isCouponAvailable) {
      await form.onCouponConfirm();
    } else {
      modal.close();
    }
  }

  function onCancelSubscription() {
    steps.setSurveyStep();
  }

  const yearLabel = <FormattedMessage id="shared.label.year" />;

  return (
    <>
      <ModalWindowBody className={classes.modal} isOverflowVisible>
        <div className={classes.content}>
          <div className={classes.offer}>
            <FormattedMessage id="membershipSettings.coupon.specialOffer" />
          </div>

          <div className={classes.keep}>
            <FormattedMessage id="membershipSettings.coupon.keepYourBenefits" />
          </div>

          <div className={classes.discount}>
            <span className={classes.discountOriginal}>
              ${originalAmount}/{yearLabel}
            </span>
            <span>
              ${discount}/{yearLabel}
            </span>
          </div>

          <div className={classes.discountDescription}>
            <FormattedMessage
              id="membershipSettings.coupon.getDiscountOnMembership"
              values={{
                strong: (chunks) => <strong>{chunks}</strong>,
                membership: membershipType.name,
              }}
            />
          </div>

          <Button
            label={<FormattedMessage id="membershipSettings.ctaGetDiscount" />}
            onClick={onUseCoupon}
            isLoading={submitting}
            className={classes.ctaDiscount}
          />

          <ButtonText
            label={<FormattedMessage id="membershipSettings.ctaCancelSubscription" />}
            size="sm"
            onClick={onCancelSubscription}
            className={classes.ctaCancel}
          />
        </div>
      </ModalWindowBody>
    </>
  );
}

Coupon.propTypes = {};

export default Coupon;

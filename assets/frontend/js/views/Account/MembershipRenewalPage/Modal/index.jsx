import React from 'react';
import classnames from 'classnames';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import ModalWindow from 'frontend/js/components/ModalWindow';
import Description from './Description';
import Coupon from './Coupon';
import MembershipExtended from './MembershipExtended';
import Survey from './Survey';
import useMembershipRenewalContext from '../_Context/useMembershipRenewalContext';
import useStyles from './useStyles';

function Modal() {
  const { modal, steps } = useMembershipRenewalContext();
  const { isBelowSm } = useBreakpoint();
  const classes = useStyles();

  return (
    <ModalWindow
      isOpen={modal.isOpen}
      onClose={modal.close}
      size="lg"
      className={classnames({
        [classes.modalWide]: steps.isCouponStep && !isBelowSm,
      })}
    >
      {steps.isDescriptionStep && <Description />}
      {steps.isCouponStep && <Coupon />}
      {steps.isCouponAppliedStep && <MembershipExtended />}
      {steps.isSurveyStep && <Survey />}
    </ModalWindow>
  );
}

export default Modal;

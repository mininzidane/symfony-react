import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import Button from 'frontend/js/components/Button';
import useMembershipRenewalContext from '../../_Context/useMembershipRenewalContext';
import useStyles from './useStyles';

function MembershipExtended() {
  const { customer, membershipDiscount, modal, form } = useMembershipRenewalContext();
  const { membershipType } = customer;
  const { membershipValidity, upgradeDate, discount } = membershipDiscount;
  const classes = useStyles();

  function onSubmit() {
    form.setAutoRenewStatus(true);
    modal.close();
  }

  return (
    <>
      <ModalWindowHeader
        title={<FormattedMessage id="membershipSettings.membershipExtended" />}
        onClose={modal.close}
      />

      <ModalWindowBody hasFooter>
        <div className="description-content">
          <div className={classes.bodyTitle}>
            <FormattedMessage id="membershipSettings.modal.thanksForBusiness" />
          </div>
          <FormattedMessage
            id="membershipSettings.modal.membershipExtendedDescription"
            values={{
              membership: membershipType.name,
              upgradeDate: DateTimeService.format(upgradeDate),
              discountAmount: `$${discount}`,
              renewalDate: DateTimeService.formatFromISOString(membershipValidity),
            }}
          />
        </div>
      </ModalWindowBody>

      <ModalWindowFooter>
        <>
          <Button label={<FormattedMessage id="membershipSettings.ctaGotIt" />} onClick={onSubmit} isInline />
        </>
      </ModalWindowFooter>
    </>
  );
}

export default MembershipExtended;

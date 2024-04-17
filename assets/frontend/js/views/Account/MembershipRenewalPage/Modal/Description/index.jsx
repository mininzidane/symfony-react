import React from 'react';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import ButtonText from 'frontend/js/components/ButtonText';
import Button from 'frontend/js/components/Button';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import BuyerPowerService from 'frontend/js/api/BuyerPowerService';
import useMembershipRenewalContext from '../../_Context/useMembershipRenewalContext';

function Description() {
  const { customer, modal, form, steps } = useMembershipRenewalContext();
  const { setAutoRenewStatus } = form;
  const intl = useIntl();
  const { membershipType } = customer;
  const eventTrackingService = new EventTrackingService();

  function onKeepBenefits() {
    modal.close();

    eventTrackingService.sendEvent({
      step: 'abm_dashboard_renewal_settings_popup',
      substep: 'Keep Benefits',
      product_id: 1,
    });

    setAutoRenewStatus(true);
  }

  function onLoseBenefits() {
    eventTrackingService.sendEvent({
      step: 'abm_dashboard_renewal_settings_popup',
      substep: 'Lose Benefits',
      product_id: 1,
    });

    steps.setCouponStep();
  }

  return (
    <>
      <ModalWindowHeader
        title={<FormattedMessage id="membershipSettings.modal.headerConfirm" />}
        onClose={modal.close}
      />

      <ModalWindowBody hasFooter>
        <div className="description-content">
          <div className="mb-15">
            <FormattedMessage
              id="membershipSettings.modal.benefitsCaption"
              values={{
                strong: (chunks) => <strong>{chunks}</strong>,
                membership: intl.formatMessage({
                  id: `shared.membership.${membershipType.name.toLowerCase()}`,
                }),
              }}
            />
          </div>
          <ul className="m-0" style={{ paddingLeft: '17px' }}>
            <li className="mb-15">
              <FormattedMessage id="membershipSettings.modal.benefit1" />
            </li>
            <li className="mb-15">
              <FormattedMessage id="membershipSettings.modal.benefit2" />
            </li>
            <li className="mb-15">
              <FormattedMessage
                id="membershipSettings.modal.benefit3"
                values={{ maxBid: BuyerPowerService.minDepositThreshold }}
              />
            </li>
            <li className="mb-15">
              <FormattedMessage id="membershipSettings.modal.benefit4" />
            </li>
            <li className="mb-15">
              <FormattedMessage id="membershipSettings.modal.benefit5" />
            </li>
            <li className="mb-15">
              <FormattedMessage id="membershipSettings.modal.benefit6" />
            </li>
            <li>
              <FormattedMessage id="membershipSettings.modal.benefit7" />
            </li>
          </ul>
        </div>
      </ModalWindowBody>

      <ModalWindowFooter>
        <>
          <ButtonText label={<FormattedMessage id="membershipSettings.ctaLose" />} onClick={onLoseBenefits} />

          <Button label={<FormattedMessage id="membershipSettings.ctaKeep" />} onClick={onKeepBenefits} isInline />
        </>
      </ModalWindowFooter>
    </>
  );
}

Description.propTypes = {};

export default Description;

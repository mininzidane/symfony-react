import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import Step from './Step';
import PhoneNumberForm from './PhoneNumberForm';

function BlockersModal({ blockers, onSubmitSuccess }) {
  const intl = useIntl();
  const [isPhoneNumberShown, setIsPhoneNumberShown] = useState(false);
  const eventTrackingService = new EventTrackingService();

  if (!blockers || !blockers.trigger) {
    return null;
  }

  async function handleSubmitSuccess() {
    setIsPhoneNumberShown(true);
    await onSubmitSuccess();
  }

  return (
    <ModalWindow isOpen onClose={() => {}} size="lg">
      <ModalWindowHeader title={intl.formatMessage({ id: 'joinAuctions.blockers.title' })} />
      <ModalWindowBody>
        <div>
          <Step
            number="1"
            completed={blockers.membership}
            title={intl.formatMessage({ id: 'joinAuctions.blockers.step1.title' })}
            description={intl.formatMessage({ id: 'joinAuctions.blockers.step1.description' })}
            link={{
              label: intl.formatMessage({ id: 'joinAuctions.blockers.step1.action' }),
              href: RouterService.getRoute('membershipPlans'),
              onClick: () =>
                eventTrackingService.sendEvent({
                  name: 'upgrade_membership_popup_button_click',
                  step: 'abm_join_live_auction',
                }),
            }}
          />
          <Step
            number="2"
            completed={blockers.buyer_power}
            title={intl.formatMessage({ id: 'joinAuctions.blockers.step2.title' })}
            description={intl.formatMessage({ id: 'joinAuctions.blockers.step2.description' })}
            link={{
              label: intl.formatMessage({ id: 'joinAuctions.blockers.step2.action' }),
              href: RouterService.getRoute('buyerPower'),
              onClick: () =>
                eventTrackingService.sendEvent({
                  name: 'increase_buyer_power_popup_button_click',
                  step: 'abm_join_live_auction',
                }),
            }}
          />
          <Step
            number="3"
            completed={blockers.id}
            title={intl.formatMessage({ id: 'joinAuctions.blockers.step3.title' })}
            description={intl.formatMessage({ id: 'joinAuctions.blockers.step3.description' })}
            link={{
              label: intl.formatMessage({ id: 'joinAuctions.blockers.step3.action' }),
              href: RouterService.getRoute('documents'),
              onClick: () =>
                eventTrackingService.sendEvent({
                  name: 'upload_id_popup_button_click',
                  step: 'abm_join_live_auction',
                }),
            }}
          />
          {(!blockers.phoneNumber || isPhoneNumberShown) && (
            <Step
              number="4"
              completed={blockers.phoneNumber}
              title={intl.formatMessage({ id: 'phoneNumberFormModal.addYourPhoneNumber' })}
              description={intl.formatMessage({ id: 'phoneNumberFormModal.description' })}
              footer={
                <PhoneNumberForm
                  label={intl.formatMessage({ id: 'shared.cta.addPhoneNumber' })}
                  onClick={() =>
                    eventTrackingService.sendEvent({
                      name: 'phoneNumber_popup_button_click',
                      step: 'abm_join_live_auction',
                    })
                  }
                  onSubmitSuccess={handleSubmitSuccess}
                />
              }
            />
          )}
        </div>
      </ModalWindowBody>
    </ModalWindow>
  );
}

BlockersModal.defaultProps = {
  blockers: {},
  onSubmitSuccess: () => {},
};

BlockersModal.propTypes = {
  blockers: PropTypes.shape({
    membership: PropTypes.bool,
    buyer_power: PropTypes.bool,
    id: PropTypes.bool,
    trigger: PropTypes.bool,
    phoneNumber: PropTypes.bool,
  }),
  onSubmitSuccess: PropTypes.func,
};

export default BlockersModal;

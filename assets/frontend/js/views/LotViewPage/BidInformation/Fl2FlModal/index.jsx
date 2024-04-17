import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import ButtonText from 'frontend/js/components/ButtonText';
import Button from 'frontend/js/components/Button';
import RouterService from 'frontend/js/api/RouterService';

function Fl2FlModal({ isOpen, onClose, onConfirm }) {
  const { getLocalizedHcRoute } = RouterService;
  const intl = useIntl();

  const translationSets = {
    modalTitle: intl.formatMessage({
      id: 'lotPage.fl2fl.modalTitle',
      defaultMessage: 'Attention Florida Residents',
    }),
    modalBody: intl.formatMessage(
      {
        id: 'lotPage.fl2fl.modalBody',
        defaultMessage: `
        Florida Residents: AutoBidMaster does not process titles on vehicles purchased in Florida state, as per state
        law we pass the purchase to an in-state "Tag Agency". This agency will process the title, collect FL
        state sales tax & title fee. This extra step adds another 10-15 days to the processing time for vehicle
        sales in Florida.
        {br}
        {br}
        For more information please review our
      `,
      },
      {
        br: <br />,
      },
    ),
    ctaConfirm: intl.formatMessage({
      id: 'shared.cta.confirm',
      defaultMessage: 'Confirm',
    }),
    ctaCancel: intl.formatMessage({
      id: 'shared.cta.cancel',
      defaultMessage: 'Cancel',
    }),
    ctaHelpCenter: intl.formatMessage({
      id: 'shared.cta.helpCenter',
      defaultMessage: 'Help Center',
    }),
  };

  return (
    <ModalWindow isOpen={isOpen} onClose={onClose} size="md">
      <ModalWindowHeader title={translationSets.modalTitle} onClose={onClose} />
      <ModalWindowBody hasFooter>
        <>
          {translationSets.modalBody}{' '}
          <a href={getLocalizedHcRoute('hcOwnershipDocsFl')} target="_blank" rel="noopener noreferrer">
            {translationSets.ctaHelpCenter}
          </a>
        </>
      </ModalWindowBody>
      <ModalWindowFooter>
        <>
          <ButtonText label={translationSets.ctaCancel} onClick={onClose} />
          <Button label={translationSets.ctaConfirm} onClick={onConfirm} isInline />
        </>
      </ModalWindowFooter>
    </ModalWindow>
  );
}

Fl2FlModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default Fl2FlModal;

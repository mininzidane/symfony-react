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

function Ca2CaModal({ isOpen, onClose, onConfirm }) {
  const { getRoute, getLocalizedHcRoute } = RouterService;
  const intl = useIntl();

  let liIndex = 0;
  const translationSets = {
    modalTitle: intl.formatMessage({
      id: 'lotPage.ca2ca.modalTitle',
    }),
    modalBody: intl.formatMessage(
      {
        id: 'lotPage.ca2ca.modalBody',
      },
      {
        TermsLink: (chunks) => (
          <a key="terms-link" href={getRoute('terms')}>
            {chunks}
          </a>
        ),
        RulesLink: (chunks) => (
          <a key="rules-link" href={RouterService.getLocalizedHcRoute('hcRulesAndPolicies')}>
            {chunks}
          </a>
        ),
        HCLink: (chunks) => (
          <a key="hc-link" href={getLocalizedHcRoute('hcCanIBuyCa2Ca')} target="_blank" rel="noopener noreferrer">
            {chunks}
          </a>
        ),
        ul: (chunks) => <ul>{chunks}</ul>,
        li: (chunks) => {
          liIndex += 1;

          return <li key={liIndex}>{chunks}</li>;
        },
      },
    ),
    ctaConfirm: intl.formatMessage({
      id: 'shared.cta.confirm',
    }),
    ctaCancel: intl.formatMessage({
      id: 'shared.cta.cancel',
    }),
    ctaLearnMoreHere: intl.formatMessage({
      id: 'shared.cta.learnMoreHere',
    }),
  };

  return (
    <ModalWindow isOpen={isOpen} onClose={onClose} size="md">
      <ModalWindowHeader title={translationSets.modalTitle} onClose={onClose} />
      <ModalWindowBody hasFooter>
        <div className="clean-list-wrap">{translationSets.modalBody}</div>
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

Ca2CaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default Ca2CaModal;

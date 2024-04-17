import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import useIntl from 'frontend/js/hooks/useIntl';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import InstantOfferService from 'frontend/js/api/InstantOfferService';
import RouterService from 'frontend/js/api/RouterService';
import useStyles from './useStyles';

function ConfirmOfferCancellationModal({ isOpen, onClose, instantOfferRef, ymm }) {
  const classes = useStyles();
  const intl = useIntl();
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  async function removeInstantOffer() {
    setIsLoading(true);
    try {
      await InstantOfferService.removeInstantOffer(instantOfferRef);

      enqueueSnackbar(
        <div>
          {intl.formatMessage(
            { id: 'sellYourCarPage.instantOffer.offerCancelled' },
            { strong: (chunks) => <strong className="d-b">{chunks}</strong>, ymm },
          )}
        </div>,
        {
          variant: 'success',
        },
      );
      onClose();
      setTimeout(() => RouterService.redirect('home'), 2000);
    } catch (err) {
      enqueueSnackbar(err.response?.errors || intl.formatMessage({ id: 'form.error.general' }), { variant: 'error' });
    }
    setIsLoading(false);
  }

  return (
    <ModalWindow onClose={onClose} isOpen={isOpen} width={432}>
      <ModalWindowHeader
        onClose={onClose}
        title={intl.formatMessage({ id: 'sellYourCarPage.instantOffer.confirmOfferCancellationModal.title' })}
      />
      <ModalWindowBody hasFooter>
        <div className={classes.content}>
          <div>
            <strong>
              {intl.formatMessage({
                id: 'sellYourCarPage.instantOffer.confirmOfferCancellationModal.section1',
              })}
            </strong>
          </div>
          <div>{intl.formatMessage({ id: 'sellYourCarPage.instantOffer.confirmOfferCancellationModal.section2' })}</div>
        </div>
      </ModalWindowBody>
      <ModalWindowFooter className={classes.footer}>
        <ButtonOutlined
          label={intl.formatMessage({ id: 'shared.cta.noDontCancel' })}
          onClick={onClose}
          isThinBorder
          isBackgroundWhite
          isNowrap
        />
        <Button
          label={intl.formatMessage({ id: 'shared.cta.yesCancel' })}
          color="red"
          isLoading={isLoading}
          onClick={removeInstantOffer}
          isNowrap
          className={classes.cancelCta}
        />
      </ModalWindowFooter>
    </ModalWindow>
  );
}

ConfirmOfferCancellationModal.propTypes = {
  instantOfferRef: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  ymm: PropTypes.string.isRequired,
};

export default ConfirmOfferCancellationModal;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import CreditCardsService from 'frontend/js/api/CreditCardsService';
import Button from 'frontend/js/components/Button';
import ButtonText from 'frontend/js/components/ButtonText';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import useBillingInformationContext from '../../../../_Context/useBillingInformationContext';

function ButtonRemove({ token }) {
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { paymentCards } = useBillingInformationContext();
  const { setAllCreditCards, creditCards } = paymentCards;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleRemoveCard() {
    setIsLoading(true);
    try {
      await CreditCardsService.removeCard(token);
      handleClose();
      setAllCreditCards(creditCards.filter((card) => card.token !== token));
    } catch (e) {
      /** Ignore */
    }
    setIsLoading(false);
  }

  return (
    <>
      <Button
        type="button"
        label={intl.formatMessage({ id: 'shared.cta.remove' })}
        size="xs"
        color="gray-hover"
        isInline
        isShadowless={false}
        onClick={handleClickOpen}
      />

      <ModalWindow isOpen={open} onClose={handleClose}>
        <ModalWindowHeader
          title={intl.formatMessage({ id: 'billingInformationPage.cta.deleteCard' })}
          onClose={handleClose}
        />
        <ModalWindowBody hasFooter>
          <>{intl.formatMessage({ id: 'billingInformationPage.areYouSureYouWantToDeleteThisCard' })}</>
        </ModalWindowBody>
        <ModalWindowFooter>
          <>
            <ButtonText label={intl.formatMessage({ id: 'shared.cta.cancel' })} onClick={handleClose} />

            <Button
              label={intl.formatMessage({ id: 'shared.cta.remove' })}
              onClick={handleRemoveCard}
              isLoading={isLoading}
              isInline
            />
          </>
        </ModalWindowFooter>
      </ModalWindow>
    </>
  );
}

ButtonRemove.propTypes = {
  token: PropTypes.string.isRequired,
};

export default ButtonRemove;

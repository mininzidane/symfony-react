import React from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import useIntl from 'frontend/js/hooks/useIntl';
import CreditCardsService from 'frontend/js/api/CreditCardsService';
import Button from 'frontend/js/components/Button';
import useBillingInformationContext from '../../../../_Context/useBillingInformationContext';

function ButtonMakePrimary({ token, className }) {
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const { paymentCards } = useBillingInformationContext();
  const { setAllCreditCards, creditCards } = paymentCards;
  async function handleMakePrimary() {
    try {
      const data = await CreditCardsService.makePrimary(token);
      setAllCreditCards(
        creditCards.map((card) => ({
          ...card,
          preferred: card.token === token,
        })),
      );
      enqueueSnackbar(
        intl.formatMessage(
          { id: 'billingInformationPage.cardSetAsYourPrimaryCard' },
          { card: (data.creditCard && `${data.creditCard.type} **** **** **** ${data.creditCard.last4}`) || '' },
        ),
        { variant: 'success' },
      );
    } catch (e) {
      /** Ignore */
    }
  }

  return (
    <Button
      className={className}
      type="button"
      label={intl.formatMessage({ id: 'shared.cta.makePrimary' })}
      size="xs"
      color="gray-hover"
      isInline
      isShadowless={false}
      onClick={handleMakePrimary}
    />
  );
}

ButtonMakePrimary.defaultProps = {
  className: '',
};

ButtonMakePrimary.propTypes = {
  className: PropTypes.string,
  token: PropTypes.string.isRequired,
};

export default ButtonMakePrimary;

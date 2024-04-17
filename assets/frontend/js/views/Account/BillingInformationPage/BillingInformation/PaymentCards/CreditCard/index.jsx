import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import Card from 'frontend/js/components/Card';
import Button from 'frontend/js/components/Button';
import StringService from 'frontend/js/lib/utils/StringService';
import MastercardSvg from 'frontend/images/shared/cards-icons/logo-mastercard.svg';
import VisaSvg from 'frontend/images/shared/cards-icons/logo-visa.svg';
import AmexSvg from 'frontend/images/shared/cards-icons/logo-amex.svg';
import DiscoverSvg from 'frontend/images/shared/cards-icons/logo-discover.svg';
import ButtonRemove from './ButtonRemove';
import ButtonMakePrimary from './ButtonMakePrimary';
import useStyles from './useStyles';

function CreditCard({ card, onClick }) {
  const classes = useStyles();
  const intl = useIntl();
  const { type = '', last4 = '', exp_year: expYear, preferred, token } = card;
  const iconsMap = {
    mastercard: MastercardSvg,
    visa: VisaSvg,
    amex: AmexSvg,
    discover: DiscoverSvg,
  };

  const typeKey = type.toLowerCase();
  const expMonthFormatted = StringService.formatMonth(card.exp_month);
  const customerHasNoDue = parseFloat(window.customer.due) === 0;

  return (
    <Card elevation={2} className={classes.root}>
      <div className={classes.body}>
        {type && (
          <div className={classes.icon}>
            <img src={iconsMap[typeKey]} alt={type} />
          </div>
        )}
        <div className={classes.info}>
          <div className={classes.cardNumber}>
            {type} **** {last4}
          </div>
          <div className={classes.exp}>
            Expires&nbsp;&nbsp;{expMonthFormatted}/{expYear}
          </div>
        </div>
      </div>
      <div className={classes.footer}>
        {preferred ? (
          <div className={classes.preferred}>{intl.formatMessage({ id: 'billingInformationPage.defaultPayment' })}</div>
        ) : (
          <ButtonMakePrimary className={classes.ctaMakePrimary} token={token} />
        )}
        {customerHasNoDue && <ButtonRemove token={token} />}
        {customerHasNoDue && (
          <Button
            type="button"
            label={intl.formatMessage({ id: 'shared.cta.edit' })}
            size="xs"
            color="gray-hover"
            isInline
            isShadowless={false}
            onClick={onClick}
          />
        )}
      </div>
    </Card>
  );
}

CreditCard.propTypes = {
  card: PropTypes.shape({
    token: PropTypes.string,
    type: PropTypes.string,
    last4: PropTypes.string,
    exp_month: PropTypes.number,
    exp_year: PropTypes.number,
    preferred: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CreditCard;

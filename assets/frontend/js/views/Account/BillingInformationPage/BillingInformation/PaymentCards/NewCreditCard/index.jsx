import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import NewCardSvg from 'frontend/images/shared/light-blue-set/ic_add_new_card.svg';
import useStyles from './useStyles';

function NewCreditCard({ onClick }) {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <button className={classes.root} type="button" onClick={onClick}>
      <span className={classes.icon}>
        <img src={NewCardSvg} alt="Add Card" />
      </span>
      <span>{intl.formatMessage({ id: 'billingInformationPage.cta.addNewCard' })}</span>
    </button>
  );
}

NewCreditCard.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NewCreditCard;

/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import ModalWindowContainer from 'frontend/js/components/ModalWindow/Container';
import useStyles from './useStyles';

function ErrorActions({ onCancelClick, onTryAgainClick }) {
  const classes = useStyles();

  return (
    <ModalWindowContainer className={classes.root}>
      <ButtonOutlined
        onClick={onCancelClick}
        label={<FormattedMessage id="shared.cta.cancel" />}
        isBackgroundTransparent
        isThinBorder
      />

      <Button label={<FormattedMessage id="shared.cta.tryAgain" />} onClick={onTryAgainClick} isThinBorder />
    </ModalWindowContainer>
  );
}

export default ErrorActions;

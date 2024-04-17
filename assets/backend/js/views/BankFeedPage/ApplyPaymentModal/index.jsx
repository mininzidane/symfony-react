import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ThemeProvider from 'backend/js/providers/ThemeProvider';
import ModalWindow from 'backend/js/components/ModalWindow';
import ApplyPayment from './ApplyPayment';
import useStyles from './useStyles';

function ApplyPaymentModal({ id, update }) {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(id);

  function handleClose() {
    setCurrentId(null);
  }

  useEffect(() => {
    if (currentId !== id) {
      setCurrentId(id);
    }
  }, [update]);

  return (
    <>
      <ModalWindow
        rootClassName={classes.root}
        className={classes.modal}
        isOpen={Boolean(currentId)}
        onClose={handleClose}
        size="fullscreen"
      >
        <ApplyPayment id={id} onClose={handleClose} />
      </ModalWindow>
    </>
  );
}

ApplyPaymentModal.propTypes = {
  id: PropTypes.number.isRequired,
  update: PropTypes.number.isRequired,
};

window.renderApplyPaymentModal = (id) => {
  const $el = document.getElementById('apply-payment-modal');
  if ($el) {
    ReactDOM.render(
      <ThemeProvider>
        <ApplyPaymentModal id={id} update={Date.now()} />
      </ThemeProvider>,
      $el,
    );
  }

  return false;
};

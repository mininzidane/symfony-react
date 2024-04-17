import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import Button from 'backend/js/components/Button';
import DangerSvg from './img/danger.svg';
import useStyles from './useStyles';

function ConfirmModal({ isOpen, onClose, onConfirm, title, subtitle, isLoading }) {
  const classes = useStyles();

  return (
    <ModalWindow onClose={onClose} isOpen={isOpen} width={480}>
      <ModalWindowBody className={classes.modalBody}>
        <img src={DangerSvg} width={60} height={60} alt="Danger" />
        <h1 className={classes.title}>{title}</h1>
        <h2 className={classes.subtitle}>{subtitle}</h2>
        <div className={classes.actions}>
          <Button label="Cancel" onClick={onClose} className={classnames('btn-secondary', classes.btn)} />
          <Button
            label="Confirm"
            onClick={onConfirm}
            className={classnames('btn-danger', classes.btn)}
            isLoading={isLoading}
          />
        </div>
      </ModalWindowBody>
    </ModalWindow>
  );
}

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
};

ConfirmModal.defaultProps = {
  isLoading: false,
};

export default ConfirmModal;

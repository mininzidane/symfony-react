import React from 'react';
import PropTypes from 'prop-types';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import useIntl from 'frontend/js/hooks/useIntl';
import ConsignmentDetails from '../ConsignmentDetails';
import useStyles from './useStyles';

function ConfirmModal({ isOpen, onClose, onConfirm, consignment, children }) {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <ModalWindow onClose={onClose} isOpen={isOpen} size="sm">
      <ModalWindowHeader title={intl.formatMessage({ id: 'shared.cta.confirm' })} onClose={onClose} />
      <ModalWindowBody className={classes.body} hasFooter>
        <ConsignmentDetails consignment={consignment} />
        <div className="mt-15">{children}</div>
      </ModalWindowBody>
      <ModalWindowFooter>
        <ButtonOutlined
          label={intl.formatMessage({ id: 'shared.cta.cancel' })}
          onClick={onClose}
          isBackgroundWhite
          isThinBorder
        />
        <Button label={intl.formatMessage({ id: 'shared.cta.confirm' })} color="green" onClick={onConfirm} />
      </ModalWindowFooter>
    </ModalWindow>
  );
}

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  consignment: PropTypes.object,
  children: PropTypes.node.isRequired,
};

ConfirmModal.defaultProps = {
  isOpen: false,
  consignment: null,
};

export default ConfirmModal;

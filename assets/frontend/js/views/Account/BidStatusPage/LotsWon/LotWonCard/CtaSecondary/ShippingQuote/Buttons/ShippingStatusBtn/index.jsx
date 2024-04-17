import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import Button from 'frontend/js/components/Button';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import Loader from 'frontend/js/views/Shared/Loader';
import { useLotWonContext } from 'frontend/js/context/LotWonContext';
import useStyles from './useStyles';

function ShippingStatusBtn({ className, vehicle }) {
  const intl = useIntl();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { shippingStatus } = useLotWonContext();
  const { isLoading, errorMsg, shippingSteps, isCurrentActiveStep } = shippingStatus;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={className}>
      <Button label={intl.formatMessage({ id: 'lotsWonPage.shippingStatus' })} size="sm" onClick={handleClickOpen} />
      <ModalWindow isOpen={open} onClose={handleClose} width={800}>
        <ModalWindowHeader
          title={intl.formatMessage(
            { id: vehicle ? 'lotsWonPage.shippingStatusFor' : 'lotsWonPage.shippingStatus' },
            { vehicle },
          )}
          onClose={handleClose}
        />
        <ModalWindowBody>
          {isLoading ? (
            <Loader minHeight={234} />
          ) : (
            <div className={classes.steps}>
              {errorMsg && <div className={classes.errMessage}>{errorMsg}</div>}
              {!errorMsg &&
                shippingSteps.map((step, index) => (
                  <div
                    key={index}
                    className={classnames(classes.step, {
                      'is-completed': step.completed,
                      'is-current': isCurrentActiveStep(index),
                    })}
                  >
                    {step.text}
                  </div>
                ))}
            </div>
          )}
        </ModalWindowBody>
      </ModalWindow>
    </div>
  );
}

ShippingStatusBtn.propTypes = {
  className: PropTypes.string,
  vehicle: PropTypes.string,
};

ShippingStatusBtn.defaultProps = {
  className: '',
  vehicle: '',
};

export default ShippingStatusBtn;

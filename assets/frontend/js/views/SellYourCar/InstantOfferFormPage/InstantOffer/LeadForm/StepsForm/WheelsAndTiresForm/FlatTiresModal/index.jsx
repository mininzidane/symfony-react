import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import Button from 'frontend/js/components/Button';
import Tickbox from 'frontend/js/components/Form/Tickbox';
import useStyles from './useStyles';

function FlatTiresModal({ formik, isOpen, onClose, onSuccess }) {
  const classes = useStyles();

  return (
    <ModalWindow onClose={onClose} isOpen={isOpen} width={620}>
      <ModalWindowHeader onClose={onClose} title={<FormattedMessage id="sellYourCarPage.flatTiresModal.title" />} />
      <ModalWindowBody className={classes.body} hasFooter>
        <div className={classes.container}>
          <div>
            <Tickbox
              id="flatTireDriverSideFront"
              name="flatTireDriverSideFront"
              value={formik.values.flatTireDriverSideFront}
              error={formik.errors.flatTireDriverSideFront}
              touched={formik.touched.flatTireDriverSideFront}
              onChange={formik.setFieldValue}
              className={classes.tickbox}
            >
              <FormattedMessage id="sellYourCarPage.flatTireOptions.driverSideFront" />
            </Tickbox>
          </div>
          <div className="jc-fe">
            <Tickbox
              id="flatTirePassengerSideFront"
              name="flatTirePassengerSideFront"
              value={formik.values.flatTirePassengerSideFront}
              error={formik.errors.flatTirePassengerSideFront}
              touched={formik.touched.flatTirePassengerSideFront}
              onChange={formik.setFieldValue}
              className={classnames(classes.tickbox, 'is-right')}
            >
              <FormattedMessage id="sellYourCarPage.flatTireOptions.passengerSideFront" />
            </Tickbox>
          </div>
          <div>
            <Tickbox
              id="flatTireDriverSideRear"
              name="flatTireDriverSideRear"
              value={formik.values.flatTireDriverSideRear}
              error={formik.errors.flatTireDriverSideRear}
              touched={formik.touched.flatTireDriverSideRear}
              onChange={formik.setFieldValue}
              className={classes.tickbox}
            >
              <FormattedMessage id="sellYourCarPage.flatTireOptions.driverSideRear" />
            </Tickbox>
          </div>
          <div className="jc-fe">
            <Tickbox
              id="flatTirePassengerSideRear"
              name="flatTirePassengerSideRear"
              value={formik.values.flatTirePassengerSideRear}
              error={formik.errors.flatTirePassengerSideRear}
              touched={formik.touched.flatTirePassengerSideRear}
              onChange={formik.setFieldValue}
              className={classnames(classes.tickbox, 'is-right')}
            >
              <FormattedMessage id="sellYourCarPage.flatTireOptions.passengerSideRear" />
            </Tickbox>
          </div>
        </div>
      </ModalWindowBody>
      <ModalWindowFooter className={classes.footer}>
        <Button label={<FormattedMessage id="shared.done" />} onClick={onSuccess} />
      </ModalWindowFooter>
    </ModalWindow>
  );
}

FlatTiresModal.propTypes = {
  formik: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default FlatTiresModal;

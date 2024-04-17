import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import TextAreaPlane from 'frontend/js/components/Form/PlaneTheme/TextAreaPlane';
import Button from 'frontend/js/components/Button';
import useStyles from './useStyles';

function ConfirmNoteModal({ isOpen, onClose, onSubmitPickupInfo, pickupNote }) {
  const classes = useStyles();
  const intl = useIntl();

  async function onSubmit(values, { setSubmitting }) {
    setSubmitting(true);
    const result = await onSubmitPickupInfo(values);
    if (result) {
      onClose();
    }
    setSubmitting(false);
  }

  const formik = useFormik({
    initialValues: {
      pickupNote: pickupNote || '',
    },
    onSubmit,
  });

  return (
    <ModalWindow onClose={onClose} isOpen={isOpen} width={432}>
      <ModalWindowHeader
        onClose={onClose}
        title={intl.formatMessage({ id: 'sellYourCarPage.instantOffer.confirmNoteForDriver' })}
      />
      <ModalWindowBody hasFooter>
        <div>
          <TextAreaPlane
            id="pickupNote"
            name="pickupNote"
            label={intl.formatMessage({ id: 'sellYourCarPage.pickupInfoForm.label.addNotesForTheDriver' })}
            value={formik.values.pickupNote}
            touched={formik.touched.pickupNote}
            error={formik.errors.pickupNote}
            onChange={(name, value) => {
              formik.setFieldValue(name, value.slice(0, 1000));
            }}
            onBlur={formik.setFieldTouched}
            rows={4}
          />
          <div className={classes.characterLimit}>{formik.values.pickupNote?.length}/1000</div>
        </div>
      </ModalWindowBody>
      <ModalWindowFooter className={classes.footer}>
        <Button
          label={intl.formatMessage({ id: 'shared.done' })}
          isLoading={formik.isSubmitting}
          onClick={formik.submitForm}
          isNowrap
        />
      </ModalWindowFooter>
    </ModalWindow>
  );
}

ConfirmNoteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmitPickupInfo: PropTypes.func.isRequired,
  pickupNote: PropTypes.string,
};

ConfirmNoteModal.defaultProps = {
  pickupNote: '',
};

export default ConfirmNoteModal;

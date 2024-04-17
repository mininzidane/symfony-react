import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useFormik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import Button from 'frontend/js/components/Button';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import DatePicker from 'frontend/js/components/DatePicker';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import validationSchema from './validationSchema';
import useStyles from './useStyles';

function ConfirmPickUpTimeModal({ isOpen, onClose, onSubmitPickupInfo, pickupTime, pickupDate }) {
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
      pickupDate,
      pickupTime,
    },
    validationSchema,
    onSubmit,
  });

  const timeRanges = [
    {
      value: '7 am - 11 am',
      label: '7 am - 11 am',
    },
    {
      value: '11 am - 3 pm',
      label: '11 am - 3 pm',
    },
    {
      value: '3 pm - 6 pm',
      label: '3 pm - 6 pm',
    },
  ];

  return (
    <ModalWindow onClose={onClose} isOpen={isOpen} width={432} rootClassName={classes.root}>
      <ModalWindowHeader
        onClose={onClose}
        title={intl.formatMessage({ id: 'sellYourCarPage.instantOffer.confirmPickUpTime' })}
      />
      <ModalWindowBody className={classes.body} hasFooter>
        <div className={classes.content}>
          <div>
            <DatePicker
              initialValue={pickupDate ? new Date(pickupDate) : ''}
              className={classnames(
                classes.datePicker,
                !!formik.errors.pickupDate && formik.touched.pickupDate && 'is-error',
              )}
              placeholder={intl.formatMessage({
                id: 'shared.label.date',
              })}
              onChange={(value) => {
                formik.setFieldValue('pickupDate', value && DateTimeService.format(value));
              }}
              shouldDisableDate={(date) =>
                DateTimeService.isWeekend(date) ||
                DateTimeService.isToday(date) ||
                DateTimeService.isTomorrow(date) ||
                DateTimeService.isPast(date)
              }
              clearIconDisabled
            />
            {!!formik.errors.pickupDate && formik.touched.pickupDate && (
              <div className="form-hint-plane">{formik.errors.pickupDate}</div>
            )}
          </div>
          <SelectPlane
            id="pickupTime"
            name="pickupTime"
            placeholder={intl.formatMessage({
              id: 'shared.label.time',
            })}
            className={classes.select}
            value={formik.values.pickupTime}
            options={timeRanges}
            error={formik.errors.pickupTime}
            touched={formik.touched.pickupTime}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
          />
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

ConfirmPickUpTimeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmitPickupInfo: PropTypes.func.isRequired,
  pickupTime: PropTypes.string,
  pickupDate: PropTypes.string,
};

ConfirmPickUpTimeModal.defaultProps = {
  pickupTime: '',
  pickupDate: '',
};

export default ConfirmPickUpTimeModal;

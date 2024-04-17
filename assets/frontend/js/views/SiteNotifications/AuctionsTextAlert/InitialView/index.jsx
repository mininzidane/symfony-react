import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import { Formik } from 'formik';
import Button from 'frontend/js/components/Button';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import AuctionsTextAlertSchema from './AuctionsTextAlertSchema';
import Description from '../Description';
import useStyles from './useStyles';

function InitialView({ onSubmit, customer }) {
  const classes = useStyles();

  const { phoneNumber, mobilePhone } = customer;

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>
        <FormattedMessage
          id="auctionsTextAlert.cta.title"
          values={{
            strong: (chunks) => <strong>{chunks}</strong>,
          }}
        />

        <TooltipOnHover
          placement="bottom"
          maxWidth={300}
          isInteractive={false}
          hasArrow
          content={<FormattedMessage id="creditCardDetailsForm.tooltip.phoneNumber" />}
          triggerClassName={classes.tooltipTrigger}
          color="black"
          padding="6px 12px"
        />
      </div>

      <Formik
        initialValues={{
          phoneNumber: mobilePhone || phoneNumber || '',
        }}
        onSubmit={onSubmit}
        validationSchema={AuctionsTextAlertSchema}
        enableReinitialize
        render={({ values, errors, touched, setFieldValue, setFieldTouched, isSubmitting, handleSubmit }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            <PhoneInputPlane
              id="phoneNumber"
              name="phoneNumber"
              value={values.phoneNumber}
              error={errors.phoneNumber}
              touched={touched.phoneNumber}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              className={classes.phoneInput}
            />

            <Button
              type="submit"
              label={<FormattedMessage id="auctionsTextAlert.cta.btnLabel" />}
              color="yellow"
              isLoading={isSubmitting}
              className={classes.submitButton}
            />
          </form>
        )}
      />

      <Description />
    </div>
  );
}

InitialView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired,
};

export default InitialView;

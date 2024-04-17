import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import { useFormik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import Button from 'frontend/js/components/Button';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import CustomerService from 'frontend/js/api/CustomerService';
import Form from './Form';
import validationSchema from './validationSchema';
import useStyles from './useStyles';

function LeadForm({ onSubmit, v2 }) {
  const intl = useIntl();
  const classes = useStyles({ v2 });
  const { isAboveSm } = useBreakpoint();

  const {
    isAuthenticated,
    firstName: customerFirstName,
    lastName: customerLastName,
    phoneNumber: customerPhoneNumber,
    email: customerEmail,
    setCustomer,
  } = useCustomerHelper();

  const formik = useFormik({
    initialValues: {
      firstName: customerFirstName || '',
      lastName: customerLastName || '',
      phoneNumber: customerPhoneNumber || '',
      email: customerEmail || '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setFieldError, setSubmitting }) => {
      const isNeedToRegisterCustomer = !isAuthenticated || (isAuthenticated && values.email !== customerEmail);
      if (isNeedToRegisterCustomer) {
        setSubmitting(true);
        const payload = {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
        };

        try {
          const { contents } = await CustomerService.register(payload);
          if (contents?.customer) {
            setCustomer(contents.customer);
          }
          onSubmit(values);
        } catch (error) {
          const { response } = error;
          let fieldError = false;

          if (response && response.data) {
            const { errors } = response.data;

            const errorsMap = {
              email: 'email',
              first_name: 'firstName',
              second_name: 'lastName',
              phoneNumber: 'phoneNumber',
            };

            if (typeof errors === 'object') {
              Object.keys(errors).forEach((fieldName) => {
                if (fieldName && errorsMap[fieldName]) {
                  setFieldError(errorsMap[fieldName], errors[fieldName]);
                  fieldError = true;
                }
              });
            }
          }

          if (!fieldError) {
            setFieldError('email', intl.formatMessage({ id: 'form.error.general' }));
          }
        }
        setSubmitting(false);
      } else {
        onSubmit(values);
      }
    },
  });

  useEffect(() => {
    document.body.classList.add('sell-your-car-page');
    return () => {
      document.body.classList.remove('sell-your-car-page');
    };
  }, []);

  return (
    <div className={classes.root} id="sell-your-car-lead-form">
      <div className={classes.header}>
        <div className={classes.title}>{intl.formatMessage({ id: 'sellYourCarPage.leadForm.title' })}</div>
        {isAboveSm && !v2 && (
          <div className={classes.stepLabel}>
            {intl.formatMessage(
              { id: 'sellYourCarPage.leadForm.stepLabel' },
              { step: 1, strong: (chunk) => <strong>{chunk}</strong> },
            )}
          </div>
        )}
      </div>
      <Form formik={formik} />
      <div className={classes.footer}>
        <div className={classes.actions}>
          <Button
            color="yellow"
            label={intl.formatMessage({ id: v2 ? 'shared.cta.continue' : 'shared.cta.getOffer' })}
            onClick={formik.handleSubmit}
            isLoading={formik.isSubmitting}
          />
        </div>
        {!v2 && (
          <div className={classes.footerDesc}>{intl.formatMessage({ id: 'sellYourCarPage.leadForm.footerDesc' })}</div>
        )}
      </div>
    </div>
  );
}

LeadForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  v2: PropTypes.bool,
};

LeadForm.defaultProps = {
  v2: false,
};

export default LeadForm;

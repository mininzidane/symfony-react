import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import useIntl from 'frontend/js/hooks/useIntl';
import { Formik } from 'formik';
import Card from 'frontend/js/components/Card';
import CustomerService from 'frontend/js/api/CustomerService';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import ValidationSchema from './ValidationSchema';
import Form from './Form';
import Instructions from './Instructions';
import Footer from './Footer';
import useStyles from './useStyles';

function CompleteOrder({ lotId, auction, quote, onSuccess }) {
  const classes = useStyles();
  const intl = useIntl();

  function createCustomer(values) {
    const customer = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
    };
    return CustomerService.register(customer);
  }

  function createShippingOrder(values) {
    const { firstName, lastName, email, phoneNumber } = values;
    const fullName = [firstName, lastName].join(' ');
    const consignee = [fullName, phoneNumber, email].join('\n') || '';

    const payload = {
      lot: lotId,
      quote,
      country: get(quote, 'destination.country.id'),
      destination: get(quote, 'destination.id'),
      us_port: get(quote, 'us_port.id'),
      additionalCharges: get(quote, 'additionalCharges'),
      consignee,
      auction,
    };

    return ShippingOrderService.shippingOrder(payload);
  }

  async function handleSubmit(values, { setFieldError }) {
    try {
      await createCustomer(values);
      await createShippingOrder(values);
      onSuccess();
    } catch (error) {
      const { response } = error;
      let fieldError = false;

      if (response && response.data) {
        const { errors } = response.data;

        const errorsMap = {
          email: 'email',
          first_name: 'firstName',
          second_name: 'secondName',
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
        setFieldError('phoneNumber', intl.formatMessage({ id: 'form.error.general' }));
      }
    }
  }

  return (
    <Formik
      initialValues={{
        email: '',
        emailIsUsed: true,
        firstName: '',
        lastName: '',
        phoneNumber: '',
      }}
      validationSchema={ValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors }) => (
        <Card elevation={2}>
          <div className={classes.content}>
            <Form className={classes.form} />

            <div className={classes.complete}>
              <Instructions email={values.email && !errors.email ? values.email : ''} />
              <Footer quote={quote} />
            </div>
          </div>
        </Card>
      )}
    </Formik>
  );
}

CompleteOrder.propTypes = {
  quote: PropTypes.shape({}).isRequired,
  lotId: PropTypes.number.isRequired,
  onSuccess: PropTypes.func.isRequired,
  auction: PropTypes.string.isRequired,
};

export default CompleteOrder;

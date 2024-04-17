import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Formik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import CustomerService from 'frontend/js/api/CustomerService';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import LotService from 'frontend/js/api/LotService';
import ValidationSchema from './ValidationSchema';
import Form from './Form';
import Instructions from './Instructions';
import Footer from './Footer';
import useStyles from './useStyles';

function CompleteOrder({ lotId, quote, onSuccess }) {
  const classes = useStyles();
  const intl = useIntl();
  const {
    isAuthenticated,
    setCustomer,
    email: customerEmail,
    firstName: customerFirstName,
    lastName: customerLastName,
    phoneNumberRaw: customerPhoneNumber,
  } = useCustomerHelper();

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
      country: get(quote, 'destination.country_id'),
      destination: get(quote, 'destination.id'),
      us_port: get(quote, 'us_port.id'),
      consignee,
      source: 'copart_checkout',
      auction: LotService.AUCTION_COPART,
    };

    return ShippingOrderService.shippingOrder(payload);
  }

  async function handleSubmit(values, { setFieldError }) {
    try {
      if (!isAuthenticated) {
        const { contents } = await createCustomer(values);
        if (contents?.customer) {
          setCustomer(contents.customer);
        }
      }
      const { shippingOrder } = await createShippingOrder(values);
      onSuccess(shippingOrder);
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
        email: customerEmail || '',
        emailIsBlocked: true,
        firstName: customerFirstName || '',
        lastName: customerLastName || '',
        phoneNumber: customerPhoneNumber || '',
      }}
      validationSchema={ValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors }) => (
        <>
          <div className={classes.content}>
            <Form className={classes.form} />
            <Instructions email={values.email && !errors.email ? values.email : ''} />
          </div>
          <Footer quote={quote} />
        </>
      )}
    </Formik>
  );
}

CompleteOrder.propTypes = {
  quote: PropTypes.shape({}).isRequired,
  lotId: PropTypes.number.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default CompleteOrder;

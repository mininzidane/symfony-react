import React, { useState, useContext } from 'react';
import { Formik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import TextAreaPlane from 'frontend/js/components/Form/PlaneTheme/TextAreaPlane';
import Button from 'frontend/js/components/Button';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import CalculatorContext from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext/CalculatorContext';
import AgreementConfirmation from './AgreementConfirmation';
import useStyles from './useStyles';

function OrderShippingForm({ onSuccess, lotId, auction, source }) {
  const intl = useIntl();
  const classes = useStyles();
  const customer = useCustomerHelper();
  const [error, setError] = useState(null);
  const {
    values: { shipping, total },
    refinements: { price },
  } = useContext(CalculatorContext);
  const { quote } = shipping;

  function getConsignee() {
    const {
      fullName = '',
      address = '',
      city = '',
      stateName = '',
      countryName = '',
      zip = '',
      phoneNumber = '',
      email = '',
    } = customer;

    const cityAndState = [city, stateName].filter(Boolean).join(', ');
    return [fullName, address, cityAndState, countryName, zip, phoneNumber, email].filter(Boolean).join('\n') || '';
  }

  async function onSubmit(values, { setSubmitting }) {
    setError(null);
    try {
      const payload = {
        lot: lotId,
        quote,
        country: get(quote, 'destination.country.id'),
        destination: get(quote, 'destination.id'),
        us_port: get(quote, 'us_port.id'),
        consignee: values.consignee,
        additionalCharges: get(quote, 'additionalCharges'),
        source,
        auction,
        ...(price ? { vehiclePrice: price } : {}),
      };

      await ShippingOrderService.shippingOrder(payload);
      onSuccess();
    } catch (e) {
      setError(intl.formatMessage({ id: 'form.error.general' }));
      setSubmitting(false);
    }
  }

  const isInternational = quote.type === ShippingOrderService.TypeInternational;

  function getTotalCharges() {
    const additionalCharges = get(quote, 'additionalCharges.total', 0);

    return additionalCharges + total;
  }

  return (
    <Formik
      className={classes.root}
      initialValues={{
        consignee: getConsignee(),
        shippingType: quote.type,
      }}
      validationSchema={yup.object().shape({
        consignee: yup.string().when('shippingType', {
          is: ShippingOrderService.TypeInternational,
          then: yup.string().required(ValidationErrors.fieldRequired),
        }),
      })}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values, touched, errors, setFieldValue, handleSubmit, setFieldTouched, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          {isInternational && (
            <TextAreaPlane
              id="consignee"
              name="consignee"
              label={intl.formatMessage({ id: 'shared.label.consignee' })}
              className="mt-10"
              value={values.consignee}
              error={errors.consignee}
              maxLength="250"
              rows={4}
              touched={touched.consignee}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
            />
          )}
          <AgreementConfirmation />

          {error && <div className="form-hint-plane text-sm mt-15">{error}</div>}

          <div className={classes.footer}>
            <Button
              type="submit"
              label={intl.formatMessage({ id: 'shipping.orderShipping' })}
              isInline
              isRegularCase
              isLoading={isSubmitting}
            />
            <div>
              <strong>{NumberService.formatCurrency(getTotalCharges())}</strong> USD
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}

OrderShippingForm.defaultProps = {
  onSuccess: () => {},
  source: null,
};

OrderShippingForm.propTypes = {
  onSuccess: PropTypes.func,
  lotId: PropTypes.number.isRequired,
  source: PropTypes.string,
  auction: PropTypes.string.isRequired,
};

export default OrderShippingForm;

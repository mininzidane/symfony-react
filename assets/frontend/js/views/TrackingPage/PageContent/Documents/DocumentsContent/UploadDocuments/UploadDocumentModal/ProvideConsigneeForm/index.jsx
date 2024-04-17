import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import { useFormik } from 'formik';
import TextAreaPlane from 'frontend/js/components/Form/PlaneTheme/TextAreaPlane';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import validationSchema from './validationSchema';

function ProvideConsigneeForm({ setForm, setIsValid }) {
  const intl = useIntl();
  const customer = useCustomerHelper();

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

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      consignee: getConsignee(),
    },
    onSubmit: () => {},
    validateOnMount: true,
  });

  useEffect(() => {
    const { isValid } = formik;
    setIsValid(isValid);
  }, [formik.isValid]);

  useEffect(() => {
    setForm(formik);
  }, [formik]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>{intl.formatMessage({ id: 'trackingPage.provideConsigneeForm.desc' })}</div>
      <TextAreaPlane
        id="consignee"
        name="consignee"
        className="mt-10"
        label={intl.formatMessage({ id: 'shared.label.consignee' })}
        value={formik.values.consignee}
        touched={formik.touched.consignee}
        error={formik.errors.consignee}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
      />
    </form>
  );
}

ProvideConsigneeForm.propTypes = {
  setForm: PropTypes.func.isRequired,
  setIsValid: PropTypes.func.isRequired,
};

export default ProvideConsigneeForm;

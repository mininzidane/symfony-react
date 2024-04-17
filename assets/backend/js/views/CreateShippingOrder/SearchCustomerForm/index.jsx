import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import SpinnerWheel from 'backend/js/components/SpinnerWheel';
import Select from 'backend/js/components/Form/Select';
import Input from 'backend/js/components/Form/Input';
import SubmitButton from 'backend/js/components/SubmitButton';
import CustomerService from 'backend/js/api/CustomerService';

function SearchCustomerForm({ setUserProfile }) {
  const [customers, setCustomers] = useState([]);
  const customerService = new CustomerService();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const result = await customerService.suggestSearch(values.email);
        if (result.length === 1) {
          setUserProfile(result[0]);
          setSubmitting(false);
        } else if (result.length > 0) {
          setCustomers(result);
          setSubmitting(false);
        } else {
          document.location = `/abm-acp/customer/register?redirect_to=newShipping&email=${values.email}`;
        }
      } catch (e) {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.isSubmitting ? (
        <SpinnerWheel isCentered size={40} thickness={3} />
      ) : (
        <>
          {customers.length > 0 ? (
            <div className="row m-b-sm">
              <div className="col-lg-3">
                <Select
                  id="customer"
                  name="customer"
                  placeholder="Email"
                  className="react-select-hollow"
                  options={customers}
                  onChange={(name, value) =>
                    setUserProfile(customers.find((customer) => customer.id === parseInt(value, 10)))
                  }
                  onChangeAttribute="id"
                  formatOptionLabel={(option) => `${option.email} (${option.firstName} ${option.lastName}`}
                  onBlur={() => {}}
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      minHeight: '40px',
                      borderColor: '#B7B5B3',
                      borderRadius: '2px',
                    }),
                    menu: (styles) => ({ ...styles, zIndex: '100' }),
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="row m-b-sm">
              <div className="col-lg-3">
                <Input
                  placeholder="Customer Email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  error={formik.errors.email}
                  touched={formik.touched.email}
                  onChange={formik.setFieldValue}
                  onBlur={formik.setFieldTouched}
                />
              </div>
              <div className="col-lg-3">
                <SubmitButton className="btn btn-primary" label="Search" isLoading={formik.isSubmitting} />
              </div>
            </div>
          )}
        </>
      )}
    </form>
  );
}

SearchCustomerForm.propTypes = {
  setUserProfile: PropTypes.func.isRequired,
};

export default SearchCustomerForm;

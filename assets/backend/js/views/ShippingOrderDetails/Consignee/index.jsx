import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import SubmitButton from 'backend/js/components/SubmitButton';
import TextArea from 'backend/js/components/Form/TextArea';
import ShippingOrderService from 'backend/js/api/ShippingOrderService';
import ConsigneeValidationSchema from './ConsigneeValidationSchema';

function Consignee({ id, consignee: consigneeProp }) {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [consignee, setConsignee] = useState(consigneeProp);

  const submitFunc = async (values) => {
    setLoading(true);
    try {
      await ShippingOrderService.updateConsignee(id, values);
    } finally {
      setLoading(false);
      setEditMode(false);
    }
  };

  return (
    <>
      {!editMode && (
        <div>
          {consignee}&nbsp;
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/control-has-associated-label,jsx-a11y/interactive-supports-focus */}
          <i
            className="fa fa-edit"
            role="button"
            onClick={() => {
              setEditMode(true);
            }}
          />
        </div>
      )}
      {editMode && (
        <div className="form">
          <Formik
            initialValues={{
              consignee,
            }}
            validationSchema={ConsigneeValidationSchema}
            onSubmit={submitFunc}
            render={({ values, errors, touched, handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <div className="form-group row">
                  <div className="form-row">
                    <TextArea
                      label=""
                      onChange={(name, value) => {
                        setFieldValue(name, value);
                        setConsignee(value);
                      }}
                      error={errors.consignee}
                      touched={touched.consignee}
                      value={values.consignee}
                      onBlur={() => {}}
                      name="consignee"
                      id="consignee"
                    />
                  </div>
                  <div className="form-row">
                    <SubmitButton isLoading={loading} label="Submit" />
                  </div>
                </div>
              </form>
            )}
          />
        </div>
      )}
    </>
  );
}

Consignee.propTypes = {
  id: PropTypes.number.isRequired,
  consignee: PropTypes.string.isRequired,
};

export default Consignee;

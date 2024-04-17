import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Input from 'backend/js/components/Form/Input';
import CustomerParentService from 'backend/js/api/CustomerParentService';
import RouterService from 'backend/js/api/RouterService';

function BrokerName({ id, name, onChange }) {
  const [editBrokerName, setEditBrokerName] = useState(false);
  const [brokerName, setBrokerName] = useState(name);
  const customerParentService = new CustomerParentService();

  function toggleEditBrokerName() {
    setEditBrokerName((value) => !value);
  }

  async function updateNameOnServer() {
    if (!id) {
      return;
    }
    await customerParentService.partialUpdate(id, { name: brokerName });
    setEditBrokerName(false);
  }

  return (
    <Formik
      initialValues={{
        name,
      }}
      onSubmit={() => {}}
    >
      {({ values, touched, errors, setFieldValue, setFieldTouched }) => (
        <span style={{ wordBreak: 'break-all' }}>
          {name ? (
            <>
              Edit Broker&nbsp;
              {!editBrokerName && (
                <>
                  {values.name}&nbsp;
                  <span className="btn-group">
                    <button type="button" className="btn btn-sm" onClick={toggleEditBrokerName}>
                      <i className="glyphicon glyphicon-edit" />
                    </button>
                    <a
                      href={RouterService.getRoute('customerParentDelete', null, { id })}
                      className="btn btn-sm btn-danger require-confirmation"
                    >
                      <i className="fa fa-trash-o" />
                    </a>
                  </span>
                </>
              )}
              {editBrokerName && (
                <div style={{ display: 'inline-block', width: '200px', marginLeft: '20px' }}>
                  <Input
                    id="name"
                    name="name"
                    className="row"
                    placeholder="Broker Name"
                    value={values.name}
                    error={errors.name}
                    touched={touched.name}
                    onChange={(key, value) => {
                      setFieldValue(key, value);
                      onChange(value);
                      setBrokerName(value);
                    }}
                    onBlur={(key, value) => {
                      updateNameOnServer();
                      setFieldTouched(key, value);
                    }}
                  />
                </div>
              )}
            </>
          ) : (
            <Input
              id="name"
              name="name"
              inputWrapperClassName="col-lg-3"
              className="row"
              placeholder="Broker Name"
              value={values.name}
              error={errors.name}
              touched={touched.name}
              onChange={(key, value) => {
                setFieldValue(key, value);
                onChange(value);
                setBrokerName(value);
              }}
              onBlur={setFieldTouched}
            />
          )}
        </span>
      )}
    </Formik>
  );
}

BrokerName.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

BrokerName.defaultProps = {
  name: undefined,
  id: undefined,
};

export default BrokerName;

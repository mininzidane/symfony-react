import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Formik } from 'formik';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import SubmitButton from '../../../components/SubmitButton';
import CustomerService from '../../../api/CustomerService';
import iconNotificationsDisable from './img/ic_disable_notifications.svg';
import iconNotificationsEnable from './img/ic_enable_notifications.svg';
import useStyles from './useStyles';

const generateClassName = createGenerateClassName({
  seed: 'blk-text-notifications',
});

function TextNotifications({ initialTextNotificationsEnabled, phoneNumbers, customerId }) {
  const [textNotificationsEnabled, setTextNotificationsEnabled] = useState(initialTextNotificationsEnabled);
  const customerService = new CustomerService();
  const classes = useStyles();

  async function onFormSubmit(values, { setSubmitting }) {
    setSubmitting(true);
    try {
      const payload = { ...values, textNotifications: !textNotificationsEnabled };
      const { customer } = await customerService.changeTextNotifications(customerId, payload);
      setTextNotificationsEnabled(get(customer, 'textNotifications', textNotificationsEnabled));
    } catch (serverError) {
      // do nothing
    }
    setSubmitting(false);
  }

  const submitLabel = textNotificationsEnabled ? (
    <>
      <img src={iconNotificationsDisable} alt="Disabled" width="15px" /> Disable
    </>
  ) : (
    <>
      <img src={iconNotificationsEnable} alt="Enabled" width="15px" /> Enable
    </>
  );

  return (
    <Formik
      initialValues={{
        mobilePhone: get(phoneNumbers, 0),
      }}
      onSubmit={onFormSubmit}
    >
      {({ setFieldValue, setFieldTouched, isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit} className={classNames(classes.root, 'form-inline')}>
          <div className={classNames(classes.textNotificationsText)}>
            SMS notifications:&nbsp;
            <b>{textNotificationsEnabled ? 'Enabled' : 'Disabled'}</b>
          </div>
          <div className="form-group">
            <select disabled={textNotificationsEnabled} name="mobilePhone" id="mobilePhone" className="form-control">
              {phoneNumbers.map((value) => (
                <option key={value} value={value} onBlur={setFieldTouched} onChange={setFieldValue}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <SubmitButton
            label={submitLabel}
            className={classNames(classes.textNotificationsButton, 'btn btn-sm btn-primary', {
              [classes.textNotificationsButtonDisable]: textNotificationsEnabled,
            })}
            isLoading={isSubmitting}
            disabled={isSubmitting || !phoneNumbers.length}
          />
        </form>
      )}
    </Formik>
  );
}

TextNotifications.propTypes = {
  initialTextNotificationsEnabled: PropTypes.bool.isRequired,
  phoneNumbers: PropTypes.array.isRequired,
  customerId: PropTypes.number.isRequired,
};

const $el = document.getElementById('text-notifications');
if ($el) {
  const textNotifications = Boolean($el.dataset.textNotifications);
  const customerId = Number($el.dataset.customerId);
  let phoneNumbers = $el.dataset.phoneNumbers ? JSON.parse($el.dataset.phoneNumbers) : [];
  if (!Array.isArray(phoneNumbers) && phoneNumbers) {
    phoneNumbers = Object.values(phoneNumbers);
  }

  ReactDOM.render(
    <StylesProvider generateClassName={generateClassName}>
      <TextNotifications
        initialTextNotificationsEnabled={textNotifications}
        phoneNumbers={phoneNumbers}
        customerId={customerId}
      />
    </StylesProvider>,
    $el,
  );
}

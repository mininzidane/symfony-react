/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import get from 'lodash/get';
import useIntl from 'frontend/js/hooks/useIntl';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import AlertsService from 'frontend/js/api/AlertsService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import LanguageService from 'frontend/js/api/LanguageService';
import AlertSchema from './AlertSchema';
import useStyles from './useStyles';

function Form({ lotId, auction, handleSuccess }) {
  const intl = useIntl();

  const FREQUENCIES = useMemo(
    () => [
      {
        value: 'daily',
        label: intl.formatMessage({ id: 'lotPage.alerts.form.frequency.daily' }),
      },
      {
        value: 'weekly',
        label: intl.formatMessage({ id: 'lotPage.alerts.form.frequency.weekly' }),
      },
    ],
    [],
  );

  const METHODS = useMemo(
    () => [
      {
        value: 'email',
        label: intl.formatMessage({ id: 'shared.label.email' }),
      },
      {
        value: 'sms',
        label: intl.formatMessage({ id: 'shared.label.sms' }),
      },
    ],
    [],
  );

  const classes = useStyles();
  const { firstName, lastName, email, phoneNumberRaw } = useCustomerHelper();

  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      email,
      phoneNumber: phoneNumberRaw,
      method: METHODS[1].value,
      frequency: FREQUENCIES[0].value,
    },
    validationSchema: AlertSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors }) => {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        lotId,
        auction,
        frequency: values.frequency,
        locale: LanguageService.getCurrentLocale(),
      };

      if (values.method === 'sms') {
        payload.phoneNumber = values.phoneNumber;
      } else {
        payload.email = values.email;
      }

      const alertsService = new AlertsService();
      try {
        await alertsService.createAlert(payload);
        handleSuccess();
      } catch (e) {
        const errors = get(e, 'response.data.errors', {});
        setErrors(errors);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={classes.root}>
        <SelectPlane
          id="method"
          name="method"
          options={METHODS}
          value={formik.values.method}
          error={formik.errors.method}
          touched={formik.touched.method}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
        />

        <SelectPlane
          id="frequency"
          name="frequency"
          options={FREQUENCIES}
          value={formik.values.frequency}
          error={formik.errors.frequency}
          touched={formik.touched.frequency}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
        />

        <InputPlane
          id="firstName"
          name="firstName"
          placeholder={intl.formatMessage({ id: 'shared.label.firstName' })}
          value={formik.values.firstName}
          error={formik.errors.firstName}
          touched={formik.touched.firstName}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
        />

        <InputPlane
          id="lastName"
          name="lastName"
          placeholder={intl.formatMessage({ id: 'shared.label.lastName' })}
          value={formik.values.lastName}
          error={formik.errors.lastName}
          touched={formik.touched.lastName}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
        />

        <div className={classes.fullWidth}>
          {formik.values.method === 'sms' ? (
            <PhoneInputPlane
              id="phoneNumber"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              error={formik.errors.phoneNumber}
              touched={formik.touched.phoneNumber}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
            />
          ) : (
            <InputPlane
              id="email"
              name="email"
              placeholder={intl.formatMessage({ id: 'shared.label.email' })}
              value={formik.values.email}
              error={formik.errors.email}
              touched={formik.touched.email}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
            />
          )}
        </div>

        <div className={classes.submit}>
          <ButtonOutlined
            type="submit"
            label={
              <div className="d-f ai-ct">
                <svg
                  className="mr-10"
                  width="15"
                  height="18"
                  viewBox="0 0 15 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.31492 6.13901L3.31492 6.13817C3.31447 5.60592 3.41859 5.07902 3.62171 4.5889C3.82515 4.09799 4.12354 3.65209 4.49974 3.27678L4.50074 3.27578C5.06281 2.71346 5.7782 2.32934 6.55743 2.17147L7.36594 2.00767L8.16702 2.17061C9.08184 2.35669 9.90423 2.85325 10.4949 3.57619C11.0856 4.29912 11.4082 5.204 11.4082 6.13756V6.13829L11.4089 7.16425C11.4089 7.16426 11.4089 7.16428 11.4089 7.1643C11.4097 8.38198 11.7097 10.2308 12.093 11.3809L13.0397 14.226L1.68303 14.226L2.63074 11.3817C3.01699 10.2229 3.31492 8.37733 3.31492 7.16432L3.31492 6.13901ZM7.37237 1.08101L7.36347 1.16173L7.35283 1.08018L7.35272 1.07756C7.35284 1.07705 7.353 1.07655 7.35321 1.07606C7.35373 1.0748 7.35451 1.07367 7.35549 1.07272C7.35575 1.07247 7.35602 1.07223 7.35631 1.07202C7.3571 1.0714 7.35798 1.07091 7.35892 1.07056C7.3602 1.07008 7.36156 1.06987 7.36292 1.06993C7.36429 1.07 7.36562 1.07034 7.36684 1.07094C7.36807 1.07155 7.36916 1.07239 7.37004 1.07343C7.37093 1.07447 7.37159 1.07568 7.37199 1.07698C7.37239 1.07829 7.37252 1.07966 7.37237 1.08101Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M7.46384 17.5024L7.46346 17.5024C7.26633 17.5025 7.07112 17.4637 6.88898 17.3883C6.70684 17.313 6.54135 17.2024 6.40196 17.063C6.26257 16.9236 6.15203 16.7581 6.07664 16.576C6.06644 16.5513 6.05691 16.5265 6.04805 16.5013L8.87853 16.5018C8.8697 16.5269 8.86019 16.5517 8.85002 16.5762C8.77463 16.7583 8.66412 16.9237 8.5248 17.063C8.38548 17.2023 8.22007 17.3129 8.03802 17.3882C7.85598 17.4636 7.66087 17.5024 7.46384 17.5024Z"
                    stroke="currentColor"
                  />
                </svg>
                <FormattedMessage id="lotPage.alerts.form.submit" />
              </div>
            }
            isLoading={formik.isSubmitting}
            isBackgroundWhite
          />
        </div>
      </div>
    </form>
  );
}

export default Form;

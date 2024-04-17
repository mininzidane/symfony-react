/* eslint-disable react/prop-types */
import React from 'react';
import t from 'frontend/js/api/TranslatorService';
import useIntl from 'frontend/js/hooks/useIntl';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import DatePicker from 'frontend/js/components/DatePicker';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import useSuggestions from 'frontend/js/hooks/useSuggestions';
import EmailSuggestions from 'frontend/js/views/Shared/Auth/_Shared/RegisterForm/Inputs/EmailSuggestions';
import useStyles from './useStyles';

function LeadFormInputs({ values, errors, touched, setFieldValue, setFieldTouched, setFieldError }) {
  const AT_SIGN = '@';
  const classes = useStyles();
  const intl = useIntl();

  const { shouldShowSuggestions, isEmailFocused, setIsEmailFocused, isEmailFocusedDelayed } = useSuggestions(
    values,
    AT_SIGN,
  );

  function setEmailDomain(domain) {
    const newEmail = values.email.split(AT_SIGN)[0] + AT_SIGN + domain;
    setFieldValue('email', newEmail);
  }

  const translationSets = {
    name: intl.formatMessage({ id: 'shared.label.name' }),
    email: intl.formatMessage({ id: 'shared.label.email' }),
    phoneNumber: intl.formatMessage({ id: 'shared.label.phoneNumber' }),
    alreadyRegistered: intl.formatMessage({ id: 'form.error.alreadyRegistered' }),
  };

  const timeRanges = [
    {
      value: '7 am - 11 am',
      label: '7 am - 11 am',
    },
    {
      value: '11 am - 3 pm',
      label: '11 am - 3 pm',
    },
    {
      value: '3 pm - 6 pm',
      label: '3 pm - 6 pm',
    },
  ];

  return (
    <div className={classes.root}>
      <InputPlane
        id="lounge-lead-name"
        name="name"
        value={values.name}
        touched={touched.name}
        error={errors.name}
        placeholder={translationSets.name}
        onChange={setFieldValue}
        onBlur={setFieldTouched}
        onError={setFieldError}
      />

      <PhoneInputPlane
        id="phoneNumber"
        name="phoneNumber"
        value={values.phoneNumber}
        error={errors.phoneNumber}
        touched={touched.phoneNumber}
        onChange={setFieldValue}
        onBlur={setFieldTouched}
      />

      <div className={classes.email}>
        <InputPlane
          id="email"
          name="email"
          value={values.email}
          touched={isEmailFocusedDelayed ? false : touched.email}
          error={['incorrect', 'taken'].includes(errors.email) ? t('form.error.alreadyRegistered') : errors.email}
          placeholder={translationSets.email}
          onChange={setFieldValue}
          onBlur={(name, value) => {
            setFieldTouched(name, value);
            setIsEmailFocused(false);
          }}
          onError={setFieldError}
          onFocus={() => setIsEmailFocused(true)}
          isTrimmed
        />

        <EmailSuggestions isOpen={isEmailFocused && shouldShowSuggestions} onClick={setEmailDomain} />
      </div>

      <div className={classes.timePickers}>
        <div>
          <DatePicker
            className={classes.datePicker}
            placeholder={intl.formatMessage({ id: 'shared.label.date' })}
            onChange={(value) => {
              setFieldValue('date', value && DateTimeService.format(value));
            }}
            shouldDisableDate={(date) =>
              DateTimeService.isWeekend(date) || DateTimeService.isToday(date) || DateTimeService.isPast(date)
            }
            clearIconDisabled
          />
          {!!errors.pickupDate && touched.pickupDate && <div className="form-hint-plane">{errors.pickupDate}</div>}
        </div>

        <SelectPlane
          id="time"
          name="time"
          placeholder={intl.formatMessage({ id: 'shared.label.time' })}
          className={classes.select}
          value={values.time}
          options={timeRanges}
          error={errors.time}
          touched={touched.time}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
      </div>
    </div>
  );
}

export default LeadFormInputs;

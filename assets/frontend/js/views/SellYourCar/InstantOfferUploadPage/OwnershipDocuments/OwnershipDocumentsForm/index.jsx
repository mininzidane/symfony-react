/* eslint-disable react/prop-types */
import React from 'react';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import CountryService from 'frontend/js/api/CountryService';
import useIntl from 'frontend/js/hooks/useIntl';
import useStates from 'frontend/js/hooks/useStates';
import useStyles from './useStyles';

function OwnershipDocumentsForm({ formik }) {
  const [states] = useStates(CountryService.COUNTRIES.usa.code);
  const intl = useIntl();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <div className={classes.label}>{intl.formatMessage({ id: 'sellYourCarPage.upload.titleState.label' })}</div>
        <SelectPlane
          id="titleState"
          name="titleState"
          placeholder={intl.formatMessage({ id: 'shared.label.selectState' })}
          value={formik.values.titleState}
          options={states}
          error={formik.errors.titleState}
          touched={formik.touched.titleState}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          onChangeAttribute="code"
          formatOptionLabel={(option) => option.name}
          isSearchable
        />
      </div>
      <div>
        <div className={classes.label}>{intl.formatMessage({ id: 'sellYourCarPage.upload.titleName.label' })}</div>
        <InputPlane
          id="titleName"
          name="titleName"
          placeholder="Ex John Doe"
          value={formik.values.titleName}
          error={formik.errors.titleName}
          touched={formik.touched.titleName}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
        />
      </div>
    </div>
  );
}

export default OwnershipDocumentsForm;

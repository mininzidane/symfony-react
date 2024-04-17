/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import get from 'lodash/get';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import LotService from 'frontend/js/api/LotService';
import useYearMakeModelOptions from 'frontend/js/hooks/useYearMakeModelOptions';
import useIntl from 'frontend/js/hooks/useIntl';
import useStyles from './useStyles';

function Selects({ setVin, setOverlayYmm }) {
  const classes = useStyles();
  const intl = useIntl();
  const { makeOptions, modelOptions, yearOptions, onChangeMake } = useYearMakeModelOptions();
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');

  useEffect(() => {
    if (year && make && model) {
      LotService.getVinByYearMakeModel(`year=${year}&make=${make}&model=${model}`.replaceAll(' ', '_'))
        .then((data) => {
          const vin = get(data, 'vehicle.vin');
          if (vin) {
            setVin(data.vehicle.vin.replaceAll('*', ''));
          }
        })
        .catch(() => setOverlayYmm(`${year} ${make} ${model}`));
    }
  }, [year, make, model]);

  return (
    <div className={classes.grid}>
      <SelectPlane
        id="year"
        name="year"
        placeholder={intl.formatMessage({ id: 'shared.label.year' })}
        value={year}
        options={yearOptions}
        onChange={(_, v) => setYear(v)}
        isSearchable
        isNativeLabelDisabled={false}
      />
      <SelectPlane
        id="make"
        name="make"
        placeholder={intl.formatMessage({ id: 'shared.label.make' })}
        value={make}
        options={makeOptions}
        onChange={(_, v) => {
          setMake(v);
          setModel('');
          onChangeMake(v);
        }}
        isSearchable
        isNativeLabelDisabled={false}
      />
      <SelectPlane
        id="model"
        name="model"
        placeholder={intl.formatMessage({ id: 'shared.label.model' })}
        value={model}
        options={modelOptions}
        onChange={(_, v) => setModel(v)}
        isSearchable
        isNativeLabelDisabled={false}
      />
    </div>
  );
}

Selects.propTypes = {};

export default Selects;

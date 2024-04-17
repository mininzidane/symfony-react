/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import get from 'lodash/get';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import LotService from 'frontend/js/api/LotService';
import Button from 'frontend/js/components/Button';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import ObjectService from 'frontend/js/lib/utils/ObjectService';
import RouterService from 'frontend/js/api/RouterService';
import Select from './Select';
import getLocalStorageValues from './getLocalStorageValues';
import useStyles from './useStyles';

const { CancelToken } = axios;
let requestCancelToken;

const localStorageKey = 'Abm::VehicleFinderValues';
const { localMake, localModel, localYearFrom, localYearTo, localLocation } = getLocalStorageValues(localStorageKey);

function YmmFinderForm({ vehicleType, auction, ctaQaId }) {
  const classes = useStyles();
  const intl = useIntl();
  const { serializeQueryParams, redirect } = RouterService;
  const { modifySelectOptions } = ObjectService;
  const localStorageParams = LocalStorageService.get(localStorageKey) || {};

  const [makeOptions, setMakeOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [yearFromOptions, setYearFromOptions] = useState([]);
  const [yearToOptions, setYearToOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);

  const [isLocalMakeUsed, setIsLocalMakeUsed] = useState(false);
  const [isLocalValuesUsed, setIsLocalValuesUsed] = useState(false);

  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYearFrom, setSelectedYearFrom] = useState(null);
  const [selectedYearTo, setSelectedYearTo] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  function getFormSubmitParams() {
    const locationParam = {};
    if (selectedLocation) {
      locationParam.SaleLocationId = selectedLocation.value;
    }

    return {
      VehicleType: vehicleType,
      ...(auction && { auction }),
      ...(selectedMake && { Make: selectedMake.value }),
      ...(selectedModel && { Model: selectedModel.value }),
      ...(selectedYearFrom && { year_from: selectedYearFrom.value }),
      ...(selectedYearTo && { year_to: selectedYearTo.value }),
      ...locationParam,
    };
  }

  function submitForm() {
    LotService.removeLastViewedLot();
    redirect('searchResults', getFormSubmitParams());
    setIsFormSubmitting(true);
  }

  function cancelRequest() {
    if (typeof requestCancelToken === 'function') {
      requestCancelToken();
      requestCancelToken = undefined;
    }
  }

  function setValueFromLocalStorage(options, value, setMethod) {
    if (options && value) {
      const matchingOption = options.find((option) => option.value === value);
      if (matchingOption) {
        setMethod({ label: matchingOption.label, value: matchingOption.value });
        return true;
      }
    }

    return false;
  }

  function setValuesFromLocalStorage(makeOpts, modelOpts, yearFromOpts, locationOpts) {
    if (!isLocalMakeUsed) {
      setValueFromLocalStorage(makeOpts, localMake, setSelectedMake);
      setIsLocalMakeUsed(true);
    } else {
      if (!selectedMake) {
        setValueFromLocalStorage(modelOpts, localModel, setSelectedModel);
      }

      if (!selectedYearFrom) {
        setValueFromLocalStorage(yearFromOpts, localYearFrom, setSelectedYearFrom);
      }

      if (!selectedYearTo) {
        setValueFromLocalStorage(yearFromOpts, localYearTo, setSelectedYearTo);
      }

      if (!selectedLocation) {
        setValueFromLocalStorage(locationOpts, localLocation, setSelectedLocation);
      }

      setIsLocalValuesUsed(true);
    }
  }

  function groupMakeOptions(options, popularMakes) {
    const groupedOptions = [
      {
        label: intl.formatMessage({ id: 'shared.finderForm.popularMakes' }),
        options: options
          .filter((option) => popularMakes.includes(option.value))
          .map((option) => ({ ...option, key: `popularMakes-${option.value}` })),
      },
      {
        label: intl.formatMessage({ id: 'shared.finderForm.allMakes' }),
        options: options.map((option) => ({ ...option, key: `allMakes-${option.value}` })),
      },
    ];

    return options.length > 1 ? groupedOptions : options;
  }

  function getSectionValues(section) {
    return get(section, 'values.all', []);
  }

  function updateOptions(criteria) {
    const { make, model_group, years, locations, popular_makes } = criteria;
    const nextMakeOptions = Array.isArray(make) ? [] : modifySelectOptions(getSectionValues(make), 'key');
    const nextModelOptions = Array.isArray(model_group)
      ? []
      : modifySelectOptions(getSectionValues(model_group), 'key');
    const nextYearFromOption = Array.isArray(years) ? [] : modifySelectOptions(getSectionValues(years), 'key');
    const nextLocationOptions = Array.isArray(locations) ? [] : modifySelectOptions(getSectionValues(locations), 'key');

    if (!makeOptions.length) {
      setMakeOptions(groupMakeOptions(nextMakeOptions, popular_makes));
    }

    setModelOptions(nextModelOptions);
    setYearFromOptions(nextYearFromOption);
    setLocationOptions(nextLocationOptions);

    if (!isLocalValuesUsed) {
      setValuesFromLocalStorage(nextMakeOptions, nextModelOptions, nextYearFromOption, nextLocationOptions);
    }
  }

  function getCriteriaRequestParams() {
    const params = {
      vehicle_type: vehicleType,
      ...(auction && { auction }),
      ...(selectedMake && { make: selectedMake.value }),
      ...(selectedModel && { model_group: selectedModel.value }),
      ...(selectedYearFrom && { year_from: selectedYearFrom.value }),
      ...(selectedYearTo && { year_to: selectedYearTo.value }),
      ...(selectedLocation && { sale_location_id: selectedLocation.value }),
    };

    return serializeQueryParams(params);
  }

  function getSearchCriteria() {
    cancelRequest();

    const requestOptions = {
      cancelToken: new CancelToken((c) => {
        requestCancelToken = c;
      }),
    };

    LotService.getYmmSearchResults(getCriteriaRequestParams(), requestOptions)
      .then((criteriaJson) => updateOptions(criteriaJson))
      .catch(() => null);
  }

  function adjustYearToOptions() {
    if (selectedYearFrom) {
      const yearsAboveSelected = yearFromOptions.filter((option) => option.value >= selectedYearFrom.value);
      setYearToOptions(yearsAboveSelected);
    } else {
      setYearToOptions(yearFromOptions);
    }
  }

  function adjustSelectedYear(selectedOption, options, setMethod) {
    const optionsLength = options.length;

    if (selectedOption && optionsLength) {
      const selectedYear = selectedOption.value;
      const earliestYear = options[optionsLength - 1].value;
      const latestYear = options[0].value;

      if (selectedYear < earliestYear) {
        setMethod({ value: earliestYear, label: earliestYear });
      }

      if (selectedYear > latestYear) {
        setMethod({ value: latestYear, label: latestYear });
      }
    } else {
      setMethod(null);
    }
  }

  function adjustSelectedLocation() {
    if (selectedLocation) {
      const matchingNewOption = locationOptions.find((option) => option.value === selectedLocation.value);

      if (!matchingNewOption) {
        setSelectedLocation(null);
      }
    }
  }

  function updateLocalStorageValue(option, key) {
    const params = { ...localStorageParams };

    if (option) {
      params[key] = option.value;
    } else {
      delete params[key];
    }

    return LocalStorageService.set(localStorageKey, params);
  }

  function handleSelect(option, setMethod) {
    setMethod(option);
  }

  // Request new criteria on init or option change
  useEffect(() => {
    getSearchCriteria();
  }, [selectedMake, selectedModel, selectedYearFrom, selectedYearTo, selectedLocation]);

  // Clear values on make change
  useEffect(() => {
    setModelOptions([]);
    setSelectedModel(null);
    setSelectedLocation(null);
  }, [selectedMake]);

  // Update YearFrom if it does not fit new options
  useEffect(() => {
    adjustSelectedYear(selectedYearFrom, yearFromOptions, setSelectedYearFrom);
  }, [yearFromOptions]);

  // Update YearTo if it does not fit new options
  useEffect(() => {
    adjustSelectedYear(selectedYearTo, yearToOptions, setSelectedYearTo);
  }, [yearToOptions]);

  // Update YearTo options to fit new YearFrom values
  useEffect(() => {
    adjustYearToOptions();
  }, [selectedYearFrom, yearFromOptions]);

  // Clear location if it does not fit the new options
  useEffect(() => {
    adjustSelectedLocation();
  }, [locationOptions]);

  // Save values to localStorage
  useEffect(() => {
    updateLocalStorageValue(selectedMake, 'make');
  }, [selectedMake]);
  useEffect(() => {
    updateLocalStorageValue(selectedModel, 'model');
  }, [selectedModel]);
  useEffect(() => {
    updateLocalStorageValue(selectedYearFrom, 'year_from');
  }, [selectedYearFrom]);
  useEffect(() => {
    updateLocalStorageValue(selectedYearTo, 'year_to');
  }, [selectedYearTo]);
  useEffect(() => {
    updateLocalStorageValue(selectedLocation, 'sale_location_id');
  }, [selectedLocation]);

  const earliestYear = yearFromOptions[yearFromOptions.length - 1];
  const latestYear = yearToOptions[0];

  return (
    <div className={classes.root}>
      <Select
        selectedOption={selectedMake}
        options={makeOptions}
        onChange={(option) => handleSelect(option, setSelectedMake)}
        placeholder={intl.formatMessage({ id: 'shared.finderForm.allMakes' })}
        label={intl.formatMessage({ id: 'shared.label.make' })}
      />

      <Select
        selectedOption={selectedModel}
        options={modelOptions}
        onChange={(option) => handleSelect(option, setSelectedModel)}
        isDisabled={!selectedMake}
        placeholder={intl.formatMessage({ id: 'shared.finderForm.allModels' })}
        label={intl.formatMessage({ id: 'shared.label.model' })}
      />

      <div className={classes.yearsWrap}>
        <Select
          selectedOption={selectedYearFrom || earliestYear}
          options={yearFromOptions}
          onChange={(option) => handleSelect(option, setSelectedYearFrom)}
          placeholder={intl.formatMessage({ id: 'shared.finderForm.fromYear' })}
          label={intl.formatMessage({ id: 'shared.finderForm.fromYear' })}
        />

        <Select
          selectedOption={selectedYearTo || latestYear}
          options={yearToOptions}
          onChange={(option) => handleSelect(option, setSelectedYearTo)}
          placeholder={intl.formatMessage({ id: 'shared.finderForm.toYear' })}
          label={intl.formatMessage({ id: 'shared.finderForm.toYear' })}
        />
      </div>

      <Select
        selectedOption={selectedLocation}
        options={locationOptions}
        onChange={(option) => handleSelect(option, setSelectedLocation)}
        placeholder={intl.formatMessage({ id: 'shared.finderForm.allLocations' })}
        label={intl.formatMessage({ id: 'shared.label.location' })}
      />

      <Button
        label={<FormattedMessage id="shared.cta.search" />}
        className={ctaQaId}
        onClick={submitForm}
        isLoading={isFormSubmitting}
        color="blue"
        size="lg"
        isSquared
      />
    </div>
  );
}

export default YmmFinderForm;

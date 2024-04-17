/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import get from 'lodash/get';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import LotService from 'frontend/js/api/LotService';
import Button from 'frontend/js/components/Button';
import ObjectService from 'frontend/js/lib/utils/ObjectService';
import RouterService from 'frontend/js/api/RouterService';
import Select from './Select';
import useStyles from './useStyles';

const { CancelToken } = axios;
let requestCancelToken;

function FinderForm() {
  const classes = useStyles();
  const intl = useIntl();
  const { serializeQueryParams, redirect } = RouterService;
  const { modifySelectOptions } = ObjectService;

  const [makeOptions, setMakeOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [yearFromOptions, setYearFromOptions] = useState([]);
  const [yearToOptions, setYearToOptions] = useState([]);

  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYearFrom, setSelectedYearFrom] = useState(null);
  const [selectedYearTo, setSelectedYearTo] = useState(null);

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  function getFormSubmitParams() {
    return {
      ...(selectedMake && { make: selectedMake.value }),
      ...(selectedModel && { model: selectedModel.value }),
      ...(selectedYearFrom && { year_from: selectedYearFrom.value }),
      ...(selectedYearTo && { year_to: selectedYearTo.value }),
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
    const { make, model_group, years, popular_makes } = criteria;
    const nextMakeOptions = Array.isArray(make) ? [] : modifySelectOptions(getSectionValues(make), 'key');
    const nextModelOptions = Array.isArray(model_group)
      ? []
      : modifySelectOptions(getSectionValues(model_group), 'key');
    const nextYearFromOption = Array.isArray(years) ? [] : modifySelectOptions(getSectionValues(years), 'key');

    if (!makeOptions.length) {
      setMakeOptions(groupMakeOptions(nextMakeOptions, popular_makes));
    }

    setModelOptions(nextModelOptions);
    setYearFromOptions(nextYearFromOption);
  }

  function getCriteriaRequestParams() {
    const params = {
      ...(selectedMake && { make: selectedMake.value }),
      ...(selectedModel && { model_group: selectedModel.value }),
      ...(selectedYearFrom && { year_from: selectedYearFrom.value }),
      ...(selectedYearTo && { year_to: selectedYearTo.value }),
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

  function handleSelect(option, setMethod) {
    setMethod(option);
  }

  // Request new criteria on init or option change
  useEffect(() => {
    setTimeout(getSearchCriteria);
  }, [selectedMake, selectedModel, selectedYearFrom, selectedYearTo]);

  // Clear values on make change
  useEffect(() => {
    setModelOptions([]);
    setSelectedModel(null);
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

      <div className={classes.selectsWrap}>
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

      <Button
        label={<FormattedMessage id="shared.cta.search" />}
        onClick={submitForm}
        isLoading={isFormSubmitting}
        color="blue"
        size="lg"
        isSquared
        className={classes.submitCta}
      />
    </div>
  );
}

export default FinderForm;

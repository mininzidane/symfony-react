import { useState, useEffect } from 'react';
import axios from 'axios';
import get from 'lodash/get';
import LotService from 'frontend/js/api/LotService';
import RouterService from 'frontend/js/api/RouterService';
import ObjectService from 'frontend/js/lib/utils/ObjectService';

const { CancelToken } = axios;
let requestCancelToken;

function useYearMakeModelOptions({ skip, make: initMake } = {}) {
  const VEHICLE_TYPE = LotService.VEHICLE_CATEGORY.AUTOMOBILE;

  const [initialized, setInitialized] = useState(false);
  const [currentMake, setCurrentMake] = useState(initMake);

  const [makeOptions, setMakeOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);

  const { serializeQueryParams } = RouterService;
  const { modifySelectOptions } = ObjectService;

  function cancelRequest() {
    if (typeof requestCancelToken === 'function') {
      requestCancelToken();
      requestCancelToken = undefined;
    }
  }

  function getSectionValues(section) {
    return get(section, 'values.all', []);
  }

  function updateOptions(criteria) {
    const { make, model_group, years } = criteria;
    const nextMakeOptions = Array.isArray(make) ? [] : modifySelectOptions(getSectionValues(make), 'key');
    const nextModelOptions = Array.isArray(model_group)
      ? []
      : modifySelectOptions(getSectionValues(model_group), 'key');
    const nextYearOption = Array.isArray(years) ? [] : modifySelectOptions(getSectionValues(years), 'key');

    if (makeOptions.length === 0) {
      setMakeOptions(nextMakeOptions);
    }
    if (yearOptions.length === 0) {
      setYearOptions(nextYearOption);
    }
    setModelOptions(nextModelOptions);
  }

  function getSearchCriteria() {
    cancelRequest();

    const requestOptions = {
      cancelToken: new CancelToken((c) => {
        requestCancelToken = c;
      }),
    };

    const payload = serializeQueryParams({
      vehicle_type: VEHICLE_TYPE,
      ...(currentMake && { make: currentMake }),
    });

    LotService.getYmmSearchResults(payload, requestOptions)
      .then((criteriaJson) => updateOptions(criteriaJson))
      .catch(() => null);
  }

  function init() {
    const payload = serializeQueryParams({ vehicle_type: VEHICLE_TYPE });
    LotService.getYmmSearchResults(payload)
      .then((criteriaJson) => {
        setInitialized(true);
        return updateOptions(criteriaJson);
      })
      .catch(() => null);
  }

  function onChangeMake(make) {
    setModelOptions([]);
    setCurrentMake(make);
  }

  useEffect(() => {
    if (!skip && !initialized) {
      init();
    }
  }, [skip]);

  useEffect(() => {
    if (!skip && initialized && currentMake) {
      getSearchCriteria();
    }
  }, [initialized, currentMake]);

  return { makeOptions, modelOptions, yearOptions, onChangeMake };
}

export default useYearMakeModelOptions;

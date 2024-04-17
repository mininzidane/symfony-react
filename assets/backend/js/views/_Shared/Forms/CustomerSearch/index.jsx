import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as axios from 'axios';
import CustomerSearchService from 'backend/js/api/CustomerSearchService';
import useStyles from './useStyles';

function CustomerSearch({ autocompleteCustomers, setAutocompleteCustomers, setSelectedAutocompleteCustomer, label }) {
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const customerSearchService = new CustomerSearchService();
  const { CancelToken } = axios;
  const classes = useStyles();

  let source;

  async function autocompleteByEmail(event, value, reason) {
    if (reason !== 'input') {
      return;
    }

    try {
      // cancel prev ajax call
      if (source) {
        source.cancel();
      } else {
        setAutocompleteLoading(true);
      }
      source = CancelToken.source();

      const response = await customerSearchService.searchAutocomplete(encodeURIComponent(value), {
        cancelToken: source.token,
      });

      setAutocompleteCustomers(response || []);
      setAutocompleteLoading(false);
    } catch (e) {
      //  Ignore
    }
  }

  return (
    <Autocomplete
      id="newCustomerName"
      classes={{
        inputRoot: classes.inputRoot,
        option: classes.option,
        groupLabel: classes.groupLabel,
      }}
      options={autocompleteCustomers}
      getOptionLabel={(option) => `${option.firstName} ${option.lastName} [${option.email}]`}
      onInputChange={autocompleteByEmail}
      onChange={(event, value) => setSelectedAutocompleteCustomer(value)}
      style={{ width: '100%' }}
      loading={autocompleteLoading}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" fullWidth className={classes.textField} />
      )}
    />
  );
}

CustomerSearch.propTypes = {
  autocompleteCustomers: PropTypes.array,
  setAutocompleteCustomers: PropTypes.func.isRequired,
  setSelectedAutocompleteCustomer: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

CustomerSearch.defaultProps = {
  autocompleteCustomers: [],
};

export default CustomerSearch;

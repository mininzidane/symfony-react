/* eslint-disable no-unused-vars */
import React from 'react';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function SignUpDate({ dateString }) {
  const classes = useStyles();

  return (
    <span className={classes.root}>
      {Date.parse(dateString) > 0
        ? DateTimeService.toLocaleDate(dateString, { year: 'numeric', month: 'short', day: 'numeric' })
        : '—'}
    </span>
  );
}

SignUpDate.propTypes = {
  dateString: PropTypes.string.isRequired,
};

export default SignUpDate;

/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import FormikTickbox from 'backend/js/components/Form/FormikTickbox';
import useStyles from './useStyles';

function Filter({ label, active, onChange, count, name, value, disabled }) {
  const classes = useStyles();

  function handleChange(_, checked) {
    onChange(name, checked ? value : '');
  }

  return (
    <div className={classnames(classes.root, disabled && 'pe-n', active && classes.active)}>
      <FormikTickbox onChange={handleChange} id={label} value={active} name={name}>
        {label} {count ? `(${count})` : ''}
      </FormikTickbox>
    </div>
  );
}

export default Filter;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useStyles from './useStyles';

const FileInput = ({ onChange, isInButton, name, accept, isMultiple }) => {
  const classes = useStyles();
  const inputClasses = classNames(classes.root, { 'is-in-button': isInButton });

  function handleChange(event) {
    const { files } = event.target;
    onChange(files);
  }

  return (
    <input
      type="file"
      onChange={handleChange}
      name={name}
      className={inputClasses}
      accept={accept}
      multiple={isMultiple}
    />
  );
};

FileInput.propTypes = {
  isInButton: PropTypes.bool,
  isMultiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  accept: PropTypes.string,
};

FileInput.defaultProps = {
  isInButton: false,
  isMultiple: false,
  accept: '*/*',
};

export default FileInput;

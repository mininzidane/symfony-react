import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Input, InputAdornment, IconButton } from '@material-ui/core';
import useStyles from './useStyles';

function QueryInput({ value, placeholder, onChange, className }) {
  const classes = useStyles();

  function handleChange(event) {
    onChange(event.target.value);
  }

  function handleClear() {
    onChange('');
  }

  return (
    <Input
      onChange={handleChange}
      value={value}
      disableUnderline
      placeholder={placeholder}
      className={classnames(classes.root, className)}
      endAdornment={
        <InputAdornment position="end">
          {value ? (
            <IconButton size="small" onClick={handleClear}>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                <path
                  fill="#666"
                  d="M15,6,14,5,10,9,6,5,5,6l4,4L5,14l1,1,4-4,4,4,1-1-4-4Z"
                  transform="translate(-5 -5)"
                  fillRule="evenodd"
                />
              </svg>
            </IconButton>
          ) : (
            <div className="svg-icon" style={{ width: 15, height: 15 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                <path
                  fill="#8E8E8F"
                  d="M11.578-12.944h-.545l-.189-.188a4.438,4.438,0,0,0,1.076-2.9,4.459,4.459,0,0,0-4.46-4.459A4.459,4.459,0,0,0,3-16.032a4.459,4.459,0,0,0,4.46,4.459,4.439,4.439,0,0,0,2.9-1.074l.189.188v.543l3.429,3.424L15-9.514l-3.422-3.43Zm-4.118,0a3.087,3.087,0,0,1-3.087-3.087A3.087,3.087,0,0,1,7.46-19.119a3.088,3.088,0,0,1,3.087,3.087A3.087,3.087,0,0,1,7.46-12.944Z"
                  transform="translate(-3 20.491)"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          )}
        </InputAdornment>
      }
    />
  );
}

QueryInput.defaultProps = {
  className: '',
};

QueryInput.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default QueryInput;

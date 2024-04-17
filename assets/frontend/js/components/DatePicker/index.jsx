import React, { useRef, useState, Suspense } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DateFnsUtils from '@date-io/date-fns';
import MuiPickersUtilsProvider from '@material-ui/pickers/MuiPickersUtilsProvider';
import { Input, InputAdornment, IconButton } from '@material-ui/core';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import Popper from '../Popper';
import DateTimeService from '../../lib/utils/DateTimeService';
import useStyles from './useStyles';

const MuiDatePicker = React.lazy(() =>
  import('@material-ui/pickers/DatePicker').then((module) => ({ default: module.DatePicker })),
);

function DatePicker(props) {
  const { className, onChange, placeholder, shouldDisableDate, clearIconDisabled, disabled, initialValue } = props;
  const classes = useStyles(props);
  const popperRef = useRef();
  const [value, setValue] = useState(initialValue);

  function handleChange(date) {
    if (popperRef.current && value) {
      popperRef.current.close();
    }
    setValue(date);
    onChange(date);
  }

  function handleClear(e) {
    e.stopPropagation();
    setValue('');
    onChange('');
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Popper
        inner
        ref={popperRef}
        placement="top"
        offsetTop={0}
        classes={{
          paper: classes.paper,
        }}
        trigger={
          <Input
            placeholder={placeholder}
            className={classNames(classes.input, className, disabled && 'is-disabled')}
            disableUnderline
            value={value && DateTimeService.format(value, 'EEE, MMM d, yyyy')}
            readOnly
            endAdornment={
              <InputAdornment position="end">
                {value && !clearIconDisabled && (
                  <IconButton size="small" className={classes.clearIcon} onClick={handleClear}>
                    <svg
                      width="1em"
                      height="1em"
                      fill="black"
                      focusable="false"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      role="presentation"
                    >
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                  </IconButton>
                )}

                <div style={{ height: 18 }}>
                  <svg width={15} xmlns="http://www.w3.org/2000/svg" viewBox="-4101 3588.798 15.24 17.701">
                    <path
                      id="Path_416"
                      d="M648.642,974.162v-.96a1.578,1.578,0,0,0-3.151,0v.96h-1.083v-.96a1.578,1.578,0,0,0-3.151,0v.96h-1.083v-.96a1.577,1.577,0,0,0-3.151,0v.96H635.2V989.4h15.24v-15.24h-1.8Zm-12.162,8.986h2.733v2.339H636.48Zm12.679-.419h-2.733v-2.56h2.733Zm-3.151,0h-2.979v-2.56h2.979Zm-3.4,0h-2.979v-2.56h2.979Zm-3.4,0H636.48v-2.56h2.733Zm.419.419h2.979v2.339h-2.979Zm2.979,2.757v2.216h-2.979v-2.216Zm.419,0h2.979v2.216h-2.979Zm0-.419v-2.339h2.979v2.339Zm3.4-2.339h2.733v2.339h-2.733Zm2.733-5.613v2.191h-2.733v-2.191Zm-2.831-4.333c0-.468.222-.64.739-.64s.739.2.739.64v2.536c0,.468-.222.64-.739.64s-.739-.2-.739-.64Zm-.32,4.333v2.191h-2.979v-2.191Zm-3.915-4.333c0-.468.222-.64.739-.64s.739.2.739.64v2.536c0,.468-.222.64-.739.64s-.739-.2-.739-.64Zm.517,4.333v2.191h-2.979v-2.191Zm-4.752-4.333c0-.468.222-.64.739-.64s.739.2.739.64v2.536c0,.468-.222.64-.739.64s-.739-.2-.739-.64Zm1.354,4.333v2.191H636.48v-2.191Zm-2.733,8.371h2.733v2.216H636.48Zm9.946,2.216v-2.216h2.733v2.216Z"
                      transform="translate(-4736.2 2617.098)"
                    />
                  </svg>
                </div>
              </InputAdornment>
            }
          />
        }
      >
        <div>
          <Suspense
            fallback={
              <div className={classes.suspense}>
                <SpinnerWheel isCentered />
              </div>
            }
          >
            <MuiDatePicker
              variant="static"
              autoOk
              value={value}
              onChange={handleChange}
              shouldDisableDate={shouldDisableDate}
            />
          </Suspense>
        </div>
      </Popper>
    </MuiPickersUtilsProvider>
  );
}

DatePicker.propTypes = {
  shouldDisableDate: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  clearIconDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

DatePicker.defaultProps = {
  shouldDisableDate: () => {},
  onChange: () => {},
  placeholder: '',
  className: '',
  clearIconDisabled: false,
  disabled: false,
  initialValue: '',
};

export default DatePicker;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import PasswordInputPlane from 'frontend/js/components/Form/PlaneTheme/PasswordInputPlane';

import useStyles from './useStyles';
import Red from './Red';
import Green from './Green';

function PasswordVisualField({ conditions, value, onFocus, onBlur, suggestionsTopPosition, ...other }) {
  const classes = useStyles();

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur();
  };

  const validate = (val) => {
    const result = conditions.find(({ regexp, func }) => {
      const funcCondition = func && func(val);
      const regexpCondition = regexp && regexp.test(val);

      return val && !funcCondition && !regexpCondition;
    });

    return result ? result.label : '';
  };

  return (
    <div className={classes.root}>
      <PasswordInputPlane value={value} onBlur={handleBlur} onFocus={handleFocus} validate={validate} {...other} />
      {isFocused ? (
        <div className={classes.checkList} style={{ top: suggestionsTopPosition }}>
          <div className={classes.title}>
            <FormattedMessage id="securityPage.form.criteria.title" />
          </div>
          {conditions.map(({ regexp, func, label }) => {
            const funcCondition = func && func(value);
            const regexpCondition = regexp && regexp.test(value);

            if (value && (funcCondition || regexpCondition)) {
              return <Green key={label}>{label}</Green>;
            }

            return <Red key={label}>{label}</Red>;
          })}
        </div>
      ) : null}
    </div>
  );
}

PasswordVisualField.propTypes = {
  conditions: PropTypes.array.isRequired,
  value: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  suggestionsTopPosition: PropTypes.string,
};

PasswordVisualField.defaultProps = {
  value: '',
  suggestionsTopPosition: '53px',
  onFocus: () => {},
};

export default PasswordVisualField;

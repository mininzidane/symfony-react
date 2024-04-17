import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';

import useStyles from './useStyles';

function Disclosure({ className }) {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <div className={classnames(classes.root, className)}>
      {' '}
      {intl.formatMessage({ id: 'landings.financing.disclosure' })}
    </div>
  );
}

Disclosure.propTypes = {
  className: PropTypes.string,
};

Disclosure.defaultProps = {
  className: '',
};

export default Disclosure;

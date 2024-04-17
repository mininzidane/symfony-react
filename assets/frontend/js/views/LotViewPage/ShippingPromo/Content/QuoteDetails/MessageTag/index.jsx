import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useStyles from './useStyles';

function MessageTag({ message }) {
  const classes = useStyles();

  return (
    <div className={classnames(classes.tag, 'd-f jc-ct ai-ct')}>
      <span className={classnames(classes.message, 'text-sm fw-7')}>{message}</span>
    </div>
  );
}

MessageTag.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default MessageTag;

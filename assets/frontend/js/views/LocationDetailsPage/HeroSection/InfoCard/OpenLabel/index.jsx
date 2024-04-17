/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useStyles from './useStyles';

function OpenLabel({ isOpen }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classnames(classes.dot, isOpen && 'is-open')} />
      <FormattedMessage
        id={isOpen ? 'shared.label.openNow' : 'shared.label.closed'}
        className={classnames(classes.label, isOpen && 'is-open')}
      />
    </div>
  );
}

export default OpenLabel;

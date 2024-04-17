/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';

function OrSeparator({ className }) {
  const classes = useStyles();

  return (
    <div className={classnames(classes.root, className)}>
      <span>
        <FormattedMessage id="shared.label.or" />
      </span>
    </div>
  );
}

export default OrSeparator;

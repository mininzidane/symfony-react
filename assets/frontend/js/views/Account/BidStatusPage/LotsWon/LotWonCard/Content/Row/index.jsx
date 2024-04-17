/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';

import useStyles from './useStyles';

function Row({ messageId, value, condition, isFlex }) {
  const classes = useStyles({ isFlex });

  return (
    <>
      {Boolean(condition) && (
        <div className={classes.root}>
          <span className={classes.label}>
            <FormattedMessage id={messageId} />:
          </span>{' '}
          <span>{value}</span>
        </div>
      )}
    </>
  );
}

export default Row;

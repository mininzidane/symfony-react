/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ItemsPerPageControl from 'frontend/js/components/Pagination/ItemsPerPageControl';
import useStyles from './useStyles';

function LinksPanel({ count }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <FormattedMessage id="shared.label.containers" /> {`(${count})`}
      </div>

      <ItemsPerPageControl withHistoryAPI />
    </div>
  );
}

export default LinksPanel;

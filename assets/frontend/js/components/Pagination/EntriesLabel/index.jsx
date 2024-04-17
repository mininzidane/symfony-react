import React, { useContext } from 'react';
import PaginationContext from 'frontend/js/context/PaginationContext';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function EntriesLabel() {
  const classes = useStyles();
  const { total } = useContext(PaginationContext);

  return (
    <div className={classes.root}>
      <strong>{NumberService.formatNumber(total)}</strong> <FormattedMessage id="shared.label.entries" />
    </div>
  );
}

export default EntriesLabel;

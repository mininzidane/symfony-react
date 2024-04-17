import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import SortContext from 'frontend/js/context/SortContext';
import RouterService from 'frontend/js/api/RouterService';
import DownloadButton from 'frontend/js/views/Shared/DownloadButton';
import FiltersContext from 'frontend/js/views/Account/BidStatusPage/Shared/_Context/Filters';
import useStyles from './useStyles';

function DownloadReport() {
  const classes = useStyles();
  const { filters } = useContext(FiltersContext);
  const { sort } = useContext(SortContext);
  const { isBelowMd } = useBreakpoint();
  const queryParams = { ...filters, sort: sort.field, order: sort.order };

  return (
    <DownloadButton
      classes={{
        label: classes.label,
      }}
      className={classes.root}
      href={RouterService.getRoute('lotsWonDownloadReport', queryParams)}
      label={<FormattedMessage id="shared.cta.downloadReport" />}
      isBackgroundTransparent
      size={isBelowMd ? 'sm' : 'md'}
      isInline
      isThinBorder
      isRegularCase
      isTargetBlank
    />
  );
}

export default DownloadReport;

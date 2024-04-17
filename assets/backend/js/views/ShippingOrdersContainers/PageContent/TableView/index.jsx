/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { FormattedMessage } from 'react-intl-phraseapp';
import ThemedTable from 'frontend/js/components/ThemedTable';
import getRowsArray from './getRowsArray';
import useStyles from './useStyles';

function TableView({ invoices }) {
  const classes = useStyles({ headerOffset: 0 });
  const rowsArray = useMemo(() => getRowsArray(invoices), [invoices]);

  return (
    <div id="purchases-table">
      <ScrollContainer hideScrollbars={false} ignoreElements=".no-drag">
        <ThemedTable
          className={classes.table}
          headData={[
            { label: <FormattedMessage id="trackingPage.trackingInformation.container" /> },
            { label: <FormattedMessage id="trackingPage.trackingInformation.booking" /> },
            { label: <FormattedMessage id="shared.label.lines" /> },
            { label: <FormattedMessage id="shared.label.vehicles" /> },
            { label: <FormattedMessage id="shared.label.invoice" /> },
            { label: <FormattedMessage id="shared.label.billOfLading" /> },
            { label: <FormattedMessage id="shared.label.portOfLoading" /> },
            { label: <FormattedMessage id="shared.label.port" /> },
            { label: <FormattedMessage id="shared.label.dateOfLoading" /> },
            { label: <FormattedMessage id="shared.label.eta" /> },
            { label: 'Release' },
            { label: <FormattedMessage id="depositsPage.cta.total" /> },
            { label: <FormattedMessage id="shared.label.paidAmount" /> },
          ].filter(Boolean)}
          bodyData={rowsArray}
        />
      </ScrollContainer>
    </div>
  );
}

export default TableView;

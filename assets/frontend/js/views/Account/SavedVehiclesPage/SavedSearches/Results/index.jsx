/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Pagination from 'frontend/js/components/Pagination';
import RouterService from 'frontend/js/api/RouterService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import AdaptiveTable from 'frontend/js/components/Table/AdaptiveTable';
import GoogleAd from 'frontend/js/components/GoogleAd';
import ArrayService from 'frontend/js/lib/utils/ArrayService';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import EditTitleModalTrigger from '../../../_Shared/Buttons/EditTitleModalTrigger';
import DeleteModalTrigger from '../../../_Shared/Buttons/DeleteModalTrigger';
import EditTitleModal from '../../../_Shared/Modals/EditTitleModal';
import DeleteModal from '../../../_Shared/Modals/DeleteModal';
import useStyles from './useStyles';

function Results({ searches }) {
  const classes = useStyles();

  const [isEditTitleModalOpen, setIsEditTitleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalSearchId, setModalSearchId] = useState();
  const { isBelowMd } = useBreakpoint();
  const gridRef = useRef();

  const width = gridRef?.current?.getBoundingClientRect()?.width || 0;
  let itemsBeforeAd = 6;
  if (width < 768) {
    itemsBeforeAd = 3;
  }

  const rowsArray = searches.map(({ title, hash, total, addedAt, id }) => {
    const row = [
      { content: <a href={RouterService.getRoute('searchResults', { saved_search_hash: hash })}>{title}</a> },
      { content: total },
      { content: <span>{DateTimeService.formatFromISOString(addedAt)}</span> },
      {
        content: (
          <EditTitleModalTrigger
            onClick={() => {
              setIsEditTitleModalOpen(true);
              setModalSearchId(id);
            }}
          />
        ),
        style: { paddingTop: 13, paddingBottom: 13, paddingRight: 0 },
      },
      {
        content: (
          <DeleteModalTrigger
            onClick={() => {
              setIsDeleteModalOpen(true);
              setModalSearchId(id);
            }}
          />
        ),
        style: { paddingTop: 13, paddingBottom: 13, paddingLeft: 5 },
      },
    ];

    row.id = id;
    return row;
  });

  const rowsArrayWithAd = ArrayService.appendEl(rowsArray, itemsBeforeAd, (idx) => [
    {
      content: (
        <GoogleAd
          id={`div-gpt-ad-1665182489390-${idx}`}
          adUnitPath="/93216436/ABM-Internal-Area-728x90-300x100"
          placement="watchlist-0"
          className="width-xl-728 spacer-xl-90 width-sm-300 sm-mt-5"
          withSlot
        />
      ),
      colSpan: 12,
      style: {
        background: 'transparent',
      },
      isRaw: true,
    },
  ]);

  const modalSearchEntry = searches.find((v) => v.id === modalSearchId) || {};

  return (
    <div ref={gridRef}>
      <AdaptiveTable
        className={classes.table}
        headData={[
          { label: <FormattedMessage id="savedSearches.results.searchName" />, style: { width: '60%' } },
          { label: <FormattedMessage id="shared.label.results" /> },
          { label: <FormattedMessage id="shared.label.created" /> },
          {
            label: isBelowMd ? <FormattedMessage id="shared.cta.edit" /> : null,
            style: { width: 40 },
          },
          {
            label: isBelowMd ? <FormattedMessage id="shared.cta.delete" /> : null,
            style: { width: 40 },
          },
        ]}
        bodyData={rowsArrayWithAd}
      />

      <Pagination />

      <EditTitleModal
        isOpen={isEditTitleModalOpen}
        onClose={() => setIsEditTitleModalOpen(false)}
        search={modalSearchEntry}
      />

      <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} search={modalSearchEntry} />
    </div>
  );
}

Results.propTypes = {};

export default Results;

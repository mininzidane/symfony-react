import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import EditTitleModalTrigger from 'frontend/js/views/Account/_Shared/Buttons/EditTitleModalTrigger';
import DeleteModalTrigger from 'frontend/js/views/Account/_Shared/Buttons/DeleteModalTrigger';
import useStyles from './useStyles';

function getRowsArray({ searches, totals, setIsEditTitleModalOpen, setIsDeleteModalOpen, setModalSearchId }) {
  const classes = useStyles();

  return searches.map(({ title, hash, id }) => {
    const row = [
      { content: <a href={RouterService.getRoute('searchResults', { saved_search_hash: hash })}>{title}</a> },
      { content: totals[id] },
      {
        content: (
          <div className={classes.actions}>
            <EditTitleModalTrigger
              onClick={() => {
                setIsEditTitleModalOpen(true);
                setModalSearchId(id);
              }}
            />
            <DeleteModalTrigger
              onClick={() => {
                setIsDeleteModalOpen(true);
                setModalSearchId(id);
              }}
            />
          </div>
        ),
      },
    ];

    row.id = id;
    return row;
  });
}

export default getRowsArray;

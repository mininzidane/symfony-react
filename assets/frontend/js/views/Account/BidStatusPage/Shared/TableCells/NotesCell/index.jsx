import React, { useState, Suspense } from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import ButtonLink from 'frontend/js/components/ButtonLink';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useStyles from './useStyles';

const NotesModal = React.lazy(() => import('./NotesModal'));

function NotesCell({ lotId, auction, noteStats, isNoteStatsLoading, invoiceCustomerId }) {
  if (!lotId) {
    return null;
  }

  const intl = useIntl();
  const classes = useStyles();
  const { id: customerId } = useCustomerHelper();
  const [isOpen, setIsOpen] = useState(false);
  const [isNotesRead, setIsNoteRead] = useState(false);

  const hasNewMessage = !isNotesRead && noteStats.newTotal > 0;

  function handleClick() {
    setIsOpen(true);
  }
  function handleClose() {
    setIsOpen(false);
  }
  function handleReadNotes() {
    setIsNoteRead(true);
  }

  const isViewOnly = customerId !== invoiceCustomerId;

  const label = intl.formatMessage({
    id: isViewOnly || noteStats.total > 0 ? 'shared.cta.viewNotes' : 'shared.cta.addNotes',
  });

  if (isNoteStatsLoading) {
    return <SpinnerWheel size={14} thickness={2} />;
  }

  return (
    <>
      {noteStats.lastReadMessage && (
        <div className={`${classes.lastReadMessage} no-drag`}>{noteStats.lastReadMessage}</div>
      )}
      <ButtonLink
        onClick={handleClick}
        isDashed
        label={
          <>
            {label}
            {hasNewMessage && !isNotesRead && (
              <>
                &nbsp;(<strong>{noteStats.newTotal}</strong>)
              </>
            )}
          </>
        }
      />
      {isOpen && (
        <Suspense fallback={null}>
          <NotesModal
            isOpen={isOpen}
            onClose={handleClose}
            lotId={lotId}
            auction={auction}
            isViewOnly={isViewOnly}
            newTotal={isNotesRead ? 0 : noteStats.newTotal}
            onReadNotes={handleReadNotes}
          />
        </Suspense>
      )}
    </>
  );
}

NotesCell.propTypes = {
  lotId: PropTypes.number.isRequired,
  auction: PropTypes.string.isRequired,
  isNoteStatsLoading: PropTypes.bool,
  noteStats: PropTypes.object,
  invoiceCustomerId: PropTypes.number,
};

NotesCell.defaultProps = {
  isNoteStatsLoading: false,
  noteStats: {
    lastReadMessage: null,
    newTotal: 0,
    total: 0,
  },
  invoiceCustomerId: 0,
};

export default NotesCell;

import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import BidPriorityForm from 'backend/js/views/Bid/CounterBid/BidsTable/LatestActivity/BidPriorityForm';
import CustomerNotes from 'backend/js/views/_Shared/Micro/CustomerNotes';
import CustomerNoteForm from 'backend/js/views/_Shared/Micro/CustomerNoteForm';
import useCounterBidContext from 'backend/js/views/Bid/CounterBid/_Context/useCounterBidContext';
import {
  NOTE_SORT_CREATED_AT_DESC,
  NOTE_SORT_CREATED_AT_ASC,
} from 'backend/js/views/Bid/CounterBid/BidsHeader/FilterBar';
import useStyles from './useStyles';

function LatestActivity({ bid }) {
  const { customer, lot } = bid;
  const { notes = [] } = lot;
  const [customerNotes, setCustomerNotes] = useState(notes);
  const { loadCounterBidStats, enableRefresh, disableRefresh, noteSort } = useCounterBidContext();
  const classes = useStyles();

  if (!customerNotes) {
    return null;
  }

  function sortNotesDateDesc() {
    setCustomerNotes(customerNotes.slice().sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1)));
  }

  function sortNotesDateAsc() {
    setCustomerNotes(customerNotes.slice().sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1)));
  }

  useEffect(() => {
    if (noteSort === NOTE_SORT_CREATED_AT_DESC) {
      sortNotesDateDesc();
    }
    if (noteSort === NOTE_SORT_CREATED_AT_ASC) {
      sortNotesDateAsc();
    }
  }, [noteSort]);

  function handleNoteSubmit() {
    disableRefresh();
  }

  async function handleOnNoteAddSuccess(newNote) {
    let newNotes = customerNotes.slice();
    if (noteSort === NOTE_SORT_CREATED_AT_DESC) {
      newNotes = [newNote, ...newNotes];
    } else {
      newNotes.push(newNote);
    }
    setCustomerNotes(newNotes);
    await loadCounterBidStats();
    enableRefresh();
  }

  return (
    <div className={classnames('note-list note-list-compact', classes.root)}>
      <BidPriorityForm bid={bid} />

      {customer && (
        <>
          <div className={classnames('m-t', classes.notes)}>
            <CustomerNotes notes={customerNotes} />
          </div>

          <div className="m-t">
            <CustomerNoteForm
              customer={customer}
              lot={lot}
              category="counter_bid"
              onSubmit={handleNoteSubmit}
              onSubmitSuccess={handleOnNoteAddSuccess}
            />
          </div>
        </>
      )}
    </div>
  );
}

LatestActivity.propTypes = {
  bid: PropTypes.object.isRequired,
};

export default LatestActivity;

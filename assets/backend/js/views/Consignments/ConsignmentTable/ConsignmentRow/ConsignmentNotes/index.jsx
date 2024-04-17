/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import CustomerNotes from 'backend/js/views/_Shared/Micro/CustomerNotes';
import ConsignmentNoteForm from './ConsignmentNoteForm';
import useStyles from './useStyles';

function ConsignmentNotes({ consignment, notes }) {
  const classes = useStyles();
  const [consignmentNotes, setConsignmentNotes] = useState(notes || []);

  async function handleOnNoteAddSuccess(newNote) {
    const newNotes = [newNote, ...consignmentNotes];
    setConsignmentNotes(newNotes);
  }

  useEffect(() => {
    setConsignmentNotes(notes || []);
  }, [notes]);

  return (
    <>
      {consignmentNotes.length > 0 && (
        <div className={classnames('m-b', classes.notes)}>
          <CustomerNotes notes={consignmentNotes} />
        </div>
      )}

      <ConsignmentNoteForm consignment={consignment} onSubmitSuccess={handleOnNoteAddSuccess} />
    </>
  );
}

export default ConsignmentNotes;

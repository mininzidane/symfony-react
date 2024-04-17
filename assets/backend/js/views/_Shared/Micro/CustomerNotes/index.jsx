import React from 'react';
import PropTypes from 'prop-types';
import CustomerNote from 'backend/js/views/_Shared/Micro/CustomerNotes/CustomerNote';

function CustomerNotes({ notes }) {
  return (
    <>
      {notes.map((note) => (
        <CustomerNote note={note} key={`note-${note.id}`} />
      ))}
    </>
  );
}

CustomerNotes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CustomerNotes;

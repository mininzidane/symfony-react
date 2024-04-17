import React from 'react';
import PropTypes from 'prop-types';
import useNotes from 'backend/js/hooks/useNotes';
import NoteGroup from 'backend/js/views/CustomerPage/CustomerNotes/NoteGroups/NoteGroup';

function NoteGroups({ customerId, category, isAdmin }) {
  const NOTES_COUNT = 20;
  const [noteGroups, isLoading] = useNotes(customerId, category, { limit: NOTES_COUNT });

  if (isLoading) {
    return (
      <div className="ibox float-e-margins">
        <div className="ibox-content" />
      </div>
    );
  }

  if (noteGroups.length === 0) {
    return null;
  }

  return (
    <>
      {noteGroups.map((groups, i) => (
        <div className="ibox float-e-margins" key={i}>
          {groups.map((row) => (
            <NoteGroup
              key={row.category.key}
              customerId={customerId}
              isAdmin={isAdmin}
              category={row.category}
              noteList={row.noteList}
              notesCount={NOTES_COUNT}
            />
          ))}
        </div>
      ))}
    </>
  );
}

NoteGroups.propTypes = {
  category: PropTypes.string.isRequired,
  customerId: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool,
};

NoteGroups.defaultProps = {
  isAdmin: false,
};

export default NoteGroups;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CustomerParentService from 'backend/js/api/CustomerParentService';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';

function Notes({ id }) {
  const [notes, setNotes] = useState([]);
  const customerParentService = new CustomerParentService();

  useEffect(() => {
    async function fetchData() {
      const response = await customerParentService.getCustomerParentNotes(id);
      setNotes(response.notes);
    }
    fetchData();
  }, [id]);

  function prepareNote(note) {
    return note.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }

  return (
    <div className="ibox">
      <div className="ibox-content" style={{ maxHeight: '110px', overflow: 'hidden', overflowY: 'auto' }}>
        {notes.map((note) => (
          <div key={note.id}>
            <small className="text-muted">
              <i>
                *
                {note.author ? (
                  <>
                    {note.author.firstName} {note.author.lastName}
                  </>
                ) : (
                  <>AUTO</>
                )}
                &nbsp; - {DateTimeService.formatFromISOString(note.createdAt, 'MM/dd/yyyy H:mmaaa').toLowerCase()}
              </i>
            </small>
            &nbsp;-&nbsp;
            <span dangerouslySetInnerHTML={{ __html: prepareNote(note.message) }} />
          </div>
        ))}
      </div>
    </div>
  );
}

Notes.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Notes;

import React from 'react';
import PropTypes from 'prop-types';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import EhLogo from '../img/ehLogo.png';

function CustomerNote({ note }) {
  const { author } = note;
  const authorName = author ? `${author.firstName} ${author.lastName}` : 'AUTO';

  return (
    <>
      <small className="text-muted">
        <i>
          {note?.source === 'EH' && <img src={EhLogo} alt="EH Logo" width="16px" height="16px" />}*{authorName} -{' '}
          {DateTimeService.formatFromISOString(note.createdAt || '', 'MM/dd/yyyy h:mmaaa').toLowerCase()}
        </i>
      </small>{' '}
      - <span dangerouslySetInnerHTML={{ __html: note.message }} />
      <br />
    </>
  );
}

CustomerNote.propTypes = {
  note: PropTypes.object.isRequired,
};

export default CustomerNote;

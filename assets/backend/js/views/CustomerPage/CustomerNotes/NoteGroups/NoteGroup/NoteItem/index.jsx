import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RouterService from 'backend/js/api/RouterService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';

function NoteItem({ note, isAdmin, customerId }) {
  const MESSAGE_LENGTH = 500;
  const [message, setMessage] = useState(note.message.slice(0, MESSAGE_LENGTH));
  let ticketDetailsPath = null;
  if (note.zdTicket) {
    ticketDetailsPath = RouterService.getRoute('backendCustomerTicketDetailsModal', null, {
      customer: customerId,
      ticket: note.zdTicket.zdId,
    });
  }

  let link = '';
  if (ticketDetailsPath !== null) {
    link = (
      <a href={ticketDetailsPath} data-toggle="load-modal" title="Ticket Details" className="text-default m-r-xs">
        <i className="fa fa-envelope" />
      </a>
    );
  } else if (note.wireConfirmation) {
    link = (
      <a
        href={RouterService.getRoute('backendWireConfirmationUploadModal', null, { id: note.wireConfirmation.id })}
        data-toggle="load-modal"
        title=" Details"
        className="text-default m-r-xs"
      >
        <i className="fa fa-bank" />
      </a>
    );
  }

  let author = 'AUTO';
  if (note.authorDetails) {
    author = note.authorDetails;
  } else if (note.wireConfirmation) {
    author = 'MEMBER';
  }

  return (
    <>
      <span className="parent-hider">
        {link}
        <small className="text-muted">
          <i>
            *{author} - {DateTimeService.formatFromISOString(note.createdAt, 'MM/dd/yyyy H:mmaaa')}
          </i>
        </small>{' '}
        -{' '}
        {ticketDetailsPath !== null && (
          <a href={ticketDetailsPath} data-toggle="load-modal" title="Ticket Details">
            View Ticket {note.zdTicket.zdId}
          </a>
        )}
        <span dangerouslySetInnerHTML={{ __html: message }} />
        {note.message.length > MESSAGE_LENGTH && message.length <= MESSAGE_LENGTH && (
          <>
            {'... '}
            <button
              type="button"
              className="btn btn-xs btn-default"
              onClick={() => {
                setMessage(note.message);
              }}
            >
              read more
            </button>
          </>
        )}
        {note.wonNote && (
          <>
            , Bid Type:{' '}
            <a href={RouterService.getRoute('backendCustomerBidLog', null, { id: customerId })}>{note.bidType}</a>
          </>
        )}
        {note.wireConfirmation && (
          <a
            href={RouterService.getRoute('backendWireConfirmationUploadModal', null, {
              id: note.wireConfirmation.id,
            })}
            data-toggle="load-modal"
            title="Wire Confirmation Uploads"
          >
            View Uploads
          </a>
        )}
        {note.customerNoteFiles &&
          note.customerNoteFiles.map((file, i) => (
            <a key={i} href={file.s3Url} target="_blank" rel="noreferrer">
              {file.fileName}
            </a>
          ))}
        {isAdmin && (
          <a
            className="btn btn-xs btn-danger btn-outline hidden-child"
            href={RouterService.getRoute('backendCustomerDeleteNote', null, { id: customerId, note: note.id })}
          >
            {' '}
            <i className="fa fa-trash" />
          </a>
        )}
      </span>
      <br />
    </>
  );
}

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
  customerId: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool,
};

NoteItem.defaultProps = {
  isAdmin: false,
};

export default NoteItem;

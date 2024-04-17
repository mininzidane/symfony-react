import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import Link from 'frontend/js/components/Link';
import NoResultsState from './NoResultsState';
import useStyles from './useStyles';

function Notes({ notes, isLoading }) {
  const classes = useStyles();

  function prepareNote(note) {
    return note?.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }

  if (isLoading) {
    return <SpinnerWheel size={34} thickness={3} isCentered />;
  }

  if (!isLoading && notes?.length === 0) {
    return <NoResultsState />;
  }

  return (
    <div>
      {notes.map((note) => (
        <div key={note.id} className={classnames(classes.note, note.employeeResponse && 'is-employee-response')}>
          <div className={classes.date}>
            {DateTimeService.formatFromISOString(note.createdAt, 'MM/dd/yyyy H:mm aaa')} PST
          </div>
          <div className={classes.message}>
            <div dangerouslySetInnerHTML={{ __html: prepareNote(note.message) }} />
            {note.customerNoteFiles && (
              <div className={classes.files}>
                {note.customerNoteFiles.map((file, index) => (
                  <Link key={index} href={file.s3Url} className={classes.file} isTargetBlank>
                    {file.fileName}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

Notes.propTypes = {
  notes: PropTypes.array,
  isLoading: PropTypes.bool,
};

Notes.defaultProps = {
  notes: [],
  isLoading: false,
};

export default Notes;

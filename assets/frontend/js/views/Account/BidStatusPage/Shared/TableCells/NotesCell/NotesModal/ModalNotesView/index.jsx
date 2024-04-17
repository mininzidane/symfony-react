import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import Notes from '../Notes';
import useNotes from '../useNotes';
import useStyles from './useStyles';

function NotesModalView({ isOpen, onClose, lotId, auction, newTotal }) {
  const intl = useIntl();
  const classes = useStyles();
  const bodyRef = useRef();

  const { notes, isLoading } = useNotes({ lotId, auction, containerRef: bodyRef, newTotal });

  const title = intl.formatMessage(
    { id: 'bidStatusPage.lotsWon.notes.title' },
    {
      count: newTotal,
      id: lotId,
    },
  );

  return (
    <ModalWindow
      className={classes.modal}
      rootClassName={classes.root}
      onClose={onClose}
      isOpen={isOpen}
      width={724}
      keepMounted={false}
    >
      <ModalWindowHeader className={classes.header} title={title} onClose={onClose} />
      <ModalWindowBody className={classes.body} bodyRef={bodyRef}>
        <Notes notes={notes} isLoading={isLoading} />
      </ModalWindowBody>
    </ModalWindow>
  );
}

NotesModalView.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  lotId: PropTypes.number.isRequired,
  auction: PropTypes.string.isRequired,
  newTotal: PropTypes.number,
};

NotesModalView.defaultProps = {
  newTotal: 0,
};

export default NotesModalView;

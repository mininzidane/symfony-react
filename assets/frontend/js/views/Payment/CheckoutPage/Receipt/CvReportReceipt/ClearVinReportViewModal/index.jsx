/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import useStyles from './useStyles';

function ClearVinReportCheckoutModal({ isOpen, setOpen, report }) {
  const classes = useStyles();

  function handleModalClose() {
    setOpen(false);
  }

  return (
    <ModalWindow isOpen={isOpen} onClose={handleModalClose} className={classes.iframeModalBody} size="fullscreen">
      <>
        <ModalWindowHeader
          title={<FormattedMessage id="lotPage.clearvinPromo.clearvinReport" />}
          onClose={handleModalClose}
        />

        <ModalWindowBody className={classes.root}>
          <iframe
            srcDoc={report}
            title={<FormattedMessage id="lotPage.clearvinPromo.clearvinReport" />}
            className={classes.iframe}
          />
        </ModalWindowBody>
      </>
    </ModalWindow>
  );
}

export default ClearVinReportCheckoutModal;

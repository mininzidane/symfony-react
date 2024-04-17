/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import SpinnerWheel from 'backend/js/components/SpinnerWheel';
import ModalWindow from 'backend/js/components/ModalWindow';
import LotService from 'backend/js/api/LotService';
import useStyles from './useStyles';

function ClearVinModal({ lotId, inventoryAuction, component: Component }) {
  const classes = useStyles();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [initialized, setInitialized] = useState(false);

  function getReport() {
    if (report) {
      setIsOpenModal(true);
      return;
    }

    setIsReportLoading(true);

    LotService.getCvReport(lotId, inventoryAuction)
      .then((data) => setReport(data.cvReport.report))
      .catch(() => {})
      .finally(() => setIsReportLoading(false));
  }

  useEffect(() => {
    if (!initialized && isOpenModal) {
      getReport();
      setInitialized(true);
    }
  }, [initialized, isOpenModal]);

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  return (
    <>
      <Component onClick={() => setIsOpenModal(true)} />
      <ModalWindow
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        className={classnames({ [classes.iframeModalBody]: Boolean(report) })}
        size="fullscreen"
      >
        <ModalWindowHeader title="ClearVin Vehicle History Report" onClose={handleCloseModal} />
        <ModalWindowBody>
          {report ? (
            <iframe srcDoc={report} title="ClearVin Vehicle History Report" className={classes.iframe} />
          ) : (
            <>{isReportLoading && <SpinnerWheel size={34} thickness={3} className="is-centered" />}</>
          )}
        </ModalWindowBody>
      </ModalWindow>
    </>
  );
}

export default ClearVinModal;

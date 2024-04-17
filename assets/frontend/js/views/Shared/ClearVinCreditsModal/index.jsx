/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import ButtonText from 'frontend/js/components/ButtonText';
import Button from 'frontend/js/components/Button';
import LotService from 'frontend/js/api/LotService';
import useStyles from './useStyles';

function ClearVinCreditsModal({
  lotId,
  auction,
  isOpen,
  setOpen,
  creditsCount,
  updateCreditsCount,
  requestedAt,
  requestedAtTs,
  setCheckoutModalOpen,
  isFirstTime,
  reportHash,
  freeReport,
}) {
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [report, setReport] = useState(null);
  const { customer } = window;
  const classes = useStyles();
  const intl = useIntl();

  const translationSets = {
    no: intl.formatMessage({ id: 'shared.cta.no' }),
    clearvinReportConfirmation: intl.formatMessage({ id: 'lotPage.clearvinPromo.clearvinReportConfirmation' }),
    clearvinReport: intl.formatMessage({ id: 'lotPage.clearvinPromo.clearvinReport' }),
    viewCurrentReport: intl.formatMessage({ id: 'lotPage.clearvinPromo.viewCurrentReport' }),
    getUpdatedReport: intl.formatMessage({ id: 'lotPage.clearvinPromo.getUpdatedReport' }),
    getReport: intl.formatMessage({ id: 'lotPage.clearvinPromo.getReport' }),
    firstTime: intl.formatMessage(
      { id: 'lotPage.clearvinPromo.firstTime' },
      {
        br: <br />,
        firstName: customer && customer.firstName,
        membershipType: customer && customer.membershipType.name,
        creditsRemaining: creditsCount,
      },
    ),
    repeatedly: intl.formatMessage(
      { id: 'lotPage.clearvinPromo.repeatedly' },
      {
        strong: (chunks) => <strong>{chunks}</strong>,
        creditsRemaining: creditsCount,
      },
    ),
    youAlreadyHaveAReport: intl.formatMessage(
      { id: 'lotPage.clearvinPromo.youAlreadyHaveAReport' },
      {
        strong: (chunks) => <strong>{chunks}</strong>,
        requestedAt: requestedAt ? DateTimeService.formatFromISOString(requestedAt.date) : '',
        creditsRemaining: creditsCount,
      },
    ),
  };

  async function getReport(force, isCurrentReport) {
    const payload = { reportHash, auction };

    if (force) {
      payload.force = true;
    }

    setIsReportLoading(true);

    try {
      const { cvReport } = await LotService.getCvReport(lotId, payload);
      setReport(cvReport.report);

      if (!isCurrentReport && !freeReport) {
        updateCreditsCount(creditsCount - 1);
      }
    } catch (e) {
      /** Ignore */
    }

    setIsReportLoading(false);
  }

  function switchToCheckoutModal() {
    setOpen(false);
    setCheckoutModalOpen(true);
  }

  useEffect(() => {
    (async () => {
      let isWithinTwoDays = false;

      if (requestedAtTs) {
        const diffSeconds = +new Date() / 1000 - requestedAtTs;
        const twoDaysSeconds = 60 * 60 * 24 * 2;
        isWithinTwoDays = diffSeconds < twoDaysSeconds;
      }

      if (!report && (freeReport || isWithinTwoDays)) {
        await getReport(false, true);
      }
    })();
  }, [freeReport]);

  return (
    <ModalWindow
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      className={classnames({ [classes.iframeModalBody]: Boolean(report) })}
      size={report ? 'fullscreen' : 'lg'}
    >
      <ModalWindowHeader
        title={report ? translationSets.clearvinReport : translationSets.clearvinReportConfirmation}
        onClose={() => setOpen(false)}
      />
      <ModalWindowBody hasFooter>
        {report ? (
          <iframe srcDoc={report} title={translationSets.clearvinReport} className={classes.iframe} />
        ) : (
          <div className={classes.message}>
            {isReportLoading && <SpinnerWheel size={34} thickness={3} isCentered />}

            <div className={classnames(classes.messageText, { 'is-loading': isReportLoading })}>
              {requestedAt ? (
                translationSets.youAlreadyHaveAReport
              ) : (
                <>{isFirstTime ? translationSets.firstTime : translationSets.repeatedly}</>
              )}
            </div>
          </div>
        )}
      </ModalWindowBody>
      <ModalWindowFooter>
        {!report && !isReportLoading && (
          <>
            {requestedAt ? (
              <>
                <ButtonText label={translationSets.viewCurrentReport} onClick={() => getReport(false, true)} />

                <Button
                  label={translationSets.getUpdatedReport}
                  onClick={() => {
                    if (creditsCount) {
                      getReport(true);
                    } else {
                      switchToCheckoutModal();
                    }
                  }}
                  isInline
                />
              </>
            ) : (
              <>
                <ButtonText label={translationSets.no} onClick={() => setOpen(false)} />

                <Button label={translationSets.getReport} onClick={() => getReport(false)} isInline />
              </>
            )}
          </>
        )}
      </ModalWindowFooter>
    </ModalWindow>
  );
}

export default ClearVinCreditsModal;

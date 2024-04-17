import React, { useState, useMemo } from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import NumberService from 'frontend/js/lib/utils/NumberService';
import ThemedTable from 'frontend/js/components/ThemedTable';
import ButtonLink from 'frontend/js/components/ButtonLink';
import useStyles from './useStyles';

function IncrementalBidGuidelinesLink() {
  const intl = useIntl();
  const classes = useStyles();
  const [isOpen, seIsOpen] = useState(false);
  const { formatNumber } = NumberService;

  function onClose() {
    seIsOpen(false);
  }

  const rowsData = useMemo(
    () =>
      [
        ['0 - 5', '1'],
        ['5 - 40', '5'],
        ['40 - 100', '10'],
        [`100 - ${formatNumber(1000)}`, '25'],
        [`${formatNumber(1000)} - ${formatNumber(5000)}`, '50'],
        [`${formatNumber(5000)} - ${formatNumber(25000)}`, '100'],
        [`${formatNumber(25000)} - ${formatNumber(50000)}`, '250'],
        [`${formatNumber(50000)} - ${formatNumber(100000)}`, '500'],
        [`${formatNumber(100000)} - ${formatNumber(9999999)}`, formatNumber(1000)],
      ].map((item) => [{ content: item[0] }, { content: item[1] }]),
    [],
  );

  return (
    <>
      <ButtonLink
        className={classes.cta}
        label={intl.formatMessage({ id: 'lotPage.bidInformation.incrementalBidGuidelines' })}
        onClick={() => seIsOpen(true)}
      />
      <ModalWindow isOpen={isOpen} onClose={onClose} width={640}>
        <ModalWindowHeader
          className={classes.header}
          title={intl.formatMessage({
            id: 'lotPage.bidInformation.incrementalBidGuidelines',
          })}
          onClose={onClose}
        />
        <ModalWindowBody hasFooter className={classes.body}>
          <>
            <div className="mb-10">
              {intl.formatMessage({
                id: 'lotPage.bidInformation.incrementalBidGuidelines.text1',
              })}
            </div>

            <ThemedTable
              className={classes.table}
              headData={[
                {
                  label: `${intl.formatMessage({
                    id: 'lotPage.bidInformation.incrementalBidGuidelines.bidRange',
                  })} $`,
                },
                {
                  label: `${intl.formatMessage({
                    id: 'lotPage.bidInformation.incrementalBidGuidelines.increment',
                  })} $`,
                },
              ]}
              bodyData={rowsData}
            />

            <div className="mt-10">
              <div>
                <strong>
                  {intl.formatMessage({
                    id: 'lotPage.bidInformation.incrementalBidGuidelines.text2',
                  })}
                </strong>
              </div>
              <div className="mt-10">
                {intl.formatMessage({
                  id: 'lotPage.bidInformation.incrementalBidGuidelines.text3',
                })}
              </div>
            </div>
          </>
        </ModalWindowBody>
      </ModalWindow>
    </>
  );
}

export default IncrementalBidGuidelinesLink;

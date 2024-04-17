/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import LotService from 'frontend/js/api/LotService';

function AuctionVerification({ lot, isUsa }) {
  const { lotCondition } = lot;
  const labelMapping = {
    [LotService.CONDITION_RUN_AND_DRIVE_CODE]: 'lotPage.details.auctionHighlights.runAndDrive',
    [LotService.CONDITION_ENGINE_START_PROGRAM_CODE]: 'lotPage.details.auctionHighlights.engineStartProgram',
    [LotService.CONDITION_ENHANCED_VEHICLES_CODE]: 'lotPage.details.auctionHighlights.enhancedVehicles',
  };
  const showTooltip =
    [LotService.CONDITION_ENGINE_START_PROGRAM_CODE, LotService.CONDITION_ENHANCED_VEHICLES_CODE].includes(
      lotCondition,
    ) ||
    (LotService.CONDITION_RUN_AND_DRIVE_CODE === lotCondition && !isUsa);

  let tooltipValue;
  switch (lotCondition) {
    case LotService.CONDITION_RUN_AND_DRIVE_CODE:
      tooltipValue = 'lotPage.details.auctionHighlights.tooltip.verified';
      break;
    case LotService.CONDITION_ENHANCED_VEHICLES_CODE:
      tooltipValue = 'lotPage.details.auctionHighlights.tooltip.enhancedVehicles';
      break;
    default:
      tooltipValue = 'lotPage.details.auctionHighlights.tooltip.starts';
  }

  return (
    <>
      {labelMapping[lotCondition] && <FormattedMessage id={labelMapping[lotCondition]} />}

      {showTooltip && (
        <TooltipOnHover
          maxWidth={320}
          badgeTop={-1}
          isFlipEnabled={false}
          content={
            <FormattedMessage
              id={tooltipValue}
              values={{
                br: <br />,
                title: (chunks) => <div className="fw-7 mb-15">{chunks}</div>,
                type: (chunks) => (
                  <div className="fw-3 tt-u mb-5 mt-20" style={{ padding: [[8, 12]], backgroundColor: '#E8D88A' }}>
                    {chunks}
                  </div>
                ),
              }}
            />
          }
        />
      )}
    </>
  );
}

export default AuctionVerification;

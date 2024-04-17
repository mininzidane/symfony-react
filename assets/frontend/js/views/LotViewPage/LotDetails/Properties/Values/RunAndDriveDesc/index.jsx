import React from 'react';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import ButtonLink from 'frontend/js/components/ButtonLink';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useStyles from './useStyles';

function RunAndDriveDesc() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {`According to the auction, at inventory, the vehicle was "Run & Drive" meaning the vehicle started, was put into
      gear, and moved forward under its own power. There is no guarantee, representation, or warranty that the vehicle
      runs and drives at the time of sale. `}

      <TooltipOnHover
        trigger={<ButtonLink label={<FormattedMessage id="shared.label.additionalInformation" />} />}
        className={classes.tooltip}
        placement="bottom"
        isFlipEnabled={false}
        content={
          <FormattedMessage
            id="lotPage.details.auctionHighlights.tooltip.verified"
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
    </div>
  );
}

export default RunAndDriveDesc;

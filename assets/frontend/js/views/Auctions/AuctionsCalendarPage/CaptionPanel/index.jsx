/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import CaptionPanel from 'frontend/js/views/Shared/PageSections/CaptionPanel';
import CalendarSvg from 'frontend/images/shared/light-blue-set/ic_calendar.svg';
import ViewModeContext from 'frontend/js/context/ViewModeContext';
import ViewModeToggler from 'frontend/js/components/ViewModeToggler';
import ButtonLink from 'frontend/js/components/ButtonLink';
import TabsToolbar from './TabsToolbar';
import useStyles from './useStyles';

function CaptionPanelSection({ auctionGroups, setHideTimes, hideTimes }) {
  const classes = useStyles();
  const { viewModeOptions, view, setView } = useContext(ViewModeContext);

  function handleUpdate(value) {
    if (viewModeOptions.GRID === value) {
      RouterService.removeQueryParams(['order', 'sort']);
    }
    setView(value);
  }

  return (
    <CaptionPanel
      label={<FormattedMessage id="auctionsCalendar" />}
      footer={<TabsToolbar auctionGroups={auctionGroups} />}
      icon={CalendarSvg}
      iconSize={{ width: 19, height: 16 }}
      extra={
        <div className={classes.viewMode}>
          {viewModeOptions.GRID === view && (
            <ButtonLink
              label={
                <FormattedMessage
                  id={hideTimes ? 'auctionsCalendar.cta.showTimes' : 'auctionsCalendar.cta.hideTimes'}
                />
              }
              isDashed
              onClick={() => setHideTimes(!hideTimes)}
              className={classes.hideTimesBtn}
            />
          )}
          <ViewModeToggler
            viewModeOptions={viewModeOptions}
            view={view}
            setView={handleUpdate}
            gridLabel={<FormattedMessage id="shared.label.calendar" />}
          />
        </div>
      }
      contentClassName={classes.panelContent}
      fullscreen
      isUltraWide
    />
  );
}

export default CaptionPanelSection;

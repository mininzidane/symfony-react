/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import SwitchPlane from 'frontend/js/components/Form/Switch/SwitchPlane';
import AuctionService from 'frontend/js/api/AuctionService';
import { useFiltersContext } from 'frontend/js/views/SearchResultsPage/_Context/FiltersContext';
import NewlyAdded from 'frontend/js/views/SearchResultsPage/Sidebar/Accordion/ToggleSwitches/NewlyAdded';
import Label from './Label';
import useStyles from './useStyles';

function ToggleSwitches() {
  const classes = useStyles();
  const [{ filters, refinements, dispatch }] = useFiltersContext();

  const sections = ['auction_select', 'exclude_upcoming', 'watchlist_inventory', 'newly_added'];

  if (!filters || !sections.some((section) => filters[section])) {
    return null;
  }

  function handleChange(values) {
    const eventTrackingService = new EventTrackingService();
    eventTrackingService.sendEvent({
      step: 'abm_carfinder_filters',
      substep: `${values.section}_block_click`,
    });

    dispatch({
      type: 'REFINE',
      payload: {
        type: 'SWITCH',
        ...values,
      },
    });
  }

  function isSelected(section) {
    return refinements.some((v) => v.section === section && v.value);
  }

  const auctionsSectionId = 'auction';
  const isCopartUsaSelected = refinements.some(
    (v) => v.section === auctionsSectionId && v.value === AuctionService.SRP_FILTER_AUCTIONS.COPART_USA,
  );
  const shouldAuctionSelectHidden = isSelected(auctionsSectionId) && !isCopartUsaSelected;

  return (
    <div className={classes.root}>
      {sections.map((section) => {
        const isAuctionSelect = section === 'auction_select';
        const isNewlyAdded = section === 'newly_added';

        if (!filters[section]?.values?.all || (isAuctionSelect && shouldAuctionSelectHidden)) {
          return null;
        }

        const filter = filters[section].values.all;
        const label = Array.isArray(filter) ? filter[0].label : filter.label;

        if (isNewlyAdded) {
          return <NewlyAdded section={section} options={filter} dispatch={dispatch} key={section} />;
        }

        return (
          <div className={classes.switch} key={section}>
            <Label content={label} isAuctionSelect={isAuctionSelect} />

            <SwitchPlane
              className="tt-u"
              isChecked={isSelected(section)}
              onChange={(value) =>
                handleChange({
                  section,
                  label,
                  value,
                })
              }
            />
          </div>
        );
      })}
    </div>
  );
}

export default ToggleSwitches;

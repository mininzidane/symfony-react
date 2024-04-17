import React from 'react';
import ReactDOM from 'react-dom';
import { useQuery } from 'react-query';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import useEventListener from 'backend/js/hooks/useEventListener';
import InstantOfferService from 'backend/js/api/InstantOfferService';
import RouterService from 'backend/js/api/RouterService';
import useStyles from './useStyles';

function InstantOfferTabs({ active, options }) {
  const params = RouterService.getCurrentQueryParams();
  if (params.page) {
    params.page = 1;
  }

  const classes = useStyles();
  const { data, refetch } = useQuery('instant_offer_tabs', () => new InstantOfferService().getTabsOverview(params));

  useEventListener('update_instant_offer_tabs', refetch);

  const getCount = (tab) => {
    const key = tab.replace(/_/g, ' ').toUpperCase();
    const counts = data?.tabs || [];

    const tabInfo = counts.find((v) => v.name === key);

    return tabInfo?.count || 0;
  };

  return ReactDOM.createPortal(
    <div className={classnames(classes.root)}>
      <div className={classes.tabs}>
        {options.map((tab) => (
          <a
            key={tab}
            className={classnames(classes.tab, active === tab && 'active')}
            href={`?${RouterService.serializeQueryParams({ ...params, ...{ instant_offer_tabs: tab } })}`}
          >
            {tab.replace(/_/g, ' ')} [{getCount(tab)}]
          </a>
        ))}
      </div>
    </div>,
    document.getElementById('instant-offer-tabs'),
  );
}

InstantOfferTabs.propTypes = {
  active: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default InstantOfferTabs;

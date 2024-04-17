import React from 'react';
import classnames from 'classnames';
import RouterService from 'backend/js/api/RouterService';
import useConsignmentContext from '../_Context/useConsignmentContext';
import useStyles from './useStyles';

function ConsignmentTabs() {
  const classes = useStyles();
  const { tabs, activeTab, changeTab, initialized, loading } = useConsignmentContext();

  function handleChangeTab(event, tab) {
    event.preventDefault();
    changeTab(tab);
  }

  if (!initialized && loading) {
    return null;
  }

  return (
    <div className={classnames(classes.root)}>
      <div className={classes.tabs}>
        {tabs?.map((tab) => (
          <a
            key={tab.key}
            className={classnames(classes.tab, activeTab === tab.key && 'active')}
            href={RouterService.getRoute('consignment', { tab: tab.key, page: 1 })}
            onClick={(e) => handleChangeTab(e, tab.key)}
          >
            {tab.name.toLowerCase()} [{tab.count}]
          </a>
        ))}
      </div>
    </div>
  );
}

export default ConsignmentTabs;

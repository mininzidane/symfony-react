import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useStyles from './useStyles';

function TabsSimple({ tabs, activeTab, onTabChange, className }) {
  const classes = useStyles();

  return (
    <div>
      <Tabs
        value={activeTab}
        onChange={onTabChange}
        aria-label="Tabs"
        className={className}
        classes={{
          root: classes.tabs,
          flexContainer: classes.tabsFlexContainer,
        }}
        TabIndicatorProps={{
          classes: {
            root: classes.indicator,
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            label={tab.label}
            value={tab.value}
            disableFocusRipple
            disableRipple
            key={index}
            classes={{
              root: classes.tab,
              selected: classes.selected,
            }}
          />
        ))}
      </Tabs>
    </div>
  );
}

TabsSimple.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node,
      value: PropTypes.string,
    }),
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

TabsSimple.defaultProps = {
  className: '',
};

export default TabsSimple;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TabsContext from '../Context';

function TabsContainer({ tab, defaultTab, children, onChange }) {
  const [currentTab, setCurrentTab] = useState(defaultTab);

  function handleChange(value) {
    setCurrentTab(value);
    onChange(value);
  }

  return (
    <TabsContext.Provider value={{ tab: tab !== undefined ? tab : currentTab, setTab: handleChange }}>
      {children}
    </TabsContext.Provider>
  );
}

TabsContainer.propTypes = {
  tab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

TabsContainer.defaultProps = {
  tab: undefined,
  defaultTab: 0,
  onChange: () => {},
};

export default TabsContainer;

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MuiTabs from '@material-ui/core/Tabs';
import TabScrollButton from '@material-ui/core/TabScrollButton';
import TabsContext from '../Context';
import useStyles from './useStyles';

function TabsToolbar({ className, indicatorClassName, children, ...props }) {
  const classes = useStyles(props);
  const { tab, setTab } = useContext(TabsContext);

  return (
    <MuiTabs
      variant="scrollable"
      scrollButtons="on"
      {...props}
      value={tab}
      onChange={(_, value) => setTab(value)}
      aria-label="Tabs"
      className={classnames(classes.root, className)}
      classes={{
        flexContainer: classes.flexContainer,
        scroller: classes.scroller,
      }}
      ScrollButtonComponent={(tabScrollButtonProps) => (
        <TabScrollButton
          {...tabScrollButtonProps}
          className={classnames(classes.scrollButton, tabScrollButtonProps.visible && classes.scrollButtonVisible)}
          disableRipple
        />
      )}
      TabIndicatorProps={{
        classes: {
          root: classnames(classes.indicator, indicatorClassName),
        },
      }}
    >
      {children}
    </MuiTabs>
  );
}

TabsToolbar.propTypes = {
  className: PropTypes.string,
  indicatorClassName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

TabsToolbar.defaultProps = {
  className: '',
  indicatorClassName: '',
};

export default TabsToolbar;

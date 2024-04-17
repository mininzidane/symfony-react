import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import useStyles from './useStyles';

function Accordion(props) {
  const { children, className, animationDuration } = props;
  const classes = useStyles(props);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => {
    setExpanded(expanded === panel ? false : panel);
  };

  const handleExit = () => {
    if (expanded) {
      setTimeout(() => {
        if (ViewportService.isElementAboveHeader(document.getElementById(expanded))) {
          ScrollService.smoothScrollIntoViewById(expanded);
        }
      }, animationDuration);
    }
  };

  return (
    <div className={classNames(classes.root, className)}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          onExiting: handleExit,
          key: child.props.id,
          id: child.props.id,
          expanded: expanded === child.props.id,
          handleChange,
          animationDuration,
        }),
      )}
    </div>
  );
}

Accordion.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  className: PropTypes.string,
  animationDuration: PropTypes.number,
};

Accordion.defaultProps = {
  className: '',
  children: null,
  animationDuration: 300,
};

export default Accordion;

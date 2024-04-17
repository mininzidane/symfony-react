import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Collapse from '@material-ui/core/Collapse';
import useStyles from './useStyles';

const Item = memo(
  (props) => {
    const {
      id,
      expanded,
      handleChange,
      children,
      title,
      titleComponent,
      onExiting,
      animationDuration,
      expandIcon: ExpandIconComponent,
      rootClassName,
    } = props;
    const classes = useStyles(props);

    return (
      <div id={id} className={classNames(classes.root, { [classes.expanded]: expanded })}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div className={classes.header} onClick={() => handleChange(id)}>
          {titleComponent || <div className={classes.title}>{title}</div>}
          <ExpandIconComponent className={classes.arrow} />
        </div>
        <Collapse
          in={expanded}
          className={rootClassName}
          timeout={animationDuration}
          onExiting={onExiting}
          mountOnEnter
          unmountOnExit
        >
          <div className={classes.content}>{children}</div>
        </Collapse>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.expanded === nextProps.expanded && !nextProps.rerender,
);

Item.propTypes = {
  expanded: PropTypes.bool,
  id: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  rootClassName: PropTypes.string,
  onExiting: PropTypes.func,
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
  titleComponent: PropTypes.node,
  animationDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
  expandIcon: PropTypes.func,
};

Item.defaultProps = {
  title: null,
  titleComponent: null,
  rootClassName: '',
  expanded: false,
  handleChange: () => {},
  onExiting: () => {},
  animationDuration: 'auto',
  expandIcon: ($props) => (
    <svg viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...$props}>
      <path d="M0 0L0 8L4 4L0 0Z" fill="currentColor" />
    </svg>
  ),
};

export default Item;

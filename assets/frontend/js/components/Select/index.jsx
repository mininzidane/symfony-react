import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { MenuList, MenuItem } from '@material-ui/core';
import Popper from '../Popper';
import useStyles from './useStyles';

function Select(props) {
  const { options, onChange, selected, ...restProps } = props;
  const classes = useStyles(props);
  const popperRef = useRef();

  function handleChange(value) {
    onChange(value);
    popperRef.current.close();
  }

  return (
    <Popper {...restProps} classes={{ paper: classes.paper, popper: classes.popper }} ref={popperRef}>
      <MenuList autoFocusItem>
        {options.map(({ value, label }) => (
          <MenuItem
            className={classes.listItem}
            key={value}
            selected={selected === value}
            onClick={() => handleChange(value)}
          >
            {label}
          </MenuItem>
        ))}
      </MenuList>
    </Popper>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.object]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

Select.defaultProps = {
  options: [],
  onChange: () => {},
  selected: null,
};

export default Select;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import ArrowSvg from './img/arrow.svg';
import DropdownContent from './DropdownContent';
import useStyles from './useStyles';

function OfficeInfo({ data }) {
  const [bottomOffset, setBottomOffset] = useState(0);
  const classes = useStyles();
  const dropdownRef = useRef();
  const triggerRef = useRef();

  function handleMouseEnter() {
    const dropdownVerticalOffset = 17;
    const triggerBottom = triggerRef.current.getBoundingClientRect().bottom;
    const dropdownHeight = dropdownRef.current.getBoundingClientRect().height;
    const offset = window.innerHeight - (triggerBottom + dropdownHeight + dropdownVerticalOffset * 2);
    const isBelowBottomEdge = offset < 0;
    const shift = -1 * (dropdownHeight + dropdownVerticalOffset * 2 + 26);
    setBottomOffset(isBelowBottomEdge ? shift : 0);
  }

  return (
    <div className={classes.root}>
      <button type="button" className={classes.button} onMouseEnter={handleMouseEnter} ref={triggerRef}>
        <span className={classes.label}>
          <FormattedMessage id="shared.label.officeInfo" />
        </span>
        <img src={ArrowSvg} alt="arrow" className={classes.arrow} />
      </button>

      <div className={classes.dropdown} ref={dropdownRef} style={{ marginTop: bottomOffset }}>
        <DropdownContent data={data} />
      </div>
    </div>
  );
}

export default OfficeInfo;

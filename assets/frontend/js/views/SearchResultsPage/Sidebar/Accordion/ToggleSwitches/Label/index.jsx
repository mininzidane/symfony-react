/* eslint-disable react/prop-types */
import React from 'react';
import CopartSelectSvg from 'frontend/js/views/SearchResultsPage/Sidebar/Accordion/ToggleSwitches/img/copart-select.svg';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useStyles from './useStyles';

function Label({ content, isAuctionSelect }) {
  const classes = useStyles();

  return (
    <div>
      {isAuctionSelect ? (
        <>
          <img src={CopartSelectSvg} width={55} height={15} alt="Select" className={classes.selectLogo} />{' '}
          <FormattedMessage id="searchResultsPage.vehiclesOnly" />
        </>
      ) : (
        content
      )}
    </div>
  );
}

export default Label;

/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import useStyles from './useStyles';

function PrevNextControls({ data, onChange }) {
  const classes = useStyles();
  const showPrevButton = data.prevLot;
  const showNextButton = data.nextLot;

  function handlePrevClick() {
    onChange({ id: data.prevLot.id, auction: data.prevLot.inventoryAuction });

    const ga = new GoogleAnalyticsService();
    ga.sendEvent('tool_bar', 'lot_page', 'prev_lot');
  }

  function handleNextClick() {
    onChange({ id: data.nextLot.id, auction: data.nextLot.inventoryAuction });

    const ga = new GoogleAnalyticsService();
    ga.sendEvent('tool_bar', 'lot_page', 'next_lot');
  }

  return (
    <>
      {showPrevButton && (
        <button onClick={handlePrevClick} type="button" className={classes.button}>
          <svg
            className={classes.icon}
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.667 4.667H2.533L6.266 0.934L5.333 0L0 5.333L5.333 10.666L6.266 9.733L2.533 6H10.666V4.667H10.667Z" />
          </svg>

          <span>
            <FormattedMessage id="lotPage.modalGallery.prevLot" />
          </span>
        </button>
      )}
      {showNextButton && (
        <button onClick={handleNextClick} type="button" className={classes.button}>
          <span>
            <FormattedMessage id="lotPage.modalGallery.nextLot" />
          </span>

          <svg
            className={classes.icon}
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.433827 5.99902L8.49094 5.99902L4.79323 9.73202L5.71741 10.666L11 5.33302L5.71741 1.52588e-05L4.79323 0.933016L8.49094 4.66602L0.434817 4.66602L0.433827 5.99902Z" />
          </svg>
        </button>
      )}
    </>
  );
}

export default PrevNextControls;

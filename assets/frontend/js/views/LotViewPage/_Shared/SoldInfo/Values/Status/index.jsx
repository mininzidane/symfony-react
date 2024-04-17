import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';

function Status({ value }) {
  const intl = useIntl();

  const style = {};
  let val;
  switch (value) {
    case 'Sold':
      val = intl.formatMessage({ id: 'lotPage.saleInfo.sold' });
      style.color = '#B00000';
      break;
    case 'Upcoming Lot':
      val = intl.formatMessage({ id: 'lotPage.saleInfo.upcomingLot' });
      break;
    case 'Future Sale':
      val = intl.formatMessage({ id: 'lotPage.saleInfo.futureSale' });
      break;
    case 'Not Sold':
      val = intl.formatMessage({ id: 'lotPage.saleInfo.notSold' });
      break;
    default:
      val = value;
  }

  return <div style={style}>{val}</div>;
}

Status.propTypes = {
  value: PropTypes.string,
};

Status.defaultProps = {
  value: null,
};

export default Status;

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';

const staticKeysMap = {
  descriptionA: 'dynamic.saleStatus.descriptionA',
  descriptionlot_sold: 'dynamic.saleStatus.descriptionlot_sold',
  descriptionM: 'dynamic.saleStatus.descriptionM',
  descriptionno_reserve: 'dynamic.saleStatus.descriptionno_reserve',
  descriptionon_reserve: 'dynamic.saleStatus.descriptionon_reserve',
  descriptionP: 'dynamic.saleStatus.descriptionP',
  lot_sold: 'dynamic.saleStatus.lot_sold',
  no_reserve: 'dynamic.saleStatus.no_reserve',
  not_applicable: 'dynamic.saleStatus.not_applicable',
  on_approval: 'dynamic.saleStatus.on_approval',
  on_minimum_bid: 'dynamic.saleStatus.on_minimum_bid',
  on_reserve: 'dynamic.saleStatus.on_reserve',
  pure_sale: 'dynamic.saleStatus.pure_sale',
};

const SalesStatusFormattedMessage = ({ salesStatus }) => (
  <FormattedMessage id={staticKeysMap[salesStatus] || salesStatus} />
);

SalesStatusFormattedMessage.propTypes = {
  salesStatus: PropTypes.string.isRequired,
};

export default memo(SalesStatusFormattedMessage);

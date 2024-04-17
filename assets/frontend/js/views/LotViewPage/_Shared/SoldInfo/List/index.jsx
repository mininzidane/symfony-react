import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import Date from '../Values/Date';
import FinalBid from '../Values/FinalBid';
import Seller from '../Values/Seller';
import LotId from '../Values/LotId';
import Value from '../Values/Value';
import Status from '../Values/Status';
import Row from './Row';

function SoldInfoList({
  className,
  date,
  lotId,
  seller,
  finalBid,
  odometer,
  requireDeposit,
  requireUpgrade,
  status,
  auction,
}) {
  return (
    <div className={className}>
      <Row label={<FormattedMessage id="shared.label.date" />} value={<Date value={date} />} />
      <Row label={<FormattedMessage id="shared.label.lotId" />} value={<LotId id={lotId} auction={auction} />} />
      <Row
        label={<FormattedMessage id="lotPage.soldInfo.finalBid" />}
        value={<FinalBid value={finalBid} requireDeposit={requireDeposit} requireUpgrade={requireUpgrade} />}
      />
      <Row
        label={<FormattedMessage id="lotPage.soldInfo.odometer" />}
        value={<Value value={odometer ? `${odometer} mi` : '0'} />}
      />
      <Row label={<FormattedMessage id="lotPage.soldInfo.status" />} value={<Status value={status} />} />
      <Row
        label={<FormattedMessage id="shared.label.seller" />}
        value={<Seller value={seller} requireDeposit={requireDeposit} requireUpgrade={requireUpgrade} />}
      />
    </div>
  );
}

SoldInfoList.propTypes = {
  className: PropTypes.string,
  date: PropTypes.string,
  lotId: PropTypes.number,
  seller: PropTypes.string,
  finalBid: PropTypes.number,
  odometer: PropTypes.number,
  requireDeposit: PropTypes.bool,
  requireUpgrade: PropTypes.bool,
  status: PropTypes.string,
  auction: PropTypes.string,
};

SoldInfoList.defaultProps = {
  className: '',
  date: '',
  lotId: '',
  seller: '',
  finalBid: 0,
  odometer: '',
  requireDeposit: false,
  requireUpgrade: false,
  status: '',
  auction: '',
};

export default SoldInfoList;

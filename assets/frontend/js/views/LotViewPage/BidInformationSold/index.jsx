import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';

import LotShape from 'frontend/js/lib/propshapes/LotShape';

import Card from '../LotPageCard';
import CardIndentedContent from '../LotPageCard/CardIndentedContent';
import LotPageBlock from '../LotPageBlock';
import Status from './Status';
import Cta from './Cta';

function BidInformationSold({ lot, ymmSearchLink }) {
  const intl = useIntl();

  return (
    <LotPageBlock>
      <Card
        id="lot-page-bid-info-card"
        title={intl.formatMessage({
          id: 'lotPage.bidInformation.title',
          defaultMessage: 'Bid Information',
        })}
      >
        <CardIndentedContent>
          <Status />
          <Cta lotDescription={lot.description} ymmSearchLink={ymmSearchLink} />
        </CardIndentedContent>
      </Card>
    </LotPageBlock>
  );
}

BidInformationSold.propTypes = {
  lot: LotShape,
  ymmSearchLink: PropTypes.string,
};

BidInformationSold.defaultProps = {
  lot: null,
  ymmSearchLink: '',
};

export default BidInformationSold;

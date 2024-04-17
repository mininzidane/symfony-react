/* eslint-disable react/prop-types */
import React from 'react';
import Button from 'frontend/js/components/Button';
import DividedLine from 'frontend/js/components/DividedLine';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import RouterService from 'frontend/js/api/RouterService';
import WatchlistControlOutlined from 'frontend/js/views/Shared/WatchlistControlOutlined';
import get from 'lodash/get';
import useIntl from 'frontend/js/hooks/useIntl';
import SaleLocation from 'frontend/js/views/LotViewPage/Headline/SaleLocation';
import Offsite from 'frontend/js/views/LotViewPage/Headline/Offsite';
import Sublot from 'frontend/js/views/LotViewPage/Headline/Sublot';
import SaleDate from 'frontend/js/views/LotViewPage/Headline/SaleDate';
import useHeadlineStyles from 'frontend/js/views/LotViewPage/Headline/useStyles';
import useWatchlist from 'frontend/js/hooks/useWatchlist';
import Title from './Title';
import useStyles from './useStyles';

function PreviewModalHeader({ lot, onViewDetailsClick, onWatchlistButtonClick }) {
  const headlineClasses = useHeadlineStyles();
  const classes = useStyles();
  const { description, id, slug, subLotInfo, lane, item, saleStartAt, saleDate, inventoryAuction, searchHash } = lot;
  const href = RouterService.getRoute(
    'lot',
    {
      searchHash,
    },
    false,
    { id, slug },
  );
  const intl = useIntl();
  const hasLaneAndItem = Boolean(lane) && Boolean(item);
  const hasGridRow = Boolean(lot.gridRow);
  const hasLaneOrGrid = hasLaneAndItem || hasGridRow;
  const { isActive, isTogglePossible, handleWatchlistClick } = useWatchlist(lot);

  const translationSets = {
    lotId: intl.formatMessage({ id: 'shared.label.lotId' }),
    saleLocation: intl.formatMessage({ id: 'shared.label.saleLocation' }),
    saleDate: intl.formatMessage({ id: 'shared.label.saleDate' }),
    headTextEnding: intl.formatMessage({ id: 'shared.label.headTextEnding' }),
    headTextEndingUS: 'for Sale',
    futureSale: intl.formatMessage({ id: 'lotPage.saleInfo.futureSale' }),
    upcomingLot: intl.formatMessage({ id: 'lotPage.saleInfo.upcomingLot' }),
    futureSaleTooltip: intl.formatMessage({ id: 'lotPage.saleInfo.expected.tooltip' }),
  };

  function handleWatchlistButtonClick() {
    handleWatchlistClick();
    onWatchlistButtonClick();
  }

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <Title text={description} />

        <div className={classes.details}>
          <DividedLine>
            <div>
              {translationSets.saleLocation}
              &nbsp;
              <SaleLocation lot={lot} />
            </div>

            {hasLaneOrGrid && (
              <div>
                {hasLaneAndItem && `${lane}/${item}`}
                {hasLaneAndItem && hasGridRow && '/'}
                {hasGridRow && `${lot.gridRow}`}
              </div>
            )}

            {get(lot, 'offsite.pickup') && (
              <div className={headlineClasses.offsite}>
                <Offsite offsite={get(lot, 'offsite.pickup')} />
              </div>
            )}

            {subLotInfo && (
              <div className={headlineClasses.sublot}>
                <Sublot subLotInfo={subLotInfo} />
              </div>
            )}

            {Boolean(saleStartAt || !saleDate) && <SaleDate lot={lot} />}
          </DividedLine>
        </div>
      </div>

      <div className={classes.controls}>
        {isTogglePossible && (
          <WatchlistControlOutlined
            id={id}
            auction={inventoryAuction}
            isActive={isActive}
            onTriggerClick={handleWatchlistButtonClick}
            hasSnackbarLink={false}
            isBorderedIcon
            hasLabel
            isMd
          />
        )}

        <Button
          href={href}
          label={<FormattedMessage id="shared.cta.viewLotFullDetails" />}
          isShadowless
          onClick={onViewDetailsClick}
          className={classes.button}
        />
      </div>
    </div>
  );
}

export default PreviewModalHeader;

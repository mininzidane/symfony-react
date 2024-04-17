/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import t from 'frontend/js/api/TranslatorService';
import AdaptiveTable from 'frontend/js/components/Table/AdaptiveTable';
import RouterService from 'frontend/js/api/RouterService';
import Link from 'frontend/js/components/Link';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Button from 'frontend/js/components/Button';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import ButtonLink from 'frontend/js/components/ButtonLink';
import useStyles from '../useStyles';
import NotAvailableInfo from '../NotAvailableInfo';

function TodayAuctionsTable({ location }) {
  const { activeAuctions = [] } = location;
  const classes = useStyles();
  const LIST_LENGTH_LIMIT = 2;
  const [isFullListDisplayed, setIsFullListDisplayed] = useState(false);

  function getLaneData(lane, auction, isLive) {
    return [
      {
        content: <>{auction.startedAt && DateTimeService.toLocaleTime(auction.startedAt)}</>,
      },
      { content: lane.lane },
      { content: lane.totalItems },
      {
        content: (
          <Link
            href={RouterService.getRoute('searchResultsLocation', null, false, {
              slug: location.slug,
            })}
          >
            {location.name}
          </Link>
        ),
      },
      {
        content: isLive ? (
          <Button
            size="sm"
            color="green"
            className={classes.tableButton}
            label={<FormattedMessage id="locationDetailsPage.auctions.card.joinAuction" />}
            href={RouterService.getRoute('joinAuctions', { id: location.id, lane: lane.lane })}
          />
        ) : (
          <>
            <Button
              size="sm"
              color="blue"
              className={classes.tableButton}
              label={<FormattedMessage id="locationDetailsPage.auctionsTabel.viewSaleList" />}
              href={RouterService.getRoute('searchResultsAuctionDate', null, false, {
                slug: location.slug,
                date: auction.date
                  ? DateTimeService.format(DateTimeService.parseDateInLocalTimezone(auction.date), 'yyyyMMdd')
                  : new Date().toISOString().slice(0, 10).replaceAll('-', ''),
              })}
            />
          </>
        ),
        style: { width: 200 },
      },
    ];
  }

  const live = activeAuctions.map((a) => a.liveLanes.map((lane) => getLaneData(lane, a, true))).flat();
  const later = activeAuctions.map((a) => a.laterLanes.map((lane) => getLaneData(lane, a, false))).flat();
  const bodyData = [...live, ...later];

  return (
    <div>
      <div className={classes.captionGrid}>
        <FormattedMessage id="header.main_menu.todays_auctions" className={classes.subCaption} />

        {bodyData.length > LIST_LENGTH_LIMIT && (
          <ButtonLink
            label={<FormattedMessage id={isFullListDisplayed ? 'shared.cta.showLess' : 'shared.cta.showMore'} />}
            onClick={() => setIsFullListDisplayed(!isFullListDisplayed)}
            className={classes.captionToggle}
          />
        )}
      </div>

      {bodyData.length > 0 ? (
        <AdaptiveTable
          isGrayStyle
          isHoverable={false}
          headData={[
            {
              label: t('shared.label.time'),
            },
            {
              label: t('shared.label.lane'),
            },
            {
              label: t('todayAuctions.items'),
            },
            {
              label: t('shared.label.location'),
            },
            {
              label: t('shared.label.action'),
            },
          ]}
          bodyData={bodyData.slice(0, isFullListDisplayed ? Infinity : LIST_LENGTH_LIMIT)}
          mobileClassName={classes.mobileWrap}
        />
      ) : (
        <NotAvailableInfo
          message={
            <FormattedMessage
              id="locationDetailsPage.aucitons.today.notAvailable"
              values={{
                a: (chunk) => (
                  <Link href={RouterService.getRoute('searchResultsLocation', null, false, { slug: location.slug })}>
                    {chunk}
                  </Link>
                ),
              }}
            />
          }
        />
      )}
    </div>
  );
}

export default TodayAuctionsTable;

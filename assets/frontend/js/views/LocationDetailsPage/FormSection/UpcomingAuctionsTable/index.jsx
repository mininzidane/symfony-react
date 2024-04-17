/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import t from 'frontend/js/api/TranslatorService';
import AdaptiveTable from 'frontend/js/components/Table/AdaptiveTable';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import RouterService from 'frontend/js/api/RouterService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import Button from 'frontend/js/components/Button';
import ButtonLink from 'frontend/js/components/ButtonLink';
import useStyles from '../useStyles';
import NotAvailableInfo from '../NotAvailableInfo';

function UpcomingAuctionsTable({ location }) {
  const { upcomingAuctions = [] } = location;
  const LIST_LENGTH_LIMIT = 2;
  const [isFullListDisplayed, setIsFullListDisplayed] = useState(false);
  const classes = useStyles();

  function getAuctionData(auction) {
    return [
      { content: auction.startedAt && DateTimeService.toLocaleDate(auction.startedAt) },
      { content: auction.startedAt && DateTimeService.toLocaleTime(auction.startedAt) },
      {
        content: (
          <Button
            size="sm"
            color="blue"
            label={<FormattedMessage id="locationDetailsPage.auctionsTabel.viewSaleList" />}
            className={classes.tableButton}
            href={RouterService.getRoute('searchResultsAuctionDate', null, false, {
              slug: location.slug,
              date: DateTimeService.format(DateTimeService.parseDateInLocalTimezone(auction.startedAt), 'yyyyMMdd'),
            })}
          />
        ),
        style: { width: 200 },
      },
    ];
  }

  const bodyData = upcomingAuctions.map((auction) => getAuctionData(auction));

  return (
    <div>
      <div className={classes.captionGrid}>
        <FormattedMessage id="locationDetailsPage.upcomingAuctions.subtitle" className={classes.subCaption} />

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
          mobileClassName={classes.mobileWrap}
          headData={[
            {
              label: t('shared.label.date'),
            },
            {
              label: t('shared.label.time'),
            },
            {
              label: t('shared.label.action'),
            },
          ]}
          bodyData={bodyData.slice(0, isFullListDisplayed ? Infinity : LIST_LENGTH_LIMIT)}
        />
      ) : (
        <NotAvailableInfo message={<FormattedMessage id="locationDetailsPage.auctions.noUpcomingAuctions" />} />
      )}
    </div>
  );
}

export default UpcomingAuctionsTable;

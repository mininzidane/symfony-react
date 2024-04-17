/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import get from 'lodash/get';
import LotService from 'frontend/js/api/LotService';
import useIntl from 'frontend/js/hooks/useIntl';
import LocationService from 'frontend/js/api/LocationService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import Button from 'frontend/js/components/Button';
import RouterService from 'frontend/js/api/RouterService';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import Link from 'frontend/js/components/Link';
import ClockSvg from 'frontend/images/shared/squared-blue-set/clock.svg';
import PinSvg from 'frontend/images/shared/squared-blue-set/pin.svg';
import PhoneSvg from 'frontend/images/shared/squared-blue-set/phone.svg';
import SearchSvg from 'frontend/images/shared/squared-blue-set/search.svg';
import PhoneLink from 'frontend/js/components/PhoneLink';
import useStyles from './useStyles';

function Content({ data, defaultLane, isCtaBlockHidden }) {
  const intl = useIntl();
  const classes = useStyles();
  const [lane, setLane] = useState(defaultLane || get(data, 'auction.liveLanes[0].lane'));

  if (!data) {
    return null;
  }

  const auction = get(data, 'auction', {});
  let auctionName = '';
  switch (auction) {
    case LotService.AUCTION_COPART:
    case LotService.AUCTION_COPART_DE:
      auctionName = LotService.AUCTION_COPART;
      break;
    case LotService.AUCTION_IAA:
      auctionName = LotService.AUCTION_IAA;
      break;
    case LotService.AUCTION_NPA:
      auctionName = LotService.AUCTION_NPA;
      break;
    default:
      auctionName = '';
  }
  const lanes = get(data, 'auction.liveLanes', []).map((v) => v.lane);
  const location = get(data, 'location', {});
  let locationName = location.name;
  if (locationName.split(' - ').length > 1) {
    locationName = `${locationName.split(' - ')[1]}`;
  }
  if (location.stateCode) {
    locationName += `, ${location.stateCode}`;
  }

  const isNCS = get(data, 'location.ncs', false);
  const auctionStartDate = new Date(get(data, 'auction.startedAt', new Date()));
  const auctionIsLive = auctionStartDate < new Date() && lanes.length > 0;
  const contactInfoIsAvailable = location.physical;
  const displayDirections = LocationService.SOURCE_ABM !== location.source;

  return (
    <>
      {!isCtaBlockHidden && (
        <>
          {auction ? (
            <div className={classes.auctionBlock}>
              {auctionIsLive ? (
                <>
                  <div className={classes.auctionStatus}>
                    <strong>
                      <FormattedMessage id="locationPopper.auctionInProgress" />
                    </strong>
                  </div>
                  <SelectPlane
                    id="lane"
                    name="lane"
                    isBold
                    label={intl.formatMessage({ id: 'locationPopper.lane' })}
                    value={lane}
                    options={lanes.map((v) => ({ label: v, value: v }))}
                    onChange={(_, value) => setLane(value)}
                    onBlur={() => {}}
                  />
                  <Button
                    onClick={() => {
                      RouterService.customRedirect(RouterService.getRoute('joinAuctions', { id: location.id, lane }));
                    }}
                    isDisabled={!lanes.includes(lane)}
                    className="mt-15"
                    color="green"
                    label={intl.formatMessage({ id: 'locationPopper.joinSale' })}
                  />
                </>
              ) : (
                <>
                  <div className={classes.auctionStatus}>
                    <strong>
                      <FormattedMessage id="locationPopper.nextAuction" />:
                    </strong>
                    &nbsp;
                    <span>{DateTimeService.toLocaleTime(new Date(auction.startedAt))}</span>
                  </div>
                  {auction.startedAt && (
                    <Button
                      label={intl.formatMessage({ id: 'locationPopper.viewInventory' })}
                      href={RouterService.getRoute('searchResultsAuctionDate', null, false, {
                        slug: location.slug,
                        date: DateTimeService.format(
                          DateTimeService.parseDateInLocalTimezone(auction.startedAt),
                          'yyyyMMdd',
                        ),
                      })}
                    />
                  )}
                </>
              )}
            </div>
          ) : (
            <div className={classes.auctionBlock}>
              <Button
                label={intl.formatMessage({ id: 'locationPopper.viewInventory' })}
                href={RouterService.getRoute('searchResultsAuctionDate', null, false, {
                  slug: location.slug,
                  date: '',
                })}
              />
            </div>
          )}
        </>
      )}

      {isNCS && (
        <div className="text-gray text-md mt-20">
          <div className="text-black fw-7">
            <FormattedMessage id="locationPopper.ncs.title" />
          </div>
          <div className="mt-10">
            <FormattedMessage id="locationPopper.ncs.description" />
          </div>
        </div>
      )}

      {!isNCS && contactInfoIsAvailable && (
        <div className="mt-20 pt-2">
          <div className={classes.contact}>
            <img src={PinSvg} width={18} height={18} className="mt-1" alt="address" />

            <div>
              <div className={classnames(classes.contactText, 'is-address')}>
                {location.address}
                <br />
                {location.city}, {location.stateCode} {location.zip}
              </div>

              {displayDirections && (
                <div className={classes.contactText}>
                  <a
                    href={`http://maps.google.com/maps?saddr=My+location&daddr=${location.address} ${location.city} ${location.stateCode} ${location.zip}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <FormattedMessage id="locationPopper.directions" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {locationName && (
            <div className={classes.contact}>
              <img src={SearchSvg} width={18} height={18} alt="location" />

              <div className={classes.contactText}>
                <Link
                  href={RouterService.getRoute('searchResultsLocation', null, false, { slug: location.slug })}
                  isTargetBlank
                >
                  {auctionName} {locationName}
                </Link>
              </div>
            </div>
          )}

          {Boolean(location.phone) && (
            <div className={classes.contact}>
              <img src={PhoneSvg} width={18} height={18} alt="phone" />
              <div className={classes.contactText}>
                <PhoneLink phone={location.phone} />
              </div>
            </div>
          )}

          {Boolean(location.officeHours) && (
            <div className={classes.contact}>
              <img src={ClockSvg} width={18} height={18} alt="clock" />
              <div className={classes.contactText}>{location.officeHours}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Content;

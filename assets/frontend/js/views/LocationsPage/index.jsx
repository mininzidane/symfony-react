import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Button from 'frontend/js/components/Button';
import Directory from 'frontend/js/views/Support/ContactUsPage/Directory';
import BootstrapService from 'frontend/js/api/BootstrapService';
import AuctionService from 'frontend/js/api/AuctionService';
import LotService from 'frontend/js/api/LotService';
import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';
import useIntl from 'frontend/js/hooks/useIntl';
import Link from 'frontend/js/components/Link';
import RouterService from 'frontend/js/api/RouterService';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import LocationService from 'frontend/js/api/LocationService';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';
import ButtonLink from 'frontend/js/components/ButtonLink';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import GooglePlaceService from 'frontend/js/lib/utils/GooglePlaceService';
import LocationCards from '../Shared/LocationsCards';
import Map from './Map';
import LocationSuggestions from './LocationSuggestions';
import useStyles from './useStyles';
import AllLocations from './AllLocations';
import Bullets from './Bullets';
import Promo from './Promo';
import useLocationsByCoordinates from './useLocationsByCoordinates';
import useAllAuctionLocations from './useAllAuctionLocations';
import useNearLocations from './useNearLocations';

const ChangeLocationPopupLazy = React.lazy(() => import('./ChangeLocationPopup'));

const Page = () => {
  const [queryLocation, setQueryLocation] = useState('');
  const [activeLocation, setActiveLocation] = useState(null);
  const [isToggled, setToggle] = useState(true);
  const [isOpened, setOpen] = useState(false);
  const isAvailableAuctionCopartDe = BootstrapService.isAvailableAuction(AuctionService.AUCTIONS.COPART_DE);
  const { isAboveMd } = useBreakpoint();
  const intl = useIntl();
  const classes = useStyles();
  const { lat, lng, currentLocationSlug, setManualLocation } = useNearLocations();
  const auction = [LotService.AUCTION_COPART, isAvailableAuctionCopartDe ? LotService.AUCTION_COPART_DE : null]
    .filter(Boolean)
    .join(',')
    .toLowerCase();
  const allLocations = useAllAuctionLocations(auction);
  const { data: nearLocations } = useLocationsByCoordinates(auction, lat, lng);
  const { data: queryLocations } = useLocationsByCoordinates(
    auction,
    activeLocation?.map?.lat || activeLocation?.lat,
    activeLocation?.map?.lng || activeLocation?.lng,
  );
  const [nearestLocation = {}] = nearLocations;
  const nearestLocationData = {
    href: RouterService.getRoute('locationView', null, false, { slug: nearestLocation.slug }),
    label: [nearestLocation?.state, nearestLocation?.city].filter(Boolean).join(' - '),
  };

  const officeLocations = OfficeLocationsService.getOfficeLocations();

  const inputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (activeLocation) {
      setQueryLocation(
        LocationService.formatCityStateZip(activeLocation.city, activeLocation.state_code, activeLocation.zip),
      );

      inputRef.current.blur();
    }
  }, [activeLocation]);

  const handleSubmitSearchForm = async (suggest) => {
    if (queryLocation && suggest) {
      setActiveLocation(suggest);
    } else {
      try {
        const googlePlaceService = new GooglePlaceService();
        const res = await googlePlaceService.geocode(queryLocation);

        if (res) {
          const location = res.results?.[0];
          const { lon, ...formattedLocation } = googlePlaceService.formatSelectedLocationForUserLocation(location);

          setActiveLocation({
            ...formattedLocation,
            lng: lon,
            formattedAddress: location.formatted_address,
          });
        }
      } catch (e) {
        const notFound = {
          city: queryLocation,
        };

        setActiveLocation(notFound);
      }
    }
  };

  return (
    <>
      <div>
        <ContainerFullScreen className={classes.formContainer}>
          <div className={classes.searchFormContainer}>
            <h1 className={classes.title}>
              <FormattedMessage id="locationsPage.title" />
            </h1>
            <form className={classes.form} ref={formRef}>
              <div className={classes.formGroup}>
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={classes.searchIcon}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.437 10.064h-.727l-.252-.25a5.917 5.917 0 001.435-3.867 5.947 5.947 0 10-5.947 5.946 5.914 5.914 0 003.865-1.433l.252.251v.725L14.636 16 16 14.636l-4.563-4.572zm-5.49 0a4.114 4.114 0 01-4.12-4.118 4.118 4.118 0 114.12 4.118z"
                    fill="#828282"
                  />
                </svg>
                <InputPlane
                  id="location"
                  name="off"
                  className={classes.formInput}
                  placeholder={intl.formatMessage({ id: 'locationsPage.searchLabel' })}
                  value={queryLocation}
                  onChange={(_, value) => setQueryLocation(value)}
                  inputRef={inputRef}
                />
              </div>
              <SuspenseWrap init={queryLocation.length > 1} fallback={null}>
                <LocationSuggestions
                  locations={allLocations}
                  query={queryLocation}
                  handleSuggestionClick={handleSubmitSearchForm}
                  formRef={formRef}
                />
              </SuspenseWrap>
            </form>
            <FormattedMessage
              id="locationsPage.search.hint"
              values={{
                location: <Link href={nearestLocationData.href}>{nearestLocationData.label}</Link>,
              }}
              className={classes.formDesc}
            />
          </div>
        </ContainerFullScreen>
        {isAboveMd && (
          <Map locations={allLocations} activeMarkerName={queryLocations?.[0]?.name || nearestLocation?.name} />
        )}
      </div>
      {activeLocation && (
        <div>
          {queryLocations.length > 0 ? (
            <LocationCards
              locations={queryLocations.slice(0, 4)}
              title={
                <FormattedMessage
                  id="locationsPage.search.title"
                  values={{
                    location: (
                      <strong>
                        {LocationService.formatCityStateZip(
                          activeLocation.city,
                          activeLocation.state_code,
                          activeLocation.zip,
                        ) || activeLocation.formattedAddress}
                      </strong>
                    ),
                  }}
                  className={classes.h2}
                />
              }
            />
          ) : (
            <div className={classes.notFound}>
              <ContainerFullScreen>
                <FormattedMessage
                  id="locationsPage.search.title"
                  values={{
                    location: (
                      <strong>
                        {LocationService.formatCityStateZip(
                          activeLocation.city,
                          activeLocation.state_code,
                          activeLocation.zip,
                        )}
                      </strong>
                    ),
                  }}
                  className={classes.h2}
                />
                <FormattedMessage id="locationsPage.search.empty" className={classes.p} />
              </ContainerFullScreen>
            </div>
          )}
        </div>
      )}
      <div>
        <ContainerFullScreen>
          <FormattedMessage id="locationsPage.desc" className={classes.desc} />
          <div className={classes.btnGroup}>
            <Button
              label={<FormattedMessage id="locationsPage.locations" />}
              className={classNames(!isToggled && classes.btnInverse)}
              isNowrap
              onClick={() => setToggle(true)}
            />

            <Button
              label={<FormattedMessage id="locationsPage.offices" />}
              className={classNames(isToggled && classes.btnInverse)}
              isNowrap
              onClick={() => setToggle(false)}
            />
          </div>
          {isToggled ? (
            <AllLocations locations={allLocations} />
          ) : (
            <Directory
              locations={officeLocations}
              className={classes.directory}
              classNameHead={classes.directoryHead}
              noTitle
            />
          )}
        </ContainerFullScreen>
      </div>
      <LocationCards
        title={
          <>
            <FormattedMessage id="locationsPage.near.title" className={classes.h2} />
            <FormattedMessage
              id="locationsPage.near.desc"
              values={{
                location: <ButtonLink onClick={() => setOpen(true)} label={currentLocationSlug} />,
              }}
            />
          </>
        }
        locations={nearLocations.slice(0, 5)}
      />

      <SuspenseWrap init={isOpened} fallback={null}>
        <ChangeLocationPopupLazy
          isOpened={isOpened}
          onClose={() => setOpen(false)}
          onResponse={(location) => {
            setManualLocation(location);
            setOpen(false);
          }}
        />
      </SuspenseWrap>

      <Bullets />
      <Promo />
    </>
  );
};

export default Page;

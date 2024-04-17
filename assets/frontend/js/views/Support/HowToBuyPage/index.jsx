import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import CountryService from 'frontend/js/api/CountryService';
import Container from 'frontend/js/components/Container';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import SearchIcon from 'frontend/images/shared/light-blue-set/ic_search.svg';
import MembershipIcon from 'frontend/images/shared/light-blue-set/ic_membership.svg';
import BuyerPowerIcon from 'frontend/images/shared/light-blue-set/ic_buyer_power.svg';
import CarFinderIcon from 'frontend/images/shared/light-blue-set/ic_car_finder.svg';
import FaqIcon from 'frontend/images/shared/light-blue-set/ic_faq.svg';
import BidsIcon from 'frontend/images/shared/light-blue-set/ic_bids.svg';
import LiveAuctionIcon from 'frontend/images/shared/light-blue-set/ic_live_auction.svg';
import PaymentsIcon from 'frontend/images/shared/light-blue-set/ic_payments.svg';
import LocationsIcon from 'frontend/images/shared/light-blue-set/ic_locations.svg';
import GeneralIcon from 'frontend/images/shared/light-blue-set/ic_general.svg';
import BuyerPowerService from 'frontend/js/api/BuyerPowerService';
import Link from 'frontend/js/components/Link';
import RouterService from 'frontend/js/api/RouterService';
import Amount from 'frontend/js/components/Amount';
import useStyles from './useStyles';
import InfoCard from './InfoCard';
import Note from './Note';
import Section from './Section';
import Images from './img';

function HowToBuyPage() {
  const intl = useIntl();
  const classes = useStyles();
  const DEMO_DEPOSIT_1 = 600;
  const DEMO_DEPOSIT_2 = 800;

  const isIntlPage = !CountryService.isUsa();
  const images = Images[CountryService.getUserCountryIso2()] || Images[CountryService.COUNTRIES.usa.iso2];

  let registerDesc = 'howToBuyPage.register.desc';
  let registerNote = 'howToBuyPage.register.note';
  let buyerPowerDesc = 'howToBuyPage.buyerPower.desc';
  let buyerPowerNote = 'howToBuyPage.buyerPower.note';
  let vehicleSearchNote = 'howToBuyPage.vehicleSearch.note';
  let liveBiddingNote = 'howToBuyPage.liveBidding.note';
  let documentationIntlDesc = 'howToBuyPage.documentation.intl.desc';
  let shippingIntlDesc = 'howToBuyPage.shipping.intl.desc';

  if (CountryService.isUserCountry('ukraine')) {
    liveBiddingNote = 'howToBuyPage.liveBidding.note.ukraine';
    shippingIntlDesc = 'howToBuyPage.shipping.intl.desc.ukraine';
    documentationIntlDesc = 'howToBuyPage.documentation.intl.desc.ukraine';
  } else if (CountryService.isUserCountry('nigeria')) {
    registerDesc = 'howToBuyPage.register.desc.nigeria';
    registerNote = null;
    vehicleSearchNote = 'howToBuyPage.vehicleSearch.note.nigeria';
    liveBiddingNote = 'howToBuyPage.liveBidding.note.nigeria';
    shippingIntlDesc = 'howToBuyPage.shipping.intl.desc.nigeria';
    documentationIntlDesc = 'howToBuyPage.documentation.intl.desc.nigeria';
  } else if (CountryService.isUserCountry('belarus')) {
    buyerPowerDesc = 'howToBuyPage.buyerPower.desc.belarus';
    buyerPowerNote = 'howToBuyPage.buyerPower.note.belarus';
    liveBiddingNote = 'howToBuyPage.liveBidding.note.belarus';
    shippingIntlDesc = 'howToBuyPage.shipping.intl.desc.belarus';
    documentationIntlDesc = 'howToBuyPage.documentation.intl.desc.belarus';
  }

  function getLinkData(route) {
    return {
      a: (chunks) => (
        <Link href={RouterService.getRoute(route)} isTargetBlank>
          {chunks}
        </Link>
      ),
    };
  }

  return (
    <Container className={classes.root}>
      <h1 className={classes.title}>{intl.formatMessage({ id: 'howToBuyPage.title' })}</h1>
      <p className={classes.subtitle}>{intl.formatMessage({ id: 'howToBuyPage.subtitle' })}</p>

      <InfoCard
        stepNumber="01"
        icon={MembershipIcon}
        title={intl.formatMessage({ id: 'howToBuyPage.register.title' })}
        img={{
          sm_x1: images['mobile/register.png'],
          sm_x2: images['mobile/register@2x.png'],
          xl_x1: images['desktop/register.png'],
          xl_x2: images['desktop/register@2x.png'],
        }}
      >
        <Section>
          <FormattedMessage id={registerDesc} values={getLinkData('register')} />
        </Section>
        {registerNote && !isIntlPage && (
          <Note>
            <FormattedMessage id={registerNote} />
          </Note>
        )}
      </InfoCard>

      <InfoCard
        stepNumber="02"
        icon={BuyerPowerIcon}
        title={intl.formatMessage({ id: 'howToBuyPage.buyerPower.title' })}
        img={{
          sm_x1: images['mobile/max-possible-bid.png'],
          sm_x2: images['mobile/max-possible-bid@2x.png'],
          xl_x1: images['desktop/max-possible-bid.png'],
          xl_x2: images['desktop/max-possible-bid@2x.png'],
        }}
      >
        <Section>
          <FormattedMessage
            id={buyerPowerDesc}
            values={{
              percentage: 100 / BuyerPowerService.depositToBuyerPowerRatio,
              minDeposit: <Amount value={BuyerPowerService.minDepositAmount} fontWeight={400} />,
              ...getLinkData('buyerPower'),
            }}
          />
        </Section>
        <Note>
          <FormattedMessage
            id={buyerPowerNote}
            values={{
              deposit1: <Amount value={DEMO_DEPOSIT_1} fontWeight={400} />,
              deposit2: <Amount value={DEMO_DEPOSIT_2} fontWeight={400} />,
              buyerPower1: (
                <Amount value={DEMO_DEPOSIT_1 * BuyerPowerService.depositToBuyerPowerRatio} fontWeight={400} />
              ),
              buyerPower2: (
                <Amount value={DEMO_DEPOSIT_2 * BuyerPowerService.depositToBuyerPowerRatio} fontWeight={400} />
              ),
            }}
          />
        </Note>
      </InfoCard>

      <InfoCard
        stepNumber="03"
        icon={SearchIcon}
        title={intl.formatMessage({ id: 'howToBuyPage.vehicleSearch.title' })}
        img={{
          sm_x1: images['mobile/vehicle-search.png'],
          sm_x2: images['mobile/vehicle-search@2x.png'],
          xl_x1: images['desktop/vehicle-search.png'],
          xl_x2: images['desktop/vehicle-search@2x.png'],
        }}
      >
        <Section>
          <FormattedMessage id="howToBuyPage.vehicleSearch.desc" values={getLinkData('searchResults')} />
        </Section>
        <Note>
          <FormattedMessage id={vehicleSearchNote} values={getLinkData('searchResults')} />
        </Note>
      </InfoCard>

      <InfoCard
        stepNumber="04"
        icon={CarFinderIcon}
        title={intl.formatMessage({ id: 'howToBuyPage.vehicleInspection.title' })}
        img={{
          sm_x1: images['mobile/check-vin-history.png'],
          sm_x2: images['mobile/check-vin-history@2x.png'],
          xl_x1: images['desktop/check-vin-history.png'],
          xl_x2: images['desktop/check-vin-history@2x.png'],
        }}
      >
        <Section>
          <FormattedMessage
            id="howToBuyPage.vehicleInspection.desc"
            values={{
              a: (chunks) => (
                <Link href={RouterService.getRoute('clearvin', false, true)} isTargetBlank isNofollow>
                  {chunks}
                </Link>
              ),
            }}
          />
          <ul>
            <li>
              <FormattedMessage id="howToBuyPage.vehicleInspection.desc.bidSmarter" />
            </li>
            <li>
              <FormattedMessage id="howToBuyPage.vehicleInspection.desc.bidConfidently" />
            </li>
            <li>
              <FormattedMessage id="howToBuyPage.vehicleInspection.desc.knowWhatYouAreGetting" />
            </li>
          </ul>
        </Section>
      </InfoCard>

      <InfoCard
        stepNumber="05"
        icon={FaqIcon}
        title={intl.formatMessage({ id: 'howToBuyPage.auctionTypes.title' })}
        img={{
          sm_x1: images['mobile/auction-types.png'],
          sm_x2: images['mobile/auction-types@2x.png'],
          xl_x1: images['desktop/auction-types.png'],
          xl_x2: images['desktop/auction-types@2x.png'],
        }}
      >
        <Section>
          <FormattedMessage id="howToBuyPage.auctionTypes.desc" />
          <ul>
            <li>
              <FormattedMessage id="howToBuyPage.auctionTypes.desc.pureSale" values={getLinkData('searchPureSale')} />
            </li>
            <li>
              <FormattedMessage id="howToBuyPage.auctionTypes.desc.buyItNow" values={getLinkData('buyItNow')} />
            </li>
            <li>
              <FormattedMessage
                id="howToBuyPage.auctionTypes.desc.onMinimumBid"
                values={getLinkData('searchNoBidsYet')}
              />
            </li>
            <li>
              <FormattedMessage id="howToBuyPage.auctionTypes.desc.onApproval" />
            </li>
          </ul>
        </Section>
      </InfoCard>

      <InfoCard
        stepNumber="06"
        icon={BidsIcon}
        title={intl.formatMessage({ id: 'howToBuyPage.preliminaryBidding.title' })}
        img={{
          sm_x1: images['mobile/preliminary-bidding.png'],
          sm_x2: images['mobile/preliminary-bidding@2x.png'],
          xl_x1: images['desktop/preliminary-bidding.png'],
          xl_x2: images['desktop/preliminary-bidding@2x.png'],
        }}
      >
        <Section>
          <FormattedMessage id="howToBuyPage.preliminaryBidding.desc" />
        </Section>
        <Note>
          <FormattedMessage id="howToBuyPage.preliminaryBidding.note" />
        </Note>
      </InfoCard>

      <InfoCard
        stepNumber="07"
        icon={LiveAuctionIcon}
        title={intl.formatMessage({ id: 'howToBuyPage.liveBidding.title' })}
        img={{
          sm_x1: images['mobile/live-bidding.png'],
          sm_x2: images['mobile/live-bidding@2x.png'],
          xl_x1: images['desktop/live-bidding.png'],
          xl_x2: images['desktop/live-bidding@2x.png'],
        }}
      >
        <Section>
          <FormattedMessage id="howToBuyPage.liveBidding.desc" />
        </Section>
        <Note>
          <FormattedMessage id={liveBiddingNote} />
        </Note>
      </InfoCard>

      <InfoCard
        stepNumber="08"
        icon={PaymentsIcon}
        title={intl.formatMessage({ id: 'howToBuyPage.payment.title' })}
        img={{
          sm_x1: images['mobile/payment.png'],
          sm_x2: images['mobile/payment@2x.png'],
          xl_x1: images['desktop/payment.png'],
          xl_x2: images['desktop/payment@2x.png'],
        }}
      >
        <Section>
          <FormattedMessage id="howToBuyPage.payment.desc" />
        </Section>
        <Note>
          <FormattedMessage id="howToBuyPage.payment.note" />
        </Note>
      </InfoCard>

      <InfoCard
        stepNumber="09"
        icon={GeneralIcon}
        title={intl.formatMessage({ id: 'howToBuyPage.documentation.title' })}
        img={{
          sm_x1: images['mobile/documentation.png'],
          sm_x2: images['mobile/documentation@2x.png'],
          xl_x1: images['desktop/documentation.png'],
          xl_x2: images['desktop/documentation@2x.png'],
        }}
      >
        <Section>
          <FormattedMessage id={documentationIntlDesc} />
        </Section>

        <Note>
          <FormattedMessage id="howToBuyPage.documentation.note" />
        </Note>
      </InfoCard>

      <InfoCard
        stepNumber="10"
        icon={LocationsIcon}
        title={intl.formatMessage({ id: 'howToBuyPage.shipping.title' })}
        img={{
          sm_x1: images[isIntlPage ? 'mobile/shipping.png' : 'mobile/domestic-shipping.png'],
          sm_x2: images[isIntlPage ? 'mobile/shipping@2x.png' : 'mobile/domestic-shipping@2x.png'],
          xl_x1: images[isIntlPage ? 'desktop/shipping.png' : 'desktop/domestic-shipping.png'],
          xl_x2: images[isIntlPage ? 'desktop/shipping@2x.png' : 'desktop/domestic-shipping@2x.png'],
        }}
      >
        <Section>
          <FormattedMessage id={shippingIntlDesc} values={getLinkData('internationalShipping')} />
        </Section>
        <Note>
          <FormattedMessage id="howToBuyPage.shipping.note" />
        </Note>
      </InfoCard>
    </Container>
  );
}

export default HowToBuyPage;

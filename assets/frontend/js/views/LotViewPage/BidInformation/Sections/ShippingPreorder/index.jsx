import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import CountryShape from 'frontend/js/lib/propshapes/CountryShape';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Popover from 'frontend/js/components/Popover';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import BootstrapService from 'frontend/js/api/BootstrapService';
import ShippingAddressForm from './ShippingAddressForm';
import State2StateCheckbox from './State2StateCheckbox';
import TransportationCheckbox from './TransportationCheckbox';
import TransportationLabel from './TransportationCheckbox/TransportationLabel';
import useStyles from './useStyles';

function ShippingPreorder({
  preorderEnabled,
  shippingCountries,
  onPreorderEnableChange,
  onTriggerQuoteUpdate,
  isState2StateShipping,
  isState2StateAccepted,
  setIsState2StateAccepted,
}) {
  const {
    shippingType,
    shippingCountryId,
    shippingDestinationId,
    shippingAddress,
    shippingCity,
    shippingStateCode,
    shippingZip,
    shippingFirstName,
    shippingLastName,
    shippingPhoneNumber,
    shippingEmail,
    shippingConsignee,
    shippingInstructions,
    shippingQuote,
    requiresCustomQuote,
    isDomestic,
    updateShippingInformation,
    quoteInformationIsDirty,
  } = useContext(ShippingQuoteContext);

  if (isState2StateShipping && requiresCustomQuote) {
    return null;
  }

  const classes = useStyles();
  const { autoShippingDisabled } = useCustomerHelper();
  const shippingPreferredDestinationCountry = BootstrapService.getShippingPreferredDestinationCountry();
  const shippingPreferredDestination = BootstrapService.getShippingPreferredDestination();
  const isAutoShippingDisabled = autoShippingDisabled === true;
  const isPreferredDestination = Boolean(shippingPreferredDestination);
  const isState2StateBlocker = isState2StateShipping && !isState2StateAccepted;
  const { getRoute } = RouterService;
  const [isInitialized, setIsInitialized] = useState(false);
  const [shippingDestinations, setShippingDestinations] = useState([]);
  const intl = useIntl();
  const [trigger, setTrigger] = useState(null);

  const { quote = {} } = shippingQuote || {};
  const { total: quoteAmount = 0 } = quote;
  const [isFormOpen, setFormOpen] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [hideCustomQuota, setHideCustomQuota] = useState(true);

  const destination = {
    countryId: shippingCountryId,
    destinationId: shippingDestinationId,
    address: shippingAddress,
    city: shippingCity,
    stateCode: shippingStateCode,
    zip: shippingZip,
    firstName: shippingFirstName,
    lastName: shippingLastName,
    phoneNumber: shippingPhoneNumber,
    email: shippingEmail,
    consignee: shippingConsignee,
    comment: shippingInstructions,
  };

  function handleTickboxChange(name, isCheck) {
    onPreorderEnableChange(isCheck);
  }

  function handleFormOpen(e) {
    setTrigger(e.target);
    setFormOpen(true);
  }

  function handleFormClose() {
    setFormOpen(false);
  }

  function handleFormSubmit(values) {
    updateShippingInformation(values);
  }

  function toggleDescription() {
    setIsDescriptionOpen(!isDescriptionOpen);
  }

  function getCountryById(countryId) {
    const country = shippingCountries.find((item) => item.id === countryId);
    return country || {};
  }

  function getDestinationById(destinationId) {
    const shippingDestination = shippingDestinations.find((item) => item.id === destinationId);
    return shippingDestination || {};
  }

  const translationSets = {
    shippingLabel: intl.formatMessage({
      id: 'shared.label.shippingAddress',
      defaultMessage: 'Shipping Address',
    }),
    domesticTooltipTitle: intl.formatMessage({
      id: 'shipping.domesticShipping',
      defaultMessage: 'Domestic Shipping',
    }),
    domesticTooltipContent: intl.formatMessage(
      {
        id: 'shipping.domestictooltip.content',
        defaultMessage: `
        We’ll arrange shipping for your vehicle right after you win and pay for it! {br}
        By checking this box, you agree to our partner’s <a>Logistic Service Agreement</a>.
      `,
      },
      {
        br: <br />,
        a: (chunks) => (
          <a href={getRoute('lsa', null, true)} target="_blank" rel="noopener noreferrer nofollow">
            {chunks}
          </a>
        ),
      },
    ),
    intlTooltipTitle: intl.formatMessage({
      id: 'shipping.internationalShipping',
      defaultMessage: 'International Shipping',
    }),
    intlTooltipContent: intl.formatMessage(
      {
        id: 'shipping.internationaltooltip.content',
        defaultMessage: `
          We’ll arrange shipping to your country right after you win and pay for your vehicle! {br}
          Shipping rates are based on LCL consolidation with 1-3 other vehicles in 40ft container. {br}
          By checking this box, you agree to our partner’s <a>Logistic Service Agreement</a>.
        `,
      },
      {
        br: <br />,
        a: (chunks) => (
          <a href={getRoute('lsa', null, true)} target="_blank" rel="noopener noreferrer nofollow">
            {chunks}
          </a>
        ),
      },
    ),
    notSetLabel: intl.formatMessage({
      id: 'shared.label.notSet',
      defaultMessage: 'Not Set',
    }),
    orderAbmTransportationLabel: intl.formatMessage({
      id: 'shared.label.orderAbmTransportation',
      defaultMessage: 'Order AutoBidMaster Transportation',
    }),
    requestCustomQuoteLabel: intl.formatMessage({
      id: 'shared.label.customQuote',
      defaultMessage: 'Custom Quote',
    }),
    shipToLabel: intl.formatMessage({
      id: 'shared.label.shippingTo',
      defaultMessage: 'Shipping To',
    }),
    contactLabel: intl.formatMessage({
      id: 'shared.label.contact',
      defaultMessage: 'Contact',
    }),
    commentsLabel: intl.formatMessage({
      id: 'shared.label.comments',
      defaultMessage: 'Comments',
    }),
    abmTransportationLabel: intl.formatMessage({
      id: 'shared.label.abmTransportation',
      defaultMessage: 'Autobidmaster Transportation',
    }),
  };

  const domesticTooltipContent = (
    <div>
      <div style={{ marginBottom: 15 }}>
        <strong>{translationSets.domesticTooltipTitle}</strong>
      </div>
      <div>{translationSets.domesticTooltipContent}</div>
    </div>
  );

  const internationalTooltipContent = (
    <div>
      <div style={{ marginBottom: 15 }}>
        <strong>{translationSets.intlTooltipTitle}</strong>
      </div>
      <div>{translationSets.intlTooltipContent}</div>
    </div>
  );

  function getShipToLabel() {
    if (shippingType === ShippingOrderService.TypeDomestic) {
      const { city, stateCode, zip, address } = destination;
      if (address && city && stateCode && zip) {
        return `${address}, ${city}, ${stateCode} ${zip}`;
      }
    }

    if (shippingType !== ShippingOrderService.TypeDomestic) {
      const { countryId, destinationId } = destination;
      const country = getCountryById(countryId);
      if (country && country.id) {
        const shippingDestination = getDestinationById(destinationId);
        if (shippingDestination && shippingDestination.name) {
          return `${shippingDestination.name}, ${country.name}`;
        }

        return country.name;
      }
    }

    return translationSets.notSetLabel;
  }

  function getFormattedConsignee() {
    if (shippingConsignee) {
      return shippingConsignee.replace('\n', ' ');
    }

    return translationSets.notSetLabel;
  }

  async function updateDestinationsByCountryId(id) {
    if (id && id !== ShippingOrderService.usCountryObj.id) {
      try {
        const results = await ShippingOrderService.getDestinationsList(id);
        setShippingDestinations(results);

        return results;
      } catch (error) {
        setShippingDestinations([]);
      }
    }

    return [];
  }

  useEffect(() => {
    (async () => {
      if (isPreferredDestination) {
        if (isAutoShippingDisabled) {
          await updateDestinationsByCountryId(shippingPreferredDestinationCountry);
        }
        await updateShippingInformation({
          ...destination,
          countryId: shippingPreferredDestinationCountry,
          destinationId: shippingPreferredDestination,
        });
      } else {
        const destinations = await updateDestinationsByCountryId(shippingCountryId);
        if (
          !shippingDestinationId &&
          destinations.length &&
          ShippingOrderService.BorderCrossingCountries.includes(shippingCountryId)
        ) {
          const defaultDestinationId = destinations[0].id;
          await updateShippingInformation({ ...destination, destinationId: defaultDestinationId });
        }
      }
      setIsInitialized(true);
    })();
  }, []);

  useEffect(() => {
    if (quoteInformationIsDirty && isInitialized) {
      onTriggerQuoteUpdate();
    }
  }, [quoteInformationIsDirty, isInitialized]);

  // The form is invisible so that customer cannot change shipping information
  if (isPreferredDestination && !isAutoShippingDisabled) {
    return null;
  }

  if (!shippingQuote && hideCustomQuota) {
    return null;
  }

  return (
    <div className="card-content__container bid-information__transportation">
      {isState2StateShipping && (
        <State2StateCheckbox isChecked={isState2StateAccepted} onChange={setIsState2StateAccepted} />
      )}

      <div
        className={classnames('bid-information__transportation-card', {
          'is-disabled': isState2StateBlocker,
        })}
      >
        <div className={classes.transportation}>
          {isState2StateShipping ? (
            <TransportationLabel requiresCustomQuote={requiresCustomQuote} quoteAmount={quoteAmount} />
          ) : (
            <TransportationCheckbox
              onChange={handleTickboxChange}
              preorderEnabled={preorderEnabled}
              requiresCustomQuote={requiresCustomQuote}
              quoteAmount={quoteAmount}
              tooltip={isDomestic() ? domesticTooltipContent : internationalTooltipContent}
            />
          )}
          <div
            className={classnames(classes.expandIcon, isDescriptionOpen && 'is-active')}
            onClick={toggleDescription}
            onKeyPress={toggleDescription}
            role="button"
            tabIndex={0}
            aria-label="Toggle"
          />
        </div>
        <Collapse in={isDescriptionOpen} unmountOnExit>
          <div className="bid-information__transportation-description">
            <span>{translationSets.shipToLabel}:</span>
            <button type="button" onClick={handleFormOpen}>
              <span>{getShipToLabel()}</span>
            </button>
          </div>

          <Popover
            open={isFormOpen}
            onClose={handleFormClose}
            title={translationSets.shippingLabel}
            triggerRef={trigger}
            isFlipEnabled={false}
          >
            <ShippingAddressForm
              destination={destination}
              countries={shippingCountries}
              destinations={shippingDestinations}
              onCountryUpdate={(id) => {
                setHideCustomQuota(false);
                updateDestinationsByCountryId(id);
              }}
              onSubmit={handleFormSubmit}
              onClose={handleFormClose}
            />
          </Popover>

          <div className="bid-information__transportation-description">
            <span>{translationSets.contactLabel}:</span>
            <button type="button" onClick={handleFormOpen}>
              <span>
                {shippingType === ShippingOrderService.TypeInternational ? (
                  <>{getFormattedConsignee()}</>
                ) : (
                  <>
                    {shippingFirstName} {shippingLastName}, <span className="ws-n">{shippingPhoneNumber}</span>
                  </>
                )}
              </span>
            </button>
          </div>

          {shippingInstructions && (
            <div className="bid-information__transportation-description">
              <span>{translationSets.commentsLabel}:</span>{' '}
              <button type="button" onClick={handleFormOpen}>
                <span>{shippingInstructions}</span>
              </button>
            </div>
          )}
        </Collapse>
      </div>

      {!requiresCustomQuote && !isState2StateShipping && (
        <div className="bid-information__transportation-price">
          <div>{translationSets.abmTransportationLabel}:</div>
          <div>
            <strong>{preorderEnabled ? NumberService.formatCurrency(quoteAmount) : '$0'}&nbsp;</strong>
            <span>USD</span>
          </div>
        </div>
      )}
    </div>
  );
}

ShippingPreorder.propTypes = {
  preorderEnabled: PropTypes.bool,
  isState2StateAccepted: PropTypes.bool.isRequired,
  setIsState2StateAccepted: PropTypes.func.isRequired,
  shippingCountries: PropTypes.arrayOf(CountryShape),
  onPreorderEnableChange: PropTypes.func.isRequired,
  onTriggerQuoteUpdate: PropTypes.func.isRequired,
  isState2StateShipping: PropTypes.bool.isRequired,
};

ShippingPreorder.defaultProps = {
  preorderEnabled: true,
  shippingCountries: [],
};

export default ShippingPreorder;

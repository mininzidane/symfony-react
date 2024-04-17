import React, { useState } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import get from 'lodash/get';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import RouterService from 'frontend/js/api/RouterService';
import CountryShape from 'frontend/js/lib/propshapes/CountryShape';
import DestinationShape from 'frontend/js/lib/propshapes/DestinationShape';
import RadioButton from 'frontend/js/components/Form/RadioButton';
import FieldsToggler from 'frontend/js/components/Form/FieldsToggler';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import TextAreaPlane from 'frontend/js/components/Form/PlaneTheme/TextAreaPlane';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import PlacesInputPlane from 'frontend/js/components/Form/PlaneTheme/PlacesInputPlane';
import Tickbox from 'frontend/js/components/Form/Tickbox';
import Link from 'frontend/js/components/Link';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import validationSchema from './validationSchema';
import AgreementConfirmation from './AgreementConfirmation';
import Footer from './Footer';
import useStyles from './useStyles';

const SHIPPING_ORDER_SOURCE = 'preorder_high_bidder_promo';
function ShippingPromotionForm(props) {
  const classes = useStyles(props);
  const customer = useCustomerHelper();
  const intl = useIntl();
  const {
    location: initLocation,
    isBorderCrossing: initIsBorderCrossing,
    destinations: initDestinations,
    quoteDomestic: initQuoteDomestic,
    quoteIntl: initQuoteIntl,
    shippingType: initShippingType,
  } = props;
  const [isInstructionsShown, setIsInstructionsShown] = useState(false);
  const [location, setLocation] = useState(initLocation);
  const [isBorderCrossing, setIsBorderCrossing] = useState(initIsBorderCrossing);
  const [destinations, setDestinations] = useState(initDestinations);
  const [quoteDomestic, setQuoteDomestic] = useState(initQuoteDomestic);
  const [quoteIntl, setQuoteIntl] = useState(initQuoteIntl);
  const [isLoading, setIsLoading] = useState(false);
  const [shippingType, setShippingType] = useState(initShippingType);
  const [formError, setFormError] = useState('');

  const { index, countries, country, destination, noQuoteFields, isPreorder } = props;
  const { TypeDomestic, TypeBorderCrossing, TypeInternational } = ShippingOrderService;

  function getConsignee() {
    const {
      fullName = '',
      address = '',
      city = '',
      stateName = '',
      countryName = '',
      zip = '',
      phoneNumber = '',
      email = '',
    } = customer;

    const cityAndState = [city, stateName].filter(Boolean).join(', ');
    const consignee =
      [fullName, address, cityAndState, countryName, zip, phoneNumber, email].filter(Boolean).join('\n') || '';
    return consignee;
  }

  const { fullName, phoneNumber } = customer;

  const formik = useFormik({
    initialValues: {
      address: location.address || '',
      city: location.city || '',
      state: location.state_code || '',
      zip: location.zip || '',
      contact: fullName || '',
      phone: phoneNumber || '',
      country: country || '',
      instructions: '',
      consignee: getConsignee(),
      destination: destination || '',
      shippingType,
      consentCheck: false,
      isPreorder,
    },
    validationSchema,
    onSubmit: () => {},
    enableReinitialize: true,
  });

  function getQuote(values) {
    const { originZip, isDrivable, lotId, vin, onQuoteUpdate } = props;

    let quoteType = TypeInternational;
    const payload = {
      origin_zip: originZip,
      drivable: isDrivable,
      auction: 1,
    };

    setFormError('');

    if (shippingType === TypeDomestic) {
      payload.type = TypeDomestic;
      payload.lot_number = lotId;
      payload.destination_address = values.address;
      payload.destination_zip = values.zip;
      quoteType = TypeDomestic;
    } else if (isBorderCrossing) {
      payload.type = TypeBorderCrossing;
      payload.vin = vin;
      payload.destination = values.destination;
    } else {
      payload.type = TypeInternational;
      payload.vin = vin;
      payload.destination_country = parseInt(values.country, 10);
      if (ShippingOrderService.getQuoteTokenByCountry(payload.destination_country)) {
        payload.token = ShippingOrderService.getQuoteTokenByCountry(payload.destination_country);
      }
    }

    if (!ShippingOrderService.areQuoteParamsValid(payload)) {
      return;
    }

    setIsLoading(true);
    ShippingOrderService.getQuote(payload)
      .then((quote) => {
        if (quoteType === TypeInternational) {
          setQuoteIntl(quote);
        } else if (quoteType === TypeDomestic) {
          setQuoteDomestic(quote);
        }
        onQuoteUpdate(quote, values);
      })
      .catch((error) => {
        setFormError(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function createOrder(values, isAddShippingToMyInvoice = false) {
    const { lotId, onSubmit, orderSource, lotPurchaseToken, auction } = props;
    const payload = { lot: lotId, source: orderSource, auction };

    if (shippingType === TypeDomestic) {
      payload.shippingType = TypeDomestic;
      payload.country = ShippingOrderService.usCountryObj;
      payload.address = values.address;
      payload.city = values.city;
      payload.state = values.state;
      payload.zip = values.zip;
      payload.destination_contact_name = values.contact;
      payload.phone = values.phone;
      payload.instructions = values.instructions;
      payload.quote = quoteDomestic;
    } else {
      const selectedCountry = countries.filter((item) => item.id === parseInt(values.country, 10))[0];
      const selectedDestination = destinations.filter((item) => item.id === parseInt(values.destination, 10))[0];

      if (isBorderCrossing) {
        payload.shippingType = TypeBorderCrossing;
        payload.destination = selectedDestination;
      } else {
        payload.shippingType = TypeInternational;
        payload.consignee = values.consignee;
        payload.destination = quoteIntl.destination;
        payload.us_port = quoteIntl.us_port;
      }

      payload.country = selectedCountry;
      payload.quote = quoteIntl;
    }

    setIsLoading(true);

    if (isPreorder) {
      ShippingOrderService.shippingPreorder(payload)
        .then(({ shippingOrder }) => {
          setIsLoading(false);
          onSubmit({ lotId, shippingOrder });
        })
        .catch((error) => {
          const errorMsg = get(error, 'response.data.errors.message', '');
          setFormError(errorMsg);
          setIsLoading(false);
        });
    } else {
      payload.purchase = lotPurchaseToken;
      ShippingOrderService.shippingOrder(payload)
        .then((data) => {
          const shippingOrder = get(data, 'shippingOrder', null);
          setIsLoading(false);
          onSubmit({ lotId, shippingOrder, isAddShippingToMyInvoice });
        })
        .catch((error) => {
          const errorMsg = get(error, 'response.data.errors.message', '');
          setFormError(errorMsg);
          setIsLoading(false);
        });
    }
  }

  function resetIntlQuote() {
    setQuoteIntl(null);
  }

  function resetDomesticQuote() {
    setQuoteDomestic(null);
  }

  function toggleInstructionsShown() {
    setIsInstructionsShown((prevState) => !prevState);
  }

  function updateDestinationList(countryId) {
    const selectedCountry = countries.filter((item) => item.id === countryId)[0];
    setIsBorderCrossing(selectedCountry && selectedCountry.type === ShippingOrderService.TypeBorderCrossing);

    if (isBorderCrossing) {
      ShippingOrderService.getDestinationsList(countryId).then((newDestinations) => {
        setDestinations(newDestinations);
      });
    }
  }

  return (
    <div className={classes.root}>
      <form onSubmit={formik.handleSubmit}>
        {!noQuoteFields && (
          <div className={classes.shippingType}>
            <RadioButton
              label={intl.formatMessage({ id: 'shipping.domesticShipping' })}
              name="shippingType"
              id={`preorder-method-domestic-${index}`}
              value={TypeDomestic}
              isChecked={formik.values.shippingType === TypeDomestic}
              onChange={(name, value) => {
                formik.setFieldValue(name, value);
                setShippingType(TypeDomestic);
                setFormError('');
              }}
            />

            <RadioButton
              label={intl.formatMessage({ id: 'shipping.internationalShipping' })}
              name="shippingType"
              id={`preorder-method-intl-${index}`}
              value={TypeInternational}
              isChecked={formik.values.shippingType === TypeInternational}
              className="mt-10"
              onChange={(name, value) => {
                formik.setFieldValue(name, value);
                setShippingType(TypeInternational);
                setFormError('');
              }}
            />
          </div>
        )}

        {formik.values.shippingType === TypeDomestic ? (
          <>
            {!noQuoteFields && (
              <>
                <PlacesInputPlane
                  id={`address-${index}`}
                  name="address"
                  label={intl.formatMessage({ id: 'shared.label.address' })}
                  className="is-address"
                  value={formik.values.address}
                  error={formik.errors.address}
                  touched={formik.touched.address}
                  onBlur={formik.setFieldTouched}
                  disableBlurSelect
                  onChange={(name, value, trigger) => {
                    formik.setFieldValue(name, value, trigger);
                    if (typeof value === 'object') {
                      resetDomesticQuote();
                      setFormError('');
                      setLocation(value);
                      const { address: newAddress = '', city: newCity = '', state_code = '', zip: newZip = '' } = value;
                      formik.setFieldValue('address', newAddress);
                      formik.setFieldValue('city', newCity);
                      formik.setFieldValue('state', state_code);
                      formik.setFieldValue('zip', newZip);
                    }
                  }}
                  onError={(name, errorMessage) => {
                    formik.setFieldError(name, errorMessage);
                  }}
                />

                <InputPlane
                  id={`city-${index}`}
                  name="city"
                  label={intl.formatMessage({ id: 'shared.label.city' })}
                  className="mt-10"
                  value={formik.values.city}
                  error={formik.errors.city}
                  touched={formik.touched.city}
                  onChange={formik.setFieldValue}
                  onBlur={formik.setFieldTouched}
                />

                <div className="grid-x no-wrap mt-10">
                  <SelectPlane
                    id="state"
                    name="state"
                    label={intl.formatMessage({ id: 'shared.label.state' })}
                    placeholder={intl.formatMessage({ id: 'shared.label.state' })}
                    onChangeAttribute="value"
                    className="xl-5 mr-10"
                    value={formik.values.state}
                    options={ShippingOrderService.StateList}
                    error={formik.errors.state}
                    touched={formik.touched.state}
                    onChange={formik.setFieldValue}
                    onBlur={formik.setFieldTouched}
                    isSearchable
                  />

                  <div className="xl-7">
                    <InputPlane
                      id={`zip-${index}`}
                      name="zip"
                      label={intl.formatMessage({ id: 'shared.label.zipCode' })}
                      value={formik.values.zip}
                      error={formik.errors.zip}
                      touched={formik.touched.zip}
                      onChange={(name, value) => {
                        resetDomesticQuote();
                        formik.setFieldValue(name, value);
                        setFormError('');
                      }}
                      onBlur={formik.setFieldTouched}
                      mask="numbers"
                    />
                  </div>
                </div>

                <InputPlane
                  id={`contact-${index}`}
                  name="contact"
                  label={intl.formatMessage({ id: 'shared.label.contact' })}
                  className="mt-10"
                  value={formik.values.contact}
                  error={formik.errors.contact}
                  touched={formik.touched.contact}
                  onChange={formik.setFieldValue}
                  onBlur={formik.setFieldTouched}
                />

                <InputPlane
                  id={`phone-${index}`}
                  name="phone"
                  label={intl.formatMessage({ id: 'shared.label.phoneNumber' })}
                  className="mt-10"
                  value={formik.values.phone}
                  error={formik.errors.phone}
                  touched={formik.touched.phone}
                  onChange={formik.setFieldValue}
                  onBlur={formik.setFieldTouched}
                />

                <FieldsToggler
                  className="mt-15"
                  label={intl.formatMessage({ id: 'shared.label.additionalInformationOptional' })}
                  onClick={toggleInstructionsShown}
                />

                <>
                  {isInstructionsShown && (
                    <TextAreaPlane
                      id={`instructions-${index}`}
                      name="instructions"
                      label={intl.formatMessage({ id: 'shared.label.instructions' })}
                      className="mt-15"
                      value={formik.values.instructions}
                      error={formik.errors.instructions}
                      maxLength="250"
                      rows={4}
                      touched={formik.touched.instructions}
                      onChange={formik.setFieldValue}
                      onBlur={formik.setFieldTouched}
                    />
                  )}
                </>
              </>
            )}
          </>
        ) : (
          <>
            {!noQuoteFields && (
              <SelectPlane
                id="country"
                name="country"
                label={intl.formatMessage({ id: 'shared.label.country' })}
                value={formik.values.country}
                options={countries}
                error={formik.errors.country}
                touched={formik.touched.country}
                onChange={(name, value) => {
                  formik.setFieldValue(name, value);
                  formik.setFieldValue('destination', '');
                  resetIntlQuote();
                  updateDestinationList(value);
                  setFormError('');
                }}
                onBlur={formik.setFieldTouched}
                onChangeAttribute="id"
                formatOptionLabel={(option) => option.name}
                convertMobileSelectValue={(value) => parseInt(value, 10)}
                isSearchable
              />
            )}

            {isBorderCrossing ? (
              <>
                {!noQuoteFields && (
                  <SelectPlane
                    id="destination"
                    name="destination"
                    label={intl.formatMessage({ id: 'shared.label.destination' })}
                    className="mt-10"
                    value={formik.values.destination}
                    options={destinations}
                    error={formik.errors.destination}
                    touched={formik.touched.destination}
                    onChange={(name, value) => {
                      resetIntlQuote();
                      formik.setFieldValue(name, value);
                    }}
                    onBlur={formik.setFieldTouched}
                    onChangeAttribute="id"
                    formatOptionLabel={(option) => option.name}
                    convertMobileSelectValue={(value) => parseInt(value, 10)}
                    isSearchable
                  />
                )}
              </>
            ) : (
              <TextAreaPlane
                id={`consignee-${index}`}
                name="consignee"
                label={intl.formatMessage({ id: 'shared.label.consignee' })}
                className="mt-10"
                value={formik.values.consignee}
                error={formik.errors.consignee}
                maxLength="250"
                rows={4}
                touched={formik.touched.consignee}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
              />
            )}
          </>
        )}

        {isPreorder ? (
          <AgreementConfirmation />
        ) : (
          <div className="mt-20">
            {formik.errors.consentCheck && <div className="form-hint-hollow">{formik.errors.consentCheck}</div>}
            <Tickbox
              id={`consentCheck-${index}`}
              name="consentCheck"
              value={formik.values.consentCheck}
              touched={formik.touched.consentCheck}
              onChange={formik.setFieldValue}
            >
              <div className="text-gray text-xs">
                {intl.formatMessage(
                  { id: 'shipping.agreement.lsa' },
                  {
                    a: (chunks) => (
                      <Link href={RouterService.getRoute('lsa', null, true)} isTargetBlank isNofollow>
                        {chunks}
                      </Link>
                    ),
                  },
                )}
              </div>
            </Tickbox>
          </div>
        )}

        {formError ? (
          <div className="form-hint-plane text-sm" style={{ margin: '27px 0 8px' }}>
            {formError}
          </div>
        ) : (
          <Footer
            formik={formik}
            isPreorder={isPreorder}
            quote={shippingType === TypeDomestic ? quoteDomestic : quoteIntl}
            isLoading={isLoading}
            getQuote={getQuote}
            createOrder={createOrder}
            className={classes.footer}
          />
        )}
      </form>
    </div>
  );
}

ShippingPromotionForm.defaultProps = {
  customer: {},
  isDrivable: false,
  originZip: '',
  vin: '',
  lotId: 0,
  auction: null,
  location: {},
  isBorderCrossing: false,
  destinations: [],
  quoteDomestic: null,
  quoteIntl: null,
  shippingType: ShippingOrderService.TypeDomestic,
  country: 0,
  destination: 0,
  orderSource: SHIPPING_ORDER_SOURCE,
  onQuoteUpdate: () => null,
  noQuoteFields: false,
  countries: [],
  isPreorder: true,
  lotPurchaseToken: '',
};

ShippingPromotionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  countries: PropTypes.arrayOf(CountryShape),
  index: PropTypes.string.isRequired,
  customer: PropTypes.shape({
    fullName: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    stateName: PropTypes.string,
    countryName: PropTypes.string,
    zip: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
  }),
  isDrivable: PropTypes.bool,
  originZip: PropTypes.string,
  vin: PropTypes.string,
  lotId: PropTypes.number,
  auction: PropTypes.string,
  location: PropTypes.object,
  isBorderCrossing: PropTypes.bool,
  destinations: PropTypes.arrayOf(DestinationShape),
  quoteDomestic: PropTypes.object,
  quoteIntl: PropTypes.object,
  shippingType: PropTypes.string,
  country: PropTypes.number,
  destination: PropTypes.number,
  orderSource: PropTypes.string,
  onQuoteUpdate: PropTypes.func,
  noQuoteFields: PropTypes.bool,
  isPreorder: PropTypes.bool,
  lotPurchaseToken: PropTypes.string,
};

export default ShippingPromotionForm;

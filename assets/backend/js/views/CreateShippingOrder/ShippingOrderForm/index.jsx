import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Formik } from 'formik';
import { isEmpty, get } from 'lodash';
import useInsurance from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext/useValues/useInsurance';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import PlacesInputPlane from 'frontend/js/components/Form/PlaneTheme/PlacesInputPlane';
import CustomerShape from 'frontend/js/lib/propshapes/CustomerShape';
import ShippingOrderFormSchema from './ShippingOrderFormSchema';
import useStyles from './useStyles';
import ShippingOrderSearchByLot from './ShippingOrderSearchByLot';
import FormikTickbox from '../../../components/Form/FormikTickbox';
import Select from '../../../components/Form/Select';
import Input from '../../../components/Form/Input';
import Button from '../../../components/Button';
import SubmitButton from '../../../components/SubmitButton';
import ValidationService from '../../../lib/ValidationService';
import ShippingOrderService from '../../../api/ShippingOrderService';
import TextArea from '../../../components/Form/TextArea';
import LotPurchaseShape from '../../../lib/propshapes/LotPurchaseShape';

const SHIPPING_ORDER_SOURCE = 'acp';

function ShippingOrderForm({ lotPurchase, userProfile, setLotPurchase, searchMode }) {
  const {
    address: userAddress = '',
    city: userCity = '',
    zip: userZip = '',
    phoneNumber: userPhone = '',
    ehToken: userEhToken = '',
  } = userProfile;
  const userCountryCode = userProfile?.country?.iso_2 || '';
  const userStateCode = userProfile?.state?.code || '';
  const userContact = `${userProfile.firstName} ${userProfile.lastName}`;
  const destinationCountryId = userProfile.shippingPreferredDestinationCountry || userProfile?.country?.id;
  const destinationId = userProfile.shippingPreferredDestination;

  const {
    TypeInternational,
    TypeDomestic,
    TypeBorderCrossing,
    CountryCodeUS,
    StateList: states,
  } = ShippingOrderService;

  const defaultValues = {
    shippingType: TypeDomestic,
    country: {},
    destination: {},
    usPort: {},
    address: userAddress || '',
    state: userStateCode || '',
    city: userCity || '',
    zip: userZip || '',
    contact: userContact || '',
    phone: userPhone || '',
    consignee: '',
    instructions: '',
    customGroundQuote: 0,
    customOceanQuote: 0,
    price: lotPurchase.price,
    insurance: 0,
  };

  const lot = get(lotPurchase, 'lot');
  const isLotSet = Boolean(lot);
  const [formValues, setFormValues] = useState(defaultValues);
  const [countries, setCountries] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [ports, setPorts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quote, setQuote] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [insuranceEnabled, setInsuranceEnabled] = useState(defaultValues.price > 0);
  const [insurance, setInsurance] = useState(0);
  const [consigneeFromProfile, setConsigneeFromProfile] = useState(false);

  const isDomesticProfile = userCountryCode === CountryCodeUS;
  const classes = useStyles();

  function isDomesticType() {
    const { shippingType } = formValues;
    return shippingType === TypeDomestic;
  }

  function isInternationalType() {
    const { shippingType } = formValues;
    return shippingType === TypeInternational;
  }

  function isBorderCrossingType() {
    const { shippingType } = formValues;
    return shippingType === TypeBorderCrossing;
  }

  function getProfileLabel() {
    if (userCountryCode) {
      const { address = '', city = '', zip = '' } = userProfile;
      const state = userProfile?.state?.name || '';
      if (isDomesticProfile) {
        return `${address} ${city}, ${state} ${zip}`;
      }

      return `${state} ${userCountryCode}`;
    }

    return '';
  }

  function buildConsigneeFromUserProfile() {
    const {
      address,
      city,
      zip,
      firstName,
      lastName,
      phoneNumber,
      email,
      country: { name: country },
    } = userProfile;
    const state = userProfile?.state?.name || '';
    return `${firstName} ${lastName}\n${address || ''}\n${city || ''}, ${state || ''}\n${country}\n${
      zip || ''
    }\n${phoneNumber}\n${email}`;
  }

  function updateFieldValue(name, value) {
    const updatedValues = { ...formValues, [name]: value };
    if (name === 'country') {
      if (value) {
        updatedValues.shippingType = value.type;
      } else {
        updatedValues.shippingType = TypeDomestic;
      }
    }

    setFormValues(updatedValues);
  }

  function updateFields(fields = {}) {
    const updatedFields = { ...formValues, ...fields };
    if (fields && fields.country) {
      updatedFields.shippingType = fields.country.type;
    }

    setFormValues(updatedFields);
  }

  function getCountryFromUserProfile() {
    return countries.find((country) => destinationCountryId === country.id);
  }

  function hasValidCustomQuote() {
    const { customGroundQuote, customOceanQuote } = formValues;
    if (isInternationalType()) {
      return customGroundQuote > 0 && customOceanQuote > 0;
    }

    return customGroundQuote > 0;
  }

  async function loadCountries() {
    try {
      const response = await ShippingOrderService.getCountriesList();
      setCountries(response);

      return response;
    } catch (e) {
      setGeneralError('An error occurred while loading this page.  Please refresh and try again.');
    }

    return [];
  }

  async function loadDestinations(countryId) {
    const updatedFields = { ports: {}, destination: {}, usPort: {} };
    try {
      const response = await ShippingOrderService.getDestinationsList(countryId);
      const preferredDestination = response.find((dest) => {
        if (destinationId) {
          return destinationId === dest.id;
        }
        return dest.preferred;
      });
      if (preferredDestination) {
        updatedFields.destination = preferredDestination;
      }

      updateFields(updatedFields);
      setDestinations(response);

      return response;
    } catch (e) {
      updateFields({ ports: {}, destination: {}, usPort: {} });
      setDestinations([]);
    }

    return [];
  }

  async function loadPorts(destination) {
    if (isEmpty(lotPurchase)) {
      return [];
    }
    const updatedFields = { usPort: {} };
    try {
      const lat = get(lotPurchase, 'lot.locationLat');
      const lon = get(lotPurchase, 'lot.locationLon');

      const response = await ShippingOrderService.getPortsList(destination, lat, lon);
      const preferred = response.find((port) => port.preferred);
      if (preferred) {
        updatedFields.usPort = preferred;
      }

      updateFields(updatedFields);
      setPorts(response);

      return response;
    } catch (e) {
      setPorts([]);
    }

    return [];
  }

  function getQuoteParams() {
    if (isEmpty(lotPurchase)) {
      return {};
    }

    const {
      lot: { vin, locationZip, isDrivable },
    } = lotPurchase;

    const { shippingType, country, destination, zip } = formValues;

    const payload = {
      type: shippingType,
      vin,
      origin_zip: locationZip,
      drivable: isDrivable,
      token: userEhToken,
    };

    if (isInternationalType()) {
      Object.assign(payload, { destination_country: country.id });
    } else if (isBorderCrossingType()) {
      Object.assign(payload, { destination: destination.id });
    } else {
      Object.assign(payload, { destination_zip: zip });
    }

    return payload;
  }

  function hasValidQuoteParams(quoteParams = {}) {
    const { destination_zip, destination_country, destination } = quoteParams;
    if (isDomesticType()) {
      return Boolean(ValidationService.validateZip(destination_zip));
    }

    if (isInternationalType()) {
      return Boolean(destination_country);
    }

    if (isBorderCrossingType()) {
      return Boolean(destination);
    }

    return false;
  }

  function getDestinationOrderParams() {
    const { country, destination, usPort, address, city, state, zip, phone, contact, instructions, consignee } =
      formValues;

    const payloadBase = {
      country,
      phone,
      destination_contact_name: contact,
      instructions,
    };

    const payload = {};
    if (isDomesticType()) {
      Object.assign(payload, { address, city, state, zip });
    } else if (isBorderCrossingType()) {
      Object.assign(payload, { destination });
    } else if (isInternationalType()) {
      Object.assign(payload, { consignee, destination, us_port: usPort });
    }

    return { ...payloadBase, ...payload };
  }

  function getCustomQuoteOrderParams() {
    const { shippingType, country, zip, city, state, destination, usPort, customGroundQuote, customOceanQuote } =
      formValues;
    const {
      lot: { locationZip, locationCity, locationState, locationStateCode },
    } = lotPurchase;

    const payload = {
      type: shippingType,
      origin: {
        zip: locationZip,
        city: locationCity,
        state: locationState,
        state_code: locationStateCode,
      },
      transit: {},
    };

    const customQuote = {
      ref_id: 'custom',
      ground: customGroundQuote,
    };

    if (isDomesticType()) {
      Object.assign(customQuote, {
        total: customGroundQuote,
        destination: {
          id: 1,
          zip: { zip, city, state_code: state },
        },
      });
    } else if (isBorderCrossingType()) {
      Object.assign(payload, { destination: { ...destination, country } });
      Object.assign(customQuote, { total: customGroundQuote });
    } else if (isInternationalType()) {
      Object.assign(customQuote, {
        ocean: customOceanQuote,
        total: parseInt(customGroundQuote, 10) + parseInt(customOceanQuote, 10),
      });

      Object.assign(payload, { destination: { ...destination, country }, us_port: usPort });
    }

    payload.quote = customQuote;

    return { quote: payload };
  }

  function getQuoteTotal() {
    const { customGroundQuote, customOceanQuote } = formValues;
    if (isInternationalType()) {
      return parseInt(customGroundQuote, 10) + parseInt(customOceanQuote, 10);
    }

    return parseInt(customGroundQuote, 10);
  }

  async function updateQuote() {
    const quoteParams = getQuoteParams();
    if (!hasValidQuoteParams(quoteParams)) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await ShippingOrderService.getQuote(quoteParams);
      const updatedFields = {
        customGroundQuote: response.quote.ground,
        customOceanQuote: response.quote.ocean || 0,
      };

      setQuote(response);
      updateFields(updatedFields);
    } catch (e) {
      setQuote({});
    }

    setIsLoading(false);
  }

  async function updateFromUserProfile() {
    const userCountry = getCountryFromUserProfile() || {};
    const updatedFields = { ...defaultValues, country: userCountry, destination: {} };
    updateFields(updatedFields);
  }

  function getOrderPayload() {
    const {
      id: purchase,
      lot: { inventoryAuction: auction },
    } = lotPurchase;
    const { shippingType } = formValues;

    let payloadBase = {
      source: SHIPPING_ORDER_SOURCE,
      shippingType,
      purchase,
      auction,
    };

    if (!purchase) {
      payloadBase.lot = lotPurchase.lot.id;
    }

    if (insuranceEnabled) {
      payloadBase = { ...payloadBase, additionalCharges: { insurance: formValues.insurance } };
    }

    const destinationParams = getDestinationOrderParams();
    const quoteParams = getCustomQuoteOrderParams();

    return { ...payloadBase, ...destinationParams, ...quoteParams };
  }

  async function onSubmit(values, { setSubmitting }) {
    setSubmitting(true);

    const payload = getOrderPayload();
    const { id: userId } = userProfile;
    try {
      const { data } = await ShippingOrderService.createQuoteOrder(userId, payload);
      window.location = data.redirect_url;
    } catch (e) {
      setGeneralError('An error occurred while processing this request.');
    }

    setSubmitting(false);
  }

  function calculateInsurance() {
    const insuranceValue = useInsurance({
      refinements: {
        countryId: formValues.country.id,
        price: formValues.price,
      },
    });
    formValues.insurance = insuranceValue;
    setInsurance(insuranceValue);
  }

  /** Init */
  useEffect(() => {
    (async () => {
      await loadCountries();
    })();
  }, []);

  /** Init */
  useEffect(() => {
    const userCountry = getCountryFromUserProfile();
    if (userCountry && userCountry.id) {
      updateFields({ country: userCountry });
    }
    setIsLoading(false);
  }, [countries]);

  /** Country Listener */
  useEffect(() => {
    const { country } = formValues;
    if (!country || !country.id) {
      return;
    }

    (async () => {
      if (country.type !== TypeDomestic) {
        await loadDestinations(country.id);
      } else if (!isLoading) {
        await updateQuote();
      }
    })();
  }, [formValues.country]);

  /** Zip Listener */
  useEffect(() => {
    (async () => {
      if (!isLoading) {
        await updateQuote();
      }
    })();
  }, [formValues.zip]);

  /** Destination Listener */
  useEffect(() => {
    (async () => {
      const { destination } = formValues;
      if (destination && destination.id) {
        if (isInternationalType()) {
          await loadPorts(destination.id);
        } else if (!isLoading && isBorderCrossingType()) {
          await updateQuote();
        }
      }
    })();
  }, [formValues.destination, lotPurchase]);

  /** Port Listener */
  useEffect(() => {
    (async () => {
      const { usPort } = formValues;
      if (usPort && usPort.id) {
        if (!isLoading) {
          await updateQuote();
        }
      }
    })();
  }, [formValues.usPort]);

  /** City Listener */
  useEffect(() => {
    (async () => {
      if (!isLoading) {
        await updateQuote();
      }
    })();
  }, [formValues.city]);

  /** Update quote listener */
  useEffect(() => {
    (() => {
      formValues.customGroundQuote = quote.quote ? quote.quote.ground : 0;
      formValues.customOceanQuote = quote.quote ? quote.quote.ocean || 0 : 0;
    })();
  }, [quote]);

  useEffect(() => {
    (async () => {
      if (!isLoading) {
        await updateQuote();
      }
    })();
  }, [isLotSet]);

  useEffect(() => {
    if (consigneeFromProfile) {
      updateFields({ consignee: buildConsigneeFromUserProfile() });
    } else {
      updateFields({ consignee: '' });
    }
  }, [consigneeFromProfile]);

  return (
    <Formik
      initialValues={formValues}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={ShippingOrderFormSchema}
    >
      {({ values, touched, errors, setFieldTouched, isSubmitting, handleSubmit, setFieldError }) => (
        <>
          {searchMode && !lot && <ShippingOrderSearchByLot setLotPurchase={setLotPurchase} />}

          {generalError.length > 0 && (
            <div className="section section--errors m-b">
              <div className="text-red">{generalError}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input type="hidden" name="shippingType" value={values.shippingType} />
            <input type="hidden" name="isCustomQuote" value={values.isCustomQuote} />

            <div className={classNames(classes.mw800, 'form-input-wrapper m-b-lg')}>
              <h4>Order Details:</h4>
              <div className="section section--order-details">
                <Select
                  id="country"
                  name="country"
                  label="Country"
                  placeholder=""
                  className="react-select-hollow m-b-sm"
                  value={values.country}
                  touched={touched.country}
                  error={errors.country}
                  onBlur={setFieldTouched}
                  onChange={() => null}
                  onChangeCallback={(value) => updateFieldValue('country', value)}
                  options={countries}
                  disabled={!countries.length}
                  onChangeAttribute="id"
                  formatOptionLabel={(option) => option.name}
                  isSearchable
                  isClearable
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      paddingLeft: '60px',
                      minHeight: '40px',
                      borderColor: '#B7B5B3',
                      borderRadius: '2px',
                    }),
                    menu: (styles) => ({ ...styles, zIndex: '100' }),
                  }}
                />

                {isDomesticType() && (
                  <>
                    <PlacesInputPlane
                      id="address"
                      name="address"
                      label="Address"
                      className="is-address m-b-sm"
                      value={values.address}
                      error={errors.address}
                      touched={touched.address}
                      onBlur={setFieldTouched}
                      disableBlurSelect
                      onChange={(name, value) => {
                        updateFieldValue(name, value);
                        if (typeof value === 'object') {
                          const { address = '', city = '', state_code = '', zip = '' } = value;

                          updateFields({ address, city, zip, state: state_code });
                        }
                      }}
                      onError={setFieldError}
                    />

                    <div className="d-flex jc-sb f-wrap-sm">
                      <div className={classNames(classes.inlineAddressField, 'm-r-sm')}>
                        <Input
                          id="city"
                          name="city"
                          label="City"
                          className={classNames(classes.inlineInput, 'input--city')}
                          value={values.city}
                          error={errors.city}
                          touched={touched.city}
                          onBlur={setFieldTouched}
                          onChange={updateFieldValue}
                        />
                      </div>

                      <Select
                        id="state"
                        name="state"
                        label="State"
                        value={values.state}
                        touched={touched.state}
                        error={errors.state}
                        className={classNames(classes.inlineAddressField, 'react-select-hollow m-b-sm m-r-sm')}
                        onBlur={setFieldTouched}
                        onChange={updateFieldValue}
                        options={states}
                        disabled={!states.length}
                        isSearchable
                        isClearable
                        styles={{
                          control: (styles) => ({
                            ...styles,
                            paddingLeft: '45px',
                            minHeight: '40px',
                            borderColor: '#B7B5B3',
                            borderRadius: '2px',
                          }),
                          menu: (styles) => ({ ...styles, zIndex: '100' }),
                        }}
                      />

                      <div className={classNames(classes.inlineAddressField, 'm-b-sm')}>
                        <Input
                          id="zip"
                          name="zip"
                          label="Zipcode"
                          className={classNames(classes.inlineInput, 'input--zip')}
                          value={values.zip}
                          error={errors.zip}
                          touched={touched.zip}
                          onBlur={setFieldTouched}
                          onChange={updateFieldValue}
                        />
                      </div>
                    </div>
                  </>
                )}

                {(isBorderCrossingType() || isInternationalType()) && (
                  <Select
                    id="destination"
                    name="destination"
                    label="Destination"
                    className="react-select-hollow m-b-sm"
                    value={values.destination}
                    touched={touched.destination}
                    error={errors.destination}
                    placeholder=""
                    options={destinations}
                    disabled={!destinations.length || !isLotSet}
                    onChange={() => null}
                    onChangeCallback={(value) => updateFieldValue('destination', value)}
                    onBlur={setFieldTouched}
                    onChangeAttribute="id"
                    formatOptionLabel={(option) => option.name}
                    isSearchable
                    isClearable
                    styles={{
                      control: (styles) => ({
                        ...styles,
                        paddingLeft: '80px',
                        minHeight: '40px',
                        borderColor: '#B7B5B3',
                        borderRadius: 0,
                      }),
                      menu: (styles) => ({ ...styles, zIndex: '100' }),
                    }}
                  />
                )}

                {isInternationalType() && (
                  <Select
                    id="usPort"
                    name="usPort"
                    label="Us Port"
                    className="react-select-hollow m-b-sm"
                    value={values.usPort}
                    touched={touched.usPort}
                    error={errors.usPort}
                    placeholder=""
                    options={ports}
                    disabled={!ports.length || !isLotSet}
                    onChange={() => null}
                    onChangeCallback={(value) => updateFieldValue('usPort', value)}
                    onBlur={setFieldTouched}
                    onChangeAttribute="id"
                    formatOptionLabel={(option) => option.name}
                    isSearchable
                    isClearable
                    styles={{
                      control: (styles) => ({
                        ...styles,
                        paddingLeft: '55px',
                        minHeight: '40px',
                        borderColor: '#B7B5B3',
                        borderRadius: 0,
                      }),
                      menu: (styles) => ({ ...styles, zIndex: '100' }),
                    }}
                  />
                )}
              </div>

              <div
                className={classNames('section section--order-details', {
                  'm-b-sm': values.isCustomQuote,
                  'm-b-lg': !values.isCustomQuote,
                })}
              >
                {isDomesticType() && (
                  <>
                    <div className="d-flex jc-sb f-wrap-sm">
                      <Input
                        id="contact"
                        name="contact"
                        label="Contact"
                        className={classNames(classes.inlineInput, 'input--contact m-b-sm m-r-sm')}
                        value={values.contact}
                        error={errors.contact}
                        touched={touched.contact}
                        onBlur={setFieldTouched}
                        onChange={updateFieldValue}
                      />

                      <Input
                        id="phone"
                        name="phone"
                        label="Phone"
                        className={classNames(classes.inlineInput, 'input--phone m-b-sm')}
                        value={values.phone}
                        error={errors.phone}
                        touched={touched.phone}
                        onBlur={setFieldTouched}
                        onChange={updateFieldValue}
                      />
                    </div>
                    <TextArea
                      id="instructions"
                      name="instructions"
                      label="Instructions (optional)"
                      value={values.instructions}
                      error={errors.instructions}
                      touched={touched.instructions}
                      className="textarea-hollow m-b-sm"
                      onChange={updateFieldValue}
                      onBlur={setFieldTouched}
                    />
                  </>
                )}

                {isInternationalType() && (
                  <>
                    <TooltipOnHover
                      content={
                        <>
                          Receiver of the vehicle in country of destination
                          <br />
                          First and Last Name, Address, Phone Number, Email
                        </>
                      }
                      trigger={
                        <>
                          Consignee details <i className="fa fa-question-circle text-navy" />
                        </>
                      }
                      triggerClassName={classes.tooltip}
                    />
                    <FormikTickbox
                      id="consigneeFromProfile"
                      name="consigneeFromProfile"
                      onChange={(name, value) => setConsigneeFromProfile(value)}
                      value={consigneeFromProfile}
                    >
                      Use from profile
                    </FormikTickbox>
                    <TextArea
                      id="consignee"
                      name="consignee"
                      label=""
                      value={values.consignee}
                      touched={touched.consignee}
                      error={errors.consignee}
                      className="textarea-hollow m-b-sm"
                      onChange={updateFieldValue}
                      onBlur={setFieldTouched}
                      rows={7}
                    />
                  </>
                )}
              </div>

              {isInternationalType() && (
                <div className="section section--profile m-b">
                  <h4>Profile Address:&nbsp;</h4>
                  <div className="d-flex ai-ct">
                    <span>{getProfileLabel()}</span>
                    {isDomesticProfile && (
                      <Button
                        className="btn-link m-l-sm"
                        label="Use from profile"
                        onClick={updateFromUserProfile}
                        style={{ color: '#337ab7', outline: 'none' }}
                      />
                    )}
                  </div>
                </div>
              )}

              <div className="section section--custom-quote m-b-lg">
                <div className="d-flex jc-sb f-wrap-sm">
                  <div
                    className={classNames('m-b-sm', {
                      'm-r-sm': isInternationalType(),
                    })}
                  >
                    <Input
                      id="customGroundQuote"
                      name="customGroundQuote"
                      label="Ground Quote"
                      className={classNames(classes.inlineInput, 'input--ground-quote')}
                      value={values.customGroundQuote}
                      error={errors.customGroundQuote}
                      touched={touched.customGroundQuote}
                      onBlur={setFieldTouched}
                      onChange={updateFieldValue}
                    />
                  </div>

                  {isInternationalType() && (
                    <div className="m-b-sm">
                      <Input
                        id="customOceanQuote"
                        name="customOceanQuote"
                        label="Ocean Quote"
                        className={classNames(classes.inlineInput, 'input--ocean-quote')}
                        value={values.customOceanQuote}
                        error={errors.customOceanQuote}
                        touched={touched.customOceanQuote}
                        onBlur={setFieldTouched}
                        onChange={updateFieldValue}
                      />
                    </div>
                  )}
                </div>
              </div>

              {isInternationalType() && (
                <div className="section section--custom-quote m-b-lg">
                  <div>
                    <FormikTickbox
                      id="insuranceEnabled"
                      name="insuranceEnabled"
                      onChange={(name, value) => setInsuranceEnabled(value)}
                      value={insuranceEnabled}
                    >
                      Add Shipping Order Insurance ({ShippingOrderService.CARGO_INSURANCE_PERCENTAGE}%)
                    </FormikTickbox>
                  </div>
                  {insuranceEnabled &&
                    (insurance > 0 ? (
                      <div className="alert alert-info">Insurance: ${insurance}</div>
                    ) : (
                      <div className={classNames(classes.mw800, 'd-flex form-group')}>
                        <div className={classNames(classes.inlineInput, 'm-r-sm')}>
                          <Input
                            id="price"
                            name="price"
                            placeholder="Vehicle price"
                            className={classNames(classes.inlineInput)}
                            value={values.price}
                            error={errors.price}
                            touched={touched.price}
                            onBlur={setFieldTouched}
                            onChange={updateFieldValue}
                          />
                        </div>
                        <div className={classNames(classes.inlineInput, 'm-r-sm')}>
                          <Button className="btn btn-primary" label="Calculate" onClick={calculateInsurance} />
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="section section--disclaimer m-b-sm">
              <div className="alert alert-danger" style={{ marginBottom: '0' }}>
                <i className="fa fa-exclamation-triangle fa-lg fa-pull-left" />
                Read disclosure text while placing the order and get a verbal confirmation from member:
                <br />
                I am now placing this shipping order for you.
                <br />
                {`Do you confirm that you have read, agree, and fully understand EasyHaul.com's Terms and
                            Conditions?`}
              </div>
            </div>

            <div className="section section--order-placement d-flex ai-ct jc-fe f-wrap">
              <div className="quote d-flex ai-ct" style={{ marginRight: '15px', fontSize: '16px' }}>
                {insuranceEnabled && insurance > 0 && (
                  <>
                    <span className="font-bold">Insurance:</span>&nbsp;<span>${insurance}</span>&nbsp;
                  </>
                )}
                <span className="font-bold">Quote:</span>&nbsp;
                {getQuoteTotal() > 0 ? <span>${getQuoteTotal()}</span> : <span>Not Available</span>}
              </div>

              <SubmitButton
                label="Order Shipping"
                className="btn btn-primary"
                isLoading={isSubmitting}
                disabled={
                  isLoading ||
                  isSubmitting ||
                  isEmpty(lotPurchase) ||
                  Object.keys(errors).length > 0 ||
                  !hasValidCustomQuote()
                }
              />
            </div>
          </form>
        </>
      )}
    </Formik>
  );
}

ShippingOrderForm.propTypes = {
  lotPurchase: LotPurchaseShape.isRequired,
  userProfile: CustomerShape.isRequired,
  setLotPurchase: PropTypes.func.isRequired,
  searchMode: PropTypes.bool,
};

ShippingOrderForm.defaultProps = {
  searchMode: false,
};

export default ShippingOrderForm;

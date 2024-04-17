import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import NumberService from 'frontend/js/lib/utils/NumberService';
import Tickbox from 'frontend/js/components/Form/Tickbox';
import MyLocation from 'frontend/js/components/MyLocation';
import PlacesInputPlane from 'frontend/js/components/Form/PlaneTheme/PlacesInputPlane';
import DatePicker from 'frontend/js/components/DatePicker';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import CheckmarkRoundGreenSvg from 'frontend/images/shared/various/checkmark-round-green.svg';
import DetailsSvg from './img/ic_details.svg';
import useStyles from './useStyles';

function InstantOffer({ instantOffer, formik, isFinal }) {
  const classes = useStyles();
  const intl = useIntl();
  const hasRange = Boolean(instantOffer?.rangeLow) && Boolean(instantOffer?.rangeHigh);
  const hasOfferAmount = Boolean(instantOffer?.offerAmount);
  const { zip, pickupCity, pickupStateCode } = formik.values;
  const location = [pickupCity, pickupStateCode].filter(Boolean).join(', ');

  const timeRanges = [
    {
      value: '7 am - 11 am',
      label: '7 am - 11 am',
    },
    {
      value: '11 am - 3 pm',
      label: '11 am - 3 pm',
    },
    {
      value: '3 pm - 6 pm',
      label: '3 pm - 6 pm',
    },
  ];

  return (
    <>
      <div className={classes.root}>
        {isFinal ? (
          <>
            {hasOfferAmount ? (
              <>
                <img
                  src={CheckmarkRoundGreenSvg}
                  alt="Checkmark"
                  width={48}
                  height={48}
                  className={classes.checkmarkIcon}
                  style={{ marginBottom: 4 }}
                />
                <div className={classes.title} style={{ maxWidth: '100%' }}>
                  {intl.formatMessage(
                    { id: 'sellYourCarPage.instantOffer.success.title' },
                    { amount: NumberService.formatCurrency(instantOffer.offerAmount) },
                  )}
                </div>
                <div className={classes.desc}>
                  {intl.formatMessage({ id: 'sellYourCarPage.instantOffer.success.desc' })}
                </div>
                <div className={classes.truck} />
                <div className={classes.pickUp}>
                  <Tickbox
                    id="schedulePickUp"
                    name="schedulePickUp"
                    value={formik.values.schedulePickUp}
                    error={formik.errors.schedulePickUp}
                    touched={formik.touched.schedulePickUp}
                    onChange={formik.setFieldValue}
                    className={classes.tickbox}
                  >
                    <strong>{intl.formatMessage({ id: 'sellYourCarPage.label.schedulePickUpForYourVehicle' })}</strong>
                  </Tickbox>
                  <div className={classes.pickUpFields}>
                    <div className={classes.pickupAddress}>
                      <PlacesInputPlane
                        id="address"
                        name="address"
                        label=""
                        placeholder={
                          (location
                            ? `${intl.formatMessage({
                                id: 'shared.label.address',
                              })}, ${location} ${zip}`
                            : null) ||
                          intl.formatMessage({
                            id: 'sellYourCarPage.pickupInfoForm.placeholder.enterAddressForPickUp',
                          })
                        }
                        value={formik.values.address}
                        error={formik.errors.address}
                        touched={formik.touched.address}
                        onBlur={formik.setFieldTouched}
                        disableBlurSelect
                        restrictAddress
                        country=""
                        onChange={(name, value) => {
                          if (typeof value === 'object') {
                            const { address: gAddress, city: gCity, state_code: gState, zip: gZip } = value;
                            formik.setFieldValue(name, [gAddress, gCity, gState, gZip].filter(Boolean).join(' '));
                            formik.setFieldValue('pickupAddress', gAddress);
                            formik.setFieldValue('pickupCity', gCity);
                            formik.setFieldValue('pickupStateCode', gState);
                            formik.setFieldValue('zip', gZip);
                          } else {
                            formik.setFieldValue(name, value);
                          }
                        }}
                        applyMask={(val) => {
                          if (typeof val !== 'object' || val === null) {
                            return val;
                          }

                          const { address: gAddress, city: gCity, state_code: gState, zip: gZip } = val;
                          return [gAddress, gCity, gState, gZip].filter((frag) => !!frag).join(', ');
                        }}
                        onError={formik.setFieldError}
                        isShowGoogleMapIcon={false}
                        disabled={!formik.values.schedulePickUp}
                        content={
                          <MyLocation onLocation={(data) => formik.setFieldValue('address', data.formattedAddress)} />
                        }
                      />
                    </div>
                    <div>
                      <DatePicker
                        initialValue={instantOffer?.pickupDate ? new Date(instantOffer.pickupDate) : ''}
                        className={classnames(
                          classes.datePicker,
                          !!formik.errors.pickupDate && formik.touched.pickupDate && 'is-error',
                        )}
                        placeholder={intl.formatMessage({
                          id: 'shared.label.date',
                        })}
                        onChange={(value) => {
                          formik.setFieldValue('pickupDate', value && DateTimeService.format(value));
                        }}
                        disabled={!formik.values.schedulePickUp}
                        shouldDisableDate={(date) =>
                          DateTimeService.isWeekend(date) ||
                          DateTimeService.isToday(date) ||
                          DateTimeService.isTomorrow(date) ||
                          DateTimeService.isPast(date)
                        }
                        clearIconDisabled
                      />
                      {!!formik.errors.pickupDate && formik.touched.pickupDate && (
                        <div className="form-hint-plane">{formik.errors.pickupDate}</div>
                      )}
                    </div>
                    <div>
                      <SelectPlane
                        id="pickupTime"
                        name="pickupTime"
                        placeholder={intl.formatMessage({
                          id: 'shared.label.time',
                        })}
                        className={classes.select}
                        value={formik.values.pickupTime}
                        options={timeRanges}
                        error={formik.errors.pickupTime}
                        touched={formik.touched.pickupTime}
                        onChange={formik.setFieldValue}
                        onBlur={formik.setFieldTouched}
                        disabled={!formik.values.schedulePickUp}
                        isNativeLabelDisabled
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <img
                  src={CheckmarkRoundGreenSvg}
                  alt="Checkmark"
                  width={48}
                  height={48}
                  className={classes.checkmarkIcon}
                />
                <div className={classes.title} style={{ maxWidth: '100%' }}>
                  {`${intl.formatMessage({ id: 'sellYourCarPage.instantOffer.notEnoughInfo.title' })} ${
                    instantOffer.title
                  }`}
                </div>
                <div className={classes.desc}>
                  {`${intl.formatMessage({ id: 'sellYourCarPage.instantOffer.notEnoughInfo.desc' })} ${
                    instantOffer.title
                  }.`}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {hasRange ? (
              <>
                <img
                  src={CheckmarkRoundGreenSvg}
                  alt="Checkmark"
                  width={48}
                  height={48}
                  className={classes.checkmarkIcon}
                />
                <div className={classes.title} style={{ maxWidth: '100%' }}>
                  {intl.formatMessage(
                    { id: 'sellYourCarPage.instantOffer.provideMoreInfo.title1' },
                    {
                      br: <br className="sm-hide" />,
                      rangeLow: NumberService.formatCurrency(instantOffer.rangeLow),
                      rangeHigh: NumberService.formatCurrency(instantOffer.rangeHigh),
                    },
                  )}
                </div>
                <div className={classes.desc} style={{ maxWidth: '100%' }}>
                  {intl.formatMessage(
                    { id: 'sellYourCarPage.instantOffer.provideMoreInfo.desc1' },
                    { isNeedVin: !(instantOffer.vin || instantOffer.vehicleVin) },
                  )}
                </div>
              </>
            ) : (
              <>
                <img src={DetailsSvg} alt="Details" width={48} height={48} className={classes.detailsIcon} />
                <div className={classes.title}>
                  {intl.formatMessage({ id: 'sellYourCarPage.instantOffer.provideMoreInfo.title2' })}
                </div>
                <div className={classes.desc} style={{ maxWidth: '100%' }}>
                  {intl.formatMessage(
                    { id: 'sellYourCarPage.instantOffer.provideMoreInfo.desc2' },
                    { isNeedVin: !(instantOffer.vin || instantOffer.vehicleVin) },
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

InstantOffer.propTypes = {
  formik: PropTypes.object.isRequired,
  instantOffer: PropTypes.object,
  isFinal: PropTypes.bool,
};

InstantOffer.defaultProps = {
  instantOffer: {},
  isFinal: false,
};

export default InstantOffer;

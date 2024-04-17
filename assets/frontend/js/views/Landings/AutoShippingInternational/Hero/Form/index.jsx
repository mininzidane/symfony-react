/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import { useSnackbar } from 'notistack';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useIntl from 'frontend/js/hooks/useIntl';
import TrackingService from 'frontend/js/api/TrackingService';
import RouterService from 'frontend/js/api/RouterService';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import Button from 'frontend/js/components/Button';
import ValidationSchema from './ValidationSchema';
import arrowImg from './img/arrow.svg';
import ShipSvg from './img/ship.svg';
import useStyles from './useStyles';

function TrackNewOrderForm() {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const trackingService = new TrackingService();
  const { email } = useCustomerHelper();
  const intl = useIntl();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: { vin: '', email },
    validationSchema: ValidationSchema,
    onSubmit: async ({ email: emailOrToken, vin }) => {
      const eventTrackingService = new EventTrackingService();
      eventTrackingService.sendEvent({
        name: 'track_new_order_btn_click',
        step: 'abm_auto_shipping_international_page',
      });

      setLoading(true);

      try {
        const response = await trackingService.getShippingOrderTracking({ emailOrToken, vin });
        setLoading(false);

        if (response.shippingOrder) {
          const { customer, token, lot } = response.shippingOrder[0] || {};
          RouterService.redirect('shippingTracking', null, false, {
            emailOrToken: token || customer.email,
            vin: lot.vin,
          });
        }
      } catch (err) {
        const { response: { data: { errors } = {} } = {} } = err;

        setLoading(false);
        enqueueSnackbar(
          intl.formatMessage({
            id: errors?.errors?.unavailable ? 'trackMyOrderPage.noResultsError' : 'form.error.general',
          }),
          { variant: 'error' },
        );
      }
    },
  });

  const translationSets = {
    formTitle: intl.formatMessage({ id: 'trackMyOrderPage.trackMyOrder' }),
    email: intl.formatMessage({ id: 'shared.label.email' }),
    vin: intl.formatMessage({ id: 'shared.label.vinNumber' }),
    submit: intl.formatMessage({ id: 'shared.cta.trackMyOrder' }),
  };

  function scrollTo() {
    ScrollService.smoothScrollIntoViewById('shipping-calculator-container');
  }

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      <InputPlane
        className={classes.field}
        id="email"
        name="email"
        placeholder={translationSets.email}
        value={formik.values.email}
        touched={formik.touched.email}
        error={formik.errors.email}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
        onError={formik.setFieldError}
        errorColor="yellow"
      />
      <InputPlane
        className={classes.field}
        id="vin"
        name="vin"
        placeholder={translationSets.vin}
        value={formik.values.vin}
        touched={formik.touched.vin}
        error={formik.errors.vin}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
        onError={formik.setFieldError}
        errorColor="yellow"
      />
      <Button
        type="submit"
        label={
          <>
            <span>{translationSets.submit}</span>
            <img className={classes.btnArrow} src={arrowImg} alt="arrow" />
          </>
        }
        size="lg"
        color="yellow"
        className={classes.formSubmitButton}
        isLoading={loading}
      />

      <div className={classes.separator}>
        <FormattedMessage id="shared.label.or" />
      </div>

      <button type="button" className={classes.calc} onClick={scrollTo}>
        <strong>
          <FormattedMessage id="autoShippingInternationalPage.placeShippingOrder" />
        </strong>
        <img src={ShipSvg} alt="Ship" />
      </button>
    </form>
  );
}

export default TrackNewOrderForm;

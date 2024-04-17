import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import Button from 'frontend/js/components/Button';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import ShippingCoverageForm from './ShippingCoverageForm';
import validationSchema from './validationSchema';
import useStyles from './useStyles';

function ShippingCoverageModal({ isOpen, onClose, title, shippingOrder }) {
  const classes = useStyles();
  const intl = useIntl();
  const [submitError, setSubmitError] = useState(null);

  async function handleSubmit(values, { setSubmitting }) {
    setSubmitting(true);
    try {
      const payload = {
        insuranceType: values.insuranceType,
        ...(values.isLotPurchase ? {} : { vehiclePrice: values.vehiclePrice }),
        ...(shippingOrder.unlimitedAuctionStorage ? {} : { unlimitedAuctionStorage: values.unlimitedAuctionStorage }),
      };
      await ShippingOrderService.updateShippingOrder(shippingOrder.token, payload);
      RouterService.redirect('shippingPayment', null, false, { token: shippingOrder.token });
    } catch (e) {
      const { response: { data: { errors } = {}, status } = {} } = e;
      let messages = intl.formatMessage({
        id: 'form.error.general',
      });
      if (status === 400 && typeof errors === 'object') {
        messages = Object.values(errors).join(' ');
      }
      setSubmitError(messages);
    }

    setSubmitting(false);
  }

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      isLotPurchase: Boolean(shippingOrder?.lotPurchase),
      vehiclePrice: shippingOrder?.lotPurchase?.auctionFinalBid || '',
      insuranceType: shippingOrder?.insuranceType || ShippingOrderService.INSURANCE_TOTAL_LOSS_COVERAGE_ID,
      unlimitedAuctionStorage: shippingOrder?.unlimitedAuctionStorage || false,
    },
    onSubmit: handleSubmit,
  });

  function handleClose() {
    setSubmitError(null);
    onClose();
  }

  return (
    <ModalWindow isOpen={isOpen} onClose={handleClose} hasCloseButton={false} className={classes.root} size="md">
      <ModalWindowHeader title={title} onClose={handleClose} />
      <ModalWindowBody hasFooter>
        <>
          <ShippingCoverageForm formik={formik} shippingOrder={shippingOrder} />
          {submitError && <div className={classes.error}>{submitError}</div>}
        </>
      </ModalWindowBody>
      <ModalWindowFooter>
        <Button
          onClick={formik.submitForm}
          label={intl.formatMessage({ id: 'shared.cta.payNow' })}
          color="blue"
          isDisabled={!formik.isValid}
          isLoading={formik.isSubmitting}
        />
      </ModalWindowFooter>
    </ModalWindow>
  );
}

ShippingCoverageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  shippingOrder: PropTypes.object.isRequired,
};

export default ShippingCoverageModal;

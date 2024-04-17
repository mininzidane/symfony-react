/* eslint-disable react/prop-types */
import React from 'react';
import { useFormik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import { useMutation } from 'react-query';
import BrokerService from 'frontend/js/api/BrokerService';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import Button from 'frontend/js/components/Button';
import validationSchema from './ValidationSchema';

function EditPhoneModal({ isOpen, onClose, bidders, setBidders, bidderId }) {
  const intl = useIntl();
  const { mutateAsync: updateBidder, isLoading } = useMutation((payload) => BrokerService.updateBidder(payload));
  const bidder = bidders.find((v) => v.id === bidderId) || {};

  function updateBidderEntry(phoneNumber) {
    const nextBidders = bidders.map((v) => (v.id === bidderId ? { ...v, phoneNumber } : v));

    setBidders(nextBidders);
  }

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      phoneNumber: bidder.phoneNumber || '',
    },
    onSubmit: (values) => {
      const { phoneNumber } = values;

      if (phoneNumber === bidder.phoneNumber) {
        onClose();
        return;
      }

      updateBidder({ bidderId, phoneNumber }).then(() => {
        onClose();
        updateBidderEntry(phoneNumber);
      });
    },
  });

  return (
    <div>
      <ModalWindow isOpen={isOpen} onClose={onClose}>
        <ModalWindowHeader
          title={intl.formatMessage({ id: 'brokerManagerPage.editPhoneModal.title' })}
          onClose={onClose}
        />
        <ModalWindowBody hasFooter isOverflowVisible>
          <form onSubmit={formik.handleSubmit}>
            <PhoneInputPlane
              id="phoneNumber"
              name="phoneNumber"
              label={intl.formatMessage({ id: 'shared.label.phoneNumber' })}
              value={formik.values.phoneNumber}
              error={formik.errors.phoneNumber}
              touched={formik.touched.phoneNumber}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              isLabelOnTop
            />
          </form>
        </ModalWindowBody>
        <ModalWindowFooter>
          <Button
            label={intl.formatMessage({ id: 'shared.cta.save' })}
            onClick={formik.handleSubmit}
            isLoading={isLoading}
          />
        </ModalWindowFooter>
      </ModalWindow>
    </div>
  );
}

export default EditPhoneModal;

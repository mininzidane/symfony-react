/* eslint-disable react/prop-types */
import React from 'react';
import { useFormik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import { useMutation } from 'react-query';
import BrokerService from 'frontend/js/api/BrokerService';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import Button from 'frontend/js/components/Button';
import validationSchema from './ValidationSchema';

function EditNameModal({ isOpen, onClose, bidders, setBidders, bidderId }) {
  const intl = useIntl();
  const { mutateAsync: updateBidder, isLoading } = useMutation((payload) => BrokerService.updateBidder(payload));
  const bidder = bidders.find((v) => v.id === bidderId) || {};

  function updateBidderEntry(firstName, lastName) {
    const updatedBidderSettings = { firstName, lastName };
    const nextBidders = bidders.map((v) => (v.id === bidderId ? { ...v, ...updatedBidderSettings } : v));

    setBidders(nextBidders);
  }

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      firstName: bidder.firstName || '',
      lastName: bidder.lastName || '',
    },
    onSubmit: (values) => {
      const { firstName, lastName } = values;

      if (`${bidder.firstName} ${bidder.lastName}` === `${firstName} ${lastName}`) {
        onClose();
        return;
      }

      updateBidder({ bidderId, firstName, lastName }).then(() => {
        onClose();
        updateBidderEntry(firstName, lastName);
      });
    },
  });

  return (
    <div>
      <ModalWindow isOpen={isOpen} onClose={onClose}>
        <ModalWindowHeader
          title={intl.formatMessage({ id: 'brokerManagerPage.editNameModal.title' })}
          onClose={onClose}
        />
        <ModalWindowBody hasFooter>
          <form onSubmit={formik.handleSubmit}>
            <InputPlane
              className="mb-15"
              id="firstName"
              name="firstName"
              label={intl.formatMessage({ id: 'shared.label.firstName' })}
              value={formik.values.firstName}
              touched={formik.touched.firstName}
              error={formik.errors.firstName}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              onError={formik.setFieldError}
              isLabelOnTop
            />

            <InputPlane
              id="lastName"
              name="lastName"
              label={intl.formatMessage({ id: 'shared.label.lastName' })}
              value={formik.values.lastName}
              touched={formik.touched.lastName}
              error={formik.errors.lastName}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              onError={formik.setFieldError}
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

export default EditNameModal;

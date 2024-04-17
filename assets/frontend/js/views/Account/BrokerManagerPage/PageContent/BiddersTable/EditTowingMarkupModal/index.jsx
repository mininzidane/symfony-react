/* eslint-disable react/prop-types */
import React from 'react';
import { useFormik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import { useMutation } from 'react-query';
import BrokerService from 'frontend/js/api/BrokerService';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import Button from 'frontend/js/components/Button';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import validationSchema from './ValidationSchema';

function EditTowingMarkupModal({ isOpen, onClose, bidders, setBidders, bidderId }) {
  const intl = useIntl();
  const { mutateAsync: updateBidder, isLoading } = useMutation((payload) => BrokerService.updateBidder(payload));
  const bidder = bidders.find((v) => v.id === bidderId) || {};

  function updateBidderEntry(towingMarkup) {
    const nextBidders = bidders.map((v) => (v.id === bidderId ? { ...v, towingMarkup } : v));

    setBidders(nextBidders);
  }

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      towingMarkup: bidder.towingMarkup || '',
    },
    onSubmit: (values) => {
      const { towingMarkup } = values;

      if (towingMarkup === bidder.towingMarkup) {
        onClose();
        return;
      }

      updateBidder({ bidderId, towingMarkup }).then(() => {
        onClose();
        updateBidderEntry(towingMarkup);
      });
    },
  });

  return (
    <div>
      <ModalWindow isOpen={isOpen} onClose={onClose}>
        <ModalWindowHeader
          title={intl.formatMessage({ id: 'brokerManagerPage.editTowingMarkup.title' })}
          onClose={onClose}
        />
        <ModalWindowBody hasFooter isOverflowVisible>
          <form onSubmit={formik.handleSubmit}>
            <InputPlane
              id="towingMarkup"
              name="towingMarkup"
              label={intl.formatMessage({ id: 'shared.label.towingMarkup' })}
              value={formik.values.towingMarkup}
              error={formik.errors.towingMarkup}
              touched={formik.touched.towingMarkup}
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

export default EditTowingMarkupModal;

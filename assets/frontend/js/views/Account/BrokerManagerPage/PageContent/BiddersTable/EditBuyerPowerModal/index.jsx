/* eslint-disable react/prop-types */
import React from 'react';
import { useFormik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import { useMutation, useQueryClient } from 'react-query';
import BrokerService, { createOrUpdateBidder } from 'frontend/js/api/BrokerService';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import Button from 'frontend/js/components/Button';
import RadioButton from 'frontend/js/components/Form/RadioButton';
import NumberService from 'frontend/js/lib/utils/NumberService';
import validationSchema from './ValidationSchema';

function EditBuyerPowerModal({ isOpen, onClose, bidders, bidderId }) {
  const intl = useIntl();

  const queryClient = useQueryClient();

  const { mutateAsync: updateBidder, isLoading } = useMutation((payload) => BrokerService.updateBidder(payload), {
    onSuccess: createOrUpdateBidder(queryClient),
  });

  const bidder = bidders.find((v) => v.id === bidderId) || {};

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      blCount: (bidder.blCount || '').toString(),
      blAmount: bidder.blAmount ? NumberService.formatCurrency(bidder.blAmount) : '',
      blAmountFixed: bidder.blAmountFixed || false ? '1' : '0',
    },
    onSubmit: (values) => {
      let { blAmount, blCount, blAmountFixed } = values;
      blAmount = parseInt(blAmount.replace(/[^0-9.]/g, ''), 10);
      blCount = parseInt(blCount, 10);
      blAmountFixed = Boolean(parseInt(blAmountFixed, 10));

      if (
        `${bidder.blCount} ${bidder.blAmount} ${bidder.blAmountFixed}` === `${blCount} ${blAmount} ${blAmountFixed}`
      ) {
        onClose();
        return;
      }

      let params = { blAmountFixed };
      if (blAmountFixed) {
        params = { ...params, ...{ blCount, blAmount } };
      }

      updateBidder({ bidderId, ...params }).then(() => {
        onClose();
      });
    },
  });

  return (
    <div>
      <ModalWindow isOpen={isOpen} onClose={onClose}>
        <ModalWindowHeader title={intl.formatMessage({ id: 'brokerManagerPage.title' })} onClose={onClose} />
        <ModalWindowBody hasFooter>
          <form onSubmit={formik.handleSubmit}>
            <RadioButton
              label={intl.formatMessage({ id: 'brokerManagerPage.label.setCustomBuyerPower' })}
              name="blAmountFixed"
              id="blAmountFixed1"
              value="1"
              isChecked={parseInt(formik.values.blAmountFixed, 10)}
              onChange={formik.setFieldValue}
            />
            <RadioButton
              label={intl.formatMessage({ id: 'brokerManagerPage.label.withoutBuyerPower' })}
              name="blAmountFixed"
              id="blAmountFixed0"
              value="0"
              onChange={formik.setFieldValue}
              isChecked={!parseInt(formik.values.blAmountFixed, 10)}
              className="mt-5"
            />
            {formik.values.blAmountFixed === '1' && (
              <div className="mt-5">
                <InputPlane
                  className="mb-15"
                  id="blCount"
                  name="blCount"
                  label={intl.formatMessage({ id: 'shared.label.blCount' })}
                  value={formik.values.blCount}
                  touched={formik.touched.blCount}
                  error={formik.errors.blCount}
                  onChange={formik.setFieldValue}
                  onBlur={formik.setFieldTouched}
                  onError={formik.setFieldError}
                  isLabelOnTop
                />

                <InputPlane
                  id="blAmount"
                  name="blAmount"
                  label={intl.formatMessage({ id: 'shared.label.blAmount' })}
                  value={formik.values.blAmount}
                  touched={formik.touched.blAmount}
                  error={formik.errors.blAmount}
                  onChange={formik.setFieldValue}
                  onBlur={formik.setFieldTouched}
                  onError={formik.setFieldError}
                  mask="currency"
                  isLabelOnTop
                />
              </div>
            )}
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

export default EditBuyerPowerModal;

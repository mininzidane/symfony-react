import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import { useSnackbar } from 'notistack';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Button from 'frontend/js/components/Button';
import CustomerService from 'frontend/js/api/CustomerService';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import WireTransferService from 'frontend/js/api/WireTransferService';
import UploadDocumentForm from './UploadDocumentForm';
import ProvideConsigneeForm from './ProvideConsigneeForm';
import WireConfirmationForm from './WireConfirmationForm';
import useForm from './useForm';
import useStyles from './useStyles';

function UploadDocumentModal({ id, isOpen, onClose, title, shippingOrder }) {
  const classes = useStyles();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const { id: customerId } = useCustomerHelper();
  const {
    isSubmitting,
    isValidForm,
    submitError,
    setSubmitError,
    setIsValidForm,
    setForm,
    setIsSubmitting,
    submitForm,
  } = useForm();

  function getFormData(values, key) {
    const formData = new FormData();
    for (let i = 0; i < values.length; i++) {
      formData.append(`${key}${i}`, values[i]);
    }
    return formData;
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setSubmitError(null);
    let values;
    try {
      values = await submitForm();
    } catch (e) {
      setIsSubmitting(false);
      return;
    }

    try {
      if (id === 'userId') {
        const formData = getFormData(values.documents, 'id_document_');
        await CustomerService.uploadUserId(customerId, formData);
      } else if (id === 'bos') {
        const formData = getFormData(values.documents, 'document_');
        await ShippingOrderService.uploadBos(shippingOrder.token, formData);
      } else if (id === 'wireConfirmation') {
        const wireTransferService = new WireTransferService();
        const formData = getFormData(values.documents, 'document_');
        formData.append('amount', values.amount);
        await wireTransferService.uploadWireTransferConfirmationFiles(
          `?token=${shippingOrder.invoice.token}`,
          formData,
        );
      } else if (id === 'consignee') {
        await ShippingOrderService.updateShippingOrder(shippingOrder.token, { consignee: values.consignee });
      }

      enqueueSnackbar(intl.formatMessage({ id: 'form.message.informationSaved' }));
      onClose(true);
    } catch (e) {
      const { response: { data: { errors } = {}, status } = {} } = e;
      let messages = intl.formatMessage({
        id: 'form.error.fileUpload.serverError',
      });
      if (status === 400 && typeof errors === 'object') {
        messages = Object.values(errors).join(' ');
      }
      setSubmitError(messages);
    }

    setIsSubmitting(false);
  }

  function handleClose() {
    setSubmitError(null);
    onClose();
  }

  function getSubmitLabel() {
    if (id === 'consignee') {
      return intl.formatMessage({ id: 'shared.cta.save' });
    }
    return intl.formatMessage({ id: 'shared.cta.uploadFile' });
  }

  return (
    <ModalWindow isOpen={isOpen} onClose={handleClose} hasCloseButton={false} className={classes.root}>
      <ModalWindowHeader title={title} onClose={handleClose} />
      <ModalWindowBody hasFooter>
        <>
          {(id === 'userId' || id === 'bos') && <UploadDocumentForm setForm={setForm} setIsValid={setIsValidForm} />}
          {id === 'consignee' && <ProvideConsigneeForm setForm={setForm} setIsValid={setIsValidForm} />}
          {id === 'wireConfirmation' && <WireConfirmationForm setForm={setForm} setIsValid={setIsValidForm} />}
          {submitError && <div className={classes.error}>{submitError}</div>}
        </>
      </ModalWindowBody>
      <ModalWindowFooter>
        <Button
          onClick={handleSubmit}
          label={getSubmitLabel()}
          color="blue"
          isDisabled={!isValidForm}
          isLoading={isSubmitting}
        />
      </ModalWindowFooter>
    </ModalWindow>
  );
}

UploadDocumentModal.defaultProps = {
  id: null,
};

UploadDocumentModal.propTypes = {
  id: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  shippingOrder: PropTypes.object.isRequired,
};

export default UploadDocumentModal;

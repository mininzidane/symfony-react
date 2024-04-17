import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import useIntl from 'frontend/js/hooks/useIntl';
import PurchaseService from 'frontend/js/api/PurchaseService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import Button from 'frontend/js/components/Button';
import Amount from 'frontend/js/components/Amount';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import RadioGroup from 'frontend/js/components/Form/RadioGroup';
import RouterService from 'frontend/js/api/RouterService';
import WarningSvg from 'frontend/images/shared/various/alert-round-orange.svg';
import useStyles from './useStyles';

function RelistModal({ isOpen, onClose, lotPurchaseToken, title }) {
  const classes = useStyles();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading } = useQuery(
    ['purchase-cancellation-fee', lotPurchaseToken],
    () => PurchaseService.getCancellationFee(lotPurchaseToken),
    {
      cacheTime: 0,
    },
  );

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const OPTIONS = [
    { value: 'Bid on wrong lot', label: intl.formatMessage({ id: 'relistModal.reasonOptions.bidOnWrongLot' }) },
    { value: 'Lot condition', label: intl.formatMessage({ id: 'relistModal.reasonOptions.lotCondition' }) },
    { value: 'Ownership documents', label: intl.formatMessage({ id: 'relistModal.reasonOptions.ownershipDocuments' }) },
    { value: 'Unable to export', label: intl.formatMessage({ id: 'relistModal.reasonOptions.unableToExport' }) },
    {
      value: 'Don’t like this vehicle',
      label: intl.formatMessage({ id: 'relistModal.reasonOptions.dontLikeThisVehicle' }),
    },
  ];
  const [reason, setReason] = useState(OPTIONS[0].value);
  const [isSubmitting, setSubmitting] = useState(false);

  async function cancelPurchase() {
    setSubmitting(true);
    try {
      const { invoiceIsPaid, invoiceToken } = await PurchaseService.cancelPurchase(lotPurchaseToken, { reason });
      if (!invoiceIsPaid) {
        RouterService.redirect('invoicePayment', null, false, { token: invoiceToken });
      } else {
        RouterService.reload();
        window.open(RouterService.getRoute('invoiceView', null, false, { token: invoiceToken }), '_blank');
      }
    } catch (error) {
      const errors = error.response?.data?.title || intl.formatMessage({ id: 'form.error.general' });
      enqueueSnackbar(errors, { variant: 'error' });
    }
    setSubmitting(false);
  }

  function handleClose() {
    setIsConfirmOpen(false);
    onClose();
  }

  if (!data?.amount && !isLoading) {
    return null;
  }

  return (
    <ModalWindow isOpen={isOpen} onClose={handleClose} width={428}>
      <ModalWindowHeader title={title} onClose={handleClose} />
      <ModalWindowBody className={classes.body}>
        {isLoading ? (
          <div className={classes.loader}>
            <SpinnerWheel size={34} thickness={3} isCentered color="blue" />
          </div>
        ) : (
          <>
            {isConfirmOpen ? (
              <>
                <div className={classes.title}>{intl.formatMessage({ id: 'relistModal.pleaseChooseReason' })}</div>
                <RadioGroup
                  name="reason"
                  onChange={(_, value) => setReason(value)}
                  value={reason}
                  options={OPTIONS}
                  size="sm"
                  className={classes.radioGroup}
                />
                <Button
                  onClick={cancelPurchase}
                  label={intl.formatMessage({ id: 'shared.cta.confirm' })}
                  isLoading={isSubmitting}
                />
              </>
            ) : (
              <div>
                <div className={classes.card}>
                  <img src={WarningSvg} alt="Warning" width={20} height={20} className={classes.warningIcon} />
                  <div>
                    <FormattedMessage
                      id="relistModal.youCanCancelYourPurchaseNow"
                      values={{ amount: <Amount value={data.amount} hasCurrency /> }}
                    />
                  </div>
                  <Button
                    isInline
                    onClick={() => setIsConfirmOpen(true)}
                    label={intl.formatMessage({ id: 'relistModal.cancelPurchaseNow' })}
                    className="mt-15"
                  />
                </div>
                <div className={classes.agreement}>{intl.formatMessage({ id: 'relistModal.agreement' })}</div>
              </div>
            )}
          </>
        )}
      </ModalWindowBody>
    </ModalWindow>
  );
}

RelistModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  lotPurchaseToken: PropTypes.string.isRequired,
  title: PropTypes.string,
};

RelistModal.defaultProps = {
  title: '',
};
export default RelistModal;

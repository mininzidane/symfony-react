import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useQuery } from 'react-query';
import useIntl from 'frontend/js/hooks/useIntl';
import ConsignmentService from 'frontend/js/api/ConsignmentService';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import Tickbox from 'frontend/js/components/Form/Tickbox';
import Select from 'frontend/js/components/Select';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import ConsignmentDetails from '../_Shared/ConsignmentDetails';
import useStyles from './useStyles';

const RESERVE_OPTIONS = { YES: 'YES', BTBA: 'BTBA' };

function RerunModal({ isOpen, onClose, consignment, updateConsignment }) {
  const classes = useStyles();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const { data: { data } = {}, isLoading } = useQuery(
    ['bid-approval-reruneligible', consignment.copartLot],
    () => ConsignmentService.bidApprovalReruneligible(consignment.copartLot),
    { enabled: isOpen, cacheTime: 0 },
  );

  const isOnApprovalBTBA = consignment.bidApprovalStatus === ConsignmentService.BID_APPROVAL_STATUSES.ON_APPROVAL_BTBA;

  async function bidApprovalRerun(consignmentId, payload) {
    try {
      const {
        data: response,
        errorCode,
        errorMessage,
      } = await ConsignmentService.bidApprovalRerun(consignmentId, payload);

      if (errorCode || errorMessage) {
        enqueueSnackbar(`${errorCode} ${errorMessage}`, { variant: 'error' });
      } else {
        updateConsignment(response);
        enqueueSnackbar(
          intl.formatMessage(
            { id: 'consignment.rerunModal.lotHasBeenRerunInCopart' },
            { lot: response.copartLot, location: response.copartLocation.name },
          ),
          {
            variant: 'success',
          },
        );
        onClose();
      }
    } catch (error) {
      const message = error.response?.data?.title || intl.formatMessage({ id: 'form.error.general' });
      enqueueSnackbar(message || 'An error occurred on submit', { variant: 'error' });
    }
  }

  const formik = useFormik({
    initialValues: {
      ncsDateFlag: Boolean(data?.ncsDate) && data?.ncsDate > 0,
      reserve: isOnApprovalBTBA ? RESERVE_OPTIONS.BTBA : RESERVE_OPTIONS.YES,
      reserveAmount: NumberService.formatCurrency(consignment.reserveAmount || 0),
    },
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const isBTBA = values.reserve === RESERVE_OPTIONS.BTBA;
      const saleDate = new Date(values.ncsDateFlag ? data?.ncsDate : data?.regularDate);
      await bidApprovalRerun(consignment.copartLot, {
        ncsDateFlag: values.ncsDateFlag,
        btba: isBTBA,
        reserve: isBTBA ? null : Number(values.reserveAmount.replace(/[^0-9.]/g, '')),
        saleDate: DateTimeService.format(saleDate, 'yyyy-MM-dd'),
      });
      setSubmitting(false);
    },
  });

  const isAvailable = Boolean(data?.regularDate);

  const reserveOptions = [
    { label: RESERVE_OPTIONS.YES, value: RESERVE_OPTIONS.YES },
    isOnApprovalBTBA ? { label: RESERVE_OPTIONS.BTBA, value: RESERVE_OPTIONS.BTBA } : null,
  ].filter(Boolean);

  const nextSaleDate = formik.values.ncsDateFlag ? data?.ncsDate : data?.regularDate;

  return (
    <ModalWindow onClose={onClose} isOpen={isOpen} width={394}>
      <ModalWindowHeader title={intl.formatMessage({ id: 'consignment.rerunModal.title' })} onClose={onClose} />
      <ModalWindowBody className={classes.body}>
        <ConsignmentDetails consignment={consignment} />
        {isLoading ? (
          <div className={classes.loader}>
            <SpinnerWheel size={24} thickness={2} isCentered />
          </div>
        ) : (
          <>
            {!isAvailable ? (
              <div>{intl.formatMessage({ id: 'consignment.rerunModal.rerunIsNotAvailable' })}</div>
            ) : (
              <>
                <div>
                  <strong>{intl.formatMessage({ id: 'consignment.rerunModal.pleaseVerifyRerun' })}</strong>
                </div>
                <div className="mt-10">
                  {intl.formatMessage({ id: 'consignment.label.nextSaleDate' })}{' '}
                  <strong>{nextSaleDate && DateTimeService.format(new Date(nextSaleDate))}</strong>
                </div>
                <div>
                  <Tickbox
                    id="ncsDateFlag"
                    name="ncsDateFlag"
                    value={formik.values.ncsDateFlag}
                    className={classes.tickbox}
                    onChange={formik.setFieldValue}
                  >
                    {intl.formatMessage({ id: 'consignment.label.NCSEligible' })}
                  </Tickbox>
                </div>
                <div className={classes.grid}>
                  <div>
                    <div className={classes.row}>
                      <div>{intl.formatMessage({ id: 'consignment.label.reserve' })}</div>
                      <div className={classes.field}>
                        <Select
                          id="reserve"
                          name="reserve"
                          className="react-select-hollow"
                          value={formik.values.reserve}
                          touched={formik.touched.reserve}
                          error={formik.errors.reserve}
                          options={reserveOptions}
                          onChange={formik.setFieldValue}
                          onBlur={formik.setFieldTouched}
                          formatOptionLabel={(option) => option.label}
                          style={{ minWidth: '100px' }}
                        />
                      </div>
                    </div>
                    {formik.values.reserve === RESERVE_OPTIONS.YES && (
                      <div className={classes.row}>
                        <div>{intl.formatMessage({ id: 'consignment.label.reserveAmount' })}</div>
                        <div className={classes.field}>
                          <InputPlane
                            id="reserveAmount"
                            name="reserveAmount"
                            value={formik.values.reserveAmount}
                            error={formik.errors.reserveAmount}
                            touched={formik.touched.reserveAmount}
                            onBlur={formik.setFieldTouched}
                            onChange={formik.setFieldValue}
                            mask="currency"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
        <div className={classes.actions}>
          <div className={classes.btnWrap}>
            <ButtonOutlined
              label={intl.formatMessage({ id: 'shared.cta.cancel' })}
              onClick={onClose}
              isBackgroundWhite
              isThinBorder
            />
          </div>
          <div className={classes.btnWrap}>
            <Button
              label={intl.formatMessage({ id: 'shared.cta.rerun' })}
              onClick={formik.handleSubmit}
              isLoading={formik.isSubmitting}
              isDisabled={isLoading || !isAvailable}
            />
          </div>
        </div>
      </ModalWindowBody>
    </ModalWindow>
  );
}

RerunModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  consignment: PropTypes.object,
  updateConsignment: PropTypes.func,
};

RerunModal.defaultProps = {
  isOpen: false,
  consignment: null,
  updateConsignment: () => {},
};

export default RerunModal;

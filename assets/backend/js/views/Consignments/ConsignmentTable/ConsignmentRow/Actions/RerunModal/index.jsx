import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import BaseApiService from 'backend/js/api/BaseApiService';
import ConsignmentService from 'backend/js/api/ConsignmentService';
import FormikTickbox from 'backend/js/components/Form/FormikTickbox';
import Button from 'backend/js/components/Button';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import NumberService from 'backend/js/lib/utils/NumberService';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import Input from 'backend/js/components/Form/Input';
import SpinnerWheel from 'backend/js/components/SpinnerWheel';
import Select from 'backend/js/components/Form/Select';
import ConsignmentDetails from '../../_Shared/ConsignmentDetails';
import useStyles from './useStyles';

const RESERVE_OPTIONS = { YES: 'YES', BTBA: 'BTBA' };

function RerunModal({ isOpen, onClose, consignment, updateConsignment }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

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
        enqueueSnackbar(`Lot # ${response.copartLot} has been rerun in Copart - ${response.copartLocation.name}.`, {
          variant: 'success',
        });
        onClose();
      }
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message || 'An error occurred on submit', { variant: 'error' });
    }
  }

  async function bidApprovalReruneligible() {
    setIsLoading(true);
    try {
      const { data: response } = await ConsignmentService.bidApprovalReruneligible(consignment.id);
      setData(response);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message || 'An error occurred', { variant: 'error' });
    }
    setIsLoading(false);
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
      await bidApprovalRerun(consignment.id, {
        ncsDateFlag: values.ncsDateFlag,
        btba: isBTBA,
        reserve: isBTBA ? null : Number(values.reserveAmount.replace(/[^0-9.]/g, '')),
        saleDate: DateTimeService.format(saleDate, 'yyyy-MM-dd'),
      });
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (isOpen && !initialized) {
      setInitialized(true);
      bidApprovalReruneligible();
    }
  }, [isOpen, initialized]);

  const isAvailable = Boolean(data?.regularDate);

  const reserveOptions = [
    { label: RESERVE_OPTIONS.YES, value: RESERVE_OPTIONS.YES },
    isOnApprovalBTBA ? { label: RESERVE_OPTIONS.BTBA, value: RESERVE_OPTIONS.BTBA } : null,
  ].filter(Boolean);

  const nextSaleDate = formik.values.ncsDateFlag ? data?.ncsDate : data?.regularDate;

  return (
    <ModalWindow onClose={onClose} isOpen={isOpen} size="lg">
      <ModalWindowHeader title="Rerun" onClose={onClose} />
      <ModalWindowBody className="p-20">
        <ConsignmentDetails consignment={consignment} />
        {!initialized || isLoading ? (
          <div className={classes.loader}>
            <SpinnerWheel size={24} thickness={2} className="is-centered" />
          </div>
        ) : (
          <>
            {!isAvailable ? (
              <div className="m-t">Re-run is not available for this vehicle</div>
            ) : (
              <>
                <div className="m-t">
                  <strong>Please verify that you would like to rerun the lot.</strong>
                </div>
                <div className="m-t">
                  Next Sale Date <strong>{nextSaleDate && DateTimeService.format(new Date(nextSaleDate))}</strong>
                </div>
                <div>
                  <FormikTickbox
                    id="ncsDateFlag"
                    name="ncsDateFlag"
                    value={formik.values.ncsDateFlag}
                    className="mt-5"
                    onChange={formik.setFieldValue}
                  >
                    NCS Eligible
                  </FormikTickbox>
                </div>
                <div className={classes.grid}>
                  <div>
                    <div className={classes.row}>
                      <div>Reserve</div>
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
                        <div>Reserve Amount</div>
                        <div className={classes.field}>
                          <Input
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
                  <div />
                </div>
              </>
            )}
          </>
        )}
        <div className="ta-r">
          <Button className="m-t btn-default mr-10" label="Cancel" onClick={onClose} />
          <Button
            className="m-t btn-warning"
            label="Rerun"
            onClick={formik.handleSubmit}
            isLoading={formik.isSubmitting}
          />
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

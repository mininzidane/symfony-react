import React, { useState, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import TitlesService from 'backend/js/api/TitlesService';
import RouterService from 'backend/js/api/RouterService';
import Reports from 'backend/js/views/TitleReceivedAtOffice/TitleReceived/Reports';
import TitleReceivedNewVehicle from './NewVehicle';
import TitleReceivedVehicle from './Vehicle';
import Timer from './Timer';
import ReceivedDataList from './ReceivedDataList';
import useStyles from './useStyles';

const CARRIER_FEDEX_ID = 1;
const initValue = { carrier: String(CARRIER_FEDEX_ID), tracking: '', purchases: [] };

function TitleReceivedApp({ carriers }) {
  const classes = useStyles();
  const [isVehicleOnFocus, setIsVehicleOnFocus] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [isStartedReceiving, setIsStartedReceiving] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [envelopeStartDate, setEnvelopeStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [isTabOpen, setIsTabOpen] = useState(false);

  const [formValues, setFormValues] = useState([]);
  const [currentValue, setCurrentValue] = useState({ ...initValue });

  const [reports, setReports] = useState([]);

  const carrierInput = useRef();
  const trackingInput = useRef();
  const titlesService = new TitlesService();

  const isReadyToSubmit = useMemo(
    () => currentValue.tracking !== '' && currentValue.carrier !== '' && currentValue.purchases.length > 0,
    [currentValue],
  );

  function decodeTracking(currentTracking, currentCarrier) {
    // fedex barcode
    if ((currentCarrier === '' || currentCarrier === String(CARRIER_FEDEX_ID)) && currentTracking.length === 34) {
      const newTracking = currentTracking.substr(currentTracking.length - 12);
      const newCarrier = String(CARRIER_FEDEX_ID);
      enqueueSnackbar('FedEx barcode recognized. Please scan title label.', { variant: 'success' });
      return { carrier: newCarrier, tracking: newTracking };
    }

    return false;
  }

  function scanNextEnvelope() {
    if (!isReadyToSubmit) {
      return;
    }
    const currentDate = Date.now();
    setFormValues((values) => [
      ...values,
      {
        ...currentValue,
        time: Math.floor((currentDate - envelopeStartDate) / 1000),
        isSubmitted: false,
        isLoading: false,
      },
    ]);
    setEnvelopeStartDate(currentDate);
    setCurrentValue({ ...initValue });
  }

  function handleScanNextEnvelope() {
    if (!isReadyToSubmit) {
      return;
    }
    scanNextEnvelope();
    setIsVehicleOnFocus(false);
    trackingInput.current.focus();
  }

  function resetForm() {
    setCurrentValue({ ...initValue });
    setFormValues([]);
    setStartDate(null);
    setEnvelopeStartDate(null);
    setIsStartedReceiving(false);
    setEndDate(null);
    setIsVehicleOnFocus(false);
    setIsTabOpen(false);
    trackingInput.current.focus();
  }

  function handleFormSubmit() {
    scanNextEnvelope();
    setEndDate(Date.now());
    if (isReadyToSubmit || formValues.length > 0) {
      setIsTabOpen(true);
    } else {
      setStartDate(null);
      setEnvelopeStartDate(null);
      setIsStartedReceiving(false);
    }
  }

  function handleCarrierChange(e) {
    e.preventDefault();
    const newCarrier = e.target.value;
    const data = decodeTracking(currentValue.tracking, newCarrier);
    if (data) {
      setCurrentValue((value) => ({
        ...value,
        carrier: data.carrier,
        tracking: data.tracking,
      }));
    } else {
      setCurrentValue((value) => ({
        ...value,
        carrier: newCarrier,
      }));
    }
  }

  function handleTrackingChange(event) {
    event.preventDefault();

    const newTracking = event.target.value;
    const data = decodeTracking(newTracking, currentValue.carrier);
    if (data) {
      setCurrentValue((value) => ({
        ...value,
        carrier: data.carrier,
        tracking: data.tracking,
      }));
      setIsVehicleOnFocus(true);
    } else {
      setCurrentValue((value) => ({
        ...value,
        tracking: newTracking,
      }));
    }
  }

  function handleAddVehicle(newVehicle) {
    let isNew = true;
    currentValue.purchases.forEach((vehicle) => {
      if (vehicle.id === newVehicle.id) {
        isNew = false;
        enqueueSnackbar('This vehicle already selected.', { variant: 'error' });
      }
    });

    if (isNew) {
      const { purchases } = currentValue;
      setCurrentValue((value) => ({ ...value, purchases: [...purchases, newVehicle] }));
    }
  }

  function handleDeleteVehicle(id) {
    const { purchases } = currentValue;
    setCurrentValue((value) => ({ ...value, purchases: purchases.filter((vehicle) => vehicle.id !== id) }));
  }

  useEffect(() => {
    const beforeUnloadListener = (event) => {
      event.preventDefault();
      event.returnValue = '';
      return event;
    };
    if (isReadyToSubmit) {
      window.addEventListener('beforeunload', beforeUnloadListener, { capture: true });
    }
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadListener, { capture: true });
    };
  }, [isReadyToSubmit]);

  function handleStartReceiving() {
    setIsStartedReceiving(true);
    const currentDate = Date.now();
    setStartDate(currentDate);
    setEnvelopeStartDate(currentDate);
    setEndDate(null);
  }

  function updateFormValuesByIndex(index, updateValues) {
    setFormValues((values) => {
      const newValues = values.slice();
      newValues[index] = {
        ...values[index],
        ...updateValues,
      };
      return newValues;
    });
  }

  useEffect(() => {
    const { carrier: currentCarrier, tracking: currentTracking } = currentValue;
    const isAutoStartReceiving = !isStartedReceiving && !endDate && currentCarrier !== '' && currentTracking !== '';
    if (isAutoStartReceiving) {
      handleStartReceiving();
    }
  }, [currentValue]);

  useEffect(() => {
    formValues.forEach((item, index) => {
      if (!item.isSubmitted && !item.isLoading && !item.error) {
        const payload = {
          time: item.time,
          titles: [
            {
              carrier: item.carrier,
              tracking: item.tracking,
              purchases: item.purchases.map((vehicle) => ({ id: vehicle.id, source: vehicle.source })),
            },
          ],
        };

        updateFormValuesByIndex(index, { isLoading: true });
        titlesService
          .receiveTitle(payload)
          .then(({ data }) => {
            updateFormValuesByIndex(index, { ...data[index], isSubmitted: true, isLoading: false });
          })
          .catch((error) => {
            updateFormValuesByIndex(index, { isSubmitted: false, isLoading: false, error: true });
            error.response.json().then((errorsData) => {
              const { errors } = errorsData;
              const firstError = errors[Object.keys(errors)[0]];
              enqueueSnackbar(firstError, { variant: 'error' });
            });
          });
      }
    });
  }, [formValues]);

  useEffect(() => {
    if (
      !isTabOpen ||
      formValues.length === 0 ||
      formValues.filter((item) => item.isSubmitted).length !== formValues.length
    ) {
      return;
    }

    const $form = Object.assign(document.createElement('form'), {
      method: 'POST',
      action: RouterService.getRoute('titleReport'),
      target: '_blank',
    });
    $form.appendChild(
      Object.assign(document.createElement('input'), {
        type: 'hidden',
        name: 'labelRelatedWithReassignment',
        value: 1,
      }),
    );
    $form.appendChild(
      Object.assign(document.createElement('input'), {
        type: 'hidden',
        name: 'processingTime',
        value: formValues.reduce((acc, cur) => acc + cur.time, 0),
      }),
    );
    formValues.forEach((formValue) => {
      $form.appendChild(
        Object.assign(document.createElement('input'), {
          type: 'hidden',
          name: 'data[]',
          value: JSON.stringify({
            tracking: formValue.tracking,
            purchases: formValue.purchases.map((vehicle) => ({ id: vehicle.id, source: vehicle.source })),
          }),
        }),
      );
    });
    document.body.appendChild($form);
    $form.submit();
    resetForm();
  }, [isTabOpen, formValues]);

  useEffect(() => {
    titlesService.getTitleReceiveReports().then((response) => {
      setReports(response);
    });
  }, []);

  const allPurchasesCount = currentValue.purchases?.length || 0;

  return (
    <div>
      <div className={classes.header}>
        <h1>Receive title at Office</h1>
        <div className={classes.action}>
          {(isStartedReceiving || (startDate && endDate)) && (
            <div className={classes.timer}>
              Receiving: <Timer startDate={startDate} endDate={endDate} />
            </div>
          )}
          {!isStartedReceiving && (
            <button type="button" className="btn btn-primary" onClick={handleStartReceiving}>
              Start receiving
            </button>
          )}
          {isStartedReceiving && (
            <button type="button" className="btn btn-primary" onClick={handleFormSubmit} disabled={isTabOpen}>
              Finish receiving
            </button>
          )}
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.form}>
          <form className="form-horizontal" onSubmit={handleFormSubmit}>
            <div className="row">
              <div className="col-lg-12">
                <h2>1. Scan package barcode -or- enter manually</h2>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4">
                <div className="form-group">
                  <label className="col-sm-4 control-label required" htmlFor="title_received_at_office_trackingNumber">
                    Tracking # (optional)
                  </label>
                  <div className="col-sm-8">
                    <input
                      ref={trackingInput}
                      value={currentValue.tracking}
                      autoFocus /* eslint-disable-line jsx-a11y/no-autofocus */
                      type="text"
                      onChange={handleTrackingChange}
                      required="required"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group">
                  <label className="col-sm-5 control-label" htmlFor="title_received_at_office_carrier">
                    Carrier
                  </label>
                  <div className="col-lg-7">
                    <select
                      className="form-control"
                      ref={carrierInput}
                      value={currentValue.carrier}
                      onChange={handleCarrierChange}
                    >
                      <option value="">Select a carrier</option>
                      {carriers.map((option) => (
                        <option value={option.id} key={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="5" />
            </div>
            <div className="hr-line-dashed" />
            <div className="row">
              <div className="col-lg-12">
                <h2>2. Scan title QR code -or- search by vin/lot#</h2>
              </div>
            </div>

            {currentValue.purchases.map((purchase) => (
              <TitleReceivedVehicle key={purchase.id} onDeleteVehicle={handleDeleteVehicle} {...purchase} />
            ))}

            <div className="row">
              <div className="col-lg-6">
                <TitleReceivedNewVehicle isOnFocus={isVehicleOnFocus} onAddVehicle={handleAddVehicle} />
              </div>
            </div>

            <div className="hr-line-dashed" />
            <div className="row">
              <div className="col-lg-12">
                <button
                  type="button"
                  className="btn btn-primary mr-10"
                  onClick={handleScanNextEnvelope}
                  disabled={!isReadyToSubmit || isTabOpen}
                >
                  Scan Next Envelope
                </button>

                {isTabOpen ? (
                  <button type="button" className="btn btn-primary" disabled>
                    Loading...
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleFormSubmit}
                    disabled={!isReadyToSubmit}
                  >
                    {allPurchasesCount > 0 ? `Record ${allPurchasesCount} title(s)` : 'Record information'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className={classes.sidebar}>
          <ReceivedDataList data={formValues} className={classes.receivedDataList} />
        </div>
      </div>
      <div className={`${classes.header} mt-10`}>
        <h1>Reports</h1>
      </div>
      <Reports reports={reports} />
    </div>
  );
}

TitleReceivedApp.propTypes = {
  carriers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }),
  ).isRequired,
};

export default TitleReceivedApp;

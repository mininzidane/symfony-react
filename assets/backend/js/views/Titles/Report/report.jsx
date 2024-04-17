import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import BaseApiService from 'backend/js/api/BaseApiService';
import FormikTickbox from 'backend/js/components/Form/FormikTickbox';
import Button from 'backend/js/components/Button';
import SpinnerWheel from 'backend/js/components/SpinnerWheel';
import CarrierLabelService from 'backend/js/api/CarrierLabelService';
import FlashError from 'backend/js/components/Flash/FlashError';
import TitlesService from 'backend/js/api/TitlesService';
import TitleReceivedVehicle from 'backend/js/views/TitleReceivedAtOffice/TitleReceived/Vehicle';
import UploadTitleDocument from 'backend/js/views/TitleDocuments/Upload';
import Notes from 'backend/js/views/TitleReceivedAtOffice/TitleReceived/Notes';
import useStyles from './useStyles';

function Report({ id: reportId, labelRelatedWithReassignment }) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [notes, setNotes] = useState([]);
  const [titleDocuments, setTitleDocuments] = useState(null);
  const [purchaseIds, setPurchaseIds] = useState([]);
  const [checkedLabels, setCheckedLabels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const allPurchasesIds = useMemo(
    () => data.map(({ purchases }) => purchases.map((purchase) => purchase.id)).flat(),
    [data],
  );
  const [allLabels, setAllLabels] = useState([]);
  const [flashErrors, setFlashErrors] = useState([]);
  const [labelsLinks, setLabelsLinks] = useState([]);
  const titlesStats = useMemo(() => {
    const titles = { all: 0, readyToMail: 0, Ca2Ca: 0, Fl2Fl: 0, Eh: 0 };
    data.forEach(({ purchases }) => {
      purchases.forEach((vehicle) => {
        titles.all += 1;
        if (vehicle.isReadyToMail) {
          titles.readyToMail += 1;
        }
        if (vehicle.isCa2Ca) {
          titles.Ca2Ca += 1;
        }
        if (vehicle.isFl2Fl) {
          titles.Fl2Fl += 1;
        }
        if (vehicle.isEh) {
          titles.Eh += 1;
        }
      });
    });
    return titles;
  }, [data]);

  useEffect(() => {
    setIsLoading(true);
    const titlesService = new TitlesService();
    titlesService
      .purchases(reportId)
      .then(({ purchases, titleDocuments: titleDocumentsData, notes: notesData }) => {
        setData(purchases);
        setTitleDocuments(titleDocumentsData);
        setNotes(notesData);
      })
      .catch(() => {
        setFlashErrors(['Internal server error']);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [reportId]);

  function handleChangeLabel(purchase, value) {
    if (value) {
      const newItems = [...checkedLabels, purchase];
      setCheckedLabels(
        allLabels.filter((item) =>
          newItems.find((newItem) => newItem.id === item.id && newItem.source === item.source),
        ),
      );
    } else {
      setCheckedLabels(checkedLabels.filter((val) => val.id !== purchase.id || val.source !== purchase.source));
    }
  }

  function handleChange(purchase, value) {
    if (value) {
      const newIds = [...purchaseIds, purchase.id];
      setPurchaseIds(allPurchasesIds.filter((item) => newIds.includes(item)));
    } else {
      setPurchaseIds(purchaseIds.filter((val) => val !== purchase.id));
    }
    if (!labelRelatedWithReassignment) {
      return;
    }
    handleChangeLabel(purchase, value);
  }

  function isChecked(purchase) {
    return purchaseIds.indexOf(purchase.id) !== -1;
  }

  function isCheckedLabel(purchase) {
    return !!checkedLabels.find((item) => item.id === purchase.id && item.source === purchase.source);
  }
  function form(path, params) {
    const $form = Object.assign(document.createElement('form'), {
      method: 'POST',
      action: path,
      target: '_blank',
    });
    document.body.appendChild($form);

    params.forEach((item) => {
      $form.appendChild(
        Object.assign(document.createElement('input'), {
          type: 'hidden',
          name: item.name,
          value: item.value,
        }),
      );
    });

    return $form;
  }

  function printLabelLinks(links) {
    if (links.length === 0) {
      return;
    }
    const params = [];
    links.forEach((link) => {
      params.push({
        name: 'links[]',
        value: link,
      });
    });
    form('http://pdf-processor.ms.securebidsolutions.com/combine', params).submit();
  }

  function printReassignment(withLabels = true) {
    setIsLoading(true);

    const baseApiService = new BaseApiService();

    const params = [];
    params.push({
      name: 'print-reassignments',
      value: 1,
    });

    params.push({
      name: 'title',
      value: purchaseIds.join(','),
    });

    form(baseApiService.buildProtectedRequestPath('title'), params).submit();

    if (withLabels && checkedLabels.length > 0) {
      const carrierLabelService = new CarrierLabelService();
      carrierLabelService.generateLabels(reportId, checkedLabels).finally(() => {
        const source = new EventSource(
          baseApiService.buildProtectedRequestPath(`api/v1/title-receive/${reportId}/labels-report`),
          { withCredentials: true },
        );
        source.onmessage = (event) => {
          const eventData = JSON.parse(event.data);
          if (eventData.errors) {
            setFlashErrors(eventData.errors);
          }
          if (eventData.links) {
            setLabelsLinks(eventData.links);
            printLabelLinks(eventData.links);
          }
          if (eventData.processed) {
            setIsLoading(false);
            source.close();
          }
        };
      });
    } else {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const filteredPurchases = data
      .map(({ purchases }) =>
        purchases.filter(
          (vehicle) => !vehicle.isCa2Ca && !vehicle.isFl2Fl && !vehicle.isEh && !vehicle.isJunkTitle && !vehicle.isSyc,
        ),
      )
      .flat();
    setPurchaseIds(filteredPurchases.map((vehicle) => vehicle.id));

    const filteredLabels = data
      .map(({ purchases }) => purchases.filter((vehicle) => vehicle.customerAddress))
      .flat()
      .map((vehicle) => ({ id: vehicle.id, source: vehicle.source }));
    const labels = filteredPurchases
      .filter((vehicle) => vehicle.customerAddress)
      .map((vehicle) => ({ id: vehicle.id, source: vehicle.source }));
    setAllLabels(filteredLabels);
    setCheckedLabels(labelRelatedWithReassignment ? labels : filteredLabels);
    setFlashErrors([]);
  }, [data]);

  useEffect(() => {
    if (!labelRelatedWithReassignment) {
      return;
    }
    if (purchaseIds.length === allPurchasesIds.length) {
      setCheckedLabels(allLabels);
    }
    if (purchaseIds.length === 0) {
      setCheckedLabels([]);
    }
  }, [purchaseIds, allLabels]);

  return (
    <>
      {flashErrors.map((message) => (
        <FlashError message={message} />
      ))}
      {data.length === 0 && isLoading && (
        <div className={classes.loader}>
          <SpinnerWheel size={20} thickness={2} color="gray-dark" />
        </div>
      )}
      {data.map(({ tracking, purchases, isLoading: envelopeIsLoading }, index) => (
        <div className={classes.envelope} key={index}>
          <div className="row">
            <div className="col-lg-6">
              <div className={classes.envelopeTitle}>
                Envelope #{index + 1}: {tracking}
              </div>
            </div>
            {index === 0 && (
              <>
                <div className="col-lg-2">
                  <b>
                    <FormikTickbox
                      id={`reassignment${index}`}
                      name={`reassignment${index}`}
                      value={purchaseIds.length > 0}
                      onChange={(_, value) => {
                        setPurchaseIds(value ? allPurchasesIds : []);
                      }}
                    >
                      Reassignment
                    </FormikTickbox>
                  </b>
                </div>
                {allLabels.length > 0 && (
                  <div className="col-lg-2">
                    <FormikTickbox
                      id={`customerLabel${index}`}
                      name={`customerLabel${index}`}
                      value={checkedLabels.length > 0}
                      onChange={(_, value) => {
                        if (labelRelatedWithReassignment) {
                          return;
                        }
                        setCheckedLabels(value ? allLabels : []);
                      }}
                    >
                      Label
                    </FormikTickbox>
                  </div>
                )}
                <div className="col-lg-2">
                  <b>Documents</b>
                </div>
              </>
            )}
          </div>

          {envelopeIsLoading ? (
            <div className={classes.loader}>
              <SpinnerWheel size={20} thickness={2} color="gray-dark" />
            </div>
          ) : (
            <>
              {purchases.map((vehicle) => (
                <div className={classes.vehicle} key={vehicle.id}>
                  <div className="row">
                    <div className="col-lg-6">
                      <TitleReceivedVehicle {...vehicle} />
                    </div>
                    <div className="col-lg-2">
                      <FormikTickbox
                        id={`vehicle${vehicle.id}_${vehicle.source}`}
                        name={`${vehicle.id}_${vehicle.source}`}
                        value={isChecked(vehicle)}
                        onChange={(name, value) =>
                          handleChange({ id: parseInt(name.split('_')[0], 10), source: name.split('_')[1] }, value)
                        }
                        className="mr-10"
                      >
                        {vehicle?.saleLocationStateCode || ''} &rarr; {vehicle?.customerStateCode || ''}
                      </FormikTickbox>
                    </div>
                    <div className="col-lg-2">
                      {vehicle.customerAddress && (
                        <FormikTickbox
                          id={`customerLabel${vehicle.id}_${vehicle.source}`}
                          name={`${vehicle.id}_${vehicle.source}`}
                          value={isCheckedLabel(vehicle)}
                          onChange={(name, value) =>
                            handleChangeLabel(
                              { id: parseInt(name.split('_')[0], 10), source: name.split('_')[1] },
                              value,
                            )
                          }
                          disabled={!isChecked(vehicle.id) && labelRelatedWithReassignment}
                        >
                          {vehicle.customerAddress}
                        </FormikTickbox>
                      )}
                    </div>
                    <div className="col-lg-2">
                      {vehicle.documents.map((document) => (
                        <>
                          <a href={document.url} target="_blank" rel="noreferrer">
                            {document.name}
                          </a>
                          <br />
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      ))}
      <div className={classes.titlesStats}>
        <div>All titles: {titlesStats.all}</div>
        <div>Ready to mail: {titlesStats.readyToMail}</div>
        <div>CA2CA: {titlesStats.Ca2Ca}</div>
        <div>FL2FL: {titlesStats.Fl2Fl}</div>
        <div>EH: {titlesStats.Eh}</div>
      </div>
      {labelsLinks.length > 0 ? (
        <div className="pull-right">
          <Button label="Print Reassignment" className="btn btn-primary mr-5" onClick={() => printReassignment()} />
          <Button label="Print Label" className="btn btn-primary" onClick={() => printLabelLinks(labelsLinks)} />
        </div>
      ) : (
        data.length > 0 && (
          <Button
            label="Print Reassignment & Label"
            className="btn btn-primary pull-right"
            onClick={() => printReassignment(true)}
            style={{ minWidth: 142 }}
            disabled={(purchaseIds.length === 0 && checkedLabels.length === 0) || isLoading}
            isLoading={isLoading}
          />
        )
      )}
      <div className="clearfix" />
      <hr />
      <UploadTitleDocument report={reportId} />
      {titleDocuments && <div dangerouslySetInnerHTML={{ __html: titleDocuments }} />}
      {!isLoading && (
        <>
          <hr />
          <h3>Notes</h3>
          <Notes id={reportId} notes={notes} />
        </>
      )}
    </>
  );
}

Report.propTypes = {
  id: PropTypes.number.isRequired,
  labelRelatedWithReassignment: PropTypes.bool,
};

Report.defaultProps = {
  labelRelatedWithReassignment: false,
};

export default Report;

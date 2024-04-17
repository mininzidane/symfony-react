/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Amount from 'frontend/js/components/Amount';
import Loader from 'frontend/js/views/Shared/Loader';
import { Formik } from 'formik';
import RouterService from 'frontend/js/api/RouterService';
import WireTransferService from 'frontend/js/api/WireTransferService';
import Button from 'frontend/js/components/Button';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import FilesUpload from 'frontend/js/components/Form/FilesUpload';
import Container from 'frontend/js/components/Container';
import Link from 'frontend/js/components/Link';
import Card from 'frontend/js/components/Card';
import t from 'frontend/js/api/TranslatorService';
import DocumentsUploadSchema from './DocumentsUploadSchema';
import CheckmarkSvg from './img/checkmark.svg';
import DollarSvg from './img/dollar.svg';
import useStyles from './useStyles';

class DocumentsUploadPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
      requestParams: '',
      lot: undefined,
      customer: {
        fullName: '',
        email: '',
      },
      invoice: undefined,
      lotPurchase: undefined,
      displayShippingPromo: false,
      isUploaded: false,
      isSubmissionError: false,
      paymentMethod: RouterService.getQueryParam('paymentMethod'),
      amount: 0,
    };

    this.wireTransferService = new WireTransferService();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.validateUploadRequestAccess()
      .then(() => {
        this.init();
      })
      .catch(() => {
        RouterService.replace('login');
      });
  }

  validateUploadRequestAccess() {
    const {
      location: { search: requestParams },
    } = window;

    return this.wireTransferService.validateUploadRequestAccess(requestParams);
  }

  init() {
    const {
      location: { search: requestParams },
    } = window;

    this.setState({ requestParams }, () => this.getWireTransferDetails());
  }

  getWireTransferDetails() {
    const { requestParams } = this.state;

    this.wireTransferService
      .getWireTransferDetails(requestParams)
      .then(({ invoice, customer, lot, lotPurchase, displayShippingPromo }) => {
        this.setState({ invoice, customer, lot, displayShippingPromo, lotPurchase, initialized: true });
      });
  }

  getFormattedLotLocation() {
    const { lot } = this.state;

    const locationParts = [];
    if (lot && lot.location) {
      if (lot.location.city) {
        locationParts.push(lot.location.city);
      }

      if (lot.location.state_code) {
        locationParts.push(lot.location.state_code);
      }
    }

    return locationParts.join(', ');
  }

  getFormattedSaleDate() {
    const { lot } = this.state;
    if (lot && lot.saleDate) {
      const saleDate = new Date(lot.saleDate);
      return `${saleDate.getMonth() + 1}/${saleDate.getDate()}/${saleDate.getFullYear()}`;
    }

    return '';
  }

  onSubmit(values, { setSubmitting }) {
    const { requestParams } = this.state;
    const rawAmount = values.amount.replace(/[^0-9.]/g, '');
    const amount = +parseFloat(rawAmount).toFixed(2);
    const formData = new FormData();
    this.setState({ amount });

    formData.append('amount', amount);
    for (let i = 0; i < values.wireTransferDocuments.length; i++) {
      formData.append(`wt_document_${i}`, values.wireTransferDocuments[i]);
    }

    this.wireTransferService
      .uploadWireTransferConfirmationFiles(requestParams, formData)
      .then(() => this.setState({ isUploaded: true }))
      .catch(() => this.setState({ isSubmissionError: true }))
      .finally(() => setSubmitting(false));
  }

  render() {
    const {
      initialized,
      displayShippingPromo,
      customer,
      invoice,
      lot,
      lotPurchase,
      isSubmissionError,
      isUploaded,
      paymentMethod,
      amount,
    } = this.state;

    const { classes } = this.props;

    if (!initialized) {
      return (
        <div className={classes.root} style={{ paddingBottom: 0 }}>
          <Loader />
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <Container>
          {isUploaded ? (
            <>
              <h1 className={classes.title}>
                <FormattedMessage id="shared.label.filesUploaded" />
              </h1>

              <Card className={classes.card}>
                {paymentMethod ? (
                  <>
                    <div className={classes.successState}>
                      <div className={classes.successMessage}>
                        <img src={CheckmarkSvg} alt="Success" className={classes.successIcon} />
                      </div>

                      <h2 className={classes.successDescription}>
                        <FormattedMessage
                          id="wtUploadPage.paymentMethodSuccess"
                          values={{
                            method: paymentMethod,
                            amount: <Amount value={amount} className={classes.receivedAmount} />,
                          }}
                        />
                      </h2>

                      <h2 className={classes.successSubtitle}>
                        <FormattedMessage
                          id="wtUploadPage.paymentMethodSuccess.subtitle"
                          values={{
                            method: paymentMethod,
                            email: <a href={`mailto:${customer.email}`}>{customer.email}</a>,
                          }}
                        />
                      </h2>

                      <Button
                        href={RouterService.getRoute('searchResults')}
                        label={<FormattedMessage id="shared.label.continueToBidding" />}
                        className={classes.continueToBidding}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={classes.successState}>
                      <div className={classes.successMessage}>
                        <img src={CheckmarkSvg} alt="Success" className={classes.successIcon} />
                      </div>

                      <h2 className={classes.successDescription}>
                        <FormattedMessage
                          id="wtUploadPage.successMessageGeneral"
                          values={{ link: <a href={`mailto:${customer.email}`}>{customer.email}</a> }}
                        />
                      </h2>
                    </div>

                    <div className={classes.orderShippingWrap}>
                      <div>
                        {displayShippingPromo && lotPurchase.token ? (
                          <>
                            <h3>
                              <FormattedMessage id="shipping.orderShipping" />
                            </h3>

                            <p>
                              <FormattedMessage id="wtUploadPage.getYourVehicleTransported" />
                            </p>

                            <Button
                              label="Book shipping now"
                              href={RouterService.getRoute('lotsWon', { shipping_order: lotPurchase.token })}
                              className="mt-5 sm-wide"
                              isInline
                            />
                          </>
                        ) : (
                          <>
                            <h3>
                              <FormattedMessage id="shared.label.findMoreVehicles" />
                            </h3>

                            <p className="wide">
                              <FormattedMessage id="wtUploadPage.ourInventoryIsUpdated" />
                            </p>

                            <Button
                              label="Search vehicles"
                              href={RouterService.getRoute('searchResults')}
                              className="mt-5 sm-wide"
                              isInline
                            />
                          </>
                        )}

                        <div className="wide pt-20 text-md ta-c">
                          <a href={RouterService.getRoute('lotsWon')}>
                            <FormattedMessage id="shared.cta.takeMeToMyAccount" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Card>
            </>
          ) : (
            <>
              <h1 className={classes.title}>
                {t('documents.upload.greetings', { fullName: customer.fullName })} {t('documents.upload.upload_proof')}
              </h1>

              <Card className={classes.form}>
                {lot && lot.id && (
                  <div className={classes.yellowBg}>
                    <div className={classes.centerer}>
                      <div className={classes.vehicleCard}>
                        {lot.img && <img src={lot.img} className={classes.vehicleCardImage} alt="Vehicle" />}

                        <div>
                          <div className={classes.row}>
                            <span>
                              <FormattedMessage id="shared.label.vehicle" />:
                            </span>
                            <strong>{lot.description}</strong>
                          </div>
                          <div className={classes.row}>
                            <span>
                              <FormattedMessage id="shared.label.vin" />:
                            </span>
                            <strong>{lot.vin}</strong>
                          </div>
                          {this.getFormattedLotLocation() && (
                            <div className={classes.row}>
                              <span>
                                <FormattedMessage id="shared.label.location" />:
                              </span>
                              <strong>{this.getFormattedLotLocation()}</strong>
                            </div>
                          )}
                          {this.getFormattedSaleDate() && (
                            <div className={classes.row}>
                              <span>
                                <FormattedMessage id="shared.label.saleDate" />:
                              </span>
                              <strong>{this.getFormattedSaleDate()}</strong>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {invoice && invoice.token && (
                  <div className={classes.grayBg}>
                    <div className={classes.centerer}>
                      <div className={classes.invoiceDueWrap}>
                        <div>
                          <FormattedMessage id="shared.label.invoiceDue" />
                        </div>
                        <div>
                          <Amount value={invoice.balanceRemaining} hasCurrency className={classes.invoiceDueAmount} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className={classes.dropAreaWrap}>
                  <Formik
                    initialValues={{
                      amount: '',
                      wireTransferDocuments: [],
                    }}
                    validationSchema={DocumentsUploadSchema}
                    onSubmit={this.onSubmit}
                    mask="numbers"
                    render={({
                      values,
                      touched,
                      errors,
                      isSubmitting,
                      setFieldValue,
                      setFieldError,
                      handleSubmit,
                      setFieldTouched,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className={classes.inputWrap}>
                          <div className={classes.inputLabel}>
                            <FormattedMessage id="wtUploadPage.enterTotalPaymentAmount" />
                          </div>
                          <div className={classes.input}>
                            <InputPlane
                              id="amount"
                              name="amount"
                              mask="currency"
                              sign=""
                              onBlur={setFieldTouched}
                              value={values.amount}
                              error={errors.amount}
                              touched={touched.amount}
                              disabled={isSubmitting}
                              onChange={(name, value) => {
                                setFieldValue(name, value);
                                this.setState({ isSubmissionError: false });
                              }}
                            />

                            <div className={classes.dollarIcon}>
                              <img src={DollarSvg} alt="Dollar" />
                            </div>
                          </div>
                        </div>

                        <FilesUpload
                          label="UPLOAD FILE(S)"
                          id="wireTransferDocuments"
                          name="wireTransferDocuments"
                          fileValues={values.wireTransferDocuments}
                          accept="image/png,image/jpg,image/jpeg,.pdf"
                          error={errors.wireTransferDocuments}
                          touched={touched.wireTransferDocuments}
                          onTouched={setFieldTouched}
                          onError={setFieldError}
                          isDropArea
                          isLoading={false}
                          isTriggerHidden={!!values.wireTransferDocuments.length}
                          dropAreaType="invoice"
                          onChange={(name, value) => {
                            setFieldValue(name, value);
                            this.setState({ isSubmissionError: false });
                          }}
                          multiple
                          fileWrapClassName={classes.fileWrap}
                          dropAreaClassName={classes.dropArea}
                        />

                        {isSubmissionError && (
                          <div className={classes.error}>
                            <FormattedMessage
                              id="wtUploadPage.couldNotSubmitTheForm"
                              values={{
                                link: (chunk) => (
                                  <Link href={RouterService.getRoute('helpCenter', null, true)}>{chunk}</Link>
                                ),
                              }}
                            />
                          </div>
                        )}

                        {!!values.wireTransferDocuments.length && (
                          <div className={classes.submitWrap}>
                            <Button
                              type="submit"
                              label={<FormattedMessage id="shared.cta.submitDocuments" />}
                              isInline
                              isLoading={isSubmitting}
                            />
                          </div>
                        )}
                      </form>
                    )}
                  />
                </div>
              </Card>
            </>
          )}
        </Container>
      </div>
    );
  }
}

function HookWrapper(props) {
  const classes = useStyles();
  return <DocumentsUploadPage {...props} classes={classes} />;
}

export default HookWrapper;

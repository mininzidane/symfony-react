import React, { useState } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useSnackbar } from 'notistack';
import BaseApiService from 'backend/js/api/BaseApiService';
import SubmitButton from 'backend/js/components/SubmitButton';
import InstantOfferService from 'backend/js/api/InstantOfferService';
import ClearVinService from 'backend/js/api/ClearVinService';
import Button from 'backend/js/components/Button';
import Input from 'backend/js/components/Form/Input';
import ButtonLink from 'backend/js/components/ButtonLink';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import SpinnerWheel from 'backend/js/components/SpinnerWheel';
import ShippingOrderService from 'backend/js/api/ShippingOrderService';
import Select from 'backend/js/components/Form/Select';
import CopyButton from 'backend/js/components/CopyButton';
import FormikTickbox from 'backend/js/components/Form/FormikTickbox';
import TooltipOnHover from 'backend/js/components/TooltipOnHover';
import InstantOfferVehicleFormValidationSchema from './InstantOfferVehicleFormValidationSchema';
import InstantOfferTitleFormValidationSchema from './InstantOfferTitleFormValidationSchema';
import GalleryModal from './GalleryModal';
import useStyles from './useStyles';
import SendFileNotificationForm from './SendFileNotificationForm';

function InstantOfferVehicle({ instantOffer, setModalContent, setInstantOfferChangeLogs, titleTypes, photoTypes }) {
  const [report, setReport] = useState(null);
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const instantOfferService = new InstantOfferService();
  const {
    TITLE_TYPE_LIST,
    FILE_CONTENT_TYPES,
    FLAT_TIRES_LIST,
    CONDITION_TYPE_LIST,
    UNDER_THE_HOOD_LIST,
    FLOOD_OR_FIRE_DAMAGE_LIST,
  } = InstantOfferService;
  const FLAT_TIRES_DESCRIPTION = {
    flatTireDriverSideRear: 'Driver-side rear',
    flatTireDriverSideFront: 'Driver-side front',
    flatTirePassengerSideRear: 'Passenger-side rear',
    flatTirePassengerSideFront: 'Passenger-side front',
  };

  const clearVinService = new ClearVinService();

  const { StateFullNameList: states } = ShippingOrderService;

  const flatTiresDescription = Object.entries(instantOffer.flatTires || {})
    .filter(([, flatTireStatus]) => flatTireStatus)
    .map(([flatTireCode]) => FLAT_TIRES_DESCRIPTION[flatTireCode])
    .join(', ');

  async function onTitleSubmit(values, { setSubmitting }) {
    setSubmitting(true);

    try {
      const response = await instantOfferService.addTitleInfo(values.ref, {
        titleName: values.titleName,
        titleType: values.titleType,
        titleState: values.titleState,
      });
      enqueueSnackbar('Title info saved successfully', { variant: 'success' });
      instantOffer.titleName = response.instantOffer.titleName;
      instantOffer.titleState = response.instantOffer.titleState;
      instantOffer.titleType = response.instantOffer.titleType;
      setInstantOfferChangeLogs(response.instantOffer.instantOfferChangeLogs);
      setModalContent(null);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message, { variant: 'error' });

      setSubmitting(false);
    }
  }

  async function onSubmit(values, { setSubmitting }) {
    setSubmitting(true);

    try {
      const response = await instantOfferService.editVehicleInfo(values.ref, {
        vin: values.vin,
        nonStandard: values.nonStandard,
      });
      enqueueSnackbar('Vehicle info saved successfully', { variant: 'success' });
      instantOffer.vehicleVin = response.instantOffer.vehicleVin;
      instantOffer.title = response.instantOffer.title;
      instantOffer.rangeLow = response.instantOffer.rangeLow;
      instantOffer.rangeHigh = response.instantOffer.rangeHigh;
      setInstantOfferChangeLogs(response.instantOffer.instantOfferChangeLogs);
      setModalContent(null);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message, { variant: 'error' });

      setSubmitting(false);
    }
  }

  const modalVinForm = (
    <Formik
      initialValues={{
        ref: instantOffer.ref,
        vin: instantOffer.vehicleVin,
        nonStandard: false,
      }}
      enableReinitialize
      validationSchema={InstantOfferVehicleFormValidationSchema}
      onSubmit={onSubmit}
    >
      {({ values, touched, errors, setFieldValue, setFieldTouched, setFieldError, isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="text-md mb-10">VIN:</div>
          <Input
            id="vin"
            name="vin"
            placeholder="VIN"
            value={values.vin}
            error={errors.vin}
            touched={touched.vin}
            onBlur={setFieldTouched}
            onChange={setFieldValue}
            onError={setFieldError}
          />
          <FormikTickbox onChange={setFieldValue} name="nonStandard" id="nonStandard" value={values.nonStandard}>
            Non Standard
          </FormikTickbox>
          <SubmitButton label="Save" className="m-t-sm btn-primary" isLoading={isSubmitting} disabled={isSubmitting} />
        </form>
      )}
    </Formik>
  );

  function openClearVinReport(vin) {
    if (report) {
      setIsReportModalOpen(true);
      return;
    }

    setIsReportLoading(true);
    setIsReportModalOpen(true);

    clearVinService
      .getReportByVin(vin)
      .then((data) => setReport(data.data))
      .catch(() => {})
      .finally(() => setIsReportLoading(false));
  }

  function outputState(state) {
    if (!state) {
      return '';
    }

    let output = state.name;
    const notaryStateCodes = ['AZ', 'KY', 'LA', 'MT', 'NC', 'OH', 'OK', 'PA', 'WY'];

    if (notaryStateCodes.includes(state.code)) {
      output += ` <span class="badge badge-danger">Notary</span>`;
    }

    return <div dangerouslySetInnerHTML={{ __html: output }} />;
  }

  const modalTitleForm = (
    <Formik
      initialValues={{
        ref: instantOffer.ref,
        titleName: instantOffer.titleName ?? '',
        titleType: instantOffer.titleType,
        titleState: instantOffer.titleState ? instantOffer.titleState.code : null,
      }}
      enableReinitialize
      validationSchema={InstantOfferTitleFormValidationSchema}
      onSubmit={onTitleSubmit}
    >
      {({ values, touched, errors, setFieldValue, setFieldTouched, setFieldError, isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Select
            id="titleState"
            name="titleState"
            placeholder="Title State"
            value={values.titleState}
            touched={touched.titleState}
            error={errors.titleState}
            className="react-select-hollow m-b-sm m-r-sm"
            onBlur={setFieldTouched}
            onChange={setFieldValue}
            options={states}
            disabled={!states.length}
            isSearchable
            isClearable
            styles={{
              control: (styles) => ({
                ...styles,
                minHeight: '40px',
                borderColor: '#B7B5B3',
                borderRadius: '2px',
              }),
              menu: (styles) => ({ ...styles, zIndex: '100' }),
            }}
          />

          <Select
            id="titleType"
            name="titleType"
            placeholder="Title Type"
            className="react-select-hollow m-b "
            value={values.titleType}
            error={errors.titleType}
            touched={touched.titleType}
            onBlur={setFieldTouched}
            options={titleTypes.map((titleType) => ({
              label: titleType,
              value: titleType,
            }))}
            onChange={setFieldValue}
            onError={setFieldError}
          />

          <div className="text-md mb-10">Name on title:</div>
          <Input
            id="titleName"
            name="titleName"
            placeholder="Name on title"
            value={values.titleName}
            error={errors.titleName}
            touched={touched.titleName}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            onError={setFieldError}
          />

          <SubmitButton label="Save" className="btn-primary" isLoading={isSubmitting} disabled={isSubmitting} />
        </form>
      )}
    </Formik>
  );

  return (
    <>
      {instantOffer.title}
      {instantOffer.vehicleVin && (
        <>
          <br />
          <div className={classes.nowrap}>
            <ButtonLink label={instantOffer.vehicleVin} onClick={() => openClearVinReport(instantOffer.vehicleVin)} />
            <CopyButton value={instantOffer.vehicleVin} />
          </div>
        </>
      )}
      {instantOffer.titleName && (
        <div>
          Title name: {instantOffer.titleName}
          <CopyButton value={instantOffer.titleName} />
        </div>
      )}
      {outputState(instantOffer.titleState)}

      {instantOffer.titleType && (
        <>
          <br />
          {instantOffer.titleType}
          {instantOffer.titleType === TITLE_TYPE_LIST.CLEAN_TITLE && instantOffer.carPaidOff !== null && (
            <>
              <br />
              Car Paid Off: {instantOffer.carPaidOff ? 'Yes' : 'No'}
            </>
          )}
        </>
      )}

      {[FLAT_TIRES_LIST.ONE_OR_MORE_TIRES_ARE_FLAT, FLAT_TIRES_LIST.ONE_OR_MORE_WHEELS_ARE_REMOVED].includes(
        instantOffer.wheelsAndTires,
      ) && (
        <div>
          {flatTiresDescription ? (
            <TooltipOnHover
              placement="top"
              hasArrow
              className={classes.damagesDescriptionTooltip}
              content={<>{flatTiresDescription}</>}
              trigger={<div>{instantOffer.wheelsAndTires}</div>}
            />
          ) : (
            <>{instantOffer.wheelsAndTires}</>
          )}
        </div>
      )}

      {!instantOffer.keysAvailable && 'It is missing the key and/or the battery is missing or dead'}

      {[CONDITION_TYPE_LIST.STARTS_BUT_DOES_NOT_DRIVE, CONDITION_TYPE_LIST.DOES_NOT_START].includes(
        instantOffer.conditionType,
      ) && (
        <>
          <br />
          {instantOffer.conditionType}
        </>
      )}
      {[UNDER_THE_HOOD_LIST.MISSING_PARTS, UNDER_THE_HOOD_LIST.ENGINE_REMOVED].includes(instantOffer.underTheHood) && (
        <div>
          {instantOffer.damagesDescription?.underTheHood ? (
            <TooltipOnHover
              placement="top"
              hasArrow
              className={classes.damagesDescriptionTooltip}
              content={<>{instantOffer.damagesDescription?.underTheHood}</>}
              trigger={<div>{instantOffer.underTheHood}</div>}
            />
          ) : (
            <>{instantOffer.underTheHood}</>
          )}
        </div>
      )}

      {Boolean(instantOffer.mileage) && (
        <>
          <br />
          Mileage: {instantOffer.mileage} mi
        </>
      )}

      <div>
        {instantOffer.removedOrLooseExteriorPanels && (
          <>
            {instantOffer.damagesDescription?.removedOrLooseExteriorPanels ? (
              <TooltipOnHover
                placement="top"
                hasArrow
                className={classes.damagesDescriptionTooltip}
                content={<>{instantOffer.damagesDescription?.removedOrLooseExteriorPanels}</>}
                trigger={<div>It has loose or missing exterior panels</div>}
              />
            ) : (
              'It has loose or missing exterior panels'
            )}
          </>
        )}
      </div>
      <div>
        {instantOffer.bodyDamage && instantOffer.bodyDamage.toLowerCase() !== 'no' && (
          <>
            {instantOffer.damagesDescription?.bodyDamage ? (
              <TooltipOnHover
                placement="top"
                hasArrow
                className={classes.damagesDescriptionTooltip}
                content={<>{instantOffer.damagesDescription?.bodyDamage}</>}
                trigger={<div>It has damage that is baseball-sized or larger</div>}
              />
            ) : (
              'It has damage that is baseball-sized or larger'
            )}
          </>
        )}
      </div>
      <div>
        {instantOffer.mirrorsGlassOrLightsDamage && (
          <>
            {instantOffer.damagesDescription?.mirrorsGlassOrLightsDamage ? (
              <TooltipOnHover
                placement="top"
                hasArrow
                className={classes.damagesDescriptionTooltip}
                content={<>{instantOffer.damagesDescription?.mirrorsGlassOrLightsDamage}</>}
                trigger={<div>Some mirrors, glass or lights are cracked or missing</div>}
              />
            ) : (
              'Some mirrors, glass or lights are cracked or missing'
            )}
          </>
        )}
      </div>

      {[FLOOD_OR_FIRE_DAMAGE_LIST.FIRE, FLOOD_OR_FIRE_DAMAGE_LIST.FLOOD].includes(instantOffer.floodOrFireDamage) && (
        <div>Flood/fire dmg: {instantOffer.floodOrFireDamage}</div>
      )}

      <div className="m-t">
        <Button
          label="VIN"
          className={!instantOffer.vehicleVin ? 'btn-danger' : ''}
          onClick={() =>
            setModalContent({
              title: 'Edit Vehicle Modal',
              content: modalVinForm,
            })
          }
        />

        {instantOffer.titleName ? (
          <Button
            label="Edit title info"
            className="btn-xs"
            onClick={() =>
              setModalContent({
                title: 'Edit Title Modal',
                content: modalTitleForm,
              })
            }
          />
        ) : (
          <Button
            label="Set title info"
            className="btn-danger"
            onClick={() =>
              setModalContent({
                title: 'Edit Title Modal',
                content: modalTitleForm,
              })
            }
          />
        )}

        <div className="m-t">
          {' '}
          {instantOffer.activeDocumentsCount > 0 && (
            <>
              <GalleryModal
                id={instantOffer.ref}
                contentType={FILE_CONTENT_TYPES.DOCUMENT}
                title="Copy of Title"
                trigger={(props) => (
                  <>
                    <i className="cur-p fa fa-file-word-o" {...props} />
                    {`(${instantOffer.activeDocumentsCount})`}
                  </>
                )}
              />
              &nbsp;
            </>
          )}
          {instantOffer.activePhotosCount > 0 && (
            <GalleryModal
              id={instantOffer.ref}
              contentType={FILE_CONTENT_TYPES.PHOTO}
              title="Car photos"
              trigger={(props) => (
                <>
                  <i className="cur-p fa fa-file-image-o" {...props} />
                  {`(${instantOffer.activePhotosCount} / ${photoTypes.length})`}
                </>
              )}
            />
          )}
        </div>
        <Button
          label="Request Title"
          className="btn-warning"
          onClick={() => {
            setModalContent({
              title: 'Request Title Modal',
              content: (
                <SendFileNotificationForm
                  instantOffer={instantOffer}
                  fileContentType={FILE_CONTENT_TYPES.DOCUMENT}
                  setModalContent={setModalContent}
                />
              ),
            });
          }}
        />
        {photoTypes.length - instantOffer.activePhotosCount > 0 && (
          <Button
            label="Request Pictures"
            className="btn-warning"
            onClick={() => {
              setModalContent({
                title: 'Request Pictures Modal',
                content: (
                  <SendFileNotificationForm
                    instantOffer={instantOffer}
                    fileContentType={FILE_CONTENT_TYPES.PHOTO}
                    setModalContent={setModalContent}
                  />
                ),
              });
            }}
          />
        )}
      </div>

      <ModalWindow
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        className={classnames({ [classes.iframeModalBody]: Boolean(report) })}
        size="fullscreen"
      >
        <ModalWindowHeader title="ClearVin Report" onClose={() => setIsReportModalOpen(false)} />
        <ModalWindowBody className="p-20">
          {report ? (
            <iframe srcDoc={report} title="ClearVin Vehicle History Report" className={classes.iframe} />
          ) : (
            <>{isReportLoading && <SpinnerWheel size={34} thickness={3} className="is-centered" />}</>
          )}
        </ModalWindowBody>
      </ModalWindow>
    </>
  );
}

InstantOfferVehicle.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  setModalContent: PropTypes.func.isRequired,
  setInstantOfferChangeLogs: PropTypes.func.isRequired,
  titleTypes: PropTypes.array,
  photoTypes: PropTypes.array,
};

InstantOfferVehicle.defaultProps = {
  titleTypes: [],
  photoTypes: [],
};

export default InstantOfferVehicle;

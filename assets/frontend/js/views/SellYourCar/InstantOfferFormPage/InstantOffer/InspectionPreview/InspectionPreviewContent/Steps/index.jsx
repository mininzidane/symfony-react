import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import NumberService from 'frontend/js/lib/utils/NumberService';
import InstantOfferService from 'frontend/js/api/InstantOfferService';
import Step from './Step';

function Steps({ className, formik, changeStep, lastStep, instantOffer }) {
  const intl = useIntl();
  const hasInstantOffer = Boolean(instantOffer) && !instantOffer.isDraft;
  const isInstantOfferAccepted = Boolean(instantOffer?.acceptedPrice);

  const { FLOOD_OR_FIRE_DAMAGE_LIST } = InstantOfferService;
  const { values } = formik;

  const {
    vinValid,
    year,
    make,
    model,
    vinYMM,
    titleType,
    zip,
    wheelsAndTires,
    conditionType,
    underTheHood,
    mileage,
    removedOrLooseExteriorPanels,
    mirrorsGlassOrLightsDamage,
    keys,
    bodyDamage,
    floodOrFireDamage,
    unableToVerifyMileage,
  } = values;

  const ymm = (vinValid && vinYMM) || (!vinValid && year && make && model && `${year} ${make} ${model}`) || '';

  function getInspectionPreviewValue(name, value = null) {
    if (value === null || value === '') {
      return null;
    }

    if (name === 'keys') {
      return value === '1'
        ? intl.formatMessage({ id: `sellYourCarPage.inspectionPreview.keys.yes` })
        : intl.formatMessage({ id: `sellYourCarPage.inspectionPreview.keys.no` });
    }

    if (name === 'mileage') {
      return value
        ? NumberService.formatNumber(value)
        : (unableToVerifyMileage === '1' && intl.formatMessage({ id: 'sellYourCarPage.label.unableToVerify' })) || '';
    }

    if (name === 'removedOrLooseExteriorPanels') {
      return value === '1'
        ? intl.formatMessage({ id: `sellYourCarPage.inspectionPreview.removedOrLooseExteriorPanels.yes` })
        : intl.formatMessage({ id: `sellYourCarPage.inspectionPreview.removedOrLooseExteriorPanels.no` });
    }

    if (name === 'bodyDamage') {
      return value === '1'
        ? intl.formatMessage({ id: `sellYourCarPage.inspectionPreview.bodyDamage.yes` })
        : intl.formatMessage({ id: `sellYourCarPage.inspectionPreview.bodyDamage.no` });
    }

    if (name === 'mirrorsGlassOrLightsDamage') {
      return value === '1'
        ? intl.formatMessage({ id: `sellYourCarPage.inspectionPreview.mirrorsGlassOrLightsDamage.yes` })
        : intl.formatMessage({ id: `sellYourCarPage.inspectionPreview.mirrorsGlassOrLightsDamage.no` });
    }

    if (name === 'floodOrFireDamage') {
      if (value === FLOOD_OR_FIRE_DAMAGE_LIST.FIRE) {
        return intl.formatMessage({ id: 'sellYourCarPage.inspectionPreview.floodOrFireDamage.fireDamage' });
      }
      if (value === FLOOD_OR_FIRE_DAMAGE_LIST.FLOOD) {
        return intl.formatMessage({ id: 'sellYourCarPage.inspectionPreview.floodOrFireDamage.floodDamage' });
      }
      if (value === FLOOD_OR_FIRE_DAMAGE_LIST.NONE) {
        return intl.formatMessage({ id: 'sellYourCarPage.inspectionPreview.floodOrFireDamage.none' });
      }
    }
    return value;
  }

  return (
    <div className={className}>
      {ymm || hasInstantOffer ? (
        <Step
          title=""
          value={ymm}
          isCompleted
          onClick={() => changeStep(2)}
          isDisabled={lastStep < 2 && !ymm}
          isEditable={!isInstantOfferAccepted}
        />
      ) : (
        <Step
          title={intl.formatMessage({ id: `sellYourCarPage.leadForm.step2.title` })}
          isCompleted={false}
          onClick={() => changeStep(2)}
          isDisabled={lastStep < 2 && !ymm}
          isEditable={!isInstantOfferAccepted}
        />
      )}
      <Step
        title={titleType || hasInstantOffer ? '' : intl.formatMessage({ id: `sellYourCarPage.leadForm.step3.title` })}
        value={getInspectionPreviewValue('titleType', titleType)}
        isCompleted={Boolean(titleType) || hasInstantOffer}
        onClick={() => changeStep(3)}
        isDisabled={lastStep < 3 && !titleType}
        isEditable={!isInstantOfferAccepted}
      />
      <Step
        title={zip || hasInstantOffer ? '' : intl.formatMessage({ id: `sellYourCarPage.leadForm.step4.title` })}
        value={getInspectionPreviewValue('zip', zip)}
        isCompleted={Boolean(zip) || hasInstantOffer}
        onClick={() => changeStep(4)}
        isDisabled={lastStep < 4 && !zip}
        isEditable={!isInstantOfferAccepted}
      />
      <Step
        title={
          wheelsAndTires || hasInstantOffer ? '' : intl.formatMessage({ id: `sellYourCarPage.leadForm.step5.title` })
        }
        value={getInspectionPreviewValue('wheelsAndTires', wheelsAndTires)}
        isCompleted={Boolean(wheelsAndTires) || hasInstantOffer}
        onClick={() => changeStep(5)}
        isDisabled={lastStep < 5 && !wheelsAndTires}
        isEditable={!isInstantOfferAccepted}
      />
      <Step
        title={keys || hasInstantOffer ? '' : intl.formatMessage({ id: `sellYourCarPage.leadForm.step6.title` })}
        value={getInspectionPreviewValue('keys', keys)}
        isCompleted={Boolean(keys) || hasInstantOffer}
        onClick={() => changeStep(6)}
        isDisabled={lastStep < 6 && !keys}
        isEditable={!isInstantOfferAccepted}
      />
      <Step
        title={
          conditionType || hasInstantOffer ? '' : intl.formatMessage({ id: `sellYourCarPage.leadForm.step7.title` })
        }
        value={getInspectionPreviewValue('conditionType', conditionType)}
        isCompleted={Boolean(conditionType) || hasInstantOffer}
        onClick={() => changeStep(7)}
        isDisabled={lastStep < 7 && !conditionType}
        isEditable={!isInstantOfferAccepted}
      />
      <Step
        title={
          underTheHood || hasInstantOffer ? '' : intl.formatMessage({ id: `sellYourCarPage.leadForm.step8.title` })
        }
        value={getInspectionPreviewValue('underTheHood', underTheHood)}
        isCompleted={Boolean(underTheHood) || hasInstantOffer}
        onClick={() => changeStep(8)}
        isDisabled={lastStep < 8 && !underTheHood}
        isEditable={!isInstantOfferAccepted}
      />
      <Step
        title={
          mileage || unableToVerifyMileage === '1' || hasInstantOffer
            ? ''
            : intl.formatMessage({ id: `sellYourCarPage.leadForm.step9.title` })
        }
        value={getInspectionPreviewValue('mileage', mileage)}
        isCompleted={Boolean(mileage) || unableToVerifyMileage === '1' || hasInstantOffer}
        onClick={() => changeStep(9)}
        isDisabled={lastStep < 9 && !(mileage || mileage === null)}
        isEditable={!isInstantOfferAccepted}
      />
      <Step
        title={
          removedOrLooseExteriorPanels || hasInstantOffer
            ? ''
            : intl.formatMessage({ id: `sellYourCarPage.leadForm.step10.title` })
        }
        value={getInspectionPreviewValue('removedOrLooseExteriorPanels', removedOrLooseExteriorPanels)}
        isCompleted={Boolean(removedOrLooseExteriorPanels) || hasInstantOffer}
        onClick={() => changeStep(10)}
        isDisabled={lastStep < 10 && !removedOrLooseExteriorPanels}
        isEditable={!isInstantOfferAccepted}
      />
      <Step
        title={bodyDamage || hasInstantOffer ? '' : intl.formatMessage({ id: `sellYourCarPage.leadForm.step11.title` })}
        value={getInspectionPreviewValue('bodyDamage', bodyDamage)}
        isCompleted={Boolean(bodyDamage) || hasInstantOffer}
        onClick={() => changeStep(11)}
        isDisabled={lastStep < 11 && !bodyDamage}
        isEditable={!isInstantOfferAccepted}
      />
      <Step
        title={
          mirrorsGlassOrLightsDamage || hasInstantOffer
            ? ''
            : intl.formatMessage({ id: `sellYourCarPage.leadForm.step12.title` })
        }
        value={getInspectionPreviewValue('mirrorsGlassOrLightsDamage', mirrorsGlassOrLightsDamage)}
        isCompleted={Boolean(mirrorsGlassOrLightsDamage) || hasInstantOffer}
        onClick={() => changeStep(12)}
        isDisabled={lastStep < 12 && !mirrorsGlassOrLightsDamage}
        isEditable={!isInstantOfferAccepted}
      />
      <Step
        title={
          floodOrFireDamage || hasInstantOffer
            ? ''
            : intl.formatMessage({ id: `sellYourCarPage.leadForm.step13.title` })
        }
        value={getInspectionPreviewValue('floodOrFireDamage', floodOrFireDamage)}
        isCompleted={Boolean(floodOrFireDamage) || hasInstantOffer}
        onClick={() => changeStep(13)}
        isDisabled={lastStep < 13 && !floodOrFireDamage}
        isEditable={!isInstantOfferAccepted}
      />
    </div>
  );
}

Steps.propTypes = {
  instantOffer: PropTypes.object,
  formik: PropTypes.object.isRequired,
  changeStep: PropTypes.func.isRequired,
  lastStep: PropTypes.number.isRequired,
  className: PropTypes.string,
};

Steps.defaultProps = {
  className: '',
  instantOffer: null,
};

export default Steps;

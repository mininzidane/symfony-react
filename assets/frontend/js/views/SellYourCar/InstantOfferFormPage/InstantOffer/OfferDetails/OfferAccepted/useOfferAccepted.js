import { useMemo } from 'react';
import InstantOfferService from 'frontend/js/api/InstantOfferService';
import useIntl from 'frontend/js/hooks/useIntl';

function useOfferAccepted(instantOffer) {
  const intl = useIntl();

  return useMemo(() => {
    const { FILE_CONTENT_TYPES } = InstantOfferService;

    const vehicleTitleAdded = instantOffer.instantOfferFiles?.some(
      (file) => file.contentType === FILE_CONTENT_TYPES.DOCUMENT,
    );

    const vehiclePhotosAdded = instantOffer.instantOfferFiles?.some(
      (file) => file.contentType === FILE_CONTENT_TYPES.PHOTO,
    );

    let titleTranslationKey = 'sellYourCarPage.instantOffer.acceptedOffer.title';
    let subtitleTranslationKey = 'sellYourCarPage.instantOffer.acceptedOffer.subtitle';
    let step = 1;
    if (vehicleTitleAdded) {
      step = 2;
      if (vehiclePhotosAdded) {
        step = 3;
        if (instantOffer.pickupAddress) {
          step = 4;
          if (instantOffer.payMethod) {
            step = 5;
            titleTranslationKey = 'sellYourCarPage.instantOffer.acceptedOffer.title2';
            subtitleTranslationKey = 'sellYourCarPage.instantOffer.acceptedOffer.subtitle2';
            if (instantOffer.paidAmount) {
              step = 6;
            }
          }
        }
      }
    }
    return {
      title: intl.formatMessage({ id: titleTranslationKey }),
      subtitle: intl.formatMessage({ id: subtitleTranslationKey }),
      step,
    };
  }, [instantOffer]);
}

export default useOfferAccepted;

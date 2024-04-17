import { useMemo } from 'react';
import InstantOfferService from 'frontend/js/api/InstantOfferService';

function useCarPhotos(instantOfferFiles) {
  const { FILE_CONTENT_TYPES, CAR_PHOTO_KEYS } = InstantOfferService;

  return useMemo(() => {
    const addedPhotoKeys =
      instantOfferFiles
        ?.filter((file) => file.contentType === FILE_CONTENT_TYPES.PHOTO && Boolean(file.key))
        .map((file) => file.key) || [];
    const requiredPhotoKeys = Object.values(CAR_PHOTO_KEYS);

    const requiredPhotoCount = requiredPhotoKeys.length;
    const uploadedPhotoCount = requiredPhotoKeys.filter((v) => addedPhotoKeys.includes(v)).length;
    const isAllPhotosUploaded = uploadedPhotoCount === requiredPhotoCount;

    return { uploadedPhotoCount, requiredPhotoCount, isAllPhotosUploaded };
  }, [instantOfferFiles]);
}

export default useCarPhotos;

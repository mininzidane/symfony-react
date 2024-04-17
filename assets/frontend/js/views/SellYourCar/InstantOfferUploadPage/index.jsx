import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InstantOfferService from 'frontend/js/api/InstantOfferService';
import Loader from 'frontend/js/views/Shared/Loader';
import OwnershipDocuments from './OwnershipDocuments';
import CarPhotos from './CarPhotos';

function InstantOfferUploadPage() {
  const { ref: instantOfferRef, hash, contentType } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [instantOffer, setInstantOffer] = useState(null);
  const { FILE_CONTENT_TYPES } = InstantOfferService;

  async function getInstantOffer() {
    setIsLoading(true);
    try {
      const data = await InstantOfferService.getInstantOffer(instantOfferRef, hash);
      setInstantOffer(data?.instantOffer);
    } catch {
      /** ignore */
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getInstantOffer();
  }, []);

  if (isLoading || !instantOffer) {
    return <Loader />;
  }

  if (contentType === FILE_CONTENT_TYPES.DOCUMENT) {
    return <OwnershipDocuments instantOffer={instantOffer} />;
  }

  if (contentType === FILE_CONTENT_TYPES.PHOTO) {
    return <CarPhotos instantOffer={instantOffer} />;
  }

  return null;
}

export default InstantOfferUploadPage;

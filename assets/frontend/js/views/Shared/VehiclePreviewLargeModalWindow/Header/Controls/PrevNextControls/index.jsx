/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { usePreviewModalContext } from 'frontend/js/context/PreviewModalContext';
import Control from './Control';

function PrevNextControls({ onNextLotButtonClick }) {
  const [{ isFirstLot, isLastLot, setNextLot, setPrevLot }] = usePreviewModalContext();

  function onNextLotClick() {
    onNextLotButtonClick();
    setNextLot();
  }

  return (
    <>
      {!isFirstLot && <Control onClick={setPrevLot} label={<FormattedMessage id="lotPage.modalGallery.prevLot" />} />}
      {!isLastLot && (
        <Control onClick={onNextLotClick} label={<FormattedMessage id="lotPage.modalGallery.nextLot" />} isNext />
      )}
    </>
  );
}

export default PrevNextControls;

/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { usePreviewModalContext } from 'frontend/js/context/PreviewModalContext';
import Control from '../Control';
import LeftArrow from './Icons/LeftArrow';
import RightArrow from './Icons/RightArrow';

function PrevNextControls() {
  const [{ isFirstLot, isLastLot, setNextLot, setPrevLot }] = usePreviewModalContext();

  return (
    <>
      {!isFirstLot && (
        <Control
          onClick={setPrevLot}
          label={<FormattedMessage id="lotPage.modalGallery.prevLot" />}
          icon={<LeftArrow />}
        />
      )}
      {!isLastLot && (
        <Control
          onClick={setNextLot}
          label={<FormattedMessage id="lotPage.modalGallery.nextLot" />}
          icon={<RightArrow />}
        />
      )}
    </>
  );
}

export default PrevNextControls;

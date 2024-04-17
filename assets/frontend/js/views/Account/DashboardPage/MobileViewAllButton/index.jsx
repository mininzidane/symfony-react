/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import ButtonLink from 'frontend/js/components/ButtonLink';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';

function MobileViewAllButton({ isLoading, onClick }) {
  const { isBelowSm } = useBreakpoint();

  return isBelowSm ? (
    <>
      {isLoading ? (
        <SpinnerWheel size={20} />
      ) : (
        <ButtonLink onClick={onClick} label={<FormattedMessage id="homePage.reviews.viewAll" />} />
      )}
    </>
  ) : null;
}

export default MobileViewAllButton;

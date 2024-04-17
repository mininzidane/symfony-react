import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import useStyles from './useStyles';

function CopyButton({ value }) {
  const classes = useStyles();
  const [isCopied, setIsCopied] = useState(false);

  function handleCopyClick(copyValue) {
    navigator.clipboard.writeText(copyValue);
    setIsCopied(true);
  }

  function handleCopyTooltipClose() {
    setTimeout(() => {
      setIsCopied(false);
    }, 500);
  }

  return (
    <TooltipOnHover
      placement="top"
      maxWidth={100}
      offset={10}
      isFlipEnabled={false}
      color="black"
      padding="6px 12px"
      hasArrow
      isBounceAnimation
      disablePortal={false}
      onClose={handleCopyTooltipClose}
      triggerProps={{
        onClick: () => {
          handleCopyClick(value);
        },
      }}
      triggerClassName={classes.copyButton}
      trigger={
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.8421 0H1.26316C0.568421 0 0 0.552783 0 1.22841V9.82725H1.26316V1.22841H8.8421V0ZM8.21058 2.45734H3.78953C3.09479 2.45734 2.53268 3.01013 2.53268 3.68575L2.52637 12.2846C2.52637 12.9602 3.08847 13.513 3.78321 13.513H10.7369C11.4316 13.513 12.0001 12.9602 12.0001 12.2846V6.14256L8.21058 2.45734ZM3.78955 3.68504V12.2839H10.7369V6.75605H7.57902V3.68504H3.78955Z"
          />
        </svg>
      }
      content={isCopied ? 'Copied!' : 'Copy To Clipboard'}
      boundariesElement="viewport"
    />
  );
}

CopyButton.propTypes = {
  value: PropTypes.string.isRequired,
};

export default CopyButton;

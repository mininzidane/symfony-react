import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';

function Control({ onClick, isNext }) {
  const classes = useStyles({ isNext });

  const Icon = () => (
    <svg className={classes.icon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 8.75H4.75L11.75 1.75L10 0L0 10L10 20L11.75 18.25L4.75 11.25H20V8.75Z" fill="#FFF" />
    </svg>
  );

  return (
    <button type="button" className={classes.root} onClick={onClick}>
      {!isNext && <Icon />}

      <div className={classes.label}>
        {isNext ? (
          <FormattedMessage id="lotPage.modalGallery.nextLot" />
        ) : (
          <FormattedMessage id="lotPage.modalGallery.prevLot" />
        )}
      </div>

      {isNext && <Icon />}
    </button>
  );
}

Control.propTypes = {
  onClick: PropTypes.func.isRequired,
  isNext: PropTypes.bool,
};

Control.defaultProps = {
  isNext: false,
};

export default Control;

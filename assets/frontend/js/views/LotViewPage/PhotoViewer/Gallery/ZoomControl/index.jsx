import React, { useState, Suspense } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import Control from '../Control';
import useStyles from './useStyles';

const Zoom = React.lazy(() => import('./Zoom'));

function ZoomControl({ elementId, image }) {
  const classes = useStyles();
  const [enabled, toggleEnabled] = useState(false);

  function handleClick() {
    toggleEnabled(!enabled);
  }

  return (
    <>
      <Control className={classes.root} onClick={handleClick}>
        <svg width={15} height={15} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.49 17.49">
          <g transform="translate(-3 -3)">
            <path
              fill="#fff"
              d="M15.5,14h-.79l-.28-.27a6.51,6.51,0,1,0-.7.7l.27.28v.79l5,4.99L20.49,19Zm-6,0A4.5,4.5,0,1,1,14,9.5,4.494,4.494,0,0,1,9.5,14Z"
            />
            <path fill="#fff" d="M12,10H10v2H9V10H7V9H9V7h1V9h2Z" />
          </g>
        </svg>
        <div>
          {enabled ? (
            <FormattedMessage id="lotPage.gallery.zoom.off" />
          ) : (
            <FormattedMessage id="lotPage.gallery.zoom.on" />
          )}
        </div>
      </Control>

      {enabled && (
        <Suspense fallback={null}>
          <Zoom elementId={elementId} image={image} />
        </Suspense>
      )}
    </>
  );
}

ZoomControl.propTypes = {
  elementId: PropTypes.string.isRequired,
  image: PropTypes.node.isRequired,
};

export default ZoomControl;

/* eslint-disable react/prop-types */
import React from 'react';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import TextUnderlined from 'frontend/js/components/TextUnderlined';
import Image from 'frontend/js/components/Image';
import KeySvg from './img/ic_key.svg';
import useStyles from './useStyles';

function KeyStatus({ lot }) {
  const { keysStatus, keyImage } = lot;
  const showTooltip = Boolean(keyImage && keyImage.full);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {showTooltip ? (
        <TooltipOnHover
          color="white"
          padding="10px"
          trigger={
            <div className={classes.keysWrap}>
              <img src={KeySvg} alt="Keys" />
              <strong>
                <TextUnderlined>{keysStatus}</TextUnderlined>
              </strong>
            </div>
          }
          content={
            <div className={classes.keysImage}>
              <Image ratio={75} src={keyImage.full} alt="Keys" />
            </div>
          }
        />
      ) : (
        <strong>{keysStatus}</strong>
      )}
    </div>
  );
}

export default KeyStatus;

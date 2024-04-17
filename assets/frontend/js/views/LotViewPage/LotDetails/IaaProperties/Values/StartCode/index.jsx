import React, { useState } from 'react';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ButtonLink from 'frontend/js/components/ButtonLink';
import useStyles from './useStyles';
import ModalEngineVideo from './ModalEngineVideo';
import EngineSvg from './img/ic_engine.svg';

function StartCode({ lot }) {
  const [isOpen, setIsOpen] = useState(false);
  const { id, inventoryAuction, startCode, engineVideo } = lot;
  const hasEngineVideo = Boolean(engineVideo && engineVideo.url);
  const classes = useStyles();

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      {hasEngineVideo ? (
        <>
          <ButtonLink
            label={
              <div className={classes.triggerWrap}>
                <img src={EngineSvg} alt="Engine" />
                <strong>{startCode}</strong>
              </div>
            }
            onClick={handleOpen}
            className={classes.trigger}
          />

          <ModalWindow
            rootClassName={classes.root}
            className={classes.container}
            onClose={handleClose}
            isOpen={isOpen}
            hasCloseButton={false}
            size="fullscreen"
          >
            <ModalEngineVideo
              lotId={id}
              auction={inventoryAuction}
              engineVideo={engineVideo}
              handleClose={handleClose}
            />
          </ModalWindow>
        </>
      ) : (
        <>{startCode}</>
      )}
    </>
  );
}

StartCode.propTypes = {
  lot: LotShape.isRequired,
};

export default StartCode;

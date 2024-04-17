/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ButtonCross from 'frontend/js/components/ButtonCross';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import useScript from 'frontend/js/hooks/useScript';
import Tabs from './Tabs';
import Title from './Title';
import TabPanel from './TabPanel';
import PlayPauseButton from './PlayPauseButton';
import CloudImage360 from './CloudImage360';
import useCi360playState from './CloudImage360/useCi360playState';
import PannellumPanorama from './PannellumPanorama';
import useStyles from './useStyles';

const ci360PluginScriptUrl = '/vendor/js-cloudimage-360-view.min.js';

function Content({ id, auction, handleClose, externalUrls, internalUrl }) {
  const classes = useStyles();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { isPlaying, stopPlaying, togglePlaying } = useCi360playState();

  function handleTabChange(index) {
    setActiveTabIndex(index);
    stopPlaying();
  }

  useEffect(() => {
    window.CI360 = window.CI360 || { notInitOnLoad: true };

    return () => {
      window.CI360?.destroy();
    };
  }, []);

  function init() {
    window.CI360.init();

    // https://github.com/scaleflex/js-cloudimage-360-view/issues/42
    if (ViewportService.isTouchScreen) {
      window.CI360._viewers[0].play();
    }
  }

  useScript(ci360PluginScriptUrl, init);

  return (
    <>
      <div className={classes.header}>
        <Title lotId={id} auction={auction} />

        <div className={classes.controls}>
          <PlayPauseButton onClick={togglePlaying} isPlaying={isPlaying} isDisabled={activeTabIndex === 1} />
          <Tabs onChange={handleTabChange} index={activeTabIndex} />
        </div>

        <ButtonCross onClick={handleClose} color="white" className={classes.closeButton} size={12} />
      </div>

      <div className={classes.body}>
        <TabPanel isActive={activeTabIndex === 0}>
          <CloudImage360 onInteract={stopPlaying} urls={externalUrls} />
        </TabPanel>
        <TabPanel isActive={activeTabIndex === 1}>
          <PannellumPanorama isShown={activeTabIndex === 1} url={internalUrl} />
        </TabPanel>
      </div>
    </>
  );
}

Content.propTypes = {
  id: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Content;

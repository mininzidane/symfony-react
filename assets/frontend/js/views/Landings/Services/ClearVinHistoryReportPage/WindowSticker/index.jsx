/* eslint-disable no-unused-vars */
import React from 'react';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import { FormattedMessage } from 'react-intl-phraseapp';
import Container from 'frontend/js/components/Container';
import Button from 'frontend/js/components/Button';
import CheckmarkRoundBlueSvg from 'frontend/images/shared/various/checkmark-round-blue.svg';
import ImageWindowStickerPng from './img/image_window_stiker.png';
import ImageWindowStickerSmPng from './img/image_window_stiker-sm.png';
import useStyles from './useStyles';

function WindowSticker() {
  const { isBelowSm } = useBreakpoint();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.grid}>
          <div>
            <img src={isBelowSm ? ImageWindowStickerSmPng : ImageWindowStickerPng} alt="sticker" />
          </div>
          <div>
            <div className={classes.title}>
              <FormattedMessage id="clearVinHistoryReportPage.stickerSection.title" />
            </div>
            <div className={classes.desc}>
              <FormattedMessage id="clearVinHistoryReportPage.stickerSection.desc" />
            </div>
            <div className={classes.list}>
              <div>
                <img src={CheckmarkRoundBlueSvg} alt="Checkmark" />{' '}
                <FormattedMessage id="clearVinHistoryReportPage.stickerSection.li1" />
              </div>
              <div>
                <img src={CheckmarkRoundBlueSvg} alt="Checkmark" />{' '}
                <FormattedMessage id="clearVinHistoryReportPage.stickerSection.li2" />
              </div>
              <div>
                <img src={CheckmarkRoundBlueSvg} alt="Checkmark" />{' '}
                <FormattedMessage id="clearVinHistoryReportPage.stickerSection.li3" />
              </div>
              <div>
                <img src={CheckmarkRoundBlueSvg} alt="Checkmark" />{' '}
                <FormattedMessage id="clearVinHistoryReportPage.stickerSection.li4" />
              </div>
              <div>
                <img src={CheckmarkRoundBlueSvg} alt="Checkmark" />{' '}
                <FormattedMessage id="clearVinHistoryReportPage.stickerSection.li5" />
              </div>
            </div>
            <Button
              color="green"
              className={classes.cta}
              label="GET Window sticker"
              href="https://www.clearvin.com/en/window-sticker"
              isNofollow
              isTargetBlank
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

WindowSticker.propTypes = {};

export default WindowSticker;

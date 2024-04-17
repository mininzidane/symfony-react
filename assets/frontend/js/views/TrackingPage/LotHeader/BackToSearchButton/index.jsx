/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import { FormattedMessage } from 'react-intl-phraseapp';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import useStyles from './useStyles';

function BackToSearchButton({ href, isSelect }) {
  const classes = useStyles();
  const eventTrackingService = new EventTrackingService();
  const { isBelowSm } = useBreakpoint();

  if (!href) {
    return null;
  }

  return (
    <ButtonOutlined
      className={classnames(classes.root, 'navigation-control-button', isSelect && 'is-select')}
      onClick={() => {
        eventTrackingService.sendEvent({ name: 'back_link_click', step: 'abm_lotpage' });
      }}
      label={
        isBelowSm ? (
          <svg width="14" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.563 4.313c.708 0 1.386.133 2.033.398.648.266 1.223.65 1.727 1.154.503.504.888 1.08 1.154 1.727.265.647.398 1.325.398 2.033a5.16 5.16 0 01-.415 2.067 5.458 5.458 0 01-1.137 1.694 5.177 5.177 0 01-1.685 1.137 5.382 5.382 0 01-2.075.415v-1.063a4.198 4.198 0 002.997-1.245 4.51 4.51 0 00.912-1.353c.227-.514.34-1.065.34-1.652a4.195 4.195 0 00-1.245-2.997 4.487 4.487 0 00-1.353-.912 4.05 4.05 0 00-1.652-.34h-5.62L6.28 8.72l-.747.747L.909 4.844 5.533.221l.747.747-3.337 3.345h5.62z"
              fill="#333"
            />
          </svg>
        ) : (
          <FormattedMessage id="lotPage.navigation.backToResults" />
        )
      }
      href={href}
      color="black"
      isInline
      isRegularCase
      isThinBorder
    />
  );
}

BackToSearchButton.propTypes = {
  href: PropTypes.string,
};

BackToSearchButton.defaultProps = {
  href: '',
};

export default BackToSearchButton;

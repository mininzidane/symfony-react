import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Container from 'frontend/js/components/Container';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import useStyles from './useStyles';

function CaptionPanel({ label, icon, iconSize, footer, isUltraWide, fullscreen, extra, contentClassName }) {
  const classes = useStyles();

  const Wrapper = fullscreen ? ContainerFullScreen : Container;

  return (
    <div className={classes.root}>
      <Wrapper {...(Wrapper === ContainerFullScreen && { isUltraWide })}>
        <div className={classnames(classes.content, contentClassName)}>
          <div className={classes.title}>
            <img src={icon} alt="" width={iconSize.width || 20} height={iconSize.height || 20} />
            <span>{label}</span>
          </div>

          <div className={classes.extra}>{extra}</div>
        </div>

        {footer && <div className={classes.footer}>{footer}</div>}
      </Wrapper>
    </div>
  );
}

CaptionPanel.defaultProps = {
  footer: null,
  fullscreen: false,
  isUltraWide: false,
  extra: null,
  iconSize: {},
  contentClassName: '',
};

CaptionPanel.propTypes = {
  label: PropTypes.node.isRequired,
  icon: PropTypes.string.isRequired,
  iconSize: PropTypes.object,
  footer: PropTypes.node,
  fullscreen: PropTypes.bool,
  isUltraWide: PropTypes.bool,
  extra: PropTypes.node,
  contentClassName: PropTypes.string,
};

export default CaptionPanel;

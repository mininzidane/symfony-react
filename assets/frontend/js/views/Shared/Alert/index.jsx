import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import ErrorIcon from './img/error.svg';
import InfoIcon from './img/info.svg';
import useStyles from './useStyles';

const ICONS = {
  error: ErrorIcon,
  info: InfoIcon,
};

function Alert({ content, type }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ContainerFullScreen>
        <span className={classes.attention}>
          <img src={ICONS[type]} alt="!" className={classes.icon} />
          <FormattedMessage id="shared.label.attention" />:
        </span>
        &nbsp;{content}
      </ContainerFullScreen>
    </div>
  );
}

Alert.defaultProps = {
  type: 'info',
};

Alert.propTypes = {
  content: PropTypes.node.isRequired,
  type: PropTypes.string,
};

export default Alert;

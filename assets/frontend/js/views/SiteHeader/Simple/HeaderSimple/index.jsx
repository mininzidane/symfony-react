import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import t from 'frontend/js/api/TranslatorService';
import Logo from '../../Logo';
import CopartBroker from '../../CopartBroker';
import useStyles from './useStyles';
import LockIcon from './img/lock.svg';

function SiteHeaderSimple({ isDefaultPaddings, isWithoutLabel }) {
  const classes = useStyles();

  return (
    <>
      <div
        className={classnames(classes.root, 'fixed-fullsize-panel', { 'is-default-paddings': isDefaultPaddings })}
        id="header-panel"
      >
        <Logo />
        <CopartBroker />
        <div className={classes.securedArea}>
          {isWithoutLabel ? (
            <div />
          ) : (
            <>
              <img src={LockIcon} className={classes.securedAreaIcon} alt="Lock Icon" />
              <span className={classes.securedAreaText}>{t('header.secured_area')}</span>
            </>
          )}
        </div>
      </div>
    </>
  );
}

SiteHeaderSimple.defaultProps = {
  isDefaultPaddings: false,
  isWithoutLabel: false,
};

SiteHeaderSimple.propTypes = {
  isDefaultPaddings: PropTypes.bool,
  isWithoutLabel: PropTypes.bool,
};

export default SiteHeaderSimple;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Link from 'frontend/js/components/Link';
import RouterService from 'frontend/js/api/RouterService';
import Container from 'frontend/js/components/Container';
import AbmLogoSvg from 'frontend/images/shared/logo/abm-logo-white.svg';

import useStyles from './useStyles';

function Title({ title, iconSrcSet, iconLink }) {
  const classes = useStyles();
  const isWideTitle = iconSrcSet[0];

  return (
    <header className={classes.root}>
      <Container className={classNames({ [classes.wideContainer]: isWideTitle })}>
        <div className={classNames(classes.content, { [classes.wideContent]: isWideTitle })}>
          <Link href={RouterService.getRoute('home')}>
            <img src={AbmLogoSvg} alt="AutoBidMaster" className={classes.abmLogo} />
          </Link>

          <h1 className={classNames(classes.text, { [classes.wideTitle]: isWideTitle })}>{title}</h1>

          {isWideTitle && !iconLink && (
            <img
              src={iconSrcSet[1]}
              srcSet={`${iconSrcSet[0]}, ${iconSrcSet[1]} 2x`}
              className={classes.icon}
              alt="headerIcon"
            />
          )}

          {isWideTitle && iconLink && (
            <Link href={iconLink} isTargetBlank>
              <img
                src={iconSrcSet[1]}
                srcSet={`${iconSrcSet[0]}, ${iconSrcSet[1]} 2x`}
                className={classes.icon}
                alt="headerIcon"
              />
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  iconSrcSet: PropTypes.array,
  iconLink: PropTypes.string,
};

Title.defaultProps = {
  iconSrcSet: [],
  iconLink: '',
};

export default Title;

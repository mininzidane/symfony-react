import React from 'react';
import PropTypes from 'prop-types';

import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Container from 'frontend/js/components/Container';

import defaultBg from '../img/home-hero-bg@2x.jpg';
import EhLogo from '../img/EH-logo.svg';
import useStyles from './useStyles';

function Header({ title, subtitle, bgImg }) {
  const classes = useStyles();

  return (
    <ContainerFullScreen className={classes.root} background={{ xl_x1: bgImg, sm_x1: bgImg, color: '#F0EDEB' }}>
      <Container>
        <img src={EhLogo} alt="EasyHaul" width="152px" />
        <h1 className={classes.title}>{title}</h1>
        <h2 className={classes.subtitle}>{subtitle}</h2>
      </Container>
    </ContainerFullScreen>
  );
}

Header.propTypes = {
  title: PropTypes.array.isRequired,
  subtitle: PropTypes.array.isRequired,
  bgImg: PropTypes.string,
};

Header.defaultProps = {
  bgImg: defaultBg,
};

export default Header;

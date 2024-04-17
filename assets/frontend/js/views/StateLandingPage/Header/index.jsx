import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useStyles from './useStyles';
import ABMBlueLogo from '../../../../images/shared/logo/abm-logo-blue.svg';
import CopartBrokerSvg from '../../../../images/shared/partners/copart-broker.svg';
import Container from '../../../components/Container';
import RouterService from '../../../api/RouterService';

function Header({ pageTitle }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <div>
          <a href={RouterService.getRoute('home')}>
            <img className={classNames(classes.logo, 'mr-30')} src={ABMBlueLogo} alt="ABM logo" />
          </a>
          <a href="http://www.copart.com" target="_blank" rel="noopener noreferrer">
            <img className={classes.logo} src={CopartBrokerSvg} alt="Copart broker logo" />
          </a>
        </div>
        <div className={classes.title}>{pageTitle}</div>
      </Container>
    </div>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string,
};

Header.defaultProps = {
  pageTitle: 'BID ON ALL VEHICLES FROM COPART AUTO AUCTION.',
};

export default Header;

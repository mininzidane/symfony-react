import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import Container from 'frontend/js/components/Container';
import Button from 'frontend/js/components/Button';
import RouterService from 'frontend/js/api/RouterService';
import useStyles from './useStyles';
import NothingFoundSvg from './img/ic_nothing_found.svg';

function NotFound() {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Container className={classes.root}>
      <img src={NothingFoundSvg} alt="Nothing Found" className={classes.icon} />
      <div className={classes.text}>{intl.formatMessage({ id: 'trackMyOrderPage.noResultsError' })}</div>
      <Button
        className={classes.cta}
        href={RouterService.getRoute('trackMyOrder')}
        label={intl.formatMessage({ id: 'trackMyOrderPage.trackNewOrder' })}
        color="blue"
      />
    </Container>
  );
}

export default NotFound;

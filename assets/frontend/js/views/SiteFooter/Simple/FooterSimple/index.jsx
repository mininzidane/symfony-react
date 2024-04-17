import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import t from 'frontend/js/api/TranslatorService';
import Container from 'frontend/js/components/Container';
import Copyright from 'frontend/js/views/Shared/Copyright';
import useStyles from './useStyles';

function SiteFooterSimple() {
  const { getRoute, getLocalizedHcRoute } = RouterService;
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Container>
          <ul className={classes.links}>
            <li>
              <a href={getRoute('searchResults')}>{t('footer.links.findVehicles')}</a>
            </li>
            <li>
              <a href={getLocalizedHcRoute()}>{t('footer.links.helpCenter')}</a>
            </li>
            <li>
              <a href={getRoute('contactUs')}>{t('footer.links.contactUs')}</a>
            </li>
          </ul>

          <p className={classes.copyright}>
            <Copyright isShort />
          </p>
        </Container>
      </div>
    </>
  );
}

export default SiteFooterSimple;

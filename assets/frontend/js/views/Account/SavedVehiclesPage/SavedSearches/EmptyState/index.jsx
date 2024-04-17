/* eslint-disable react/prop-types */
import React from 'react';
import Button from 'frontend/js/components/Button';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import RouterService from 'frontend/js/api/RouterService';
import Container from 'frontend/js/components/Container';
import GoogleAd from 'frontend/js/components/GoogleAd';
import useStyles from './useStyles';
import SavedSearchesSvg from './img/ic_saved_searches.svg';

function EmptyState() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.group}>
        <img src={SavedSearchesSvg} width="72" alt="Saved Searches" />

        <h2 className={classes.title}>
          <FormattedMessage id="savedVehiclesPage.emptyState.title.savedSearches" />
        </h2>

        <p className={classes.subtitle}>
          <FormattedMessage id="savedVehiclesPage.emptyState.subtitle.savedSearches" />
        </p>

        <Button
          href={RouterService.getRoute('searchResults')}
          className={classes.button}
          label={<FormattedMessage id="shared.label.searchNow" />}
          isInline
          isRegularCase
        />
      </div>

      <GoogleAd
        id="div-gpt-ad-1665182489390-2"
        adUnitPath="/93216436/ABM-Internal-Area-728x90-300x100"
        placement="saved-search-2"
        className="width-xl-728 spacer-xl-90 width-sm-300 mb-20 mt-20 sm-mb-10 sm-mt-10"
        withSlot
      />
    </Container>
  );
}

export default EmptyState;

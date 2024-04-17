/* eslint-disable react/prop-types */
import React from 'react';
import Container from 'frontend/js/components/Container';
import { FormattedMessage } from 'react-intl-phraseapp';
import EmptySearchSvg from 'frontend/images/shared/various/empty-search.svg';
import useStyles from './useStyles';

function EmptyResultsState({ containers }) {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.root}>
        <img src={EmptySearchSvg} alt="Icon" width={66} height={66} />

        <h2 className={classes.title}>
          <FormattedMessage
            id="searchResultsPage.noResultsFor"
            values={{ queryString: `"${containers.join(', ')}"` }}
          />
        </h2>

        <p className={classes.descriptions}>
          <FormattedMessage id="bidStatusPage.zeroSearchResults" />
        </p>
      </div>
    </Container>
  );
}

export default EmptyResultsState;

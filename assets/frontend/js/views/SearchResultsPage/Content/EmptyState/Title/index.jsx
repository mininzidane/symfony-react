import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';

function Title({ queryString }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>
        {queryString ? (
          <FormattedMessage id="searchResultsPage.noResultsFor" values={{ queryString }} />
        ) : (
          <FormattedMessage id="searchResultsPage.noResults" />
        )}
      </h1>
      <p className={classes.subtitle}>
        <FormattedMessage id="searchResultsPage.noResultsDescription" />
      </p>
    </div>
  );
}

Title.defaultProps = {
  queryString: '',
};

Title.propTypes = {
  queryString: PropTypes.string,
};

export default Title;

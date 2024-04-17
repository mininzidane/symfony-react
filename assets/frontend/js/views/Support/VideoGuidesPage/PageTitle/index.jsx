import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';

function PageTitle({ pageTitle }) {
  const classes = useStyles();
  let title = pageTitle;
  if (!title) {
    title = <FormattedMessage id="videoGuidesPage.title" />;
  }

  return <h1 className={classes.root}>{title}</h1>;
}

PageTitle.propTypes = {
  pageTitle: PropTypes.string,
};

PageTitle.defaultProps = {
  pageTitle: '',
};

export default PageTitle;

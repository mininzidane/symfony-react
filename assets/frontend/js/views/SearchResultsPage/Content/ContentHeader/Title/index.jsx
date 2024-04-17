/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import { useSearchData } from 'frontend/js/views/SearchResultsPage/_Context/SearchDataContext';
import useStyles from './useStyles';

function Title({ className }) {
  const classes = useStyles();
  const [{ seo }] = useSearchData();

  return (
    <div className={classnames(classes.root, className)}>
      <h1 className={classes.title}>{seo.pageTitle}</h1>
    </div>
  );
}

export default Title;

import React from 'react';
import Container from 'frontend/js/components/Container';
import { useFiltersContext } from 'frontend/js/views/SearchResultsPage/_Context/FiltersContext';
import { useSearchData } from 'frontend/js/views/SearchResultsPage/_Context/SearchDataContext';
import SeoContent from 'frontend/js/views/SearchResultsPage/Content/ContentBody/SeoContent';
import MetaTags from 'frontend/js/views/SearchResultsPage/Content/ContentHeader/MetaTags';
import Title from './Title';
import LinkCards from './LinkCards';
import useStyles from './useStyles';

function EmptyState() {
  const [{ query }] = useFiltersContext();
  const [{ seo }] = useSearchData();

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <MetaTags />
      <Title queryString={query.q || seo.h1} />
      <LinkCards />
      <SeoContent />
    </Container>
  );
}

export default EmptyState;

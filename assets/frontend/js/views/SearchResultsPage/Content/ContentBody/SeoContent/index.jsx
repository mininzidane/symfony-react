import React from 'react';
import Card from 'frontend/js/components/Card';
import { useSearchData } from 'frontend/js/views/SearchResultsPage/_Context/SearchDataContext';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useStyles from './useStyles';

function SeoContent() {
  const classes = useStyles();
  const [{ seo, isInitialLoad }] = useSearchData();
  const { isAuthenticated } = useCustomerHelper();

  if (isAuthenticated || isInitialLoad || !seo.pageContent) {
    return null;
  }

  return (
    <Card className={classes.root}>
      <div dangerouslySetInnerHTML={{ __html: seo.pageContent }} />
    </Card>
  );
}

export default SeoContent;

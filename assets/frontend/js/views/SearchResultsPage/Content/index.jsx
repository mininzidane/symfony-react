import React, { Suspense } from 'react';
import classnames from 'classnames';
import { useSearchData } from 'frontend/js/views/SearchResultsPage/_Context/SearchDataContext';
import Breadcrumbs from 'frontend/js/views/SearchResultsPage/Breadcrumbs';
import DelayedLoadService from 'frontend/js/api/DelayedLoadService';
import HiddenFooterFallback from 'frontend/js/components/Suspense/HiddenFooterFallback';
import ContentHeader from './ContentHeader';
import ContentBody from './ContentBody';
import useStyles from './useStyles';

const EmptyState = React.lazy(() => import('./EmptyState'));

function Content() {
  const classes = useStyles();
  const [{ lots, isInitialLoad, placeholder }] = useSearchData();

  const showPlaceholder = isInitialLoad && placeholder;
  const noResults = !isInitialLoad && !lots.length;

  return (
    <div className={classnames(classes.root, showPlaceholder && classes.placeholder)}>
      <Breadcrumbs />

      {noResults ? (
        <Suspense
          fallback={
            <HiddenFooterFallback
              onUnmount={() => {
                DelayedLoadService.done(DelayedLoadService.ACTIONS.MAIN_CONTENT_LOADED);
              }}
            />
          }
        >
          <EmptyState />
        </Suspense>
      ) : (
        <>
          <ContentHeader />
          <ContentBody />
        </>
      )}
    </div>
  );
}

export default Content;

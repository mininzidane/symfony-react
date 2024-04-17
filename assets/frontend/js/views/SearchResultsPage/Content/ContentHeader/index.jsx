import React from 'react';
import classnames from 'classnames';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import { useSearchData } from 'frontend/js/views/SearchResultsPage/_Context/SearchDataContext';
import { useDisplaySettingsContext } from 'frontend/js/views/SearchResultsPage/_Context/DisplaySettingsContext';
import SortBySelect from '../../SortBySelect';
import ResultsCount from './ResultsCount';
import Title from './Title';
import MetaTags from './MetaTags';
import SaveSearchButton from './SaveSearchButton';
import ViewSelect from './ViewSelect';
import useStyles from './useStyles';

function ContentHeader() {
  const classes = useStyles();
  const { isBelowXs } = useBreakpoint();
  const [{ isInitialLoad, placeholder }] = useSearchData();
  const [{ isGridView }] = useDisplaySettingsContext();

  const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  if (isInitialLoad && !placeholder) {
    return null;
  }

  return (
    <div className={classnames(classes.root, { 'is-firefox': isFirefox })}>
      <MetaTags />

      <Title className={classes.title} />

      <div className={classnames(classes.wrap, { 'is-firefox': isFirefox })}>
        <div className={classes.count}>
          (<ResultsCount />)
        </div>

        <div className="d-f jc-sb ai-bl f-1">
          <SaveSearchButton className="mr-25 ws-n" />

          <div className={classes.titleSectionFilters}>
            {!isBelowXs && isGridView && <SortBySelect />}
            {!isBelowXs && <ViewSelect />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentHeader;

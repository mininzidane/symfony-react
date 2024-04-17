import React, { useCallback, useLayoutEffect, useRef } from 'react';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import NumberService from 'frontend/js/lib/utils/NumberService';
import ButtonCross from 'frontend/js/components/ButtonCross';
import Button from 'frontend/js/components/Button';
import { useSearchData } from '../../_Context/SearchDataContext';
import { useFiltersContext } from '../../_Context/FiltersContext';
import FiltersIconSrc from './img/filters.svg';
import Accordion from '../Accordion';
import FiltersChips from '../FiltersChips';
import useStyles from './useStyles';

function MobileSidebar() {
  const classes = useStyles();
  const [{ setIsFiltersPanelOpen, filtersCount }] = useFiltersContext();
  const [{ total }] = useSearchData();
  const footerRef = useRef();

  const handleClose = useCallback(() => {
    setIsFiltersPanelOpen(false);
  }, []);

  useLayoutEffect(() => {
    ViewportService.lockBodyScrolling(true, 'search-sidebar');

    return () => {
      ViewportService.lockBodyScrolling(false, 'search-sidebar');
    };
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div>
          <img src={FiltersIconSrc} alt="" width="13px" height="11px" className={classes.filtersIcon} />
          <FormattedMessage id="shared.label.filters" /> {filtersCount ? `(${filtersCount})` : null}
        </div>
        <ButtonCross onClick={() => setIsFiltersPanelOpen(false)} size={14} color="white" isExtraHitbox isThin />
      </div>

      <div className={classes.body}>
        <FiltersChips />
        <Accordion footerRef={footerRef} onSavedSearchClick={handleClose} />
      </div>

      <div className={classes.footer} id="search-mobile-sidebar-footer" ref={footerRef}>
        <Button
          color="blue"
          isRegularCase
          onClick={handleClose}
          label={
            <FormattedMessage
              id="searchResultsPage.sidebar.showResults"
              values={{
                resultCount: NumberService.formatNumber(total),
              }}
            />
          }
        />
      </div>
    </div>
  );
}

export default MobileSidebar;

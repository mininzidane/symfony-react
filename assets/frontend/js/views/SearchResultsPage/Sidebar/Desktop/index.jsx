import React from 'react';
import classnames from 'classnames';
import AdbutlerAdvertisement from 'frontend/js/components/AdbutlerAdvertisement';
import { useFiltersContext } from 'frontend/js/views/SearchResultsPage/_Context/FiltersContext';
import GoogleAd from 'frontend/js/components/GoogleAd';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Accordion from '../Accordion';
import FiltersChips from '../FiltersChips';
import Loading from './Loading';
import useStyles from './useStyles';

function DesktopSidebar() {
  const [{ filters, loading }] = useFiltersContext();
  const classes = useStyles();
  const { isAboveMd } = useBreakpoint();

  if (!filters) {
    return <Loading />;
  }

  return (
    <div className={classnames(classes.root, loading && classes.placeholder)}>
      <FiltersChips />

      <Accordion />

      <AdbutlerAdvertisement id="519499" className="mt-30" />

      {isAboveMd && (
        <GoogleAd
          id="div-gpt-ad-1663874661137-0"
          className={classnames('width-xl-300', 'mt-25', classes.ad)}
          placement="srp_sidebar_bottom"
          adUnitPath="/93216436/abm-search-cf-left"
          desktopSize={[300, 600]}
          withSlot
        />
      )}
    </div>
  );
}

export default DesktopSidebar;

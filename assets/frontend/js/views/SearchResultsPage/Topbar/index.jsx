import React from 'react';
import classnames from 'classnames';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import { useFiltersContext } from '../_Context/FiltersContext';
import ViewSelect from '../Content/ContentHeader/ViewSelect';
import SortBySelect from '../SortBySelect';
import Chips from './Chips';
import Loading from './Loading';
import useStyles from './useStyles';

function Topbar() {
  const classes = useStyles();
  const { isBelowXs } = useBreakpoint();
  const [{ filters, areFiltersEmpty, loading }] = useFiltersContext();

  if (!filters) {
    return <Loading />;
  }

  return (
    <div className={classnames(classes.root, loading && classes.placeholder)}>
      <ContainerFullScreen className={classnames(classes.barContainer, 'qa_id_wide_bar')} isUltraWide>
        {!areFiltersEmpty && (
          <>
            <div className={classes.mainRow}>
              <Chips />
            </div>

            {isBelowXs && (
              <div className={classes.mobileTools}>
                <SortBySelect />
                <ViewSelect />
              </div>
            )}
          </>
        )}
      </ContainerFullScreen>
    </div>
  );
}

export default Topbar;

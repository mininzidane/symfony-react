import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import FilterOptionShape from 'frontend/js/lib/propshapes/FilterOptionShape';
import Form from 'frontend/js/views/Account/BidStatusPage/Shared/Filters/Form';
import Modal from 'frontend/js/views/Account/BidStatusPage/Shared/Filters/Modal';
import ViewModeToggler from 'frontend/js/components/ViewModeToggler';
import ViewModeContext from 'frontend/js/context/ViewModeContext';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useStyles from './useStyles';

function Filters({ bidders, dateRanges, hasTime, hasViewToggle, hasSearchByLotVin, absolute }) {
  const intl = useIntl();
  const classes = useStyles({ hasBidder: bidders.length > 0 });
  const { viewModeOptions, view, setView } = useContext(ViewModeContext);
  const { isAboveMd } = useBreakpoint();

  return (
    <div className={classnames(classes.root, absolute && classes.absolute)}>
      {hasTime && (
        <>
          {isAboveMd ? (
            <Form bidders={bidders} dateRanges={dateRanges} submitOnChange hasSearchByLotVin={hasSearchByLotVin} />
          ) : (
            <Modal title={intl.formatMessage({ id: 'shared.label.selectFilters' })}>
              <>
                <Form bidders={bidders} dateRanges={dateRanges} />
              </>
            </Modal>
          )}
        </>
      )}

      {hasViewToggle && (
        <div className={classes.viewModeTogglerWrap}>
          <ViewModeToggler viewModeOptions={viewModeOptions} view={view} setView={setView} />
        </div>
      )}
    </div>
  );
}

Filters.defaultProps = {
  dateRanges: [],
  bidders: [],
  hasTime: false,
  hasViewToggle: false,
  hasSearchByLotVin: false,
  absolute: true,
};

Filters.propTypes = {
  dateRanges: PropTypes.arrayOf(FilterOptionShape),
  bidders: PropTypes.arrayOf(FilterOptionShape),
  hasTime: PropTypes.bool,
  hasViewToggle: PropTypes.bool,
  hasSearchByLotVin: PropTypes.bool,
  absolute: PropTypes.bool,
};

export default Filters;

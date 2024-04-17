import React, { useContext, Suspense } from 'react';
import PropTypes from 'prop-types';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import RouterService from 'frontend/js/api/RouterService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import PaginationContext from 'frontend/js/context/PaginationContext';

const PaginationView = React.lazy(() => import('./PaginationView'));

function Pagination({ className, isAdvanced, isAuthRequired, withHistoryAPI, ...props }) {
  const { isAuthenticated } = useCustomerHelper();
  const { total, maxPagesCount, itemsPerPage, currentPage, setCurrentPage } = useContext(PaginationContext);

  if (total <= itemsPerPage) {
    return null;
  }

  const handleChangePage = (_, page) => {
    if (isAuthRequired && !isAuthenticated) {
      window.dispatchEvent(new CustomEvent('openAuthModal'));
      return;
    }

    ScrollService.scrollToTop();
    setCurrentPage(page);

    if (withHistoryAPI) {
      RouterService.addQueryParams({ page }, { pushToHistory: true });
    }
  };

  return (
    <Suspense fallback={null}>
      <PaginationView
        className={className}
        onChangePage={handleChangePage}
        isAdvanced={isAdvanced}
        withHistoryAPI={withHistoryAPI}
        count={Math.min(Math.ceil(total / itemsPerPage), maxPagesCount)}
        currentPage={currentPage}
        {...props}
      />
    </Suspense>
  );
}

Pagination.propTypes = {
  className: PropTypes.string,
  isAdvanced: PropTypes.bool,
  withHistoryAPI: PropTypes.bool,
  isAuthRequired: PropTypes.bool,
};

Pagination.defaultProps = {
  className: '',
  isAdvanced: false,
  withHistoryAPI: false,
  isAuthRequired: true,
};

export default Pagination;

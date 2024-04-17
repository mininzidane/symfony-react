import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useFormik } from 'formik';
import ConsignmentService from 'backend/js/api/ConsignmentService';
import RouterService from 'backend/js/api/RouterService';
import PaginationContext from 'frontend/js/context/PaginationContext';
import LocalStorageService from 'backend/js/lib/utils/LocalStorageService';
import ConsignmentContext from './ConsignmentContext';

const DEFAULT_TAB = 'bid_approval';
const ALL_TAB = 'all';

const ConsignmentContextProvider = ({ children }) => {
  const { currentPage, setItemsPerPage, setTotal, setCurrentPage, maxPagesCount, total, itemsPerPage } =
    useContext(PaginationContext);

  const [activeTab, setActiveTab] = useState(RouterService.getQueryParam('tab') || DEFAULT_TAB);
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [consignments, setConsignments] = useState([]);
  const [queryParams, setQueryParams] = useState(LocalStorageService.get('ACP::ConsignmentFilters') || {});
  const [loadError, setLoadError] = useState(undefined);
  const [sort, setSort] = useState(null);
  const [order, setOrder] = useState('desc');

  async function applyQueryParams(params) {
    // eslint-disable-next-line no-unused-vars
    const newParamsArr = Object.entries(params).filter(([_, value]) => Boolean(value));
    const newParams = Object.fromEntries(newParamsArr);

    setCurrentPage(newParams.page || 1);
    if (newParams.page === 1) {
      delete newParams.page;
    }
    setActiveTab(newParams.tab);
    setQueryParams(newParams);
    LocalStorageService.set('ACP::ConsignmentFilters', newParams);
  }

  useEffect(() => {
    if (queryParams) {
      applyQueryParams(queryParams);
    }
  }, []);

  const formikFilter = useFormik({
    initialValues: {
      status: RouterService.getQueryParam('status') || queryParams?.status || '',
      lot_or_vin: RouterService.getQueryParam('lot_or_vin') || '',
      sale_type: RouterService.getQueryParam('sale_type') || queryParams?.sale_type || '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const params = {
        ...queryParams,
        page: 1,
        status: values.status,
        lot_or_vin: values.lot_or_vin?.trim(),
        sale_type: values.sale_type,
      };
      if (params.lot_or_vin) {
        params.tab = ALL_TAB;
      }
      await applyQueryParams(params);
      setSubmitting(false);
    },
  });

  function resetFilterForm() {
    formikFilter.resetForm({
      values: {
        status: '',
        lot_or_vin: '',
        sale_type: '',
      },
    });
  }

  async function resetFilter() {
    resetFilterForm();
    await applyQueryParams({ tab: DEFAULT_TAB });
  }

  const {
    data: { tabs = [] } = {},
    isLoading: isTabsLoading,
    refetch: refetchTabs,
  } = useQuery(['consignment_tabs', formikFilter.submitCount], () =>
    ConsignmentService.getTabsOverview(formikFilter.values),
  );

  function updateConsignments(items) {
    if (activeTab === 'bid_approval') {
      const { BID_APPROVAL_STATUSES } = ConsignmentService;
      items.sort((itemA, itemB) => {
        const statusesWhichNeedsAction = [
          BID_APPROVAL_STATUSES.ON_APPROVAL_RESERVE,
          BID_APPROVAL_STATUSES.AWAITING_YOUR_RESPONSE,
          BID_APPROVAL_STATUSES.BUYER_COUNTERED_BID,
        ];

        const a = statusesWhichNeedsAction.includes(itemA.bidApprovalStatus);
        const b = statusesWhichNeedsAction.includes(itemB.bidApprovalStatus);
        if (a && b) {
          return 0;
        }
        if (a) {
          return -1;
        }

        return 1;
      });
    }
    setConsignments(items);
  }

  function updateConsignment(consignment) {
    const newConsignments = [...consignments];
    const index = newConsignments.findIndex((val) => val.id === consignment.id);
    const { TAB_STATUS_MAP } = ConsignmentService;
    const isRemoveFromActiveTab =
      activeTab === 'bid_approval' && !TAB_STATUS_MAP.TAB_BID_APPROVAL.includes(consignment.lotStatus);
    if (isRemoveFromActiveTab) {
      newConsignments.splice(index, 1);
    } else {
      newConsignments[index] = {
        ...consignments[index],
        ...consignment,
      };
    }
    updateConsignments(newConsignments);
    refetchTabs();
  }

  function loadQueryParams() {
    const currentQueryParams = {
      tab: activeTab,
      ...RouterService.getCurrentQueryParams(),
    };

    setQueryParams(currentQueryParams);

    return currentQueryParams;
  }

  async function loadConsignments() {
    setIsLoading(true);
    setLoadError(undefined);
    try {
      let currentParams;
      if (!initialized) {
        currentParams = loadQueryParams();
      }

      const params = currentParams || queryParams;
      if (initialized) {
        RouterService.replaceQueryParams(queryParams, true);
      }

      const { consignments: consignmentsResponse } = await ConsignmentService.getConsignments(params);
      updateConsignments(consignmentsResponse.items);
      const { current_page, total_items, per_page } = consignmentsResponse.pagination;
      setItemsPerPage(per_page);
      setTotal(total_items);
      setCurrentPage(current_page);
    } catch (e) {
      setLoadError(e);
    }

    setIsLoading(false);
  }

  function changeTab(tab) {
    applyQueryParams({ ...queryParams, page: 1, tab });
  }

  function handleSort(updatedSort, updatedOrder) {
    setSort(updatedSort);
    setOrder(updatedOrder);
    applyQueryParams({ ...queryParams, sort: updatedSort, order: updatedOrder });
  }

  useEffect(() => {
    (async () => {
      await loadConsignments();
      setInitialized(true);
    })();
  }, []);

  useEffect(() => {
    if (!initialized) {
      return;
    }
    loadConsignments();
  }, [queryParams]);

  return (
    <ConsignmentContext.Provider
      value={{
        initialized,
        loading: isLoading || isTabsLoading,
        loadError,
        consignments,
        updateConsignment,
        queryParams,
        applyQueryParams,
        tabs,
        activeTab,
        formikFilter,
        resetFilter,
        changeTab,
        pagination: {
          currentPage,
          maxPagesCount,
          total,
          itemsPerPage,
          setItemsPerPage,
          setTotal,
          setCurrentPage: (page) => {
            applyQueryParams({ ...queryParams, page });
            setCurrentPage(page);
          },
        },
        sorting: {
          onSort: handleSort,
          sort,
          order,
        },
      }}
    >
      {children}
    </ConsignmentContext.Provider>
  );
};

ConsignmentContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ConsignmentContextProvider;

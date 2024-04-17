import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import get from 'lodash/get';
import { useQuery } from 'react-query';
import { PaginationProvider } from 'frontend/js/context/PaginationContext';
import RouterService from 'frontend/js/api/RouterService';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import TableHeadControl from 'frontend/js/components/ThemedTable/TableHeadControl';
import ExpandButton from 'frontend/js/components/ThemedTable/ExpandButton';
import SavedSearchesSvg from 'frontend/images/shared/light-blue-set/ic_saved_searches_settings.svg';
import SavedSearchesService from 'frontend/js/api/SavedSearches';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import EditTitleModal from 'frontend/js/views/Account/_Shared/Modals/EditTitleModal';
import DeleteModal from 'frontend/js/views/Account/_Shared/Modals/DeleteModal';
import AdaptiveTable from 'frontend/js/components/Table/AdaptiveTable';
import LoadingState from './LoadingState';
import SectionTitle from '../SectionTitle';
import EmptyStateCard from '../EmptyStateCard';
import MobileViewAllButton from '../MobileViewAllButton';
import getRowsArray from './getRowsArray';
import useStyles from './useStyles';

const SORT_OPTIONS = [
  { field: 'title', order: 'asc' },
  { field: 'title', order: 'desc' },
  { field: 'date', order: 'asc' },
  { field: 'date', order: 'desc' },
];

function SavedSearches() {
  const classes = useStyles();
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [size, setSize] = useState(5);
  const [isEditTitleModalOpen, setIsEditTitleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalSearchId, setModalSearchId] = useState();
  const { isAboveSm } = useBreakpoint();

  const { isAuthenticated } = useCustomerHelper();

  const queryParams = { page: 1, size, order: sort.order, sort: sort.field };
  const queryString = RouterService.serializeQueryParams(queryParams);

  const { data, isLoading } = useQuery(
    ['saved-searches-data', queryString],
    () => SavedSearchesService.getSavedSearches(queryString),
    { keepPreviousData: true, enabled: isAuthenticated },
  );

  const searches = get(data, 'savedSearches', []);
  const totals = get(data, 'totals', {});
  const total = get(data, 'total', 0);

  const rowsArray = getRowsArray({
    searches,
    totals,
    setIsEditTitleModalOpen,
    setIsDeleteModalOpen,
    setModalSearchId,
  });
  const modalSearchEntry = searches.find((v) => v.id === modalSearchId) || {};

  return (
    <div>
      <SectionTitle
        text={
          <>
            <FormattedMessage id="savedSearches.caption" /> {Boolean(data) && `(${total})`}
            {total > searches.length && !isLoading && (
              <MobileViewAllButton onClick={() => setSize(total)} isLoading={isLoading} />
            )}
          </>
        }
      />

      {!data && <LoadingState />}

      {data && (
        <>
          {total ? (
            <>
              <PaginationProvider>
                <AdaptiveTable
                  className={classes.table}
                  hasHoverEffect
                  headData={[
                    {
                      label: isAboveSm ? (
                        <TableHeadControl
                          id="savedSearches.results.searchName"
                          sortField="title"
                          sort={sort}
                          setSort={setSort}
                          sortOptions={SORT_OPTIONS}
                        />
                      ) : (
                        <FormattedMessage id="savedSearches.results.searchName" />
                      ),
                    },
                    {
                      label: <FormattedMessage id="shared.label.results" />,
                    },
                    {
                      label: <FormattedMessage id="shared.label.actions" />,
                    },
                  ]}
                  bodyData={rowsArray}
                  isGrayStyle
                  isStriped
                />

                {isAboveSm && (
                  <>
                    {total > searches.length && (
                      <ExpandButton
                        onClick={() => setSize(total)}
                        isLoading={isLoading}
                        label={
                          <>
                            <FormattedMessage id="homePage.reviews.viewAll" /> ({total})
                          </>
                        }
                      />
                    )}
                  </>
                )}

                <EditTitleModal
                  isOpen={isEditTitleModalOpen}
                  onClose={() => setIsEditTitleModalOpen(false)}
                  search={modalSearchEntry}
                  query={queryString}
                />

                <DeleteModal
                  isOpen={isDeleteModalOpen}
                  onClose={() => setIsDeleteModalOpen(false)}
                  search={modalSearchEntry}
                  query={queryString}
                />
              </PaginationProvider>
            </>
          ) : (
            <EmptyStateCard
              icon={<img src={SavedSearchesSvg} alt="Saved Searches" />}
              message={
                <FormattedMessage
                  id="dashboardPage.savedSearch.empty"
                  values={{ a: (chunks) => <a href={RouterService.getRoute('searchResults')}>{chunks}</a> }}
                />
              }
            />
          )}
        </>
      )}
    </div>
  );
}

export default SavedSearches;

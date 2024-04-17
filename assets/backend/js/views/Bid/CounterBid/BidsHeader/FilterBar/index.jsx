import React from 'react';
import { useFormik } from 'formik';
import get from 'lodash/get';
import useCounterBidContext from 'backend/js/views/Bid/CounterBid/_Context/useCounterBidContext';
import FormikTickbox from 'backend/js/components/Form/FormikTickbox';
import SortBy from 'backend/js/views/Bid/CounterBid/BidsHeader/FilterBar/SortBy';
import useStyles from './useStyles';

const SORT_OPTIONS = [
  { label: 'Visit', asc: 'recently_visited', desc: 'last_visited' },
  { label: 'Bid', asc: 'recently_bid', desc: 'last_bid' },
  { label: 'Gap', desc: 'highest_gap', asc: 'lowest_gap' },
  { label: 'Priority', desc: 'highest_priority', asc: 'lowest_priority' },
];

const NOTE_SORT_CREATED_AT_ASC = 'note_sort_created_at_asc';
const NOTE_SORT_CREATED_AT_DESC = 'note_sort_created_at_desc';
const NOTE_SORT_OPTIONS = [{ label: 'Date', asc: NOTE_SORT_CREATED_AT_ASC, desc: NOTE_SORT_CREATED_AT_DESC }];

function FilterBar() {
  const { queryParams, applyQueryParams, loading, setNoteSort } = useCounterBidContext();
  const classes = useStyles();
  const { filterBidCounts } = useCounterBidContext();

  function getFilterCount(field) {
    return get(filterBidCounts, field, 0);
  }

  const formik = useFormik({
    initialValues: {
      origin: queryParams.origin || '',
      status: queryParams.status || '',
      sort: queryParams.sort || '',
      noteSort: queryParams.noteSort || '',
      domestic: queryParams.domestic || false,
      international: queryParams.international || false,
      awaitingApproval: queryParams.awaitingApproval || false,
      awaitingSellerResponse: queryParams.awaitingSellerResponse || false,
      sellerCountered: queryParams.sellerCountered || false,
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      await applyQueryParams(values);
      setSubmitting(false);
    },
  });

  const disabled = loading || formik.isSubmitting;

  function handleFilterUpdate(name, value) {
    const updatedValue = value || '';
    formik.setFieldValue(name, updatedValue);
    if (!formik.isSubmitting) {
      formik.submitForm();
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className={classes.root}>
      <div className={classes.filters}>
        <FormikTickbox
          id="domestic"
          name="domestic"
          onChange={handleFilterUpdate}
          value={formik.values.domestic}
          className={classes.checkboxes}
        >
          Domestic ({getFilterCount('domesticCount')})
        </FormikTickbox>
        <FormikTickbox
          id="international"
          name="international"
          onChange={handleFilterUpdate}
          value={formik.values.international}
          className={classes.checkboxes}
        >
          International ({getFilterCount('internationalCount')})
        </FormikTickbox>
        <FormikTickbox
          id="awaitingApproval"
          name="awaitingApproval"
          onChange={handleFilterUpdate}
          value={formik.values.awaitingApproval}
          className={classes.checkboxes}
        >
          Awaiting Approval ({getFilterCount('awaitingApprovalCount')})
        </FormikTickbox>
        <FormikTickbox
          id="awaitingSellerResponse"
          name="awaitingSellerResponse"
          onChange={handleFilterUpdate}
          value={formik.values.awaitingSellerResponse}
          className={classes.checkboxes}
        >
          Awaiting Seller Response ({getFilterCount('awaitingSellerResponseCount')})
        </FormikTickbox>
        <FormikTickbox
          id="sellerCountered"
          name="sellerCountered"
          onChange={handleFilterUpdate}
          value={formik.values.sellerCountered}
          className={classes.checkboxes}
        >
          Seller Countered ({getFilterCount('sellerCounteredCount')})
        </FormikTickbox>
      </div>

      <div className={classes.filters}>
        <span className={classes.filterLabel}>Sort Note By:</span>
        <div className="d-f mr-20">
          {NOTE_SORT_OPTIONS.map((sort) => (
            <SortBy
              key={sort.label}
              onChange={(name, value) => {
                handleFilterUpdate(name, value);
                setNoteSort(value);
              }}
              value={formik.values.noteSort}
              disabled={disabled}
              label={sort.label}
              asc={sort.asc}
              desc={sort.desc}
              name="noteSort"
            />
          ))}
        </div>

        <span className={classes.filterLabel}>Sort By:</span>
        <div className="d-f">
          {SORT_OPTIONS.map((sort) => (
            <SortBy
              key={sort.label}
              onChange={handleFilterUpdate}
              value={formik.values.sort}
              disabled={disabled}
              label={sort.label}
              asc={sort.asc}
              desc={sort.desc}
              name="sort"
            />
          ))}
        </div>
      </div>
    </form>
  );
}

export { NOTE_SORT_CREATED_AT_ASC, NOTE_SORT_CREATED_AT_DESC };
export default FilterBar;

import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import FilterOptionShape from 'frontend/js/lib/propshapes/FilterOptionShape';
import RouterService from 'frontend/js/api/RouterService';
import Tags from 'frontend/js/components/Tags';
import FiltersContext from '../_Context/Filters';
import useStyles from './useStyles';

function TagsSection({ dateRanges, bidders }) {
  const { setFilters, filters } = useContext(FiltersContext);
  const [tags, setTags] = useState([]);
  const classes = useStyles();

  function handleTagsUpdate(removedValue) {
    if (removedValue === 'all-tags') {
      const nextFilters = {};
      Object.keys(filters).forEach((key) => {
        nextFilters[key] = '';
      });
      setFilters(nextFilters);
      RouterService.setQueryParams({}, { pushToHistory: true });
    } else {
      const nextFilters = { ...filters };
      nextFilters[removedValue] = '';
      setFilters(nextFilters);

      const nextQueryParams = {};
      Object.keys(nextFilters).forEach((key) => {
        if (nextFilters[key]) {
          nextQueryParams[key] = nextFilters[key];
        }
      });
      RouterService.setQueryParams(nextQueryParams, { pushToHistory: true });
    }
  }

  useEffect(() => {
    const newTags = [];
    const selectedDate = dateRanges.find((dateRange) => dateRange.selected);
    const selectedBidder = bidders.find((bidder) => bidder.selected);

    if (selectedBidder && selectedBidder.value) {
      newTags.push({ label: selectedBidder.label, value: 'bidderCustomerId' });
    }

    if (selectedDate && selectedDate.value) {
      newTags.push({ label: selectedDate.label, value: 'dateFilter' });
    }

    setTags(newTags);
  }, [dateRanges, bidders]);

  return (
    <div className={classes.root}>
      <Tags tags={tags} onRemove={handleTagsUpdate} />
    </div>
  );
}

TagsSection.defaultProps = {
  dateRanges: [],
  bidders: [],
};

TagsSection.propTypes = {
  dateRanges: PropTypes.arrayOf(FilterOptionShape),
  bidders: PropTypes.arrayOf(FilterOptionShape),
};

export default TagsSection;

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MuIPagination from '@material-ui/lab/Pagination';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import ItemsPerPageControl from '../ItemsPerPageControl';
import EntriesLabel from '../EntriesLabel';
import useStyles from './useStyles';

function PaginationView({ className, onChangePage, isAdvanced, withHistoryAPI, count, currentPage, ...props }) {
  const classes = useStyles();
  const typeClassName = classes[isAdvanced ? 'advanced' : 'simple'];
  const { isAboveSm } = useBreakpoint();

  return (
    <div className={classnames(classes.root, typeClassName, className)}>
      {isAboveSm && isAdvanced && <ItemsPerPageControl withHistoryAPI={withHistoryAPI} />}

      <MuIPagination onChange={onChangePage} count={count} page={currentPage} {...props} />

      {isAboveSm && isAdvanced && <EntriesLabel />}
    </div>
  );
}

PaginationView.propTypes = {
  onChangePage: PropTypes.func.isRequired,
  className: PropTypes.string,
  isAdvanced: PropTypes.bool,
  withHistoryAPI: PropTypes.bool,
  count: PropTypes.number,
  currentPage: PropTypes.number,
};

PaginationView.defaultProps = {
  className: '',
  isAdvanced: false,
  withHistoryAPI: false,
  count: 0,
  currentPage: 1,
};

export default PaginationView;

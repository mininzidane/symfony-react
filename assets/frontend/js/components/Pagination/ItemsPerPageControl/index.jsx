import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import RouterService from 'frontend/js/api/RouterService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import PaginationContext from 'frontend/js/context/PaginationContext';
import useStyles from './useStyles';

function ItemsPerPageControl({ withHistoryAPI }) {
  const { isAuthenticated } = useCustomerHelper();
  const classes = useStyles();
  const { itemsPerPage, setItemsPerPage, currentPage, setCurrentPage, itemsPerPageOptions } =
    useContext(PaginationContext);

  function handleClick(nextSize) {
    if (!isAuthenticated) {
      window.dispatchEvent(new CustomEvent('openAuthModal'));
      return;
    }

    const prevSizeItemIndex = (currentPage - 1) * itemsPerPage + 1;
    const nextPage = Math.ceil(prevSizeItemIndex / nextSize);

    ScrollService.scrollToTop();
    setItemsPerPage(nextSize);
    setCurrentPage(nextPage);

    if (withHistoryAPI) {
      RouterService.addQueryParams({ size: nextSize }, { pushToHistory: true });
    }
  }

  return (
    <div className={classes.root}>
      <FormattedMessage id="shared.label.show" />

      <div className={classes.grid}>
        {itemsPerPageOptions.map((size, index) => (
          <Fragment key={index}>
            {index !== 0 && <span className={classes.separator} />}
            <button
              type="button"
              onClick={() => handleClick(size)}
              className={classnames(classes.button, { 'is-active': size === itemsPerPage })}
            >
              {size}
            </button>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

ItemsPerPageControl.propTypes = {
  withHistoryAPI: PropTypes.bool,
};

ItemsPerPageControl.defaultProps = {
  withHistoryAPI: false,
};

export default ItemsPerPageControl;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../Button';
import Viewport from '../../lib/utils/ViewportService';
import useStyles from './useStyles';

function Pagination({
  currentPage,
  pageSize,
  numResults,
  maxNumberOfPages,
  numLinksDisplayed,
  marginPagesDisplayed,
  onPageUpdate,
}) {
  const styles = useStyles();
  let totalPageCount = numResults ? Math.ceil(numResults / pageSize) : 0;
  const isPreviousDisabled = currentPage === 1 || totalPageCount < 1;
  const isNextDisabled = currentPage === totalPageCount + 1 || totalPageCount <= 1;
  const previousBtnClass = classNames('page-item prev', styles.li, {
    disabled: isPreviousDisabled,
  });

  if (maxNumberOfPages && totalPageCount > maxNumberOfPages) {
    totalPageCount = maxNumberOfPages;
  }

  const nextBtnClass = classNames('page-item next', styles.li, {
    disabled: isNextDisabled,
  });

  function goToNextPage() {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPageCount) {
      onPageUpdate(nextPage);
    }
  }

  function goToPreviousPage() {
    const previousPage = currentPage - 1;
    if (previousPage > 0) {
      onPageUpdate(previousPage);
    }
  }

  function goToPage(pageNum) {
    if (pageNum === currentPage) {
      return;
    }

    onPageUpdate(pageNum);
  }

  function createPageLink(pageNum) {
    const key = `page_${pageNum}`;
    const isActive = currentPage === pageNum;
    const paginationClass = classNames('page-item', styles.li, {
      active: isActive,
    });

    return (
      <li className={paginationClass} key={key}>
        <Button
          className={classNames('page-link is-unstyled', styles.button, {
            'is-font-size-reduced': `${pageNum}`.length > 2,
          })}
          label={pageNum}
          onClick={() => goToPage(pageNum)}
        />
      </li>
    );
  }

  function buildPlaceholderLink(index) {
    const key = `placeholder_${index}`;
    return (
      <li className="page-item disabled is-placeholder" key={key}>
        <span className="page-link">...</span>
      </li>
    );
  }

  function getPagination() {
    const links = [];
    if (totalPageCount <= numLinksDisplayed) {
      for (let index = 1; index <= totalPageCount; index++) {
        links.push(createPageLink(index));
      }

      return links;
    }

    let leftSide = numLinksDisplayed / 2;
    let rightSide = numLinksDisplayed - leftSide;
    if (currentPage > totalPageCount - leftSide) {
      rightSide = totalPageCount - currentPage;
      leftSide = numLinksDisplayed - rightSide;
    } else if (currentPage < leftSide) {
      leftSide = currentPage;
      rightSide = numLinksDisplayed - leftSide;
    }

    let placeholder = null;
    for (let index = 0; index < totalPageCount; index++) {
      const page = index + 1;

      if (page <= marginPagesDisplayed) {
        links.push(createPageLink(page));
      } else if (page > totalPageCount - marginPagesDisplayed) {
        links.push(createPageLink(page));
      } else if (index >= currentPage - leftSide && index <= currentPage + rightSide) {
        links.push(createPageLink(page));
      } else if (links[links.length - 1] !== placeholder) {
        placeholder = buildPlaceholderLink(page);
        links.push(placeholder);
      }
    }

    return links;
  }

  if (!numResults) {
    return <></>;
  }

  return (
    <div className="pagination-nav">
      <ul className={classNames('pagination', styles.ul)}>
        <li className={previousBtnClass} aria-label="« Previous" key="previous_pagination">
          <Button
            className={classNames('is-unstyled page-link is-prev', styles.button)}
            disabled={isPreviousDisabled}
            label={<span>‹</span>}
            onClick={goToPreviousPage}
          />
        </li>

        {getPagination()}

        <li className={nextBtnClass} aria-label="›› Next" key="next_pagination">
          <Button
            className={classNames('is-unstyled page-link is-next', styles.button)}
            disabled={isNextDisabled}
            label={<span>›</span>}
            onClick={goToNextPage}
          />
        </li>
      </ul>
    </div>
  );
}

Pagination.defaultProps = {
  numResults: 0,
  numLinksDisplayed: Viewport.isBelow('sm') ? 2 : 8,
  marginPagesDisplayed: 2,
  maxNumberOfPages: undefined,
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  numResults: PropTypes.number,
  maxNumberOfPages: PropTypes.number,
  numLinksDisplayed: PropTypes.number,
  onPageUpdate: PropTypes.func.isRequired,
  marginPagesDisplayed: PropTypes.number,
};

export default Pagination;

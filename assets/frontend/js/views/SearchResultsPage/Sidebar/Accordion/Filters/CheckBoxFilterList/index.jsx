/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Tickbox from 'frontend/js/components/Form/Tickbox';
import HighlightMatch from 'frontend/js/components/HighlightMatch';
import SearchFilter from './SearchFilter';
import useStyles from './useStyles';

function CheckBoxFilterList({
  withSearch,
  allTitle,
  priorityTitle,
  showMoreLabel,
  showLessLabel,
  showMoreLimit,
  displayLimit,
  values,
  // refinements,
  dispatch,
  section,
  noAuth,
  sort,
  isGrouped,
}) {
  const classes = useStyles();
  const { isAuthenticated } = useCustomerHelper();
  const [query, setQuery] = useState('');
  const [showMore, setShowMore] = useState(false);
  const eventTrackingService = new EventTrackingService();

  const isPriority = values.priority?.length && !showMore && !query;

  const filtersContent = useMemo(() => {
    const list = isPriority ? values.priority : values.all;

    if (query) {
      return list
        .filter((v) => (query ? v.label.toLowerCase().includes(query.toLowerCase()) : true))
        .sort(sort)
        .slice(0, displayLimit);
    }

    if (!isPriority) {
      return list
        .slice()
        .sort((a, b) => {
          if (a.selected || (a.priority && !b.priority)) {
            return -1;
          }

          return b.cnt - a.cnt;
        })
        .slice(0, displayLimit)
        .sort(sort)
        .slice(0, showMore ? displayLimit : showMoreLimit);
    }

    return list.slice(0, showMore ? displayLimit : showMoreLimit);
  }, [query, showMore, values]);

  return (
    <>
      {withSearch && <SearchFilter query={query} setQuery={setQuery} section={section} />}
      {isPriority
        ? priorityTitle && <div className={classes.title}>{priorityTitle}</div>
        : allTitle && <div className={classes.title}>{allTitle}</div>}

      {isGrouped ? (
        <>
          {values.grouped.map((group) => (
            <>
              <div className={classes.groupTitle}>
                <Tickbox
                  id={group.key}
                  name={group.key}
                  key={group.key}
                  onChange={() => {
                    if (!noAuth && !isAuthenticated) {
                      window.dispatchEvent(new CustomEvent('openAuthModal'));
                      return;
                    }

                    group.values.forEach(({ label, key }) =>
                      dispatch({
                        type: 'REFINE',
                        payload: {
                          type: 'CHECKBOX',
                          section,
                          value: key,
                          label,
                        },
                      }),
                    );
                  }}
                  value={group.selected}
                  className={classes.tickbox}
                >
                  {group.label}
                  <span className={classes.count}>{NumberService.formatNumber(group.cnt)}</span>
                </Tickbox>
              </div>
              <div className={classes.groupContent}>
                {group.values.map(({ label, cnt, key, selected }) => (
                  <Tickbox
                    id={[section, key].join('-')}
                    name={String(key)}
                    key={key}
                    onChange={() => {
                      if (!noAuth && !isAuthenticated) {
                        window.dispatchEvent(new CustomEvent('openAuthModal'));
                        return;
                      }

                      eventTrackingService.sendEvent({
                        step: 'abm_carfinder_filters',
                        substep: `${section}_block_click`,
                      });

                      dispatch({
                        type: 'REFINE',
                        payload: {
                          type: 'CHECKBOX',
                          section,
                          value: key,
                          label,
                        },
                      });
                    }}
                    value={selected}
                    className={classes.tickbox}
                  >
                    <HighlightMatch highlight={classes.highlight} value={label} match={query} />
                    <span className={classes.count}>{NumberService.formatNumber(cnt)}</span>
                  </Tickbox>
                ))}
              </div>
            </>
          ))}
        </>
      ) : (
        <>
          {filtersContent.map(({ label, cnt, key, selected }) => (
            <Tickbox
              id={[section, key].join('-')}
              name={String(key)}
              key={key}
              onChange={() => {
                if (!noAuth && !isAuthenticated) {
                  window.dispatchEvent(new CustomEvent('openAuthModal'));
                  return;
                }

                eventTrackingService.sendEvent({
                  step: 'abm_carfinder_filters',
                  substep: `${section}_block_click`,
                });

                dispatch({
                  type: 'REFINE',
                  payload: {
                    type: 'CHECKBOX',
                    section,
                    value: key,
                    label,
                  },
                });
              }}
              value={selected}
              className={classes.tickbox}
            >
              <HighlightMatch highlight={classes.highlight} value={label} match={query} />
              <span className={classes.count}>{NumberService.formatNumber(cnt)}</span>
            </Tickbox>
          ))}

          {values.all.length > showMoreLimit && !query && (
            <button type="button" onClick={() => setShowMore(!showMore)} className={classes.showMoreBtn}>
              <span className={classnames(classes.showMoreIcon, showMore && classes.expanded)}>
                <svg
                  className="svg-caret ng-star-inserted"
                  viewBox="0 0 12 7.41"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12px"
                  height="8px"
                >
                  <path d="M10.59 0L6 4.58 1.41 0 0 1.41l6 6 6-6z" />
                </svg>
              </span>

              {showMore ? showLessLabel : showMoreLabel}
            </button>
          )}
        </>
      )}
    </>
  );
}

CheckBoxFilterList.defaultProps = {
  withSearch: true,
  allTitle: undefined,
  priorityTitle: undefined,
  showMoreLimit: 6,
  showMoreLabel: <FormattedMessage id="shared.label.show" />,
  showLessLabel: <FormattedMessage id="shared.label.hide" />,
  values: [],
  // refinements: [],
  section: '',
  noAuth: false,
  dispatch: () => {},
  sort: (a, b) => a.label.localeCompare(b.label),
  displayLimit: 100,
};

CheckBoxFilterList.propTypes = {
  showMoreLimit: PropTypes.number,
  withSearch: PropTypes.bool,
  allTitle: PropTypes.node,
  priorityTitle: PropTypes.node,
  showMoreLabel: PropTypes.node,
  showLessLabel: PropTypes.node,
  values: PropTypes.shape({
    all: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        cnt: PropTypes.number,
      }),
    ),
    priority: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        cnt: PropTypes.number,
      }),
    ),
  }),
  // refinements: PropTypes.arrayOf(PropTypes.shape({})),
  section: PropTypes.string,
  noAuth: PropTypes.bool,
  dispatch: PropTypes.func,
  sort: PropTypes.func,
  displayLimit: PropTypes.number,
};

export default CheckBoxFilterList;

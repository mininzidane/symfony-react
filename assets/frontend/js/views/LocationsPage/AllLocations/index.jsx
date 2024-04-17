import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';
import useStyles from './useStyles';
import LocationItem from './LocationItem';

const LazyLocationModal = React.lazy(() => import('./LocationModal'));

const AllLocations = ({ locations }) => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const [activeLocation, setActiveLocation] = useState(null);

  const groupedLocations = useMemo(
    () =>
      locations.reduce((acc, curr) => {
        // in some cases we don't have stateName
        const title = curr.stateName || curr.state;

        if (!curr.region || !curr.country || !title) {
          return acc;
        }

        if (!acc[curr.region]) {
          acc[curr.region] = {};
        }

        if (!acc[curr.region][curr.country]) {
          acc[curr.region][curr.country] = {};
        }

        if (!acc[curr.region][curr.country][title]) {
          acc[curr.region][curr.country][title] = [];
        }

        acc[curr.region][curr.country][title].push(curr);

        return acc;
      }, {}),
    [locations],
  );

  const regions = Object.keys(groupedLocations || []);
  const activeRegion = groupedLocations?.[regions[activeTab]] || {};
  const activeCountries = Object.keys(activeRegion || {});

  const tabs = useMemo(
    () => (
      <>
        {regions.map((r, idx) => (
          <button
            className={classNames(classes.tab, idx === activeTab && classes.activeTab)}
            onClick={() => setActiveTab(idx)}
            type="button"
            key={r}
          >
            {r}
          </button>
        ))}
      </>
    ),
    [activeTab, groupedLocations],
  );

  const content = useMemo(
    () => (
      <>
        {activeCountries.reverse().map((country) => {
          const entries = Object.entries(activeRegion[country]).sort();
          const columnSize = Math.ceil(entries.length / 4);

          return (
            <React.Fragment key={country}>
              <div className={classes.groupTitle}>{country}</div>

              <div className={classes.group}>
                {new Array(4).fill(null).map((_, index) => (
                  <div className={classes.groupColumn}>
                    {entries
                      .slice(index * columnSize, index * columnSize + columnSize)
                      .map(([stateName, data], idx) => (
                        <LocationItem title={stateName} data={data} onClick={setActiveLocation} key={idx} />
                      ))}
                  </div>
                ))}
              </div>
            </React.Fragment>
          );
        })}
      </>
    ),
    [activeTab, groupedLocations],
  );

  return (
    <div className={classes.root}>
      <div className={classes.header}>{tabs}</div>

      <div>{content}</div>

      <SuspenseWrap fallback={null} init={activeLocation}>
        <LazyLocationModal activeLocation={activeLocation} onClose={() => setActiveLocation(null)} />
      </SuspenseWrap>
    </div>
  );
};

AllLocations.defaultProps = {
  locations: [],
};

AllLocations.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})),
};

export default AllLocations;

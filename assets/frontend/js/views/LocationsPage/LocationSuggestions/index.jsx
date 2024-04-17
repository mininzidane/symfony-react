import React from 'react';
import PropTypes from 'prop-types';
import LocationService from 'frontend/js/api/LocationService';
import useEventListener from 'frontend/js/hooks/useEventListener';
import useStyles from './useStyles';

const LocationSuggestions = ({ locations = [], query, handleSuggestionClick, formRef }) => {
  const formattedQuery = query.toLowerCase();
  const classes = useStyles();
  const filteredLocations = locations.filter((l) =>
    [l.stateName, l.city, l.country, l.name, l.zip, l.address, l.region, l.name].some((value) =>
      value?.toLowerCase().includes(formattedQuery),
    ),
  );
  const labels = filteredLocations.map((l) => (
    <button key={l.name + l.zip} className={classes.suggestion} type="button" onClick={() => handleSuggestionClick(l)}>
      {LocationService.formatCityStateZip(l.city, l.state_code, l.zip)}
    </button>
  ));

  const handleSubmit = (event) => {
    event.preventDefault();

    handleSuggestionClick(filteredLocations[0]);
  };

  useEventListener('submit', handleSubmit, formRef.current);

  if (labels.length === 0 || query.length < 2) {
    return null;
  }

  return <div className={classes.root}>{labels}</div>;
};

LocationSuggestions.defaultProps = {
  locations: [],
  query: '',
  handleSuggestionClick: () => {},
};

LocationSuggestions.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})),
  query: PropTypes.string,
  handleSuggestionClick: PropTypes.func,
  formRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
};

export default LocationSuggestions;

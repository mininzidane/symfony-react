/* eslint-disable */
import React from 'react';
import Fade from 'frontend/js/components/Fade';
import { useQuery } from 'react-query';
import LocationService from 'frontend/js/api/LocationService';
import CountryService from 'frontend/js/api/CountryService';
import useStyles from './useStyles';

function EmailSuggestions({ isOpen, onClick }) {
  const classes = useStyles();
  const iso2 = CountryService.getUserCountryIso2();
  const { data } = useQuery(['domains', iso2], () => LocationService.getPopularDomainsByIso2(iso2), {
    enabled: isOpen,
    cacheTime: 30 * 1000,
    staleTime: 30 * 1000,
  });
  const popularDomains = data?.domains || [];

  return (
    <Fade isOpen={isOpen && popularDomains.length > 0} isAlwaysMounted>
      <div className={classes.root}>
        {popularDomains.map((domain) => (
          <button type="button" onMouseDown={() => onClick(domain)} className={classes.button} key={domain}>
            {domain}
          </button>
        ))}
      </div>
    </Fade>
  );
}

export default EmailSuggestions;

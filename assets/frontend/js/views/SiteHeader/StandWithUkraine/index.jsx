import React from 'react';
import CountryService from 'frontend/js/api/CountryService';
import EnSvg from 'frontend/images/shared/logo/stand-with-ukraine/stand-with-ukraine-en.svg';
import BySvg from 'frontend/images/shared/logo/stand-with-ukraine/stand-with-ukraine-by.svg';
import UaSvg from 'frontend/images/shared/logo/stand-with-ukraine/stand-with-ukraine-ua.svg';
import RuSvg from 'frontend/images/shared/logo/stand-with-ukraine/stand-with-ukraine-ru.svg';
import useStyles from './useStyles';

function StandWithUkraine() {
  const classes = useStyles();
  const { isCountry, getUserCountryIso2 } = CountryService;
  const userCountryIso2 = getUserCountryIso2();
  const isBelarus = isCountry(userCountryIso2, 'belarus');
  const isUkraine = isCountry(userCountryIso2, 'ukraine');
  const isRussia = isCountry(userCountryIso2, 'russia');
  let image = EnSvg;

  if (isBelarus) {
    image = BySvg;
  }

  if (isRussia) {
    image = RuSvg;
  }

  if (isUkraine) {
    image = UaSvg;
  }

  return <img src={image} alt="Stand With Ukraine" className={classes.root} />;
}

export default StandWithUkraine;

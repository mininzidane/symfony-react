/* eslint-disable */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import VehicleLink from './VehicleLink';
import data from './data';
import useStyles from './useStyles';
import BelarusPng from './img/maps/belarus.png';
import ElSalvadorPng from './img/maps/el-salvador.png';
import GeorgiaPng from './img/maps/georgia.png';
import GuatemalaPng from './img/maps/guatemala.png';
import KoreaPng from './img/maps/korea.png';
import NigeriaPng from './img/maps/nigeria.png';
import RomaniaPng from './img/maps/romania.png';
import UkrainePng from './img/maps/ukraine.png';
import BulgariaPng from './img/maps/bulgaria.png';
import PolandPng from './img/maps/poland.png';

function Popular({ country, countryName }) {
  const classes = useStyles();

  const mapImage = {
    belarus: BelarusPng,
    elSalvador: ElSalvadorPng,
    georgia: GeorgiaPng,
    guatemala: GuatemalaPng,
    southKorea: KoreaPng,
    nigeria: NigeriaPng,
    romania: RomaniaPng,
    ukraine: UkrainePng,
    bulgaria: BulgariaPng,
    poland: PolandPng,
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h2 className={classes.title}>
          <FormattedMessage id="loungePage.popular.title" values={{ lounge: countryName }} />
        </h2>

        <div className={classes.grid}>
          <div className={classes.links}>
            {data.map(({ label, href }, index) => (
              <VehicleLink label={label} href={href} key={index} />
            ))}
          </div>

          <div className={classes.mapWrap}>
            <img src={mapImage[country]} alt="map" className={classes.map} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popular;

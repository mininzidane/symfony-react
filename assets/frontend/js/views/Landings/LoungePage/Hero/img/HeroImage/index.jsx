/* eslint-disable */
import React from 'react';
import useStyles from './useStyles';
import BelarusPng from './desktop/belarus.png';
import ElSalvadorPng from './desktop/el-salvador.png';
import GeorgiaPng from './desktop/georgia.png';
import GuatemalaPng from './desktop/guatemala.png';
import KoreaPng from './desktop/korea.png';
import NigeriaPng from './desktop/nigeria.png';
import RomaniaPng from './desktop/romania.png';
import UkrainePng from './desktop/ukraine.png';
import BulgariaPng from './desktop/bulgaria.png';
import PolandPng from './desktop/poland.png';
import BelarusMobilePng from './mobile/belarus.png';
import ElSalvadorMobilePng from './mobile/el-salvador.png';
import GeorgiaMobilePng from './mobile/georgia.png';
import GuatemalaMobilePng from './mobile/guatemala.png';
import KoreaMobilePng from './mobile/korea.png';
import NigeriaMobilePng from './mobile/nigeria.png';
import RomaniaMobilePng from './mobile/romania.png';
import UkraineMobilePng from './mobile/ukraine.png';
import BulgariaMobilePng from './mobile/bulgaria.png';
import PolandMobilePng from './mobile/poland.png';

function HeroImage({ isBelowSm, iso2 }) {
  const classes = useStyles();

  const desktopImageMap = {
    BY: BelarusPng,
    SV: ElSalvadorPng,
    GE: GeorgiaPng,
    GT: GuatemalaPng,
    KR: KoreaPng,
    NG: NigeriaPng,
    RO: RomaniaPng,
    UA: UkrainePng,
    BG: BulgariaPng,
    PL: PolandPng,
  };

  const mobileImageMap = {
    BY: BelarusMobilePng,
    SV: ElSalvadorMobilePng,
    GE: GeorgiaMobilePng,
    GT: GuatemalaMobilePng,
    KR: KoreaMobilePng,
    NG: NigeriaMobilePng,
    RO: RomaniaMobilePng,
    UA: UkraineMobilePng,
    BG: BulgariaMobilePng,
    PL: PolandMobilePng,
  };

  return <img className={classes.root} src={isBelowSm ? mobileImageMap[iso2] : desktopImageMap[iso2]} alt="Lounge" />;
}

export default HeroImage;

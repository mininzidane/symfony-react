import React from 'react';
import PropTypes from 'prop-types';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useIntl from 'frontend/js/hooks/useIntl';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import VinSvg from './img/ic_vin.svg';
import TitleSvg from './img/ic_title.svg';
import ZipcodeSvg from './img/ic_zipcode.svg';
import TiresSvg from './img/ic_tires.svg';
import KeySvg from './img/ic_key.svg';
import DrivesSvg from './img/ic_drives.svg';
import UnderTheHoodSvg from './img/ic_underthehood.svg';
import InteriorSvg from './img/ic_interior.svg';
import DamageSvg from './img/ic_damage.svg';
import FloodOrFireDamageSvg from './img/ic_flood_or_fire_damage.svg';
import MirrorsGlassOrLightsDamageSvg from './img/ic_mirrors_glass_or_lights_damage.svg';
import MileageSvg from './img/ic_mileage.svg';
import PhotoSvg from './img/ic_photo.svg';
import ContractSvg from './img/ic_contract.svg';
import useStyles from './useStyles';
import staticKeys from './static-keys';
import STEPS from '../../useInstantOffer/steps';

function Title({ step }) {
  const intl = useIntl();
  const classes = useStyles();
  const { isBelowSm } = useBreakpoint();

  const iconMap = {
    [STEPS.VIN]: { src: VinSvg, width: 56, height: 58 },
    [STEPS.TITLE_TYPE]: { src: TitleSvg, width: 50, height: 41 },
    [STEPS.CAR_PAID_OFF]: { src: ContractSvg, width: 51, height: 47 },
    [STEPS.ZIP]: { src: ZipcodeSvg, width: 44, height: 58 },
    [STEPS.WHEELS_AND_TIRES]: { src: TiresSvg, width: 54, height: 47 },
    [STEPS.KEYS]: { src: KeySvg, width: 45, height: 44 },
    [STEPS.CONDITION_TYPE]: { src: DrivesSvg, width: 56, height: 52 },
    [STEPS.UNDER_THE_HOOD]: { src: UnderTheHoodSvg, width: 54, height: 32 },
    [STEPS.MILEAGE]: { src: MileageSvg, width: 50, height: 47 },
    [STEPS.REMOVED_OR_LOOSE_EXTERIOR_PANELS]: { src: InteriorSvg, width: 42, height: 42 },
    [STEPS.BODY_DAMAGE]: { src: DamageSvg, width: 62, height: 30 },
    [STEPS.MIRRORS_GLASS_OR_LIGHTS_DAMAGE]: { src: MirrorsGlassOrLightsDamageSvg, width: 84, height: 50 },
    [STEPS.FLOOD_OR_FIRE_DAMAGE]: { src: FloodOrFireDamageSvg, width: 49, height: 47 },
    [STEPS.PHOTOS_ADDITIONAL]: { src: PhotoSvg, width: 38, height: 35 },
    [STEPS.VIN_ADDITIONAL]: { src: VinSvg, width: 56, height: 58 },
  };

  const icon = iconMap[step];

  const title = intl.formatMessage({ id: staticKeys[step].title });

  return (
    <div className={classes.root}>
      {icon && !isBelowSm && (
        <div className={classes.icon}>
          <img src={icon.src} width={icon.width} height={icon.height} alt={title} />
        </div>
      )}
      <div className={classes.wrap}>
        <div className={classes.title}>{title}</div>
        <div className={classes.desc}>
          <FormattedMessage id={staticKeys[step].desc} />
        </div>
      </div>
    </div>
  );
}

Title.propTypes = {
  step: PropTypes.number.isRequired,
};

export default Title;

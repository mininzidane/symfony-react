import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import SocialLinksService from 'frontend/js/lib/utils/SocialLinksService';
import ViberCircleSvg from 'frontend/images/shared/social/viber-circle-24x24.svg';
import ViberSquareSvg from 'frontend/images/shared/social/viber-20x20.svg';
import TelegramCircleSvg from 'frontend/images/shared/social/telegram-circle-24x24.svg';
import TelegramSquareSvg from 'frontend/images/shared/social/telegram-circle-30x30.svg';
import WhatsappCircleSvg from 'frontend/images/shared/social/whatsapp-circle-24x24.svg';
import WhatsappSquareSvg from 'frontend/images/shared/social/whatsapp-20x20.svg';
import useStyles from './useStyles';

const ICONS = {
  viber: {
    circle: ViberCircleSvg,
    square: ViberSquareSvg,
  },
  telegram: {
    circle: TelegramCircleSvg,
    square: TelegramSquareSvg,
  },
  whatsapp: {
    circle: WhatsappCircleSvg,
    square: WhatsappSquareSvg,
  },
};

function SocialLinks({ className, viber, whatsapp, telegram, type, size }) {
  const classes = useStyles();
  return (
    <div className={classnames(classes.root, className)}>
      {viber && (
        <a href={SocialLinksService.viber(viber)} className={classes.link} target="_blank" rel="noopener noreferrer">
          <img src={ICONS.viber[type]} alt="Viber Icon" style={{ minWidth: size, height: size }} />
        </a>
      )}

      {whatsapp && (
        <a
          href={SocialLinksService.whatsapp(whatsapp)}
          className={classes.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={ICONS.whatsapp[type]} alt="Whatsapp Icon" style={{ minWidth: size, height: size }} />
        </a>
      )}

      {telegram && (
        <a
          href={SocialLinksService.telegram(telegram)}
          className={classes.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={ICONS.telegram[type]} alt="Telegram Icon" style={{ minWidth: size, height: size }} />
        </a>
      )}
    </div>
  );
}

SocialLinks.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  type: PropTypes.oneOf(['circle', 'square']),
  viber: PropTypes.string,
  whatsapp: PropTypes.string,
  telegram: PropTypes.string,
};

SocialLinks.defaultProps = {
  className: '',
  type: 'square',
  size: 20,
  viber: null,
  whatsapp: null,
  telegram: null,
};

export default SocialLinks;

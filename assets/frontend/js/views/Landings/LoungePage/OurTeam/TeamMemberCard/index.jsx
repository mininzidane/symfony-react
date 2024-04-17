/* eslint-disable react/prop-types */
import React from 'react';
import ViberCircleSvg from 'frontend/images/shared/social/viber-circle-24x24.svg';
import WhatsappCircleSvg from 'frontend/images/shared/social/whatsapp-circle-24x24.svg';
import TelegramCircleSvg from 'frontend/images/shared/social/telegram-circle-24x24.svg';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import PhoneLink from 'frontend/js/components/PhoneLink';
import Link from 'frontend/js/components/Link';
import SocialLinksService from 'frontend/js/lib/utils/SocialLinksService';
import useStyles from './useStyles';

function TeamMember({ data }) {
  const classes = useStyles();
  const { icon, position, name, phone, socials, hours } = data;

  return (
    <div className={classes.root} style={icon ? {} : { paddingTop: 24, marginTop: -40 }}>
      {icon && <img src={icon} alt="icon" width={90} height={90} className={classes.icon} />}
      <div className={classes.position}>{position}</div>
      <div className={classes.name}>{name}</div>

      <div className={classes.contacts}>
        <div className={classes.phone}>
          <PhoneLink phone={phone} />
        </div>
        <div className={classes.socials}>
          {socials.viber && (
            <Link href={SocialLinksService.viber(socials.viber)} isTargetBlank>
              <img src={ViberCircleSvg} alt="viber" />
            </Link>
          )}
          {socials.whatsapp && (
            <Link href={SocialLinksService.whatsapp(socials.whatsapp)} isTargetBlank>
              <img src={WhatsappCircleSvg} alt="viber" />
            </Link>
          )}
          {socials.telegram && (
            <Link href={SocialLinksService.telegram(socials.telegram)} isTargetBlank>
              <img src={TelegramCircleSvg} alt="viber" />
            </Link>
          )}
        </div>
      </div>

      <div className={classes.hours}>
        <FormattedMessage id="shared.label.hoursOfOperation" />: {hours}
      </div>
    </div>
  );
}

export default TeamMember;

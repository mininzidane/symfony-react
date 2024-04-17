import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';

import useIntl from 'frontend/js/hooks/useIntl';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Container from 'frontend/js/components/Container';
import Button from 'frontend/js/components/Button';
import Disclosure from '../Disclosure';

import bg from '../img/header-bg.jpg';
import item1Img from '../img/item1.svg';
import item2Img from '../img/item2.svg';
import item3Img from '../img/item3.svg';
import Item from './Item';
import useStyles from './useStyles';

function Header() {
  const classes = useStyles();
  const intl = useIntl();
  const { isBelowSm } = useBreakpoint();
  const ga = new GoogleAnalyticsService();

  return (
    <ContainerFullScreen
      wrapperClassName={classes.rootWrapper}
      className={classes.root}
      background={{
        xl_x1: bg,
        sm_x1: bg,
        color: '#355874',
      }}
      isBeyondBackground
    >
      <Container className={classes.content}>
        <h1 className={classes.title}>
          <FormattedMessage id="landings.financing.header.title" values={{ br: <br /> }} />
        </h1>
        <div className={classes.subtitle}>
          <FormattedMessage id="landings.financing.header.subtitle" values={{ br: isBelowSm ? ' ' : <br /> }} />
        </div>
        <div className={classes.items}>
          <Item
            img={item1Img}
            text={intl.formatMessage(
              { id: 'landings.financing.header.items.item1' },
              {
                strong: (chunks) => <strong>{chunks}</strong>,
                br: isBelowSm ? ' ' : <br />,
              },
            )}
            alt="APR icon"
          />
          <Item
            img={item2Img}
            text={intl.formatMessage(
              { id: 'landings.financing.header.items.item2' },
              {
                strong: (chunks) => <strong>{chunks}</strong>,
                br: <br />,
              },
            )}
            alt="Team icon"
          />
          <Item
            img={item3Img}
            text={intl.formatMessage(
              { id: 'landings.financing.header.items.item3' },
              {
                strong: (chunks) => <strong>{chunks}</strong>,
                br: <br />,
              },
            )}
            alt="Approve icon"
          />
        </div>
      </Container>
      <div className={classes.action}>
        <Button
          label={intl.formatMessage({ id: 'shared.cta.applyNow' })}
          color="yellow"
          href="https://www.lightstream.com/?fact=14122&irad=88389&irmp=2875256"
          className={classes.cta}
          onClick={() => ga.sendEvent('click', 'autoloans', 'applynow')}
          isNofollow
          isTargetBlank
        />
        <Disclosure className={classes.disclosure} />
      </div>
    </ContainerFullScreen>
  );
}

export default Header;

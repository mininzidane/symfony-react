import React from 'react';
import classNames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import Link from 'frontend/js/components/Link';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import RouterService from 'frontend/js/api/RouterService';
import useStyles from './useStyles';

const Bullets = () => {
  const intl = useIntl();
  const classes = useStyles();

  const data = [
    [
      intl.formatMessage({
        id: 'locationsPage.more.0.title',
      }),
      intl.formatMessage(
        {
          id: 'locationsPage.more.0.desc',
        },
        {
          a: (chunk) => <Link href={RouterService.getRoute('auctionCalendar', null, false)}>{chunk}</Link>,
        },
      ),
      classes.item1,
    ],
    [
      intl.formatMessage({
        id: 'locationsPage.more.2.title',
      }),
      intl.formatMessage(
        {
          id: 'locationsPage.more.2.desc',
        },
        {
          a: (chunk) => (
            <Link href={RouterService.getRoute('domesticVehicleTransportation', null, false)}>{chunk}</Link>
          ),
        },
      ),
      classes.item3,
    ],
    [
      intl.formatMessage({
        id: 'locationsPage.more.3.title',
      }),
      intl.formatMessage(
        {
          id: 'locationsPage.more.3.desc',
        },
        {
          a: (chunk) => <Link href={RouterService.getRoute('internationalShipping', null, false)}>{chunk}</Link>,
        },
      ),
      classes.item4,
    ],
    [
      intl.formatMessage({
        id: 'locationsPage.more.1.title',
      }),
      intl.formatMessage(
        {
          id: 'locationsPage.more.1.desc',
        },
        {
          a: (chunk) => <Link href={RouterService.getRoute('sellYourCar', null, false)}>{chunk}</Link>,
        },
      ),
      classes.item2,
    ],
  ];

  return (
    <div className={classes.root}>
      <ContainerFullScreen>
        <FormattedMessage id="shared.cta.learnMore" className={classNames(classes.h2, 'ta-c')} />

        <div className={classes.bulletsContainer}>
          {data.map(([title, desc, className]) => (
            <div key={title} className={classNames(classes.item, className)}>
              <div className={classes.group}>
                <h3 className={classes.title}>{title}</h3>

                <div className={classes.desc}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </ContainerFullScreen>
    </div>
  );
};

export default Bullets;

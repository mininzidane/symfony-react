import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';

import Button from 'frontend/js/components/Button';
import RouterService from 'frontend/js/api/RouterService';
import useStyles from './useStyles';
import Promo1Src from './img/promo-1.png';
import Promo2Src from './img/promo-2.png';

const Promo = () => {
  const intl = useIntl();
  const classes = useStyles();

  const promoData = [
    [
      intl.formatMessage({
        id: 'locationsPage.promo.sell.title',
      }),
      intl.formatMessage({
        id: 'locationsPage.promo.sell.desc',
      }),
      {
        label: intl.formatMessage({
          id: 'locationsPage.promo.sell.cta',
        }),
        href: RouterService.getRoute('businessBuyers', null, false),
        color: 'yellow',
      },
      <img src={Promo1Src} alt="" className={classes.thumb} />,
    ],
    [
      intl.formatMessage({
        id: 'locationsPage.promo.clearvin.title',
      }),
      intl.formatMessage({
        id: 'locationsPage.promo.clearvin.desc',
      }),

      {
        label: intl.formatMessage({
          id: 'locationsPage.promo.clearvin.cta',
        }),
        href: RouterService.getRoute('vehicleHistoryReports', null, false),
        color: 'green',
      },
      <div className={classes.thumbContainer}>
        <ul className={classes.thumbList}>
          {[
            intl.formatMessage({ id: 'locationPage.promo.auctions' }),
            intl.formatMessage({ id: 'locationPage.promo.records' }),
            intl.formatMessage({ id: 'locationPage.promo.odometer' }),
            intl.formatMessage({ id: 'lotPage.clearVinDetails.previousOwners' }),
            intl.formatMessage({ id: 'locationPage.promo.junk' }),
          ].map((l) => (
            <li key={l}>
              <span className={classes.thumbItem}>
                {l}&nbsp;
                <span className={classes.thumbIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path
                      fill="#fff"
                      d="M8.05.223 2.726 6.166 1.278 4.383a.726.726 0 0 0-.484-.232.714.714 0 0 0-.506.17.823.823 0 0 0-.275.49.866.866 0 0 0 .093.563l1.714 3.17a.94.94 0 0 0 .329.334.855.855 0 0 0 .875 0 .94.94 0 0 0 .33-.335c.27-.395 5.413-7.427 5.413-7.427.636-.794-.176-1.487-.717-.893Z"
                    />
                  </svg>
                </span>
              </span>
            </li>
          ))}
        </ul>
        <img src={Promo2Src} alt="" />
      </div>,
    ],
  ];

  return (
    <div className={classes.root}>
      <ContainerFullScreen className={classes.container}>
        {promoData.map(([title, desc, buttonProps, Thumb]) => (
          <div key={title} className={classes.item}>
            {Thumb}
            <div className={classes.title}>{title}</div>
            <div className={classes.desc}> {desc}</div>
            <Button isInline {...buttonProps} className={classes.button} />
          </div>
        ))}
      </ContainerFullScreen>
    </div>
  );
};

export default Promo;

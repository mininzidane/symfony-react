import React from 'react';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import Container from 'frontend/js/components/Container';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import GoogleAd from 'frontend/js/components/GoogleAd';

import IconCV from 'frontend/images/shared/logo/clearvin-logo.svg';
import IconGlobal from './img/ic_global.svg';
import IconWord from './img/ic_worldwidemembers.svg';
import IconShipping from './img/ic_shipping.svg';
import IconCustomer from './img/ic_customersupport.svg';

import IconEH from './img/eh_logo.svg';
import IconABM from './img/abm_logo.svg';

import useStyles from './useStyles';

function AboutUsPage() {
  const intl = useIntl();
  const classes = useStyles();

  const features = [
    [intl.formatMessage({ id: 'aboutUsPage.features.0.title' }), <FormattedMessage id="aboutUsPage.features.0.desc" />],
    [intl.formatMessage({ id: 'aboutUsPage.features.1.title' }), <FormattedMessage id="aboutUsPage.features.1.desc" />],
    [intl.formatMessage({ id: 'aboutUsPage.features.2.title' }), <FormattedMessage id="aboutUsPage.features.2.desc" />],
  ];
  const bullets = [
    [
      intl.formatMessage({ id: 'aboutUsPage.bullets.0.title' }),
      intl.formatMessage({ id: 'aboutUsPage.bullets.0.desc' }),
      IconGlobal,
    ],
    [
      intl.formatMessage({ id: 'aboutUsPage.bullets.1.title' }),
      intl.formatMessage({ id: 'aboutUsPage.bullets.1.desc' }),
      IconCustomer,
    ],
    [
      intl.formatMessage({ id: 'aboutUsPage.bullets.2.title' }),
      intl.formatMessage({ id: 'aboutUsPage.bullets.2.desc' }),
      IconWord,
    ],
    [
      intl.formatMessage({ id: 'aboutUsPage.bullets.3.title' }),
      intl.formatMessage({ id: 'aboutUsPage.bullets.3.desc' }),
      IconShipping,
    ],
  ];
  const brands = [
    [
      intl.formatMessage({ id: 'aboutUsPage.brands.eh.title' }),
      intl.formatMessage({ id: 'aboutUsPage.brands.eh.desc' }),
      IconEH,
      intl.formatMessage({ id: 'aboutUsPage.brands.eh.cta' }),
      'https://www.easyhaul.com/',
    ],
    [
      intl.formatMessage({ id: 'aboutUsPage.brands.abm.title' }),
      intl.formatMessage({ id: 'aboutUsPage.brands.abm.desc' }),
      IconABM,
    ],
    [
      intl.formatMessage({ id: 'aboutUsPage.brands.cv.title' }),
      intl.formatMessage({ id: 'aboutUsPage.brands.cv.desc' }),
      IconCV,
      intl.formatMessage({ id: 'aboutUsPage.brands.cv.cta' }),
      'https://www.clearvin.com/',
    ],
  ];
  const countries = [
    ['Belarus', '/img/flags/by.svg'],
    ['Georgia', '/img/flags/ge.svg'],
    ['Ukraine', '/img/flags/ua.svg'],
    ['Nigeria', '/img/flags/ng.svg'],
    ['El Salvador', '/img/flags/sv.svg'],
  ];

  return (
    <>
      <div className={classes.promo}>
        <Container>
          <h1 className={classes.title}>{intl.formatMessage({ id: 'aboutUsPage.title' })}</h1>
          <div
            className={classes.subTitle}
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage({ id: 'aboutUsPage.subTitle' }),
            }}
          />
          <div className={classes.desc}>{intl.formatMessage({ id: 'aboutUsPage.desc' })}</div>
        </Container>
      </div>

      <div className={classes.features}>
        <Container className={classes.sectionContainer}>
          {features.map(([featureTitle, featureDesc]) => (
            <div className={classes.feature} key={featureTitle}>
              <div className={classes.featureTitle}>{featureTitle}</div>
              <div>{featureDesc}</div>
            </div>
          ))}
        </Container>
      </div>

      <div className={classnames(classes.sectionAccent, classes.section)}>
        <h2 className={classes.sectionTitle}>{intl.formatMessage({ id: 'aboutUsPage.bullets.title' })}</h2>
        <div className={classes.sectionDesc}>{intl.formatMessage({ id: 'aboutUsPage.bullets.desc' })}</div>

        <Container className={classes.sectionContainer}>
          {bullets.map(([bulletTitle, bulletDesc, bulletSrc]) => (
            <div key={bulletTitle} className={classes.bullet}>
              <img src={bulletSrc} alt="" />
              <div className={classes.bulletTitle}>{bulletTitle}</div>
              <div>{bulletDesc}</div>
            </div>
          ))}
        </Container>
      </div>

      <div className={classes.section}>
        <h2 className={classes.sectionTitle}>{intl.formatMessage({ id: 'aboutUsPage.brands.title' })}</h2>
        <div className={classes.sectionDesc}>{intl.formatMessage({ id: 'aboutUsPage.brands.desc' })}</div>
        <div className={classes.brands}>
          <Container className={classnames(classes.sectionContainer, classes.sectionContainerStretch)}>
            {brands.map(([brandTitle, brandDesc, brandSrc, brandCtaTitle, brandCta], idx) => (
              <div
                key={brandTitle}
                className={classnames(classes.brand, {
                  [classes.brandEh]: idx === 0,
                  [classes.brandAbm]: idx === 1,
                })}
              >
                <div className={classes.logoContainer}>
                  <img src={brandSrc} alt="" />
                </div>
                <div className={classes.brandTitle}>{brandTitle}</div>
                <div className={classes.brandDesc}>{brandDesc}</div>
                {brandCtaTitle && (
                  <ButtonOutlined
                    href={brandCta}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    label={brandCtaTitle}
                    className={classes.brandBtn}
                  />
                )}
              </div>
            ))}
          </Container>
        </div>
      </div>

      <div className={classnames(classes.sectionAccent, classes.section)}>
        <h2 className={classnames(classes.sectionTitle, classes.countriesTitles)}>
          {intl.formatMessage({ id: 'aboutUsPage.global' })}
        </h2>

        <Container className={classes.sectionContainer}>
          {countries.map(([countryTitle, countrySrc]) => (
            <div key={countryTitle} className={classes.country}>
              <img className={classes.countryThumb} src={countrySrc} width="78px" alt="" />
              <div className={classes.countryTitle}>AutoBidMaster</div>
              <div>{countryTitle}</div>
            </div>
          ))}
        </Container>
      </div>
      <GoogleAd
        id="div-gpt-ad-1540494791716-0"
        className="width-xl-970 width-md-300 mt-40 sm-mt-20"
        placement="faq_about_us_today_auction_pages"
        withSlot
        adUnitPath="/93216436/abm-faq-au-ta"
        desktopSize={[970, 90]}
        breakpoint={991}
        extraTargetingActions={(adSlot) =>
          adSlot.setTargeting('page', ['faq_about_us_today_auction_pages']).setCollapseEmptyDiv(true)
        }
      />
    </>
  );
}

export default AboutUsPage;

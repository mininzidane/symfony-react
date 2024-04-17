import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import Link from 'frontend/js/components/Link';

import HeaderBg from '../_Shared/img/international-hero-bg@2x.jpg';
import Header from '../_Shared/Header';
import Stepper from '../_Shared/Stepper';
import Faq from '../_Shared/Faq';

function HowInternationalShippingWorksPage() {
  const intl = useIntl();

  return (
    <>
      <Header
        bgImg={HeaderBg}
        title={intl.formatMessage({ id: 'howInternationalShippingWorks.title' }, { br: <br /> })}
        subtitle={intl.formatMessage({ id: 'howInternationalShippingWorks.subtitle' }, { br: <br /> })}
      />
      <Stepper
        title={intl.formatMessage({ id: 'howInternationalShippingWorks.stepper.title' })}
        itemsList={[
          {
            title: intl.formatMessage({ id: 'howInternationalShippingWorks.step1.title' }),
            subtitle: intl.formatMessage({ id: 'howInternationalShippingWorks.step1.subtitle' }),
            description: intl.formatMessage(
              { id: 'howInternationalShippingWorks.step1.description' },
              {
                EhLink: (chunks) => (
                  <Link href={RouterService.getRoute('easyhaul', false, true)} isTargetBlank>
                    {chunks}
                  </Link>
                ),
                LoginLink: (chunks) => <a href={RouterService.getRoute('login')}>{chunks}</a>,
              },
            ),
          },
          {
            title: intl.formatMessage({ id: 'howInternationalShippingWorks.step2.title' }),
            subtitle: intl.formatMessage({ id: 'howInternationalShippingWorks.step2.subtitle' }),
            description: intl.formatMessage({ id: 'howInternationalShippingWorks.step2.description' }),
          },
          {
            title: intl.formatMessage({ id: 'howInternationalShippingWorks.step3.title' }),
            subtitle: intl.formatMessage({ id: 'howInternationalShippingWorks.step3.subtitle' }),
            description: intl.formatMessage({ id: 'howInternationalShippingWorks.step3.description' }),
          },
          {
            title: intl.formatMessage({ id: 'howInternationalShippingWorks.step4.title' }),
            subtitle: intl.formatMessage({ id: 'howInternationalShippingWorks.step4.subtitle' }),
            description: intl.formatMessage({ id: 'howInternationalShippingWorks.step4.description' }),
          },
          {
            title: intl.formatMessage({ id: 'howInternationalShippingWorks.step5.title' }),
            subtitle: intl.formatMessage({ id: 'howInternationalShippingWorks.step5.subtitle' }),
            description: intl.formatMessage({ id: 'howInternationalShippingWorks.step5.description' }),
          },
          {
            title: intl.formatMessage({ id: 'howInternationalShippingWorks.step6.title' }),
            subtitle: intl.formatMessage({ id: 'howInternationalShippingWorks.step6.subtitle' }),
            description: intl.formatMessage({ id: 'howInternationalShippingWorks.step6.description' }),
          },
          {
            title: intl.formatMessage({ id: 'howInternationalShippingWorks.step7.title' }),
            subtitle: intl.formatMessage({ id: 'howInternationalShippingWorks.step7.subtitle' }),
            description: intl.formatMessage({ id: 'howInternationalShippingWorks.step7.description' }),
          },
          {
            title: intl.formatMessage({ id: 'howInternationalShippingWorks.step8.title' }),
            subtitle: intl.formatMessage({ id: 'howInternationalShippingWorks.step8.subtitle' }),
            description: intl.formatMessage({ id: 'howInternationalShippingWorks.step8.description' }),
          },
          {
            title: intl.formatMessage({ id: 'howInternationalShippingWorks.step9.title' }),
            subtitle: intl.formatMessage({ id: 'howInternationalShippingWorks.step9.subtitle' }),
            description: intl.formatMessage({ id: 'howInternationalShippingWorks.step9.description' }),
          },
        ]}
      />
      <Faq />
    </>
  );
}

export default HowInternationalShippingWorksPage;

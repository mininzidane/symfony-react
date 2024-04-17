import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import Link from 'frontend/js/components/Link';

import Header from '../_Shared/Header';
import Stepper from '../_Shared/Stepper';
import Faq from '../_Shared/Faq';

function HowDomesticShippingWorksPage() {
  const intl = useIntl();

  return (
    <>
      <Header
        title={intl.formatMessage({ id: 'howDomesticShippingWorks.title' }, { br: <br /> })}
        subtitle={intl.formatMessage({ id: 'howDomesticShippingWorks.subtitle' }, { br: <br /> })}
      />
      <Stepper
        title={intl.formatMessage({ id: 'howDomesticShippingWorks.stepper.title' })}
        itemsList={[
          {
            title: intl.formatMessage({ id: 'howDomesticShippingWorks.step1.title' }),
            subtitle: intl.formatMessage({ id: 'howDomesticShippingWorks.step1.subtitle' }),
            description: intl.formatMessage(
              { id: 'howDomesticShippingWorks.step1.description' },
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
            title: intl.formatMessage({ id: 'howDomesticShippingWorks.step2.title' }),
            subtitle: intl.formatMessage({ id: 'howDomesticShippingWorks.step2.subtitle' }),
            description: intl.formatMessage({ id: 'howDomesticShippingWorks.step2.description' }),
          },
          {
            title: intl.formatMessage({ id: 'howDomesticShippingWorks.step3.title' }),
            subtitle: intl.formatMessage({ id: 'howDomesticShippingWorks.step3.subtitle' }),
            description: intl.formatMessage(
              { id: 'howDomesticShippingWorks.step3.description' },
              {
                EhLink: (chunks) => (
                  <Link href={RouterService.getRoute('easyhaul', false, true)} isTargetBlank>
                    {chunks}
                  </Link>
                ),
              },
            ),
          },
          {
            title: intl.formatMessage({ id: 'howDomesticShippingWorks.step4.title' }),
            subtitle: intl.formatMessage({ id: 'howDomesticShippingWorks.step4.subtitle' }),
            description: intl.formatMessage({ id: 'howDomesticShippingWorks.step4.description' }),
          },
          {
            title: intl.formatMessage({ id: 'howDomesticShippingWorks.step5.title' }),
            subtitle: intl.formatMessage({ id: 'howDomesticShippingWorks.step5.subtitle' }),
            description: intl.formatMessage({ id: 'howDomesticShippingWorks.step5.description' }),
          },
          {
            title: intl.formatMessage({ id: 'howDomesticShippingWorks.step6.title' }),
            subtitle: intl.formatMessage({ id: 'howDomesticShippingWorks.step6.subtitle' }),
            description: intl.formatMessage({ id: 'howDomesticShippingWorks.step6.description' }),
          },
        ]}
      />
      <Faq />
    </>
  );
}

export default HowDomesticShippingWorksPage;

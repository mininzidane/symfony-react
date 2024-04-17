import CountryService from 'frontend/js/api/CountryService';
import t from 'frontend/js/api/TranslatorService';
import RouterService from 'frontend/js/api/RouterService';
import useLoungeCountry from 'frontend/js/hooks/useLoungeCountry';

const userCountryIso2 = CountryService.getUserCountryIso2();
const loungeCountry = useLoungeCountry(userCountryIso2);
const contactUsLink = { href: RouterService.getRoute('contactUs'), label: t('header.main_menu.contact_us') };

const contactLinks = loungeCountry
  ? [
      {
        href: RouterService.getRoute('lounge', null, false, { country: loungeCountry.slug }),
        label: t('loungePage.lounge.title', { country: loungeCountry.name }),
      },
      contactUsLink,
    ]
  : [contactUsLink];

export default [
  { href: RouterService.getRoute('videoGuides'), label: t('header.main_menu.video_guides') },
  { href: RouterService.getLocalizedHcRoute(), label: t('header.main_menu.help_center') },
  {
    href: RouterService.getLocalizedHcRoute('hcRulesAndPolicies'),
    label: t('header.main_menu.rules_and_policies'),
  },
  ...contactLinks,
];

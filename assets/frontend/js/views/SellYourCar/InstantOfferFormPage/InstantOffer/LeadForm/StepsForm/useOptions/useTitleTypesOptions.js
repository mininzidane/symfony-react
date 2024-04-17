import useIntl from 'frontend/js/hooks/useIntl';
import InstantOfferService from 'frontend/js/api/InstantOfferService';

function useTitleTypesOptions() {
  const intl = useIntl();
  const { TITLE_TYPE_LIST } = InstantOfferService;

  const options = [
    {
      value: TITLE_TYPE_LIST.CLEAN_TITLE,
      label: intl.formatMessage({ id: 'sellYourCarPage.titleTypesOptions.cleanTitle' }),
    },
    {
      value: TITLE_TYPE_LIST.SALVAGE_TITLE,
      label: intl.formatMessage({ id: 'sellYourCarPage.titleTypesOptions.salvageTitle' }),
    },
    {
      value: TITLE_TYPE_LIST.REBUILT_TITLE,
      label: intl.formatMessage({ id: 'sellYourCarPage.titleTypesOptions.rebuiltTitle' }),
    },
    {
      value: TITLE_TYPE_LIST.I_DO_NOT_HAVE_A_TITLE,
      label: intl.formatMessage({ id: 'sellYourCarPage.titleTypesOptions.iDoNotHaveATitle' }),
    },
  ];
  return options;
}

export default useTitleTypesOptions;

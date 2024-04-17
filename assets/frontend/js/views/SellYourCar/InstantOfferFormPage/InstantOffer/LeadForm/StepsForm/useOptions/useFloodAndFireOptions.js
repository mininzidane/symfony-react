import useIntl from 'frontend/js/hooks/useIntl';
import InstantOfferService from 'frontend/js/api/InstantOfferService';

function useFloodAndFireOptions() {
  const intl = useIntl();
  const { FLOOD_OR_FIRE_DAMAGE_LIST } = InstantOfferService;

  const options = [
    {
      value: FLOOD_OR_FIRE_DAMAGE_LIST.FIRE,
      label: intl.formatMessage({ id: 'sellYourCarPage.floodAndFireOptions.fire' }),
    },
    {
      value: FLOOD_OR_FIRE_DAMAGE_LIST.FLOOD,
      label: intl.formatMessage({ id: 'sellYourCarPage.floodAndFireOptions.flood' }),
    },
    {
      value: FLOOD_OR_FIRE_DAMAGE_LIST.NONE,
      label: intl.formatMessage({ id: 'sellYourCarPage.floodAndFireOptions.none' }),
    },
  ];
  return options;
}

export default useFloodAndFireOptions;

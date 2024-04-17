import useIntl from 'frontend/js/hooks/useIntl';
import InstantOfferService from 'frontend/js/api/InstantOfferService';

function useConditionsOptions() {
  const intl = useIntl();
  const { CONDITION_TYPE_LIST } = InstantOfferService;

  const options = [
    {
      value: CONDITION_TYPE_LIST.STARTS_AND_DRIVES,
      label: intl.formatMessage({ id: 'sellYourCarPage.conditionsOptions.startsAndDrives' }),
    },
    {
      value: CONDITION_TYPE_LIST.STARTS_BUT_DOES_NOT_DRIVE,
      label: intl.formatMessage({ id: 'sellYourCarPage.conditionsOptions.startsButDoesNotDrive' }),
    },
    {
      value: CONDITION_TYPE_LIST.DOES_NOT_START,
      label: intl.formatMessage({ id: 'sellYourCarPage.conditionsOptions.doesNotStart' }),
    },
  ];
  return options;
}

export default useConditionsOptions;

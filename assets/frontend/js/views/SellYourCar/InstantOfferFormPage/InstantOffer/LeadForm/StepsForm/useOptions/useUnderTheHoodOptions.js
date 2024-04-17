import useIntl from 'frontend/js/hooks/useIntl';
import InstantOfferService from 'frontend/js/api/InstantOfferService';

function useUnderTheHoodOptions() {
  const intl = useIntl();
  const { UNDER_THE_HOOD_LIST } = InstantOfferService;
  const options = [
    {
      value: UNDER_THE_HOOD_LIST.ENGINE_PROPERLY_INSTALLED,
      label: intl.formatMessage({
        id: 'sellYourCarPage.underTheHoodOptions.theEngineAndTransmissionAreIntactAndProperlyInstalled',
      }),
    },
    {
      value: UNDER_THE_HOOD_LIST.MISSING_PARTS,
      label: intl.formatMessage({
        id: 'sellYourCarPage.underTheHoodOptions.theEngineAndOrTransmissionAreMissingParts',
      }),
      hasDamagesDescription: true,
    },
    {
      value: UNDER_THE_HOOD_LIST.ENGINE_REMOVED,
      label: intl.formatMessage({ id: 'sellYourCarPage.underTheHoodOptions.theEngineAndOrTransmissionAreRemoved' }),
      hasDamagesDescription: true,
    },
  ];
  return options;
}

export default useUnderTheHoodOptions;

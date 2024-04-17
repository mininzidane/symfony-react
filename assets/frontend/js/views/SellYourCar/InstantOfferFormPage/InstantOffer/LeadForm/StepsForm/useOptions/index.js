import useYearMakeModelOptions from 'frontend/js/hooks/useYearMakeModelOptions';
import useTitleTypesOptions from './useTitleTypesOptions';
import useConditionsOptions from './useConditionsOptions';
import useYesNoOptions from './useYesNoOptions';
import useWheelsOptions from './useWheelsOptions';
import useFloodAndFireOptions from './useFloodAndFireOptions';
import useUnderTheHoodOptions from './useUnderTheHoodOptions';
import useDamageOptions from './useDamageOptions';

function useOptions({ make }) {
  const { yearOptions, makeOptions, modelOptions, onChangeMake } = useYearMakeModelOptions({ make });

  const titleTypesOptions = useTitleTypesOptions();
  const conditionsOptions = useConditionsOptions();
  const yesNoOptions = useYesNoOptions();
  const damageOptions = useDamageOptions();
  const wheelsOptions = useWheelsOptions();
  const floodAndFireOptions = useFloodAndFireOptions();
  const underTheHoodOptions = useUnderTheHoodOptions();

  return {
    onChangeMake,
    yearOptions,
    makeOptions,
    modelOptions,
    titleTypesOptions,
    conditionsOptions,
    yesNoOptions,
    wheelsOptions,
    floodAndFireOptions,
    underTheHoodOptions,
    damageOptions,
  };
}

export default useOptions;

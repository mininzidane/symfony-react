import * as yup from 'yup';
import t from 'frontend/js/api/TranslatorService';

const validationSchema = yup.object().shape({
  tip1: yup.bool().oneOf([true], t('form.error.pleaseCheckAllThePointsToContinue')),
  tip2: yup.bool().oneOf([true], t('form.error.pleaseCheckAllThePointsToContinue')),
  tip3: yup.bool().oneOf([true], t('form.error.pleaseCheckAllThePointsToContinue')),
  tip4: yup.bool().oneOf([true], t('form.error.pleaseCheckAllThePointsToContinue')),
  tip5: yup.bool().oneOf([true], t('form.error.pleaseCheckAllThePointsToContinue')),
  tip6: yup.bool().oneOf([true], t('form.error.pleaseCheckAllThePointsToContinue')),
  tip7: yup.bool().oneOf([true], t('form.error.pleaseCheckAllThePointsToContinue')),
  tip8: yup.bool().oneOf([true], t('form.error.pleaseCheckAllThePointsToContinue')),
  tip9: yup.bool().oneOf([true], t('form.error.pleaseCheckAllThePointsToContinue')),
});

export default validationSchema;

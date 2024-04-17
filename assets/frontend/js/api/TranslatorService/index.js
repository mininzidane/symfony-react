import intl from 'frontend/js/providers/TranslationProvider/intl';

const TranslatorService = (key, values) => intl.formatMessage({ id: key }, values);

export default TranslatorService;

const StringService = {
  capitalize: (word) => word.charAt(0).toUpperCase() + word.slice(1),
  capitalizeEachWord: (string = '') =>
    String(string)
      .toLowerCase()
      .replace(/(^\w)|(\s\w)/g, (match) => match.toUpperCase()),
  slugify: (string = '') => string.toLowerCase().replace(/\s+/g, '-'),
  isCapitalized: (string = '') => {
    const firstLetter = string.charAt(0);
    return firstLetter === firstLetter.toUpperCase();
  },
  fixQuerySpaces(string) {
    return string.replaceAll('+', ' ');
  },
  toUppercase: (string) => {
    if (!string) {
      return '';
    }

    return String(string).toUpperCase();
  },
  toLowerCase: (string) => {
    if (!string) {
      return '';
    }

    return String(string).toLowerCase();
  },
  nlToBr: (word) => word.slice().replace(/(?:\r\n|\r|\n)/g, '<br>'),
  attachZeros(number, minLength) {
    return (Array(minLength).fill(0).join('') + number).slice(-1 * minLength);
  },
  buildUlFromStringsArray(stringsArray) {
    const messages = [];
    stringsArray.map((string) => messages.push(string));

    return `<ul><li>${messages.join('</li><li>')}</li></ul>`;
  },
  formatMakeModelName(makeModel) {
    return typeof makeModel === 'string' ? makeModel.replace(/\s/g, '_') : makeModel;
  },
  formatReverseMakeModelName(makeModel) {
    return typeof makeModel === 'string' ? makeModel.replace(/_/g, ' ') : makeModel;
  },
  formatMonth(month) {
    return this.attachZeros(month, 2);
  },
  formatYear(year) {
    return `${year}`.slice(-2);
  },
  htmlDecode(input) {
    const e = document.createElement('textarea');
    e.innerHTML = input;
    return e.value || '';
  },
  randomString() {
    return Math.random().toString(36);
  },
  removeDigits(string) {
    return string.replace(/[0-9]/g, '');
  },
  removeNonDigits(string) {
    return string.replace(/[^0-9]/g, '');
  },
  stripPhoneNumber(string) {
    return string.replace(/[^+\d]/g, '');
  },
  getPhoneHref(phoneNumber) {
    return `tel:${StringService.stripPhoneNumber(phoneNumber)}`;
  },
  limitMaxLength(string, maxLength) {
    return string.slice(0, maxLength);
  },
  copyToClipboard(string) {
    const $dummyInput = document.createElement('input');
    document.body.appendChild($dummyInput);
    $dummyInput.value = string;
    $dummyInput.select();
    document.execCommand('copy');
    document.body.removeChild($dummyInput);
  },
  getStatusKeyFormString(statusString) {
    return statusString.replace(/\s/g, '_').replace(/\W/g, '').toLowerCase();
  },
};

export default StringService;

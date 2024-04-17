function getDefaultConditions(intl) {
  const translations = {
    password: intl.formatMessage({ id: 'securityPage.form.changePassword.currentPassword' }),
    newPassword: intl.formatMessage({ id: 'securityPage.form.changePassword.newPassword' }),
    newPasswordConfirmation: intl.formatMessage({ id: 'securityPage.form.changePassword.newPasswordConfirmation' }),
    submitBtn: intl.formatMessage({ id: 'securityPage.form.changePassword.submitLabel' }),
    minChars: intl.formatMessage({ id: 'securityPage.form.criteria.minChars' }),
    maxChars: intl.formatMessage({ id: 'securityPage.form.criteria.maxChars' }),
    lowercase: intl.formatMessage({ id: 'securityPage.form.criteria.lowercase' }),
    uppercase: intl.formatMessage({ id: 'securityPage.form.criteria.uppercase' }),
    number: intl.formatMessage({ id: 'securityPage.form.criteria.number' }),
    symbols: intl.formatMessage({ id: 'securityPage.form.criteria.symbols' }),
    invalidChars: intl.formatMessage({ id: 'securityPage.form.criteria.invalidChars' }),
    passwordMatches: intl.formatMessage({ id: 'securityPage.form.criteria.passwordMatches' }),
    successPrompt: intl.formatMessage({ id: 'securityPage.form.changeEmail.successPrompt' }),
  };

  return {
    getNewPasswordConditions: () => [
      { regexp: /.{8,}/, label: translations.minChars },
      { regexp: /^.{1,25}$/, label: translations.maxChars },
      { regexp: /[a-z]+/g, label: translations.lowercase },
      { regexp: /[A-Z]+/g, label: translations.uppercase },
      { regexp: /[0-9]+/g, label: translations.number },
      { regexp: /[!@#$%^&*]+/, label: translations.symbols },
      // eslint-disable-next-line no-control-regex
      { func: (v) => !(/[^\x00-\x7F]+/.test(v) || /\s+/.test(v)), label: translations.invalidChars },
    ],
    getNewPasswordConfirmationConditions: (values) => [
      {
        func: () => values.newPassword === values.newPasswordConfirmation,
        label: translations.passwordMatches,
      },
    ],
  };
}

export default getDefaultConditions;

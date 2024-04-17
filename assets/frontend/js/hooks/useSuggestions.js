import { useState, useEffect } from 'react';

function useSuggestions(values, atSign) {
  const [shouldShowSuggestions, setShouldShowSuggestions] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isEmailFocusedDelayed, setIsEmailFocusedDelayed] = useState(false);

  function checkHasDomain(email) {
    const split = email.split('@');

    if (split.length < 2) {
      return false;
    }

    const domainStr = split[1];
    const domainStrHasDot = domainStr.includes('.');

    if (!domainStrHasDot) {
      return false;
    }

    const firstLevelDomain = domainStr.split('.')[1];
    if (!firstLevelDomain || firstLevelDomain.length < 2) {
      return false;
    }

    return true;
  }

  useEffect(() => {
    const { email } = values || {};
    const hasName = Boolean(email && email.substring(0, 1) !== atSign);
    const hasAtSign = Boolean(email && email.includes(atSign));
    const hasDomain = checkHasDomain(email);

    setShouldShowSuggestions(hasName && hasAtSign && !hasDomain);
  }, [values]);

  useEffect(() => {
    if (isEmailFocused) {
      setIsEmailFocusedDelayed(true);
    } else {
      setTimeout(() => {
        setIsEmailFocusedDelayed(isEmailFocused);
      }, 300);
    }
  }, [isEmailFocused]);

  return {
    shouldShowSuggestions,
    isEmailFocused,
    setIsEmailFocused,
    isEmailFocusedDelayed,
  };
}

export default useSuggestions;

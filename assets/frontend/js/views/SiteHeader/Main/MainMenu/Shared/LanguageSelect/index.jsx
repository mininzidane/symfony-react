/* eslint-disable react/prop-types */
import React, { memo, useMemo } from 'react';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import t from 'frontend/js/api/TranslatorService';
import LanguageService from 'frontend/js/api/LanguageService';

function LanguageSelect({ SubmenuComponent, isOpen, onTriggerClick }) {
  const { isBelowSm } = useBreakpoint();
  const { OPTIONS, changeLocale, getCurrentLocale, getLanguageByLocale } = LanguageService;
  const currentLocale = getCurrentLocale();

  if (OPTIONS.length <= 1) {
    return null;
  }

  const currentLabel = useMemo(() => {
    const currentOption = OPTIONS.find((option) => option.value === currentLocale);
    return currentOption ? currentOption.label : getLanguageByLocale(currentLocale);
  }, [currentLocale]);

  const menuItems = useMemo(
    () =>
      OPTIONS.map((locale, index) => ({
        label: <span>{locale.label}</span>,
        onClick: () => changeLocale(locale.value),
        id: index,
      })),
    [],
  );

  return (
    <SubmenuComponent
      isOpen={isOpen}
      onTriggerClick={onTriggerClick}
      label={
        <>
          {isBelowSm && <span>{t('shared.label.language')}:&nbsp;</span>}
          <span>{currentLabel}</span>
        </>
      }
      menuItems={menuItems}
    />
  );
}

export default memo(LanguageSelect);

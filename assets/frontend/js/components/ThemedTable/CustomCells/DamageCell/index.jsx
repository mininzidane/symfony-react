/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import StringService from 'frontend/js/lib/utils/StringService';
import React from 'react';

function DamageCell({ lot }) {
  const { primaryDamage, secondaryDamage } = lot;
  const primeDamage = primaryDamage && StringService.capitalizeEachWord(primaryDamage);
  const secondDamage = secondaryDamage && StringService.capitalizeEachWord(secondaryDamage);

  return (
    <>
      {primeDamage}
      {primeDamage && secondDamage && <div style={{ marginTop: 5 }} />}
      {secondDamage}
    </>
  );
}

export { DamageCell };

import { useState } from 'react';
import NumberService from 'frontend/js/lib/utils/NumberService';

function useSelected(section, refinements) {
  const [state, setState] = useState(() => {
    const refinement = refinements.find((v) => v.section === section);

    if (!refinement) {
      return {
        port: null,
        distance: null,
      };
    }

    const [port, distance] = refinement.value.split('-');

    return {
      port,
      distance: NumberService.castToNumberSafe(distance, null),
    };
  });

  return [state, setState];
}

export default useSelected;

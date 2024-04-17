import { useMemo } from 'react';

function useAttributeRel({ isNofollow, isNoopener, isNoreferrer }) {
  return useMemo(() => {
    const relArray = [];
    if (isNoopener) {
      relArray.push('noopener');
    }
    if (isNoreferrer) {
      relArray.push('noreferrer');
    }
    if (isNofollow) {
      relArray.push('nofollow');
    }
    return relArray.length > 0 ? relArray.join(' ') : null;
  }, [isNofollow, isNoopener, isNoreferrer]);
}

export default useAttributeRel;

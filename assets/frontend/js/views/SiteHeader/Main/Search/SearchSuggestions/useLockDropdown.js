import { useState } from 'react';

function useLockDropdown() {
  const DROPDOWN_LOCK_TIMEOUT = 150;
  const [isHintsDropdownLocked, setHintsDropdownLocked] = useState(false);

  function temporaryLockHintsDropdown() {
    setHintsDropdownLocked(true);
    setTimeout(() => setHintsDropdownLocked(false), DROPDOWN_LOCK_TIMEOUT);
  }

  return { isHintsDropdownLocked, temporaryLockHintsDropdown, hintsDropdownLockTimeout: DROPDOWN_LOCK_TIMEOUT };
}

export default useLockDropdown;

import { useEffect } from 'react';
import useDelayedLoadPermission from 'frontend/js/hooks/useDelayedLoad';
import BootstrapService from 'frontend/js/api/BootstrapService';

function useCookiesConsent() {
  const delayedLoadingAllowed = useDelayedLoadPermission();

  useEffect(() => {
    if (!delayedLoadingAllowed) {
      return;
    }

    const isProduction = BootstrapService.getAppValue('environment') === 'PROD';

    const $script = document.createElement('script');
    $script.src = `https://cdn.cookielaw.org/scripttemplates/otSDKStub.js`;
    $script.dataset.domainScript = `45dadf8d-344a-4bb5-8e36-5a50a8a01b57${isProduction ? '' : '-test'}`;
    $script.async = true;

    document.body.appendChild($script);
  }, [delayedLoadingAllowed]);
}

export default useCookiesConsent;

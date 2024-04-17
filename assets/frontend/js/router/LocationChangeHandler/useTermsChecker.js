import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import BootstrapService from 'frontend/js/api/BootstrapService';
import RouterService from 'frontend/js/api/RouterService';

function useTermsChecker() {
  const { acceptedTermsVersion, isAuthenticated } = useCustomerHelper();
  const termsVersion = BootstrapService.getAppValue('termsVersion', '');

  return (location) => {
    const notOnTermsPage = location.pathname !== RouterService.getRoute('terms');
    const haveToAcceptTerms = isAuthenticated && acceptedTermsVersion !== termsVersion;
    if (notOnTermsPage && haveToAcceptTerms) {
      RouterService.redirect('terms', { redirect: window.location.href });
    }
  };
}

export default useTermsChecker;

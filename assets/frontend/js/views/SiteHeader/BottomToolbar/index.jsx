import React from 'react';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import AuthButtons from './AuthButtons';
import AccountTabs from './AccountTabs';

export default function BottomToolbar() {
  const { isAuthenticated } = useCustomerHelper();
  return isAuthenticated ? <AccountTabs /> : <AuthButtons />;
}

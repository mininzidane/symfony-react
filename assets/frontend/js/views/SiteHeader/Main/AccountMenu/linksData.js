import DashboardSvg from 'frontend/images/shared/light-blue-set/ic_dashboard.svg';
import TransactionsSvg from 'frontend/images/shared/light-blue-set/ic_transactions.svg';
import DocumentsIdSvg from 'frontend/images/shared/light-blue-set/ic_documents_id.svg';
import BillingInfoSvg from 'frontend/images/shared/light-blue-set/ic_billing_information.svg';
import RenewalSettingsSvg from 'frontend/images/shared/light-blue-set/ic_renewal_settings.svg';
import ContactInfoSvg from 'frontend/images/shared/light-blue-set/ic_contact_information.svg';
import SecuritySvg from 'frontend/images/shared/light-blue-set/ic_login_password.svg';
import BrokerManagerSvg from 'frontend/images/shared/light-blue-set/ic_broker_manager.svg';
import LogoutSvg from 'frontend/images/shared/light-blue-set/ic_log_out.svg';
import t from 'frontend/js/api/TranslatorService';

export default [
  {
    route: 'dashboard',
    title: t('header.account_menu.dashboard'),
    icon: DashboardSvg,
    iconDimensions: { width: '18px', height: '18px' },
  },
  {
    route: 'purchases',
    title: t('header.account_menu.transactions'),
    icon: TransactionsSvg,
    iconDimensions: { width: '21px', height: '13px' },
  },
  {
    route: 'documents',
    title: t('header.account_menu.documents'),
    icon: DocumentsIdSvg,
    iconDimensions: { width: '18px', height: '15px' },
  },
  {
    route: 'billingInfo',
    title: t('header.account_menu.billingInfo'),
    icon: BillingInfoSvg,
    iconDimensions: { width: '18px', height: '14px' },
    hidden: false,
  },
  {
    route: 'renewalSettings',
    title: t('header.account_menu.renewalSettings'),
    icon: RenewalSettingsSvg,
    iconDimensions: { width: '21px', height: '20px' },
  },
  {
    route: 'contactInfo',
    title: t('header.account_menu.contactInfo'),
    icon: ContactInfoSvg,
    iconDimensions: { width: '18px', height: '15px' },
  },
  {
    route: 'brokerManager',
    title: t('header.account_menu.brokerManager'),
    icon: BrokerManagerSvg,
    iconDimensions: { width: '21px', height: '19px' },
  },
  {
    route: 'security',
    title: t('header.account_menu.security'),
    icon: SecuritySvg,
    iconDimensions: { width: '18px', height: '19px' },
  },
  {
    route: 'logout',
    title: t('header.account_menu.logout'),
    icon: LogoutSvg,
    iconDimensions: { width: '17px', height: '20px' },
  },
];

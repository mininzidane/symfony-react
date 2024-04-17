import BaseApiService from '../BaseApiService';

class DomainService extends BaseApiService {}

DomainService.defaultDomain = 'autobidmaster.com';
DomainService.formattedDomainOptions = [
  { label: DomainService.defaultDomain, value: DomainService.defaultDomain },
  { label: 'autobidmaster.com.ua', value: 'autobidmaster.com.ua' },
];

export default DomainService;

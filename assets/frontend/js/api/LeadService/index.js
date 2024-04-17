import BaseApiService from '../BaseApiService';

class LeadService extends BaseApiService {
  createLead(payload) {
    return this.post(this.buildRequestPath(`lead`, true), payload).then(({ data }) => data);
  }

  createLoungeLead(payload) {
    return this.post(this.buildRequestPath(`lounge-lead`, true), payload).then(({ data }) => data);
  }
}

LeadService.SOURCE_LOT_PAGE = 'Lot Page';
LeadService.SOURCE_AMB_INVENTORY_PAGE = 'ABM Inventory Page';
LeadService.SOURCE_SHIPPING_CALCULATOR_HOMEPAGE = 'Shipping Calculator Homepage';
LeadService.SOURCE_SHIPPING_QUESTIONS_HOMEPAGE = 'Shipping Questions Homepage';
LeadService.SOURCE_BUSINESS = 'Business';
LeadService.SOURCE_COPART_LATAM = 'Copart Latin America Campaign';
LeadService.SOURCE_LOUNGE_PAGE = 'Lounge Page';

export default LeadService;

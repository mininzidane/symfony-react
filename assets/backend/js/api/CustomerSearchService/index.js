import BaseApiService from '../BaseApiService';

class CustomerSearchService extends BaseApiService {
  search(params = {}, httpClientParams = {}) {
    const queryString = CustomerSearchService.objectToQueryParams(params);

    return this.get(
      this.buildProtectedRequestPath(`api/v1/customers/search?${queryString}`, true),
      httpClientParams,
    ).then((data) => data.data);
  }

  download(params = {}) {
    const queryString = CustomerSearchService.objectToQueryParams(params);

    return this.get(this.buildProtectedRequestPath(`api/v1/customers/search/download?${queryString}`, true), {
      responseType: 'blob',
    }).then((response) => {
      let fileName = CustomerSearchService.getFilenameFromResponse(response);
      if (!fileName) {
        fileName = 'CustomerSearch.csv';
      }

      CustomerSearchService.createDownloadFromResponse(response, fileName);
    });
  }

  searchByEmail(email) {
    return this.get(this.buildProtectedRequestPath(`api/v1/customer/search/email?email=${email}`)).then(
      (data) => data.data,
    );
  }

  searchAutocomplete(query = '', httpClientParams = {}) {
    return this.get(
      this.buildProtectedRequestPath(`api/v1/customers/autocomplete?q=${query}`, true),
      httpClientParams,
    ).then((data) => data.data);
  }
}

export default CustomerSearchService;

import BaseApiService from '../BaseApiService';

class EmployeeService extends BaseApiService {
  getEmployeeProfile(employeeId) {
    return this.get(this.buildProtectedRequestPath(`api/v1/employees/${employeeId}`)).then((data) => data.data);
  }

  uploadEmployeeAvatar(employeeId, payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/employees/${employeeId}/signature-image`), payload).then(
      (data) => data.data,
    );
  }
}

export default EmployeeService;

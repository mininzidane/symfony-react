import BaseApiService from '../BaseApiService';

class SurveyService extends BaseApiService {
  getSurvey(surveyId) {
    return this.get(this.buildRequestPath(`surveys/${surveyId}`, true)).then(({ data }) => data);
  }

  submitSurvey(surveyId, payload) {
    return this.post(this.buildRequestPath(`surveys/${surveyId}`, true), payload).then(({ data }) => data);
  }
}

SurveyService.cancelMembershipSurveyId = 'cancellation_exit_survey';

export default SurveyService;

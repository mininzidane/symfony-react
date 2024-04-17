import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';

const TestimonialsService = {
  getTestimonials(currentPage) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`testimonials?page=${currentPage}`, true),
    ).then(({ data }) => data);
  },
};

export default TestimonialsService;

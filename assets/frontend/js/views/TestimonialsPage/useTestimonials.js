import { useEffect, useContext } from 'react';
import get from 'lodash/get';
import { useQuery } from 'react-query';
import PaginationContext from 'frontend/js/context/PaginationContext';
import TestimonialsService from 'frontend/js/api/TestimonialsService';

function useTestimonials() {
  const { currentPage, setTotal } = useContext(PaginationContext);

  const { data, isLoading } = useQuery(
    ['testimonials-data', currentPage],
    () => TestimonialsService.getTestimonials(currentPage),
    { keepPreviousData: true },
  );

  const testimonials = get(data, 'data', []);
  const averageRating = get(data, 'averageRating', null);
  const total = get(data, 'total');

  useEffect(() => {
    if (data && !isLoading) {
      setTotal(total);
    }
  }, [data, isLoading]);

  return { loading: isLoading && !data, testimonials, averageRating, total };
}

export default useTestimonials;

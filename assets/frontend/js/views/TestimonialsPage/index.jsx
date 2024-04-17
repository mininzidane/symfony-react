import React from 'react';
import { PaginationProvider } from 'frontend/js/context/PaginationContext';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Loader from 'frontend/js/views/Shared/Loader';
import Hero from './Hero';
import Title from './Title';
import Testimonials from './Testimonials';
import useTestimonials from './useTestimonials';

function TestimonialsPage() {
  const { loading, testimonials, averageRating, total } = useTestimonials();

  return (
    <>
      <Hero loading={loading} averageRating={averageRating} total={total} />
      <ContainerFullScreen>
        <Title />
        {loading ? <Loader /> : <Testimonials testimonials={testimonials} />}
      </ContainerFullScreen>
    </>
  );
}

export default () => (
  <PaginationProvider itemsPerPageOptions={[25]}>
    <TestimonialsPage />
  </PaginationProvider>
);

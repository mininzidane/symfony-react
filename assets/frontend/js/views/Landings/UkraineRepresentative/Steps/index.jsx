import React from 'react';
import useRevealOnScroll from 'frontend/js/hooks/useRevealOnScroll';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

function Steps() {
  const ref = useRevealOnScroll();
  return (
    <div ref={ref}>
      <Step1 />
      <Step2 />
      <Step3 />
    </div>
  );
}

export default Steps;

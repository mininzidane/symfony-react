import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundaryComponent from 'frontend/js/components/ErrorBoundary';

const ErrorPage = lazy(() => import('frontend/js/views/ErrorPage'));

function ErrorBoundary({ children }) {
  return (
    <ErrorBoundaryComponent
      fallback={
        <Suspense fallback={null}>
          <ErrorPage errorCode="500" />
        </Suspense>
      }
    >
      {children}
    </ErrorBoundaryComponent>
  );
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ErrorBoundary;

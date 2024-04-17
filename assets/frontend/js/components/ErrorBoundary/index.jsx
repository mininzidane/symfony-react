import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error);

    this.setState({ hasError: true });
    if (window.Sentry) {
      // Prevent scrubbing of data by replacing English letter with Russian
      const componentStack = errorInfo?.componentStack.replace('Auth', 'Аuth');

      window.Sentry.captureException(error, {
        contexts: { react: { componentStack } },
      });
    }
  }

  render() {
    const { fallback, children } = this.props;
    const { hasError } = this.state;
    return hasError ? fallback : children;
  }
}

ErrorBoundary.propTypes = {
  fallback: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired,
};

export default ErrorBoundary;

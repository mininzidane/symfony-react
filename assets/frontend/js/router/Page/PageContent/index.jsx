import React from 'react';
import PropTypes from 'prop-types';
import ScrollBackButton from 'frontend/js/views/ScrollBackButton';
import useComponentWillMount from 'frontend/js/hooks/useComponentWillMount';
import RouterService from 'frontend/js/api/RouterService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import DelayedLoadSuspense from 'frontend/js/components/Suspense/DelayedLoad';
import Meta from './Meta';

const PageContent = ({
  content: Content,
  metaKey,
  isScrolltopDisabled,
  onWillMount,
  unauthorizedOnly,
  authorizedOnly,
  props,
}) => {
  const { isAuthenticated } = useCustomerHelper();

  if (unauthorizedOnly && isAuthenticated) {
    RouterService.replace('dashboard');
    return null;
  }

  if (authorizedOnly && !isAuthenticated) {
    RouterService.replace('login');
    return null;
  }

  useComponentWillMount(onWillMount);

  return (
    <>
      <Meta metaKey={metaKey} />

      <main className="page-content">
        <Content {...props} />
      </main>

      {!isScrolltopDisabled && (
        <DelayedLoadSuspense fallback={null}>
          <ScrollBackButton />
        </DelayedLoadSuspense>
      )}
    </>
  );
};

PageContent.defaultProps = {
  metaKey: '',
  isScrolltopDisabled: false,
  onWillMount: () => {},
  unauthorizedOnly: false,
  authorizedOnly: false,
  props: {},
};

PageContent.propTypes = {
  content: PropTypes.elementType.isRequired,
  metaKey: PropTypes.string,
  isScrolltopDisabled: PropTypes.bool,
  onWillMount: PropTypes.func,
  unauthorizedOnly: PropTypes.bool,
  authorizedOnly: PropTypes.bool,
  props: PropTypes.object,
};

export default PageContent;

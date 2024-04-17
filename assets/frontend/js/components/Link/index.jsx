/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import PropTypes from 'prop-types';
import RouterService from 'frontend/js/api/RouterService';
import useAttributeRel from 'frontend/js/hooks/useAttributeRel';

function Link({
  href,
  routeParams,
  className,
  isTargetBlank,
  isNofollow,
  isNoopener,
  isNoreferrer,
  children,
  isNoWrap,
  ...props
}) {
  const rel = useAttributeRel({ isNofollow, isNoopener, isNoreferrer });
  return (
    <a
      href={routeParams.length ? RouterService.getRoute.apply(this, routeParams) : href}
      className={className}
      target={isTargetBlank ? '_blank' : null}
      rel={rel}
      style={{
        ...(isNoWrap && { whiteSpace: 'nowrap' }),
      }}
      {...props}
    >
      {children}
    </a>
  );
}

Link.propTypes = {
  href: PropTypes.string,
  className: PropTypes.string,
  routeParams: PropTypes.array,
  isTargetBlank: PropTypes.bool,
  isNofollow: PropTypes.bool,
  isNoopener: PropTypes.bool,
  isNoreferrer: PropTypes.bool,
  isNoWrap: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node), PropTypes.string]),
};

Link.defaultProps = {
  href: '',
  className: '',
  routeParams: [],
  isTargetBlank: false,
  isNofollow: false,
  isNoopener: false,
  isNoreferrer: false,
  isNoWrap: false,
  children: null,
};

export default Link;

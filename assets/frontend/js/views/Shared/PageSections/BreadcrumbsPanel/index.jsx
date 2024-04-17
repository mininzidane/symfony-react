import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Container from 'frontend/js/components/Container';
import Breadcrumbs from 'frontend/js/views/Shared/PageSections/Breadcrumbs';
import useStyle from './useStyle';

function BreadcrumbsPanel({ crumbs, className }) {
  const classes = useStyle();

  return (
    <div className={classNames(classes.root, className)}>
      <Container>
        <Breadcrumbs crumbs={crumbs} />
      </Container>
    </div>
  );
}

BreadcrumbsPanel.propTypes = {
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node,
      href: PropTypes.string,
    }),
  ).isRequired,
  className: PropTypes.string,
};

BreadcrumbsPanel.defaultProps = {
  className: '',
};

export default BreadcrumbsPanel;

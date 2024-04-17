import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RouterService from 'backend/js/api/RouterService';
import useStyles from './useStyles';

function Breadcrumbs({ crumbs, className, hasHomePage }) {
  const classes = useStyles();

  return (
    <>
      <div className={classNames(classes.root, className)}>
        <nav className={classes.nav}>
          <ol className={classNames(classes.list, 'breadcrumb')}>
            {hasHomePage && (
              <li className={classes.listItem}>
                <a href={RouterService.getRoute('home')}>
                  <span>Home</span>
                </a>
              </li>
            )}

            {crumbs.map((crumb, index) => (
              <li className={classes.listItem} key={index}>
                {crumb.href ? (
                  <a href={crumb.href}>
                    <span>{crumb.label}</span>
                  </a>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </>
  );
}

Breadcrumbs.propTypes = {
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node,
      href: PropTypes.string,
    }),
  ).isRequired,
  className: PropTypes.string,
  hasHomePage: PropTypes.bool,
};

Breadcrumbs.defaultProps = {
  className: '',
  hasHomePage: true,
};

export default Breadcrumbs;

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import t from 'frontend/js/api/TranslatorService';
import RouterService from 'frontend/js/api/RouterService';
import useStyle from './useStyle';

function BreadcrumbsPanel({ crumbs, hasHomePage, className }) {
  const classes = useStyle();

  const translationSets = {
    home: t('shared.label.home'),
  };

  return (
    <nav className={classnames(classes.root, className)}>
      <ol className={classes.list}>
        {hasHomePage && (
          <li className={classes.listItem} itemScope itemProp="itemListElement" itemType="http://schema.org/ListItem">
            <a href={RouterService.getRoute('home')} itemProp="item">
              <span itemProp="name">{translationSets.home}</span>
            </a>
            <meta itemProp="position" content="1" />
          </li>
        )}

        {crumbs.map((crumb, index) => (
          <li
            className={classes.listItem}
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/ListItem"
            key={index}
          >
            {crumb.href ? (
              <a href={crumb.href} itemProp="item">
                <span itemProp="name">{crumb.label}</span>
              </a>
            ) : (
              <span itemProp="name">{crumb.label}</span>
            )}

            <meta itemProp="position" content={index + (hasHomePage ? 2 : 1)} />
          </li>
        ))}
      </ol>
    </nav>
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
  hasHomePage: PropTypes.bool,
};

BreadcrumbsPanel.defaultProps = {
  className: '',
  hasHomePage: true,
};

export default BreadcrumbsPanel;
